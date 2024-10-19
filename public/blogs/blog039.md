## 例子：impl trait/dyn trait都适用的情况

- 共用代码

```rust
pub trait Summary {
    fn summarize(&self) -> String;
}

struct A {}

impl A {
    fn new() -> Self {
        return A {};
    }
}

impl Summary for A {
    fn summarize(&self) -> String {
        return String::from("A");
    }
}

struct B {}

impl B {
    fn new() -> Self {
        return B {};
    }
}

impl Summary for B {
    fn summarize(&self) -> String {
        return String::from("B");
    }
}
```

- impl trait 可运行

```rust
fn summarize(summary: &impl Summary) -> String {
    return summary.summarize()
}

fn main() {
    let a = A::new();
    let b = B::new();
    println!("{}", summarize(&a));
    println!("{}", summarize(&b));
}
```

- dyn trait 可运行

```rust
fn summarize(summary: &dyn Summary) -> String {
    return summary.summarize()
}

fn main() {
    let a = A::new();
    let b = B::new();
    println!("{}", summarize(&a));
    println!("{}", summarize(&b));
}
```

- impl trait 可运行

```rust
fn summarize(summary: impl Summary) -> String {
    return summary.summarize()
}

fn main() {
    let a = A::new();
    let b = B::new();
    println!("{}", summarize(a));
    println!("{}", summarize(b));
}
```

- dyn trait 不可运行

```rust
fn summarize(summary: dyn Summary) -> String {
    return summary.summarize()
}

fn main() {
    let a = A::new();
    let b = B::new();
    println!("{}", summarize(a));
    println!("{}", summarize(b));
}
```

## 参考

- [dyn Trait and impl Trait in Rust](https://www.ncameron.org/blog/dyn-trait-and-impl-trait-in-rust/)
- [dyn , impl and Trait Objects — Rust](https://cotigao.medium.com/dyn-impl-and-trait-objects-rust-fd7280521bea)
- [PrivateRookie：捋捋 Rust 中的 impl Trait 和 dyn Trait](https://zhuanlan.zhihu.com/p/109990547)
- [NONE：Rust：impl Trait  vs impl dyn Trait](https://zhuanlan.zhihu.com/p/257090324)