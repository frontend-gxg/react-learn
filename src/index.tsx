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
  { title: "云南2022-08-31", path: "blog007" },
];

console.log("==============", process.env.PUBLIC_URL);

const router = createHashRouter([
  {
    path: "/",
    element: <Home links={links} />
  },
  {
    path: "/:path",
    element: <MarkdownWrapper />
  },
  // {
  //   element: <div>Hello World</div>
  // }
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
