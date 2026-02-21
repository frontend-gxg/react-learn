import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from "react-router-dom";
import { common, createStarryNight } from '@wooorm/starry-night';
import Home from './components/Home';
import MarkdownWrapper from './components/MarkdownWrapper';

const links = [
  { title: "测试markdown渲染效果", path: "blog000" },
  { title: "测试latex渲染效果", path: "blog001" },
  { title: "方向", path: "blog058" },
  { title: "openraft开发记录", path: "blog002" },
  { title: "databend开发记录", path: "blog003" },
  { title: "matrixorigin开发记录", path: "blog004" },
  { title: "arana开发记录", path: "blog005" },
  { title: "dask-sql开发记录", path: "blog006" },
  { title: "芯片", path: "blog051" },
  { title: "os", path: "blog047" },
  { title: "x86调用惯例的一些笔记", path: "blog044" },
  { title: "c实现c++的oop", path: "blog032" },
  { title: "CppTemplateTutorial：2", path: "blog042" },
  { title: "CppTemplateTutorial：3.1", path: "blog041" },
  { title: "windows上安装rust", path: "blog040" },
  { title: "rust: trait", path: "blog039" },
  { title: "rust: macro", path: "blog038" },
  { title: "go benchmark只运行一次", path: "blog043" },
  { title: "python中的immutable", path: "blog045" },
  { title: "python web框架", path: "blog026" },
  { title: "视频原理", path: "blog034" },
  { title: "GITHUB庆祝1亿开发者的动画脚本", path: "blog037" },
  { title: "压缩理论", path: "blog056" },
  { title: "时间规划", path: "blog030" },
  { title: "习惯", path: "blog057" },
  { title: "输出", path: "blog028" },
  { title: "性爱", path: "blog062" },
  { title: "资料", path: "blog017" },
  { title: "货币政策与净出口的一些思考", path: "blog009" },
  { title: "关于政府，企业和个人模型", path: "blog010" },
  { title: "置身事外", path: "blog011" },
  { title: "证券分析、聪明的投资者", path: "blog012" },
  { title: "财务自由表", path: "blog013" },
  { title: "个人所得税", path: "blog014" },
  { title: "股票", path: "blog049" },
  { title: "黄金", path: "blog055" },
  { title: "内卷", path: "blog018" },
  { title: "决策", path: "blog061" },
  { title: "互联网", path: "blog046" },
  { title: "汽车分类", path: "blog024" },
  { title: "购车", path: "blog027" },
  { title: "居住证", path: "blog052" },
  { title: "买房", path: "blog021" },
  { title: "验房", path: "blog019" },
  { title: "收房", path: "blog020" },
  { title: "装修", path: "blog023" },
  { title: "摄影学基础", path: "blog035" },
  { title: "什么是虚化", path: "blog036" },
  { title: "电影", path: "blog015" },
  { title: "游戏", path: "blog016" },
  { title: "电视", path: "blog048" },
  { title: "switch", path: "blog029" },
  { title: "steam", path: "blog053" },
  { title: "德扑", path: "blog008" },
  { title: "观后感", path: "blog031" },
  { title: "眼镜", path: "blog054" },
  { title: "世界旅游", path: "blog022" }, 
  { title: "中国", path: "blog060" },
  { title: "日本", path: "blog050" },
  { title: "极圈", path: "blog033" },
  { title: "云南20220831", path: "blog007" },
  { title: "普吉岛20240906", path: "blog025" },
];

const router = createHashRouter([
  {
    path: "/",
    element: <Home links={links} />
  },
  {
    path: "/:path",
    element: <MarkdownWrapper />
  }
]);

createStarryNight(common).then(  
  function (starryNight) {
    const missing = starryNight.missingScopes();
    if (missing.length > 0) {
      throw new Error('Missing scopes: `' + missing + '`');
    }
  }
);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
