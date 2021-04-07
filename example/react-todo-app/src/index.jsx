/*
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-04-07 16:34:51
 * @LastEditTime: 2021-04-07 20:07:19
 * @Description: 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import List from './Lists';
import reportWebVitals from './reportWebVitals';

const data = [
  {
    title: "开发完成 App.jsx 部分",
    status: true
  }, {
    title: "开发 List.jsx 组件",
    status: true
  }, {
    title: "编写测试用例代码",
    status: false
  }, {
    title: "审计 Javascript 代码",
    status: true
  }, {
    title: "编写文档序言",
    status: true
  }, {
    title: "编写周报",
    status: false
  }
]

ReactDOM.render(
  <React.StrictMode>
    <App />
    <List data={data} />
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
