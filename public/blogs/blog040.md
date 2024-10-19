## 安装gcc

- 安装[mingw64](https://www.msys2.org/)
- 打开mingw64
- 输入

```
pacman -Syu
pacman -Su
pacman -S git
pacman -S make
pacman -S diffutils
pacman -S tar
pacman -S mingw-w64-x86_64-python
pacman -S mingw-w64-x86_64-cmake
pacman -S mingw-w64-x86_64-gcc
pacman -S mingw-w64-x86_64-ninja
pacman -S --needed base-devel mingw-w64-x86_64-toolchain
```

- 把msys64\mingw64\bin写入环境变量

## 安装rust

- 下载[rustup-init](https://www.rust-lang.org/tools/install)
- 打开rustup-init，输入y
- 跳转到配置页面，选择2) Customize installation
- Default host triple?使用x86_64-pc-windows-gnu，其他使用默认配置
- 跳转到配置页面，选择1) Proceed with installation (default)
- 等待下载安装

## 参考

- https://www.rust-lang.org/tools/install
- https://www.msys2.org/
- https://github.com/rust-lang/rust