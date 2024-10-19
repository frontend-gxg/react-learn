## 提要

看了[揭密X86架构C可变参数函数实现原理](https://zhuanlan.zhihu.com/p/94036267)，感觉很过瘾。自己也想从gcc的asm的角度去感受一下内存中调用栈的布局。

## 基础

x86-64的寄存器有：rax，rbx，rcx，rdx，rbp，rsp，rsi，rdi，r8，r9，r10，r11，r12，r13，r14，r15。

- rbp是当前调用栈的位置，rsp是调用栈的栈顶（低地址）
- 参数传递的前六个参数通过rdi，rsi，rdx，rcx，r8，r9这6个寄存器传递，其余参数通过栈空间传递

## 例子

下面的例子只是魔改了一下[揭密X86架构C可变参数函数实现原理](https://zhuanlan.zhihu.com/p/94036267)中的代码：

```c
#include <stdio.h>

long sum(long a, long a1, long a2, long a3, long a4, long a5, long a6, long a7, long a8) {
    register long rdi asm("rdi");
    register long rsi asm("rsi");
    register long rdx asm("rdx");
    register long rcx asm("rcx");
    register long r8 asm("r8");
    register long r9 asm("r9");
    register long *rbp asm("rbp");
    printf("%ld %ld %ld %ld %ld %ld\n", rdi, rsi, rdx, rcx, r8, r9);
    printf("%ld %ld %ld\n", rbp[2], rbp[3], rbp[4]);
    return a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8;
}

int main() {
    sum(8, 1, 2, 3, 4, 5, 6, 7, 8);
    return 0;
}
```

输出为

```
$ gcc main.c -o main
$ ./main
8 1 2 3 4 5
6 7 8
```

因此我们可以大致看出调用栈的分布如下

```
----------------------------------
|            |              |
--------------              |
| 8          |              |
--------------              |
| 7          |             main
--------------              |
| 6          |              |
--------------              |
| 返回地址   |              |
----------------------------------
| 保存的%ebp | <- %ebp      |
--------------              |
|            |             sum
--------------              |
|            | <- %esp      |
----------------------------------
```

## 参考

- [X86 64 Register and Instruction Quick Start](https://wiki.cdot.senecacollege.ca/wiki/X86_64_Register_and_Instruction_Quick_Start) 
- [6.47.5 Variables in Specified Registers](https://gcc.gnu.org/onlinedocs/gcc/Explicit-Register-Variables.html#Explicit-Register-Variables) 
- [holbertonschool/Hack-The-Virtual-Memory](https://github.com/holbertonschool/Hack-The-Virtual-Memory)
- [Print out value of stack pointer](https://stackoverflow.com/questions/20059673/print-out-value-of-stack-pointer)
- [Reading a register value into a C variable](https://stackoverflow.com/questions/2114163/reading-a-register-value-into-a-c-variable)