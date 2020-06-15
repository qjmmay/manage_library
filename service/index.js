//express服务器入口文件
const userUrl='./api/userApi';
const adminUrl='./api/adminApi';
const userApi = require(`${userUrl}`);
const adminApi=require(`${adminUrl}`);
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
//获取req.body参数处理，放在api路由前面
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 允许跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


// 后端api路由
app.use('/api/user', userApi);
app.use('/api/admin',adminApi),
// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
