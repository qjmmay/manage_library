/*function getNewDay(dateTemp, days) {

  var dateTemp = dateTemp.split("-");

  var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式

  var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);

  var rDate = new Date(millSeconds);

  var year = rDate.getFullYear();

  var month = rDate.getMonth() + 1;

  if (month < 10) month = "0" + month;

  var date = rDate.getDate();

  if (date < 10) date = "0" + date;

  return (year + "-" + month + "-" + date);
}*/
var getNewDay={
  /**
   * @return {string}
   */
  Confirm:function (dateTemp,days) {
    var dateTemp = dateTemp.split("-");

    var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式

    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);

    var rDate = new Date(millSeconds);

    var year = rDate.getFullYear();

    var month = rDate.getMonth() + 1;

    if (month < 10) month = "0" + month;

    var date = rDate.getDate();

    if (date < 10) date = "0" + date;
/*console.log(year + "-" + month + "-" + date)*/
   /*return (year + "-" + month + "-" + date);*/
  return (year + "-" + month + "-" + date);
  },
  getDate:function () {
    var d = new Date;
    var year = d.getFullYear();
    var month = (d.getMonth() + 1) >=10? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
    var date = d.getDate() >=10 ? d.getDate() : "0" + d.getDate();
    var tempDate = year + "-" + month + "-" + date;
   return tempDate
  },
  /**
   * @return {number}
   */
  GetNumberOfDays:function(date1,date2){//获得天数
    //date1：开始日期，date2结束日期
    var a1 = Date.parse(new Date(date1));
    var a2 = Date.parse(new Date(date2));
    var day = parseInt((a2-a1)/ (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
    return day
  }

}
export default getNewDay
