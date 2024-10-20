根据两篇文章[相机的对焦是什么意思？为什么需要对焦？](https://www.zhihu.com/question/21427158/answer/340878786)、[带你认识弥散圆，深层次解析光圈、焦距、物距对照片景深的影响](https://zhuanlan.zhihu.com/p/126751320)重新认识了一下虚化的概念，下面用自己的语言重新整理一下。

## 对焦与光圈

![img](https://github.com/frontend-gxg/pic_bed/blob/main/027.png?raw=true)

- 对焦：对焦是调整镜头（主面）和成像平面（景象平面）距离的过程，目的是为了把对焦平面（对准平面）清晰的成像到成像平面上
- 光圈：光圈控制了进光量，光圈系数越大，光圈孔径越小，进光量越小

## 什么是虚化

对焦是把对焦平面清晰的成像到成像平面上，那什么是清晰呢？我们知道从相机外部的一点发射多条光束，在经过镜头之后会汇聚到一点。但是这一点不一定在成像平面上，我们可以对光束进行延伸，这样相机内部的成像不在是一个点，而是一个圆，即人们常说的弥散圆：

![img](https://github.com/frontend-gxg/pic_bed/blob/main/028.jpeg?raw=true)

因此如果弥散圆的半径越小，对应点的成像越清晰，所以严格来说，对焦就是把相机外部目标对象成像的弥散圆收敛到一个点的过程。由于人眼对小范围的弥散有一定的容忍度，因此这个范围内的弥散对应的物平面所在的范围叫做景深：

![img](https://github.com/frontend-gxg/pic_bed/blob/main/029.jpeg?raw=true)

最后回到虚化的概念，虚化就是把物体对用的弥散圆的半径调大，以至于范围超出人眼的容忍度之外的过程

## 怎么虚化

虚化主要有两种方式：
- 路径一：调小光圈系数 -> 扩大光圈孔径 -> 点经过镜头的光束变多 -> 光束到成像面的数量变多 -> 增加了弥散圆的半径
- 路径二：镜头靠近目标物 -> 减小焦距 -> 之前到对焦平面相同距离的背景平面上的点对应的弥散圆半径增大

![img](https://github.com/frontend-gxg/pic_bed/blob/main/030.jpeg?raw=true)