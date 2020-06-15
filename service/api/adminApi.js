//测试用 API 示例
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

var fs = require('fs');
var multer=require('multer')


// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();


// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 接收到文件后输出的保存路径（若不存在则需要创建）
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// 创建文件夹
var createFolder = function(folder){
  try{
    // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
    // 如果文件路径不存在将会抛出错误"no such file or directory"
    fs.accessSync(folder);
  }catch(e){
    // 文件夹不存在，以同步的方式创建文件目录。
    fs.mkdirSync(folder);
  }
};

var uploadFolder = './upload/';
createFolder(uploadFolder);

// 创建 multer 对象
var upload = multer({ storage: storage });


var jsonWrite = function(res, ret) {

  if (typeof ret === 'undefined') {
    res.send('err');
  } else {
    console.log(ret);
    res.send(ret);
  }
};



//查询所有商品
router.post('/getBook',(req, res) => {
  var sql_name = $sql.book.select_book;
  var params = req.body;
  console.log(params);
  console.log('图书编号'+params.bkID)
  if (params.bkID) {
    sql_name += " where bkID ='"+ params.bkID +"'";
  }
  conn.query(sql_name, params.bkID, function(err, result) {
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

//
router.post('/book',(req, res) => {
  var sql_name = $sql.book.select_book;
  var params = req.body;
  if (params.bkCode) {
    sql_name += " where bkCode ='"+ params.bkCode +"'";
  }
  conn.query(sql_name, params.bkCode, function(err, result) {
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

//借出记录
router.post('/addBorrow', (req, res) => {
  let sql = $sql.borrow.add
  let params = req.body;
 console.log('传过来的参数'+params)
  /*续借次数*/
  let time=0
  conn.query(sql, [params.rdID, params.bkID,time,params.IdDateOut,params.IdDateRetPlan,0,0,0,0,0,params.OperatorLend,'无'], function(err, result) {
    if (err) {
      console.log("添加失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
//对已还的借阅表进行更改
router.post('/returnLend',(req, res) => {
  var sql_name = $sql.borrow.update_borrow;
  var params = req.body;
  if (params.BorrowID) {
    sql_name +=
      " IdDateRetAct= '" + params.IdDateRetAct +
      "', IdOverDay= '" + params.IdOverDay +
      "',IdOverMoney = '" + params.IdOverMoney +
      "', IdPunishMoney = '" + params. IdPunishMoney +
      "',IsHasReturn = '" + params.IsHasReturn +
      "',OperatorRet = '" + params.OperatorRet +
      "' where BorrowID ='"+ params.BorrowID + "'";
  }
  console.log(sql_name)
  conn.query(sql_name,params. BorrowID,function (err,result) {
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
//续借
router.post('/continueLend',(req, res) => {
  var sql_name = $sql.borrow.update_borrow;
  var params = req.body;
  if (params.BorrowID) {
    sql_name +=
      " IdContinueTimes= '" + params.IdContinueTimes +
      "', IdDateOut= '" + params.IdDateOut +
      "',IdDateRetPlan= '" + params.IdDateRetPlan +
      "' where BorrowID ='"+ params.BorrowID + "'";
  }
  conn.query(sql_name,params. BorrowID,function (err,result) {
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

//查询读者借的书
router.post('/lendBook',(req, res) => {
  var sql_lend = $sql.borrow.lend
  var params = req.body;
  if (params.bkCode) {
    sql_lend +=params.bkCode
  }
  console.log('sql语句'+sql_lend)
  conn.query(sql_lend, params.bkCode, function(err, result) {
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
//查询借出表的读者
router.post('/borrowRd',(req, res) => {
  var sql_name = $sql.borrow.select_borrow
  var params = req.body;
  console.log(params);
  console.log('借者编号'+params.rdID)
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

//根据书籍编号查询借书情况，并得出读者
router.post('/bkID',(req,res)=>{
  let sql_bkID=$sql.borrow.select_borrow
  let params=req.body
  if(params.bkID){
    sql_bkID+=" where bkID ='"+ params.bkID +"'";
  }
  conn.query(sql_bkID,params.bkID,function (err,result) {
    if (err) {
      console.log("添加失败"+err);
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
})

//根据书籍号查询得出书籍编号
router.post('/bkCode',(req,res)=>{
  let sql_bkCode=$sql.book.search_book
  let params=req.body
  if(params.bkCode){
    sql_bkCode+=" where bkCode ='"+ params.bkCode +"'";
  }
  conn.query(sql_bkCode,params.bkCode,function (err,result) {
    if (err) {
      console.log("添加失败"+err);
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
})

//删除借书记录
router.post('/deleteRecord',(req, res) => {
  var sql_delete = $sql.borrow.delete_borrow
  var params = req.body;
  console.log(params);
  console.log(params.bkID);
  if (params.bkID) {
    sql_delete += " where bkID ='"+ params.bkID +"'";
  }
  conn.query(sql_delete, params.bkID, function(err, result) {
    if (err) {
      console.log(err);
    }else {
      console.log('删除成功');
      jsonWrite(res, result);
    }
  })
});


//模糊查询
router.post('/searchBook',(req, res) => {
  var sql_search = $sql.book.search_book
  var params = req.body;
  console.log(params.search);
 if (params.search) {
   sql_search+='"%'+params.search+'%" OR bkAuthor like "%'+params.search+'%"'
  }
 console.log(sql_search)
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
//管理员删除商品信息
router.post('/deleteBook',(req, res) => {
  var sql_name = $sql.book.delete_book;
  var params = req.body;
  console.log(params);
  console.log(params.bkID);
  if (params.bkID) {
    sql_name += " where bkID ='"+ params.bkID +"'";
  }
  conn.query(sql_name, params.bkID, function(err, result) {
    if (err) {
      console.log(err);
    }else {
      console.log('删除成功');
      jsonWrite(res, result);
    }
  })
});
//更新书籍数量
router.post('/bookQuantity',(req,res)=>{
  var sql_update=$sql.book.update_book
  var params=req.body;
  console.log('书籍数量'+params.bkQuantity);
  if(params.bkQuantity>0) {
    sql_update  +=
      " bkQuantity= '" + params.bkQuantity +

      "' where bkID ='"+ params.bkID + "'";

  }
  else{
    let bkStatus='借出'
    sql_update+=
      " bkQuantity= '" + params.bkQuantity +
      "', bkStatus= '" + bkStatus +
      "' where bkID ='"+ params.bkID + "'";
  }
  conn.query(sql_update,params.bkID,function (err,result) {
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
//更新图书信息
router.post('/updateBook',(req,res)=>{
  var sql_update=$sql.book.update_book
  var params=req.body;
  console.log(params);
  if(params.bkID) {
    sql_update  +=
      " bkCode= '" + params.bkCode +
      "', bkName= '" + params.bkName +
      "',bkAuthor = '" + params.bkAuthor +
      "',bkPress = '" + params.bkPress +
      "',bkDatePress = '" + params.bkDatePress +
      "',bkISBN = '" + params.bkISBN +
      "',bkCatalog = '" + params.bkCatalog +
      "',bkLanguage = '" + params.bkLanguage +
      "',bkPages = '" + params.bkPages +
      "',bkPrice = '" + params.bkPrice +
      "',bkQuantity = '" + params.bkQuantity +
      "',bkDateIn = '" + params.bkDateIn +
      "',bkBrief = '" + params.bkBrief +
      "',bkStatus = '" + params.bkStatus +
      "' where bkID ='"+ params.bkID + "'";

  }
  conn.query(sql_update,params.bkID,function (err,result) {
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
//添加书籍
router.post('/addBook', function(req, res) {
 /* var file = req.file;
  var book=req.Books
  console.log('文件保存路径：%s', file.path);
  console.log(book)*/
 let sql = $sql.book.add
  let params = req.body;
  console.log(params);
  let bkStatus='在馆'
  conn.query(sql, [params.bkCode, params.bkName,params.bkAuthor,params.bkPress,params.bkDatePress,params.bkISBN,params.bkCatalog,params.bkLanguage,params.bkPages,params.bkPrice,params.bkQuantity,params.bkDateIn,params.bkBrief,params.bkCover,bkStatus], function(err, result) {
    if (err) {
      console.log("添加失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
//添加图书封面
router.post('/addPicture',  upload.single('file'), function(req, res) {
  var file = req.file;
  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
  res.json({ res_code: '0', name: file.originalname, url: file.path });
});



//用户管理
//删除用户
router.post('/deleteUser',(req, res) => {
  var sql_name = $sql.user.delete_user;
  var params = req.body;
  console.log(params);
  console.log(params.id);
  if (params.id) {
    sql_name += " where rdID ='"+ params.id +"'";
  }
  conn.query(sql_name, params.id, function(err, result) {
    if (err) {
      console.log(err);
    }else {
      console.log('删除成功');
      jsonWrite(res, result);
    }
  })
});
router.post('/editUser',(req,res)=>{
  var sql=$sql.user.select_name;
  var params=req.body;
  console.log(params.id);
  if(params.id){
    sql+="where id='"+params.id+"'";
  }
  conn.query(sql,params.id,function (err,result) {
    if(err){
      console.log(err)
    }
    if(result[0]===undefined){
      console.log('查找失败')
      res.send('-1')
    }else{
      console.log(result[0])
      jsonWrite(res,result)
    }
  })
});

module.exports = router;
