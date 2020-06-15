//sql语句
//SQL 语句映射文件，供 API 调用
var sqlMap = {
  // 用户
  user: {
    select_name: 'select * from tb_reader',
    update_user: 'update tb_reader set',
    delete_user:'delete from tb_reader',
    search_user:'select * from tb_reader where rdID like'
  },
  readerType:{
    add_type:'insert into tb_readerType(rdType,rdTypeName,CanLendQty,canLendDay,CanContinueTimes,PunishRate,DateValid) values(?,?,?,?,?,?,?)',
    select_type:'select * from tb_readerType',
    update_type:'update tb_readerType set',
    delete_type:'delete from tb_readerType'
  },
  book:{
    add:'insert into tb_book(bkID,bkCode,bkName,bkAuthor,bkPress,bkDatePress,bkISBN,bkCatalog,bkLanguage,bkPages,bkPrice,bkQuantity,bkDateIn,bkBrief,bkCover,bkStatus) values(0,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    select_book:'select * from tb_book',
    update_book:'update tb_book set',
    delete_book:'delete from tb_book',
    search_book:'select *from tb_book where bkName like'
  },
  borrow:{
    add:'insert into tb_borrow(BorrowID,rdID,bkID,IdContinueTimes,IdDateOut,IdDateRetPlan,IdDateRetAct,IdOverDay,IdOverMoney,IdPunishMoney,isHasReturn,OperatorLend,OperatorRet) values(0,?,?,?,?,?,?,?,?,?,?,?,?)',
    select_borrow:'select * from tb_borrow',
    update_borrow:'update tb_borrow set',
    delete_borrow:'delete from tb_borrow',
    lend:'select * from `tb_reader` as r,`tb_borrow` as b WHERE r.rdID=b.rdID and r.rdID='
  }
}
module.exports = sqlMap;
