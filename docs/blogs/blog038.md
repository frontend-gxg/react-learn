大致记录一下简单的理解，不会有例子和说明。

## c/c++ vs rust

* c/c++的宏主要使用token的替换，rust的宏主要使用ast的替换
* c/c++的代码中会有大量的宏定义，rust的代码中宏定义比较少，一般由特定的框架开发人员开发

## declarative macros

声明宏，别名macros by example，marco_rules! example或者marcos，使用macro_rules! 定义

## procedural marcos

过程宏，分为以下三类：

* function-like：使用方式类似声明宏
* attribute-like
* derive

## proc-macro2

* [https://github.com/dtolnay/proc-macro2](https://github.com/dtolnay/proc-macro2)
* [https://docs.rs/proc-macro2/1.0.29/proc_macro2/](https://docs.rs/proc-macro2/1.0.29/proc_macro2/)
* [https://crates.io/crates/proc-macro2](https://crates.io/crates/proc-macro2)

## quote

* [https://github.com/dtolnay/quote](https://github.com/dtolnay/quote)
* [https://docs.rs/quote/1.0.10/quote/](https://docs.rs/quote/1.0.10/quote/)
* [https://crates.io/crates/quote](https://crates.io/crates/quote)

## syn

* [https://github.com/dtolnay/syn](https://github.com/dtolnay/syn)
* [https://docs.rs/syn/1.0.80/syn/](https://docs.rs/syn/1.0.80/syn/)
* [https://crates.io/crates/syn](https://crates.io/crates/syn)

## 参考

* [https://doc.rust-lang.org/book/ch19-06-macros.html](https://doc.rust-lang.org/book/ch19-06-macros.html)
* [https://danielkeep.github.io/tlborm/book/README.html](https://danielkeep.github.io/tlborm/book/README.html)
* [https://veykril.github.io/tlborm/introduction.html](https://veykril.github.io/tlborm/introduction.html)
* [https://dev.to/rogertorres/first-steps-with-rust-declarative-macros-1f8m](https://dev.to/rogertorres/first-steps-with-rust-declarative-macros-1f8m)
* [https://medium.com/@phoomparin/a-beginners-guide-to-rust-macros-5c75594498f1](https://medium.com/@phoomparin/a-beginners-guide-to-rust-macros-5c75594498f1)
* [https://blog.logrocket.com/macros-in-rust-a-tutorial-with-examples/](https://blog.logrocket.com/macros-in-rust-a-tutorial-with-examples/)
* [https://cloud.tencent.com/developer/article/1832788](https://cloud.tencent.com/developer/article/1832788)
* [https://wiki.jikexueyuan.com/project/rust-primer/macro/macro.html](https://wiki.jikexueyuan.com/project/rust-primer/macro/macro.html)
