//测试用 API 示例
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');


// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {

  if (typeof ret === 'undefined') {
    res.send('err');
  } else {
    console.log(ret);
    res.send(ret);
  }
};
var dateStr = function(str) {
  return new Date(str.slice(0,7));
}
//查找读者类别
router.post('/readerType',(req, res) => {
  var sql_type = $sql.readerType.select_type;
  var params = req.body;
  console.log(params);
  if (params.rdType) {
    sql_type += " where rdType ='"+ params.rdType +"'";
  }
  conn.query(sql_type,params.rdType,function(err,result){
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      console.log('查找失败');
      res.send('-1')   //查询不出读者类别，data 返回-1
    }
    else{
      console.log('查找成功');
      console.log(result)
      jsonWrite(res,result);
    }
  })
});
//添加读者类型
router.post('/addRdType', (req, res) => {
  let sql = $sql.readerType.add_type
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.rdType, params.rdTypeName,params.CanLendQty,params.CanLendDay,params.CanContinueTimes,params.PunishRate,params.DateValid], function(err, result) {
    if (err) {
      console.log("添加失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
//删除读者类别
router.post('/deleteRdType',(req, res) => {
  var sql_name = $sql.readerType.delete_type
  var params = req.body;
  console.log(params.rdType);
  if (params.rdType) {
    sql_name += " where rdType ='"+ params.rdType +"'";
  }
  conn.query(sql_name, params.rdType, function(err, result) {
    if (err) {
      console.log(err);
    }else {
      console.log('删除成功');
      jsonWrite(res, result);
    }
  })
});
//更新读者类别
router.post('/updateType',(req,res)=>{
  var sql_type=$sql.readerType.update_type
  var params=req.body;
  console.log('传过来的参数'+params.rdType);
  if(params.rdType) {
    sql_type  +=
      " rdTypeName= '" + params.rdTypeName +
      "',CanLendQty = '" + params.CanLendQty +
      "',CanLendDay = '" + params.CanLendDay +
      "',CanContinueTimes = '" + params.CanContinueTimes +
      "',PunishRate = '" + params.PunishRate +
      "',DateValid = '" + params.DateValid +
      "' where rdType ='"+ params.rdType + "'";

  }
  conn.query(sql_type,params.rdType,function (err,result) {
    if(err){
      console.log(err);
    }
    console.log(result);
    if(result.affectedRows===undefined){
      res.send('更新失败，请联系管理员');
    }
    else{
      res.send('OK');
    }
  })
});

//修改用户密码
router.post('/modifyPassword',(req,res)=>{
  var sql_modify=$sql.user.update_user;
  var params=req.body;
  console.log(params);
  if(params.rdID){
    sql_modify+=" rdPWd = '" + params.password +
      "' where rdID ='"+ params.rdID + "'";
  }
  conn.query(sql_modify,params.rdID,function(err,result){
    if(err){
      console.log(err);
    }
    if(result.affectedRows===undefined){
      res.send('修改密码失败，请联系管理员');
    }
    else{
      res.send('OK');
    }
  })
});

//用户登录
router.post('/login', (req, res) => {
  var sql_name = $sql.user.select_name;
  var params = req.body;
  console.log(params);
  if (params.rdID) {
    sql_name += " where rdID ='"+ params.rdID +"'";
  }
  conn.query(sql_name, params.rdID, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      console.log('查找失败')
      res.send('1')//查询不出username，data 返回-1
    } else {
      var resultArray = result[0];
      if(resultArray.rdPwd=== params.password) {
        console.log(params.password);
        jsonWrite(res, result);
      } else {
        res.send('0')   //username
      }
    }
  })
});
//获取用户信息
router.post('/userInfo',(req, res) => {
  var sql_name = $sql.user.select_name;
  var params = req.body;
  console.log(params);
  console.log(params.rdID)
  if (params.rdID) {
    sql_name += " where rdID ='"+ params.rdID +"'";
  }
  conn.query(sql_name,params.rdID,function(err,result){
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      console.log('查找失败');
      res.send('-1')   //查询不出username，data 返回-1
    }
    else{
      console.log('查找成功');
      console.log(result)
      jsonWrite(res,result);
    }
  })
});
//更新用户数量
router.post('/userQuantity',(req,res)=>{
  var sql_user=$sql.user.update_user
  var params=req.body;
  console.log('传过来的参数'+params.rdID);
  if(params.rdBorrowQty) {
    sql_user  +=
      " rdBorrowQty= '" + params.rdBorrowQty +
      "' where rdID ='"+ params.rdID + "'";

  }
  conn.query(sql_user,params.rdID,function (err,result) {
    if(err){
      console.log(err);
    }
    console.log(result);
    if(result.affectedRows===undefined){
      res.send('更新失败，请联系管理员');
    }
    else{
      res.send('OK');
    }
  })
});
//更新用户信息
router.post('/UpdateUser',(req,res)=>{
  var sql_user=$sql.user.update_user
  var params=req.body;
  console.log('传过来的参数'+params.rdID);
  if(params.rdID) {
    sql_user  +=
      " rdID= '" + params.rdID +
      "',rdName = '" + params.rdName +
      "',rdSex = '" + params.rdSex +
      "',rdType = '" + params.rdType +
      "',rdDept = '" + params.rdDept +
      "',rdPhone = '" + params.rdPhone +
      "',rdEmail = '" + params.rdEmail +
      "',rdDateReg = '" + params.rdDateReg +
      "',rdStatus = '" + params.rdStatus +
      "',rdBorrowQty = '" + params.rdBorrowQty +
      "',rdAdminRoles = '" + params.rdAdminRoles +
      "' where rdID ='"+ params.rdID + "'";

  }
  console.log(sql_user)
  conn.query(sql_user,params.rdID,function (err,result) {
    if(err){
      console.log(err);
    }
    console.log(result);
    if(result.affectedRows===undefined){
      res.send('更新失败，请联系管理员');
    }
    else{
      res.send('OK');
    }
  })
});
//借阅
//查询读者信息
router.post('/searchUser',(req, res) => {
  var sql_search = $sql.user.search_user
  var params = req.body;
  console.log(params.search);
  if (params.search) {
    sql_search+='"%'+params.search+'%"'
  }
  /*console.log(sql_search)*/
  conn.query(sql_search,params.search,function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      console.log('查找失败');
      res.send('-1')   //查询不出商品，data 返回-1
    }
    else{
      console.log('查找成功');
      jsonWrite(res,result);
    }
  })
});
module.exports = router;
