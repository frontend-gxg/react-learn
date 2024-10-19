## 哪些是immutable

参考[Immutable vs Mutable types](https://stackoverflow.com/questions/8056130/immutable-vs-mutable-types/23715872#23715872)这个回答，我们可以知道

- 整型
- 浮点数
- 复数
- 元组

都是immutable的。

## 什么是immutable

**immutable**中文意思是**不可变**，**immutable object**直观上理解就是**对应内存区域不会发生变化的对象**。

比如python中的[整型对象](https://github.com/python/cpython/blob/master/Include/longintrepr.h#L85-L88)，对应的结构体如下：

```c
struct _longobject {
    PyObject_VAR_HEAD
    digit ob_digit[1];
};
```

由于整型对象是immutable的，所以在相应的生命周期内，`ob_digit[0]`的值是不会改变的。

## 如何实现immutable

python底层是使用C语言实现的，而且官方也提供了相关的C API来写扩展，因此当我们写python程序的时候，其实面对的是两个层次：

- 直接使用python写应用
- 使用C语言，结合上官方提供的C API来写扩展

所以python实现immutable很简单，只要在

- python
- C

两个层面不给用户提供可以修改immutable对象的API就可以了。

## 例子

一个比较经典的例子如下：

```python
a = 1
print(a, id(a))  # 1 1737864256
a += 1
print(a, id(a))  # 2 1737864288
```

id改变的原因：python中整型的inplace加法返回的是一个新的整型对象。

因此上面的inplace加法对应的C代码应该是：

```c
PyObject *inplaceAdd(PyObject *self, PyObject *args) {
    int a;
    if (!PyArg_ParseTuple(args, "i", &a))
        return NULL;
    return PyLong_FromLong(a + 1);  // 新的对象
}
```

而不是

```c
PyObject *inplaceAdd(PyObject *self, PyObject *args) {     
    PyObject *a = NULL;     
    if (!PyArg_ParseTuple(args, "O", &a))         
        return NULL;
    PyLongObject *a1 = (PyLongObject *) a;  // 旧的对象
    (a1->ob_digit[0]) += 1;
    return a1;
}
```

## 绕过immutable的限制

- 由于C语言非常灵活，因此我们可以很容易的操纵结构体，从而修改immutable对象的值。比如[修改python中的number](https://github.com/gaoxinge/pymutable/blob/master/pymutable.c#L3-L35)：

```python
import sys
from pymutable import *

# test int
a = 1
b = 2
print(a, id(a), sys.getrefcount(a))  // 1 10919328 780
mutate_int(a, b)
print(a, id(a), sys.getrefcount(a))  // 2 10919328 780

# test float
a = 1.0
b = 2.0
print(a, id(a), sys.getrefcount(a))  // 1.0 140444273578512 5
mutate_float(a, b)
print(a, id(a), sys.getrefcount(a))  // 2.0 140444273578512 5

# test complex
a = 1 + 2j
b = 3 + 4j
print(a, id(a), sys.getrefcount(a))  // (1+2j) 140444272954384 4
mutate_complex(a, b)
print(a, id(a), sys.getrefcount(a))  // (3+4j) 140444272954384 4
```

- 另外python为元组提供的C API并没有完全把修改元组对象这条路封死。在[tupleobjet.h](https://github.com/python/cpython/blob/master/Include/cpython/tupleobject.h#L29-L30)中，有如下这段代码：

```c
/* Macro, *only* to be used to fill in brand new tuples */
#define PyTuple_SET_ITEM(op, i, v) (_PyTuple_CAST(op)->ob_item[i] = v)
```

虽然注释明确说了只有在new一个元组对象的时候才可以用这个API，但是我们还是要这样用[mutateTupleSetItem](https://github.com/gaoxinge/pymutable/blob/master/pymutable.c#L37-L45)：

```python
import sys
from pymutable import *

# test tuple
a = (1, 2, 3)
print(a, id(a), sys.getrefcount(a))  // (2, 2, 3) 140444272526824 4
mutate_tuple_set_item(a, 0, 4)
print(a, id(a), sys.getrefcount(a))  // (4, 2, 3) 140444272526824 4
```

## 总结

- python的immutable并不是绝对的，你可以通过写扩展的方式绕过immutable的限制。
- 但是尽量不要写这种代码。首先python中维护了许多常量池和引用计数，这可能会导致各种bug。其次这也不利于代码的可读性和可维护性。