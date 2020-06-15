<template>
<div>
  <div>
    <h2>还&nbsp;书&nbsp;管&nbsp;理</h2>
    <el-input
      placeholder="请输入读者的借书证号......................"
      suffix-icon="el-icon-search"
      v-model="keyWords">
    </el-input><el-button @click="findReader()" size="large">查询读者</el-button>
  </div>
  <Divider />
  <div v-if="CanReturn">
    <el-input
      placeholder="请输入要还的书籍号......................"
      suffix-icon="el-icon-search"
      v-model="keyBook">
    </el-input><el-button @click="findBook()" size="large">查询书籍</el-button>
  </div>
</div>
</template>

<script>
  import App from "../App";
  import date from '../../src/utils/date'
    export default {
        name: "returnBook",
        components:{App},
        inject:['reload'],
        data(){
            return{
                keyWords:'',
                bkID:'',
                keyBook:'',
                CanReturn:false,
                IdOverDay:'',
                IdOverMoney:0,
                returnDate:{
                    BorrowID:'',
                    IdDateRetAct:date.getDate(),
                    IsHasReturn:'已归还',
                    OperatorRet:sessionStorage.getItem('rdName'),
                    IdOverDay:'',
                    IdOverMoney:'',
                    IdPunishMoney:'',
                }
            }
        },
        methods:{
           findReader(){
                this.$http.post('/api/admin/borrowRd',{rdID:this.keyWords},{}).then((response)=>{
                    console.log(response)
                    if(response.data==='-1'){
                        this.$message({
                            message:'该读者没有借书',
                            type:'success'
                        })
                    }
                    else if(response.status===200){
                        console.log('借阅者查找成功')
                      this.$message({
                          message:'请继续输入读者要还的书籍号',
                          type:"success"
                      })
                       this.CanReturn=true
                    }
                })
            },
            findBook(){
                this.$http.post('/api/admin/book',{bkCode:this.keyBook},{}).then((response)=>{
                    console.log(response)
                    if(response.data==='-1'){
                        this.$message({
                            message:'不存在这本书',
                            type:'success'
                        })
                    }
                    else if(response.status===200){
                        let bkID=response.data[0].bkID;
                        console.log('读书编号'+bkID)
                        this.$http.post('/api/admin/bkID',{bkID:bkID},{}).then((response)=>{
                            console.log('bkID'+response.data[0].bkID)
                            if(response.data=='-1'){
                                this.$message({
                                    message:'读者没有借这本书',
                                    type:"success"
                                })
                            }
                            else if(response.status===200){
                                if(response.data[0].bkID){
                                    this.$message({
                                        message:'读者正在借这本书',
                                        type:'success'
                                    })
                                    let rdID=response.data[0].rdID
                                  console.log('实际还书时间'+date.getDate())
                                    console.log('应还书时间'+response.data[0].IdDateRetPlan)
                                    console.log('实际还书和应还书相差的天数'+date.GetNumberOfDays(date.getDate(),response.data[0].IdDateRetPlan))
                                    let lendDays=date.GetNumberOfDays(date.getDate(),response.data[0].IdDateRetPlan)
                                   this.returnDate.BorrowID=response.data[0].BorrowID
                                    if(lendDays>0){
                                        console.log('未超期')
                                        this.returnDate.IdOverDay=0;
                                        this.returnDate.IdOverMoney=0;
                                        this.returnDate.IdPunishMoney=0;
                                    }
                                    else{
                                        console.log('超期')
                                        this.returnDate.IdOverDay=Math.abs(lendDays)
                                        console.log('超期天数'+this.returnDate.IdOverDay)
                                        console.log('查询读者类型bkID'+rdID)
                                        this.$http.post('/api/user/userInfo',{rdID:rdID},{}).then((response)=>{
                                            if(response.status==200){

                                                console.log('读者类型'+response.data[0].rdType)
                                                this.$http.post('/api/user/readerType',{rdType:response.data[0].rdType},{}).then((response)=>{
                                                    if(response.status==200) {
                                                        console.log('处罚率：' + response.data[0].PunishRate)
                                                        this.returnDate.IdOverMoney=this.returnDate.IdOverDay*response.data[0].PunishRate
                                                        this.returnDate.IdPunishMoney=this.returnDate.IdOverMoney
                                                        console.log('罚金为'+this.returnDate.IdOverMoney)
                                                        alert('你借的书籍已超期，请交罚金'+this.returnDate.IdOverMoney)
                                                    }
                                                    else{
                                                        this.$message({
                                                            message:'有误',
                                                            type:"success"
                                                        })
                                                    }
                                                })
                                            }
                                            else{
                                                this.$message({
                                                    message:'有误',
                                                    type:"success"
                                                })
                                            }
                                        })
                                    }
                                    this.$Modal.confirm({
                                        title: '归还这本书',
                                        content: '<p>确定要归还此本书?</p>',
                                        onOk: () => {
                                            console.log(this.returnDate)
                                            this.$http.post('/api/admin/returnLend', this.returnDate, {}).then((response) => {
                                                if (response.status === 200) {
                                                    console.log('归还成功');
                                                    this.$message({
                                                        message: '管理员您已将此此书还了~~',
                                                        type: 'success'
                                                    });
                                                }
                                            })
                                            this.reload()
                                        },
                                        onCancel: () => {
                                            this.$message.info('Clicked cancel');
                                        }
                                    })
                                }
                            }
                        })
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>
