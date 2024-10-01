## 背景

基于c语言有多种途径实现oop，下面使用一种比较接近c++的方式实现。在具体实现之前，需要了解oop的特性。oop最基本的性质是封装、继承和多态。在类型论里面，继承是derived type，多态是subtype。但是在各语言的实现中，这两者并没有严格的界线。假设A为父类，B为子类，那么最基本的实现需要满足：

- B extends A：B继承或者实现A
- A `<->` B：A与B之前能相互转化
- f(T)：传参T是B的子类，callee可能使用子类，也可能使用B
- 函数传参有下面四类情形：

|                      | callee使用T                                      | callee使用B                                                                                             |
| -------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| caller编译期确认类型 | 编译期结束后T为子类<br />callee直接使用即可      | 编译器结束后T为子类<br />callee需要把A转化为B再使用<br /><br />编译期结束后T为B<br />callee直接使用即可 |
| caller运行期确认类型 | 编译期结束后T为B<br />callee需要把B转化为A再使用 | 编译期结束后T为B<br />callee直接使用即可                                                                |

## 实现

首先，使用struct表示一个类，使用struct的实例表示一个对象：

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int first;
    int second;
} Parent;

int main() {
    Parent *parent = (Parent *) malloc(sizeof(Parent));
    parent->first = 15;
    parent->second = 30;
    printf("%d %d\n", parent->first, parent->second);
    free(parent);
    return 0;
}
```

其次，需要思考几个问题：

- 属性如何存放

> 属性可以使用字段直接存放在struct里面，也可以使用指针封装再存放在struct里面。由于一般字段是在类实例化成对象的时候初始化，因此直接存放在struct里即可

- 函数如何存放

> 放在struct外面，还是直接存放再struct里面，还是使用指针封装再存放在struct里面。由于一般函数是在类生成时绑定，因此使用指针封装可以节省内存

- 下面需要考虑之前讨论的oop的性质如何实现

> 假设A是父类，B是子类。如果要解决传参的问题，那么需要使用A对应的指针。其次如何表达B继承A，且A与B之间的相互转化。这里可以把A的struct嵌入到B中，也可以把A的属性和函数直接拍平嵌入到B中表达继承。之后可以使用指针的强转表达A与B之前的相互转化

具体如下：

```c
#include <stdio.h>
#include <stdlib.h>

/********** Parent **********/
typedef struct ParentVTable ParentVTable;

typedef struct {
    ParentVTable *vptr;
    int first;
    int second;
} Parent;

void parent_ctor(Parent *self, int first, int second) {
    self->first = first;
    self->second = second;
}

void parent_dtor(Parent *self) {
    free(self);
}

void parent_cprint(Parent *self) {
    printf("Parent{ first: %d, second: %d }\n", self->first, self->second);
}

struct ParentVTable {
    void (*ctor)(Parent *, int, int);
    void (*dtor)(Parent *);
    void (*cprint)(Parent *);
} parent_vtbl = {
    parent_ctor,
    parent_dtor,
    parent_cprint,
};

Parent *parent_new(int first, int second) {
    Parent *self = (Parent *) malloc(sizeof(Parent));
    self->vptr = &parent_vtbl;
    self->vptr->ctor(self, first, second);
    return self;
}

/********** Child1 **********/
typedef struct Child1VTable Child1VTable;

typedef struct {
    Parent super;
    Child1VTable *vptr;
    int third;
} Child1;

void child1_ctor(Child1 *self, int first, int second, int third) {
    Parent *p = (Parent *) self;
    p->vptr->ctor(p, first, second);
    self->third = third;
}

void child1_dtor(Child1 *self) {
    free(self);
}

int child1_add(Child1 *self) {
    Parent *p = (Parent *) self;
    return p->first + p->second + self->third;
}

struct Child1VTable {
    void (*ctor)(Child1 *, int, int, int);
    void (*dtor)(Child1 *);
    int (*add)(Child1 *);
} child1_vtbl = {
    child1_ctor,
    child1_dtor,
    child1_add,
};

Child1 *child1_new(int first, int second, int third) {
    Child1 *self = (Child1 *) malloc(sizeof(Child1));

    Parent *p = (Parent *) self;
    p->vptr = &parent_vtbl;

    self->vptr = &child1_vtbl;
    self->vptr->ctor(self, first, second, third);
    return self;
}

/********** Child2 **********/
typedef struct Child2VTable Child2VTable;

typedef struct {
    Parent super;
    Child2VTable *vptr;
    int forth;
} Child2;

void child2_print(Parent *self) {
    Child2 *c2 = (Child2 *) self;
    printf("Child2{ first: %d, second: %d, forth: %d }\n", self->first, self->second, c2->forth);
}

ParentVTable parent_child2_vtbl = {
        parent_ctor,
        parent_dtor,
        child2_print,
};

void child2_ctor(Child2 *self, int first, int second, int forth) {
    Parent *p = (Parent *) self;
    p->vptr->ctor(p, first, second);
    self->forth = forth;
}

void child2_dtor(Child2 *self) {
    free(self);
}

int child2_add(Child2 *self) {
    Parent *p = (Parent *) self;
    return p->first + p->second + self->forth;
}

struct Child2VTable {
    void (*ctor)(Child2 *, int, int, int);
    void (*dtor)(Child2 *);
    int (*add)(Child2 *);
} child2_vtbl = {
    child2_ctor,
    child2_dtor,
    child2_add,
};

Child2 *child2_new(int first, int second, int forth) {
    Child2 *self = (Child2 *) malloc(sizeof(Child2));

    Parent *p = (Parent *) self;
    p->vptr = &parent_child2_vtbl;

    self->vptr = &child2_vtbl;
    self->vptr->ctor(self, first, second, forth);
    return self;
}

int main() {
    Parent *p;
    p = parent_new(1, 2);
    p->vptr->cprint(p);
    p->vptr->dtor(p);

    Child1 *c1 = child1_new(3, 4, 5);
    printf("c1 add %d\n", c1->vptr->add(c1));
    p = (Parent *) c1;
    p->vptr->cprint(p);
    c1->vptr->dtor(c1);

    Child2 *c2 = child2_new(6, 7, 8);
    printf("c2 add %d\n", c2->vptr->add(c2));
    p = (Parent *) c2;
    p->vptr->cprint(p);
    c2->vptr->dtor(c2);

    return 0;
}
```

## 深入

到目前为止，只是实现了基于c实现了一个简单的oop框架，这个框架和c++的原理类似，但是离实际可用还很遥远。如果要想更加深入，需要考虑以下问题：

- 表达优化：目前的表达是否和主流的oop表达还有差距，是否需要优化表达，比如通过宏等方式，消除冗余
- 旧类型系统 vs 新类型系统：目前的实现主要基于struct，是否需要重新实现类型系统，即c++ vs python
- 静态 vs 动态：目前的实现是静态的，是否需要让类型系统偏动态，即c++ vs python
- 转译 vs 嵌入：目前的实现是嵌入的，是否需要进行转译，即c++ vs objc
