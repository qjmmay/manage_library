<template>
  <div>
  <Header></Header>
  <AdminMenu></AdminMenu>
    <div class="table">
  <el-table
    :data="borrowForm"
    style="width: 100%">
    <el-table-column
    label="读书编号"
    width="130">
    <template slot-scope="scope">
      <span style="margin-left: 10px">{{ scope.row.bkID }}</span>
    </template>
  </el-table-column>
    <el-table-column
      label="续借次数"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.IdContinueTimes }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="借书日期"
      width="130">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.IdDateOut }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="最迟还书日期"
      width="130">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.IdDateRetPlan}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="实际还书日期(0表示未还)"
      width="130">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.IdDateRetAct }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="超期未还(/天)"
      width="130">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.IdOverDay }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="处罚金(天/元)"
      width="130">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.IdPunishMoney }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="是否归还（0表示为归还）"
      width="130">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.IsHasReturn}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleReturn(scope.row.bkID)">还书</el-button>

      </template>
    </el-table-column>
  </el-table>
    </div>
  </div>
</template>

<script>
    import Header from "../components/Header";
    import AdminMenu from "../components/AdminMenu";
    import App from "../App";
    import date from '../../src/utils/date'
    export default {
        name: "BorrowRecord",
        components:{App,Header,AdminMenu},
        inject:['reload'],
        data(){
            return{
                borrowForm:{
                    rdName:'张三',
                    bkID:'',
                    IdContinueTimes:'',
                    IdDateOut:'',
                    IdDateRetPlan:'',
                    IdDateRetAct:'',
                    IdOverDay:'',
                    IdPunishMoney:'',
                    IsHasReturn: ''
                },
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
            getBorrow(){
                let rdID=sessionStorage.getItem("rdID")
                console.log("登录人"+rdID)
                this.$http.post('/api/admin/borrowRd',{rdID:rdID},{}).then((response)=>{
                    if(response){
                        if(response.data==='-1'){
                            this.$message({
                                message:'你还没有借书哦，先去借书再看',
                                type:'success'
                            })
                        }
                        else if(response.status===200){
                            console.log("查询成功")
                            this.borrowForm=response.data;
                            let result=response.data;
                            this.borrowForm.bkID=result.bkID
                          console.log(sessionStorage.getItem("rdName"))
                            this.borrowForm.IdContinueTimes=result.IdContinueTimes
                            this.borrowForm.IdDateOut=result.IdDateOut
                            this.borrowForm.IdDateRetAct=result.IdDateRetAct
                            this.borrowForm.IdDateRetPlan=result.IdDateRetPlan
                            this.borrowForm.IdOverDay=result.IdOverDay
                            this.borrowForm.IdPunishMoney=result.IdPunishMoney
                            this.borrowForm.IsHasReturn=result.IsHasReturn
                        }
                    }
                })
            },
            handleReturn(bkID){
                console.log('读书编号'+bkID)
                this.$http.post('/api/admin/bkID',{bkID:bkID},{}).then((response)=> {
                    if (response.data == '-1') {
                        this.$message({
                            message: '读者没有借这本书',
                            type: "success"
                        })
                    } else if (response.status === 200) {
                            let rdID = response.data[0].rdID
                            console.log('实际还书时间' + date.getDate())
                            console.log('应还书时间' + response.data[0].IdDateRetPlan)
                            console.log('实际还书和应还书相差的天数' + date.GetNumberOfDays(date.getDate(), response.data[0].IdDateRetPlan))
                            let lendDays = date.GetNumberOfDays(date.getDate(), response.data[0].IdDateRetPlan)
                            this.returnDate.BorrowID = response.data[0].BorrowID
                            if (lendDays > 0) {
                                console.log('未超期')
                                this.returnDate.IdOverDay = 0;
                                this.returnDate.IdOverMoney = 0;
                                this.returnDate.IdPunishMoney = 0;
                            } else {
                                console.log('超期')
                                this.returnDate.IdOverDay = Math.abs(lendDays)
                                console.log('超期天数' + this.returnDate.IdOverDay)
                                console.log('查询读者类型bkID' + rdID)
                                this.$http.post('/api/user/userInfo', {rdID: rdID}, {}).then((response) => {
                                    if (response.status === 200) {

                                        console.log('读者类型' + response.data[0].rdType)
                                        this.$http.post('/api/user/readerType', {rdType: response.data[0].rdType}, {}).then((response) => {
                                            if (response.status === 200) {
                                                console.log('处罚率：' + response.data[0].PunishRate)
                                                this.returnDate.IdOverMoney = this.returnDate.IdOverDay * response.data[0].PunishRate
                                                this.returnDate.IdPunishMoney = this.returnDate.IdOverMoney
                                                console.log('罚金为' + this.returnDate.IdOverMoney)
                                                alert('你借的书籍已超期，请交罚金' + this.returnDate.IdOverMoney)
                                            } else {
                                                this.$message({
                                                    message: '有误',
                                                    type: "success"
                                                })
                                            }
                                        })
                                    } else {
                                        this.$message({
                                            message: '有误',
                                            type: "success"
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
                                                message: '您已将此此书还了~~',
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
                })
            }
        },
        mounted() {
            this.getBorrow()
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
