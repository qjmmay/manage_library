<template>
  <div class="container">
  <el-input
    placeholder="请输入借书号.........."
    suffix-icon="el-icon-search"
    v-model="keyWords">
  </el-input><el-button @click="search_book()">搜索</el-button>
    <div style="margin-top: 20px;" v-if="isExit">
      <img :src="require(`../../service/${book.bkCover.replace(/\\/g, '\/')}`)">
    <table align="left" width="100%" border="1" callspacing="0" callpadding="0">
      <tr>
        <td width="100">书籍号：</td>
      <td>{{book.bkCode}}</td>
      </tr>
      <tr>

        <td>书名：</td>

        <td>{{book.bkName}}</td>

      </tr>

      <tr>

        <td>作者：</td>

        <td>{{book.bkAuthor}}</td>

      </tr>
      <tr>
        <td>出版社：</td>
        <td>{{book.bkPress}}</td>
      </tr>
      <tr>
        <td>出版日期：</td>
        <td>{{book.bkDatePress}}</td>
      </tr>
      <tr>

        <td>分类号：</td>

        <td>{{book.bkCatalog}}</td>

      </tr>
      <tr>
        <td>入馆日期：</td>
        <td>{{book. bkDateIn}}</td>
      </tr>
     <tr>

        <td>书籍状态：</td>

        <td>{{book.bkStatus}}</td>

      </tr>

      <tr>

        <td>书籍描述：</td>

        <td>{{book.bkBrief}}</td>

      </tr>
    </table>
      <button @click="lendBook()">确认借阅</button>
    </div>
    <div v-else>{{info}}</div>
  </div>

</template>

<script>
  import App from "../App";
  import date from '../../src/utils/date'
    export default {
        name: "borrowIndex",
        components:{App},
        inject:['reload'],
        data(){
            return{
                isExit:false,
                isSuccess:false,
                keyWords:'',
                info:'',
                CanLendDay:'',
                IdDateRetPlan:'',
               /* lendData:{
                    rdID:'',
                    bkID:'',
                    IdDateOut:'',
                    OperatorLend:'',
                    CanLendDay:'',
                    IdDateRetPlan:'',
                },*/
                book:[{
                    bkID:'',
                    bkCode:'',
                    bkName:'',
                    bkAuthor:'',
                    bkPress:'',
                    bkDatePress:'',
                    bkISBN:'',
                    bkCatalog:'',
                    bkLanguage:'',
                    bkPages:'',
                    bkPrice:'',
                    bkDateIn:'',
                    bkBrief:'',
                    bkCover:'',
                    bkStatus:''
                }],
                multipleSelection: []
            }
        },
        methods:{
            //计算另一个日期

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            lendBook(){
                //借书日期
                let dateLend=date.getDate()
                    let rdID=sessionStorage.getItem('lendRdID')
                console.log('读者id'+rdID)
              let OperatorLend=sessionStorage.getItem('rdName')
                let lendData={
                    rdID:rdID,
                    bkID:this.book.bkID,
                    IdDateOut:dateLend,
                    OperatorLend:OperatorLend,
                    CanLendDay:this.CanLendDay,
                    IdDateRetPlan:sessionStorage.getItem('IdDateRetPlan')
                }
              console.log('应还日期'+ lendData.IdDateRetPlan)
                console.log('lendData'+lendData.bkID)
                this.$http.post('/api/user/userInfo',{rdID:rdID},{}).then((response)=>{
                    if(response.status===200){
                        let rdType=response.data[0].rdType
                        console.log('读者类型'+rdType)
                        this.$http.post('/api/user/readerType',{rdType:rdType},{}).then((response)=>{
                            if(response.status===200){
                                this.CanLendDay=response.data[0].CanLendDay
                                console.log( '读者类型可借天数'+this.CanLendDay)
                                //借书日期
                                console.log('借书时间'+dateLend)
                                this.IdDateRetPlan=date.Confirm(dateLend,this.CanLendDay)
                                sessionStorage.setItem('IdDateRetPlan',this.IdDateRetPlan)
                            }
                        })
                    }
                })
                console.log('lendData'+lendData)
              this.$http.post('/api/admin/addBorrow',lendData,{}).then((response)=>{
                  if(response){
                      if(response.status===200) {
                          console.log('借书完成')
                          this.$http.post('/api/admin/getBook',{bkID:this.book.bkID},{}).then((response)=>{
                              if(response){
                                  console.log('修改书数量')
                                  if(response.status===200){
                                      let bkQuantity=response.data[0].bkQuantity-1
                                      let bkid=response.data[0].bkID
                                      console.log('书剩余数量'+bkQuantity)
                                      this.$http.post('/api/admin/bookQuantity',{bkQuantity:bkQuantity,bkID:bkid},{}).then((response)=>{
                                          if(response.status===200){
                                              console.log('图书数量更新成功')
                                          }
                                      })
                                  }
                              }
                          })
                          this.$http.post('/api/user/userInfo',{rdID:rdID}).then((response)=>{
                              if(response){
                                  if(response.status===200){
                                      console.log('修改借书数量')
                                      let rdBorrowQty=response.data[0].rdBorrowQty+1
                                      let rdID=response.data[0].rdID
                                      console.log('已借数量'+rdBorrowQty)
                                      this.$http.post('/api/user/userQuantity',{rdBorrowQty:rdBorrowQty,rdID:rdID},{}).then((response)=>{
                                          if(response.status===200){
                                              console.log('图书数量更新成功')
                                          }
                                      })
                                  }
                              }
                          })
                          this.$message({
                              message:'借书完成,可以继续借书',
                              type:'success'
                          })
                          this.reload()
                      }
                  }
              })
            },
              search_book() {
                  let self=this
                  console.log(this.keyWords)
                  this.$http.post('/api/admin/book', {bkCode: this.keyWords}, {}).then((response) => {
                      console.log(response);
                      if (response.data === -1) {
                          this.isSuccess=true
                          console.log('没有此本书');
                          this.$message({
                              message: '没有这本书，请重新输入书籍号',
                              type: "success"
                          })
                      } else if (response.status === 200) {
                              console.log('查找成功');
                              self.book = response.data[0];
                              console.log(self.book)
                              let result = response.data[0];
                          if(result.bkStatus=='在馆') {
                              console.log('书籍数量'+result.bkQuantity)
                              if(result.bkQuantity>0)
                              {
                                  this.isExit = true
                                  self.book.bkID = result.bkID;
                                  self.book.bkCode = result.bkCode;
                                  self.book.bkName = result.bkName;
                                  self.book.bkAuthor = result.bkAuthor;
                                  self.book.bkPress = result.bkPress;
                                  self.book.bkDatePress = result.bkDatePress;
                                  self.book.bkISBN = result.bkISBN;
                                  self.book.bkCatalog = result.bkCatalog;
                                  self.book.bkLanguage = result.bkLanguage;
                                  self.book.bkPages = result.bkPages;
                                  self.book.bkPrice = result.bkPrice;
                                  self.book.bkDateIn = JSON.stringify(result.bkDateIn);
                                  self.book.bkBrief = result.bkBrief;
                                  self.book.bkCover = result.bkCover;
                                  self.book.bkStatus = result.bkStatus;
                              }
                              else{
                                  this.info='书的数量不够，不可借'
                              }
                          }else{
                              this.info='图书已被借出，不可借'
                          }
                      }
                  })
              },
         },
      mounted() {
         /* console.log('计算后的日期为')
         getNewData(2000-1-10,30)*/
      }
    }
</script>

<style scoped>
  .container{

    width: 600px;

    margin: 0 auto;

    font-size: 16px;

    padding-top: 6%;

  }
</style>
