## Code 1

```cpp
template <typename T> struct DoWork;
template <> struct DoWork<int> {};
template <> struct DoWork<float> {};
template <typename U> struct DoWork<U*> {};

int main() {
    // DoWork<char> x;
    DoWork<int> a;
    DoWork<float> b;
    DoWork<float*> c;
    return 0;
}
```

```cpp
template <typename T> struct DoWork {};
template <> struct DoWork<int> {};
template <> struct DoWork<float> {};
template <typename U> struct DoWork<U*> {};

int main() {
    DoWork<char> x;
    DoWork<int> a;
    DoWork<float> b;
    DoWork<float*> c;
    return 0;
}
```

## Code 2

```cpp
#include <iostream>
#include <memory>

template <typename T, typename U> struct X                                         {static int const a = 0;};
template <typename T>             struct X<T,  T>                                  {static int const a = 1;};
template <typename T>             struct X<T*, T>                                  {static int const a = 2;};
template <typename T>             struct X<T,  T*>                                 {static int const a = 3;};
template <typename U>             struct X<U,  int>                                {static int const a = 4;};
template <typename U>             struct X<U*, int>                                {static int const a = 5;};
template <typename U, typename T> struct X<U*, T*>                                 {static int const a = 6;};
template <typename U, typename T> struct X<U,  T*>                                 {static int const a = 7;};
template <typename T>             struct X<std::unique_ptr<T>, std::shared_ptr<T>> {static int const a = 9;};

int main() {
    std::cout << X<float*,  int>::a     << std::endl;  // 5
    std::cout << X<double*, int>::a     << std::endl;  // 5
    std::cout << X<double,  double>::a  << std::endl;  // 1
    std::cout << X<float*,  double*>::a << std::endl;  // 6
    // std::cout << X<float*,  float*>::a  << std::endl;  // error: 1, 6, 7
    std::cout << X<double,  float*>::a  << std::endl;  // 7
    std::cout << X<int,     double*>::a << std::endl;  // 7
    // std::cout << X<int*,    int>::a     << std::endl;  // error: 2, 4, 5
    std::cout << X<double*, double>::a  << std::endl;  // 2
    return 0;
}
```

- 模板匹配：先找到原型，再去特化列表里面匹配，筛选满足条件的特化模板，然后挑选出最合适的。如果没有满足条件的或者有多个最合适的，那么直接报错。

## Code 3

```cpp
#include <iostream>

template <typename T0, typename T1> struct DoWork;
template <>                         struct DoWork<int,  void> {static int const a = 1;};
template <>                         struct DoWork<void, int>  {static int const a = 2;};
template <>                         struct DoWork<int,  int>  {static int const a = 3;};

int main() {
    std::cout << DoWork<int,  void>::a << std::endl; // 1
    std::cout << DoWork<void, int>::a  << std::endl; // 2
    std::cout << DoWork<int,  int>::a  << std::endl; // 3
    return 0;
}
```

```cpp
#include <iostream>

template <typename T0, typename T1 = void> struct DoWork;
template <typename T>                      struct DoWork<T>        {static int const a = 1;};
template <>                                struct DoWork<int>      {static int const a = 2;};
template <>                                struct DoWork<float>    {static int const a = 3;};
template <>                                struct DoWork<int, int> {static int const a = 4;};

int main() {
    std::cout << DoWork<int>::a << std::endl; // 2
    std::cout << DoWork<float>::a << std::endl;  // 3
    std::cout << DoWork<double>::a << std::endl;  // 1
    std::cout << DoWork<int, int>::a << std::endl;  // 4
    return 0;
}
```

- 模板匹配：先找到原型，并根据补充缺省类型，再去特化列表里面匹配，筛选满足条件的特化模板，然后挑选出最合适的。如果没有满足条件的或者有多个最合适的，那么直接报错。

## Code 4

```cpp
#include <iostream>
#include <complex>
#include <type_traits>

template <typename T, bool IsFloat = std::is_floating_point<T>::value> struct SafeDivide {static int const a = 0;};
template <typename T> struct SafeDivide<T, true> {static int const a = 1;};
template <typename T> struct SafeDivide<T, false> {static int const a = 2;};

int main() {
    std::cout << SafeDivide<float>::a << std::endl; // 1
    std::cout << SafeDivide<int>::a << std::endl; // 2
    return 0;
}
```

```cpp
#include <iostream>
#include <complex>
#include <type_traits>

template <typename T, bool IsFloat = std::is_floating_point<T>::value, bool IsIntegral = std::is_integral<T>::value> struct SafeDivide {static int const a = 0;};
template <typename T> struct SafeDivide<T, true, false> {static int const a = 1;};
template <typename T> struct SafeDivide<T, false, true> {static int const a = 2;};

int main() {
    std::cout << SafeDivide<float>::a << std::endl; // 1
    std::cout << SafeDivide<int>::a << std::endl; // 2
    std::cout << SafeDivide<std::complex<float>>::a << std::endl; // 0
    return 0;
}
```

```cpp
/* error code */
#include <iostream>
#include <complex>
#include <type_traits>

template <typename T, bool Enabled = true> struct SafeDivide {static int const a = 0;};
template <typename T> struct SafeDivide<T, std::is_floating_point<T>::value> {static int const a = 1;};
template <typename T> struct SafeDivide<T, std::is_integral<T>::value> {static int const a = 2;};

int main() {
    std::cout << SafeDivide<float>::a << std::endl; // 1
    std::cout << SafeDivide<int>::a << std::endl; // 2
    std::cout << SafeDivide<std::complex<float>>::a << std::endl; // 0
    return 0;
}
```

```cpp
#include <iostream>
#include <complex>
#include <type_traits>

template <typename T, typename Enabled = std::true_type> struct SafeDivide {static int const a = 0;};
template <typename T> struct SafeDivide<T, typename std::is_floating_point<T>::type> {static int const a = 1;};
template <typename T> struct SafeDivide<T, typename std::is_integral<T>::type> {static int const a = 2;};

int main() {
    std::cout << SafeDivide<float>::a << std::endl; // 1
    std::cout << SafeDivide<int>::a << std::endl; // 2
    std::cout << SafeDivide<std::complex<float>>::a << std::endl; // 0
    return 0;
}
```

- 模板匹配：先找到原型，并根据补充缺省类型，进一步计算类型，再去特化列表里面，计算类型，并匹配，筛选满足条件的特化模板，然后挑选出最合适的。如果没有满足条件的或者有多个最合适的，那么直接报错。

## 参考

- [wuye9036/CppTemplateTutorial](https://github.com/wuye9036/CppTemplateTutorial)