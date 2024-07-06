import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from "react-router-dom";
import { all, createStarryNight } from '@wooorm/starry-night';
import Home from './components/Home';
import MarkdownWrapper from './components/MarkdownWrapper';

const links = [
  { title: "测试markdown渲染效果", path: "blog000" },
  { title: "测试latex渲染效果", path: "blog001" },
  { title: "openraft开发记录", path: "blog002" },
  { title: "databend开发记录", path: "blog003" },
  { title: "matrixorigin开发记录", path: "blog004" },
  { title: "arana开发记录", path: "blog005" },
  { title: "dask-sql开发记录", path: "blog006" },
  { title: "数据", path: "blog017" },
  { title: "货币政策与净出口的一些思考", path: "blog009" },
  { title: "关于政府，企业和个人模型", path: "blog010" },
  { title: "置身事外", path: "blog011" },
  { title: "证券分析、聪明的投资者", path: "blog012" },
  { title: "财务自由表", path: "blog013" },
  { title: "个人所得税", path: "blog014" },
  { title: "内卷", path: "blog018" },
  { title: "买房", path: "blog021" },
  { title: "验房", path: "blog019" },
  { title: "收房", path: "blog020" },
  { title: "电影", path: "blog015" },
  { title: "游戏", path: "blog016" },
  { title: "德扑", path: "blog008" },
  { title: "云南2022-08-31", path: "blog007" },
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

createStarryNight(all).then(  
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
