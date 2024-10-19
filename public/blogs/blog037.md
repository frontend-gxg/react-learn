## 介绍

在过年的最后一天，打开了github，看到了contribution graph上的庆祝动画，如下：

![img](https://github.com/frontend-gxg/pic_bed/blob/main/031.png?raw=true)

## 运行JS脚本

这段动画对应的脚本在[这里（不保证长期有效）](https://github.githubassets.com/assets/chunk-app_components_profiles_contribution-graph-celebration-element_ts-f840bde3afd8.js)，把这段脚本格式化一下，整理一下，翻译一下，就成了这样。其中这段代码在浏览器里是可以运行的：

- 打开chrome，进入github的个人页面
- F12进入开发这模式
- 选择console，复制这段代码
- 输入**cgc.toggleIsPlaying()**，然后再输入38次**cgc.handleAnimationStep()**，就可以在contribution graph中看完这段动画了：

![img](https://github.com/frontend-gxg/pic_bed/blob/main/032.png?raw=true)

## 翻译JS脚本

- 这个动画运行在一个126 * 33的二维画布上，参见[L1](https://github.com/gaoxinge/something/blob/48a08253c1de318f2b8e2bffb9677fe3752f68a1/zhihu/github%20contribution%20graph%20celebration/1.js#L1)
- 整个动画一共38帧，对应一个长度为38的数组，参见[L2-L41](https://github.com/gaoxinge/something/blob/48a08253c1de318f2b8e2bffb9677fe3752f68a1/zhihu/github%20contribution%20graph%20celebration/1.js#L2-L41)
- 数组的每一个元素又由三个元素组成：第一个元素表示第二个元素在画布中的开始位置（126 * 33的一维数组）；第二个元素表示画布中的方格的颜色（1，2，4表示颜色深浅）；第三个元素表示这一帧到下一帧的时间间隔，参见[L2-L41](https://github.com/gaoxinge/something/blob/48a08253c1de318f2b8e2bffb9677fe3752f68a1/zhihu/github%20contribution%20graph%20celebration/1.js#L2-L41)
- 动画的主要逻辑位[L174-L204](https://github.com/gaoxinge/something/blob/48a08253c1de318f2b8e2bffb9677fe3752f68a1/zhihu/github%20contribution%20graph%20celebration/1.js#L174-L204)，可以看出每次运行**handleAnimationStep**函数，**frameIndex**都会加一

## python脚本

JS脚本中的**handleAnimationStep**不仅要考虑坐标的转换，还要考虑颜色的深浅，所以看起来代码比较复杂。下面我们把这个代码翻译成[python版本](https://github.com/gaoxinge/something/blob/master/zhihu/github%20contribution%20graph%20celebration/2.py)，因为做了简化，所以看起来要简单很多。

运行最后一帧：

```python
ps = convert2(convert1(generate(g[37])))
print(ps)
```

输出效果如下：

```

                                                                                                                              
                                                                                                                              
                                                                                                                              
                                                                                                                              
                                                                                                                              
                                                            ********                                                          
                                                          ************                                                        
                                                         **************                                                       
                                                       *****************                                                      
                                                       ******************                                                     
                                                      *****  ******  *****                                                    
                                                      *****          ******                                                   
                                                     ******          ******                                                   
                                                     *****            *****                                                   
                                                    ******            ******                                                  
                                                    ******            ******                                                  
                                                    ******            ******                                                  
                                                     *****            *****                                                   
                                                     *****            *****                                                   
                                                     ******          ******                                                   
                                                     ***  **        *******                                                   
                                                      **** ***    ********                                                    
                                                      **** ***    *******                                                     
                                                       ****       *******                                                     
                                                        ***       ******                                                      
                                                          ****    ****                                                        
                                                           ***    ***                                                         
                                                                                                                              
                                                                                                                              
                                                                                                                              
                                                                                                                              
                                                                                                                              
```

