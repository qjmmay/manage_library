<template>
  <div>
  <Header></Header>
    <AdminMenu></AdminMenu>
    <div class="table">
  <el-table
    ref="multipleTable"
    :data="book"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      type="selection"
      width="50">
    </el-table-column>
    <el-table-column
      prop="image"
      label="书籍"
      width="100">
      <template slot-scope="scope"><img v-if="scope.row" :src="require(`../../service/${scope.row.bkCover.replace(/\\/g, '\/')}`)" style="width: 100px;height: 100px;"></template>
    </el-table-column>
    <el-table-column
      label="图书编号"
      width="80">
      <template slot-scope="scope">{{ scope.row.bkCode }}</template>
    </el-table-column>
    <el-table-column
      label="书名"
      width="170">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>作者: {{ scope.row.bkAuthor }}</p>
          <p>出版社: {{ scope.row.bkPress}}</p>
          <p>出版日期: {{ scope.row.bkDatePress }}</p>
          <p>图书分类号: {{ scope.row.bkISBN }}</p>
          <p>页数：{{scope.row.bkPages}}</p>
          <p>语言：{{scope.row.bkLanguage}}</p>
          <el-button slot="reference">{{ scope.row.bkName }}</el-button>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="价格"
      width="70">
      <template slot-scope="scope">{{ scope.row.bkPrice}}</template>
    </el-table-column>
    <el-table-column
      label="数量"
      width="70">
      <template slot-scope="scope">{{ scope.row.bkQuantity}}</template>
    </el-table-column>
    <el-table-column
      label="入馆日期"
      width="90"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.bkDateIn}}</template>
    </el-table-column>
    <el-table-column
      label="内容简介"
      width="200"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.bkBrief}}</template>
    </el-table-column>
    <el-table-column
      label="图书状态"
      width="80"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.bkStatus}}</template>
    </el-table-column>
    <el-table-column
      label="操作"
    >
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          @click="handleBorrow(scope.row.bkID,scope.row.bkQuantity)">借书</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDetail(scope.row.bkID)">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
  </div>
</template>

<script>
  import Header from "../components/Header";
  import AdminMenu from "../components/AdminMenu";
    import date from '../../src/utils/date'
    import App from "../App";
    export default {
        name: "index",
        components:{App,Header,AdminMenu},

        inject:['reload'],
        data(){
            return{
                isReader:false,
                isInfo:'',
                borrowInfo:'',
                canInfo:'',
                canBorrow:false,
                idBorrow:false,
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
                    bkQuantity:'',
                    bkDateIn:'',
                    bkBrief:'',
                    bkCover:'',
                    bkStatus:''
                }],
                detail: [],
                readerType:[],
                rdID:'',
                borrowQty:'',
                 CanLendDay:'',
                readerStatus:'',
                multipleSelection: []
            }
        },
        methods:{
            getALlBooks:function () {

                let self=this;
                self.$http.post('/api/admin/getBook',{},{}).then((response) => {
                    console.log(response);
                    if(response.data==-1){
                        console.log('没有存储任何物品');
                        this.$message({
                            message:'没有存储任何商品',
                            type:"success"
                        })
                    }
                    else if(response.status==200){
                        console.log('查找成功');
                        this.book = response.data;
                        console.log(this.book)
                        let result = response.data;
                        self.book.bkID=result.bkID;
                        self.book.bkCode=result.description;
                        self.book.bkName=result.bkName;
                        self.book.bkAuthor=result.bkAuthor;
                        self.book.bkPress=result.bkPress;
                        self.book.bkDatePress=result.bkDatePress;
                        self.book.bkISBN=result.bkISBN;
                        self.book.bkCatalog=result.bkCatalog;
                        self.book.bkLanguage=result.bkLanguage;
                        self.book.bkPages=result.bkPages;
                        self.book.bkQuantity=result.bkQuantity;
                        self.book.bkPrice=result.bkPrice;
                        self.book.bkDateIn=JSON.stringify(result.bkDateIn);
                        self.book.bkBrief=result.bkBrief;
                        self.book.bkCover=result.bkCover;
                        self.book.bkStatus=result.bkStatus;
                    }
                })
            },
            handleBorrow(bkID,bkQuantity){
                console.log('借书的书籍号参数'+bkID);
              if(bkQuantity<1){
                  this.$message({
                      message:'书的数量不足',
                      type:'success'
                  })
              }
              else {
                  //借书时间为当前系统时间
                  let dateLend = date.getDate()

                  this.$http.post('/api/user/userInfo', {rdID: sessionStorage.getItem("rdID")}, {}).then((response) => {
                      if (response) {
                          if (response.data === '-1') {
                              this.isReader = false
                              this.isInfo = '用户不存在'
                          } else {
                              this.isReader = true
                              this.detail = response.data[0];
                              this.rdID = response.data[0].rdID
                              console.log(response.data[0].rdID)
                              sessionStorage.setItem('lendRdID', response.data[0].rdID)
                              let readerType = response.data[0].rdType;
                              console.log(readerType);
                              console.log('读者已经借的数量' + response.data[0].rdBorrowQty)
                              this.borrowQty = response.data[0].rdBorrowQty
                              this.readerStatus = response.data[0].rdStatus
                              this.$http.post('/api/user/readerType', {rdType: readerType}).then((response) => {
                                  console.log(response)
                                  this.readerType = response.data[0]
                                  this.CanLendDay = response.data[0].CanLendDay
                                  this.IdDateRetPlan=date.Confirm(dateLend, this.CanLendDay)
                                  console.log("还书日期"+this.IdDateRetPlan)
                                 /* sessionStorage.setItem("IdDateRetPlan",this.IdDateRetPlan)*/
                                  var borrowData = {
                                      rdID: sessionStorage.getItem("rdID"),
                                      bkID: bkID,
                                      IdContinueTimes: 0,
                                      IdDateOut: dateLend,
                                      IdDateRetPlan: this.IdDateRetPlan,
                                      OperatorLend: 0
                                  }
                                  if (this.borrowQty < this.readerType.CanLendQty) {
                                      if (this.readerStatus !== '有效') {
                                          this.$message({
                                              message: '身份不可以借，可能失效或者处在挂失状态',
                                              type: 'success'
                                          })
                                          console.log("身份不可以借，可能失效或者处在挂失状态")
                                      } else {
                                          console.log("借书表要插入的数据：" + borrowData);
                                          this.addBorrow(borrowData)
                                      }
                                  } else {
                                      console.log("借阅次数已上限")
                                      this.$message({
                                          message: '借阅次数已上限',
                                          type: 'success'
                                      })
                                  }
                              })
                          }
                      } else {

                      }
                  })
              }
                this.$router.push("/index");
            },
            addBorrow(borrowData){
                console.log('lendData'+borrowData)
                this.$http.post('/api/admin/addBorrow',borrowData,{}).then((response)=>{
                    if(response){
                        if(response.status===200) {
                            console.log('借书完成')
                            console.log("借书完成后得到书的iD"+borrowData.bkID)
                            this.$http.post('/api/admin/getBook',{bkID:borrowData.bkID},{}).then((response)=>{
                                if(response){
                                    console.log('修改书数量')
                                    if(response.status===200){
                                        let bkQuantity=response.data[0].bkQuantity-1
                                       /* let bkStatus=response.data[0].bkStatus*/
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
                            console.log("借书成功后读者id"+sessionStorage.getItem("rdID"))
                            this.$http.post('/api/user/userInfo',{rdID:sessionStorage.getItem("rdID")}).then((response)=>{
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
            handleDetail(bkID){
                console.log('参数' + bkID);
               /* this.$router.push('/BorrowRecord')*/
                this.$router.push({name:'showBook',params:{bkID:bkID}})
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        },
        mounted() {
            this.getALlBooks()
        }
    }
</script>

<style scoped>
.table{
  border:1px solid seagreen;
  margin-left: 150px;
  margin-top: -340px;
}
</style>
