## Code 1

```cpp
#include "stdint.h"
#include <iostream>

template <typename T> class TypeToID {
public:
    static int const ID = -1;
};

template <> class TypeToID<uint8_t> {
public:
    static int const ID = 0;
};

template <> class TypeToID<uint16_t> {
public:
    static int const ID = 1;
};

template <> class TypeToID<uint32_t> {
public:
    static int const ID = 2;
};

template <> class TypeToID<uint64_t> {
public:
    static int const ID = 3;
};

int main() {
    std::cout << "ID of uint8_t: " << TypeToID<uint8_t>::ID << std::endl;
    std::cout << "ID of uint16_t: " << TypeToID<uint16_t>::ID << std::endl;
    std::cout << "ID of uint32_t: " << TypeToID<uint32_t>::ID << std::endl;
    std::cout << "ID of uint64_t: " << TypeToID<uint64_t>::ID << std::endl;
    return 0;
}
```

- 原型 **template \<typename T\> classTypeToID** 一定要定义
- 特化 **template \<\> classTypeToID\<uint8_t\>** 中的 **\<typename T\>** 一定要省略

## Code 2

```cpp
#include <iostream>

template <typename T> class RemovePointer {
public:
    typedef T Result;
};

template <typename T> class RemovePointer<T*> {
public:
    typedef typename RemovePointer<T>::Result Result;
};

int main() {
    RemovePointer<int>::Result x = 5;
    std::cout << x << std::endl;
    RemovePointer<int*>::Result y = 5;
    std::cout << y << std::endl;
    RemovePointer<int**>::Result z = 5;
    std::cout << z << std::endl;
    return 0;
}
```

- 原型的 **typedef T Result** 不需要加 **typename**
- 特化的 **typedeftypename RemovePointer\<T\>::Result Result** 需要加 **typename**

## Code 3

```cpp
template <typename T> struct X {};

template <typename T> struct Y
{
    typedef X<T> ReboundType;
    typedef typename X<T>::MemberType MemberType2;
};

int main() {
    return 0;
}
```

- 编译通过。因为 **typedef typename X\<T\>::MemberType MemberType2** 为依赖性名称，能通过**模板定义**过程中的语义分析。

```cpp
template <typename T> struct X {};

template <typename T> struct Y
{
    typedef X<T> ReboundType;
    typedef typename X<T>::MemberType MemberType2;
};

int main() {
    Y<int> y;
    return 0;
}
```

- 编译不通过。因为 **typedef typename X\<T\>::MemberType MemberType2** 会展开为 **typedef typename X\<int\>::MemberType MemberType2** ，不能通过**模板实例化**过程中的语义分析。

## 参考

- https://github.com/wuye9036/CppTemplateTutorial 