## 背景

写了一个benchmark函数。由于涉及到文件读写，因此函数不是幂等的且有副作用。即连续多次跑该函数，结果会不一样。使用go benchmark跑了一下，发现输出轮数和文件行数不一致。

## 命令行

> GOMAXPROCS=xxx go run -bench=xxx -benchtime=xxx -cpu=xxx -count=xxx

- GOMAXPROCS: 环境变量。最大cpu个数。
- bench: 标志位。benchmark名字。
- benchtime: 标志位。10x表示每个benchmark跑满10轮，10s表示每个- benchmark跑满10秒。默认为s，具体数值不清楚。
- cpu: 标志位。比如1,2,3，表示跑3组，第一组用1个cpu，第二组用2个- cpu，第三组用3个cpu。默认为runtime.GOMAXPROCS(-1)。
- count: 标志位。比如3，表示每组跑3次。默认为1。

## 返回结果

```
goos: windows
goarch: amd64
pkg: gxg
BenchmarkSequentialWriteWithNoSeek-4              200000              5090 ns/op
PASS
ok      gxg     4.143s
```

- BenchmarkSequentialWriteWithNoSeek-4: benchmark名字。其中4为GOMAXPROCS。
- 200000: 轮数。
- 5090 ns/op: 延时。

## benchmark源码流程

benchmark源码位于[benchmark.go](https://github.com/golang/go/blob/master/src/testing/benchmark.go)。流程大致如下：

```go
func RunBenchmarks(matchString func(pat, str string) (bool, error), benchmarks []InternalBenchmark) {
	runBenchmarks("", matchString, benchmarks)
}

// step 2
func runBenchmarks(importPath string, matchString func(pat, str string) (bool, error), benchmarks []InternalBenchmark) bool {
	// ...
	main.runN(1)
	// ...
}

// step 3
func runBenchmarks(importPath string, matchString func(pat, str string) (bool, error), benchmarks []InternalBenchmark) bool {
		// ...
		benchFunc: func(b *B) {
			for _, Benchmark := range bs {
				b.Run(Benchmark.Name, Benchmark.F)
			}
		},
		// ...
}

// step 4
func (b *B) Run(name string, f func(b *B)) bool {
	// ...
	// 运行benchmark之前，运行一次，检测一下。
	// 为了只运行一次，这一步要忽略。
	if sub.run1() {
		sub.run()
	}
	// ...
}

// step 5
func (ctx *benchContext) processBench(b *B) {
	for i, procs := range cpuList {
		for j := uint(0); j < *count; j++ {
			// ...
			if i > 0 || j > 0 {
				b = &B{
					common: common{
						signal: make(chan bool),
						name:   b.name,
						w:      b.w,
						chatty: b.chatty,
					},
					benchFunc: b.benchFunc,
					benchTime: b.benchTime,
				}
				// cpuList或者*count导致多次运行benchmark之前，运行一次，检测一下。
				// 除了第一次，因为第一次已经检测过了。
				// 为了只运行一次，cpu和count使用默认值。
				b.run1()
			}
			r := b.doBench()
			// ...
		}
	}
}

// step 6
func (b *B) doBench() BenchmarkResult {
	go b.launch()
	<-b.signal
	return b.result
}

// step 7
func (b *B) launch() {
	// ...
	if b.benchTime.n > 0 {
		// 基于次数的benchtime
		b.runN(b.benchTime.n)
	} else {
		// 基于时间的benchtime
		d := b.benchTime.d
		for n := int64(1); !b.failed && b.duration < d && n < 1e9; {
			// ...
			// 多次运行探测平均延时，从而调整轮数，直到b.duration >= d为止。
			// 为了只运行一次，使用基于次数的benchtime。
			b.runN(int(n))
		}
	}
	b.result = BenchmarkResult{b.N, b.duration, b.bytes, b.netAllocs, b.netBytes, b.extra}
}
```

## 如何只运行一次

- 使用skip函数忽略第一次检测

```go
func skip(f func(*testing.B)) func(*testing.B) {
	i := 0
	return func(b *testing.B) {
		if i == 0 {
			i += 1
			return
		}
		f(b)
	}
}
```

- 命令行

```
go run -bench=BenchmarkSequentialWriteWithNoSeek -benchtime=200000x
```

## 参考

- https://golang.org/pkg/testing/ 
- [What's that number in Go benchmark names?](https://mmcloughlin.com/posts/golang-benchmarks-gomaxprocs) 
- [cmd/go: go test running bench twice with -benchtime=1x · Issue #32051 · golang/go](https://github.com/golang/go/issues/32051)