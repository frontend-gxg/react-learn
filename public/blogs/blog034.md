视频相关的知识主要分为以下几部分：

- 基本格式
- 制作 & 播放
- 视频传输：流媒体
- 视频通信：WebRTC

参考：

- [About A hands-on introduction to video technology](https://github.com/leandromoreira/digital_video_introduction/blob/master/README-cn.md)
- [音视频学习](https://github.com/gongluck/AnalysisAVP)
- [音视频流媒体权威资料整理](https://github.com/0voice/audio_video_streaming)
- [视频播放基本原理](http://www.zhangdongxuan.com/2018/09/01/%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%9F%BA%E6%9C%AC%E5%8E%9F%E7%90%86/)
- [音视频&amp;流媒体的原理以及基础入门知识](https://cloud.tencent.com/developer/article/2121077)

## 基本格式

### 参数

- 码率
  - $\text{视频体积}=\text{码率}\times\text{视频时长}=\frac{\text{分辨率}\times\text{帧率}}{\text{压缩率}}\times\text{视频时长}$
  - 受到带宽影响
- 分辨率
  - [视频直播支持的分辨率和对应合适的码率](https://help.aliyun.com/zh/live/support/what-resolutions-and-bitrates-does-apsaravideo-live-support)
  - 受到设备分辨率影响
- 帧率
  - 视频一般24帧，游戏帧数比视频多
- 压缩率
  - 空间
    - 锐化
  - 时间 
  - AI
    - 超分
    - 补帧

### 参考

- [一文看懂：史上最通俗的视频编码技术详解](https://www.easemob.com/news/3614)
- [视频压缩的原理是什么？为什么能在保证视频质量不变的情况下将视频文件大小缩小几十甚至上百倍？](https://www.zhihu.com/question/384280771)
- [【从零开始】理解视频编解码技术](https://zhuanlan.zhihu.com/p/93398878)
- [视频压缩与编解码的基本原理](https://zhuanlan.zhihu.com/p/67305755)

## 视频传输：流媒体

### hls

#### 参考

- [流媒体协议HLS](https://zhuanlan.zhihu.com/p/355136397)
- [HLS 流媒体网络传输协议](https://tsejx.github.io/javascript-guidebook/computer-networks/computer-network-architecture/hls/)
- [hls.md](https://github.com/CharonChui/AndroidNote/blob/master/VideoDevelopment/%E6%B5%81%E5%AA%92%E4%BD%93%E5%8D%8F%E8%AE%AE/HLS.md)
