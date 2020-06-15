<template>
  <div class="container">

    <h2>借阅记录</h2>

    <Divider />

    <el-table
        :data="borrowForm"
        style="width: 100%">
      <el-table-column
        label="读者"
        width="130">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.rdID }}</span>
        </template>
      </el-table-column>
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
              @click="handleDelete(scope.row.bkID)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

  </div>
</template>

<script>

    import App from "../App";

    export default {
        name: "HandleRecord",
        components:{App},
        inject:['reload'],
        data(){
            return{
                borrowForm:{
                    rdID:'',
                    bkID:'',
                    IdContinueTimes:'',
                    IdDateOut:'',
                    IdDateRetPlan:'',
                    IdDateRetAct:'',
                    IdOverDay:'',
                    IdPunishMoney:'',
                    IsHasReturn: ''
                },

            }
        },
        methods:{
            getBorrow(){
                /*let rdID=sessionStorage.getItem("rdID")
                console.log("登录人"+rdID)*/
                this.$http.post('/api/admin/borrowRd',{},{}).then((response)=>{
                    if(response){
                        if(response.data==='-1'){
                            this.$message({
                                message:'读者没有借书记录',
                                type:'success'
                            })
                        }
                        else if(response.status===200){
                            console.log("查询成功")
                            this.borrowForm=response.data;
                            let result=response.data;
                            this.borrowForm.bkID=result.bkID
                            this.borrowForm.rdID=result.rdID
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
            handleDelete(bkID){
                this.$http.post('/api/admin/deleteRecord',{bkID:bkID},{}).then((response)=> {
                    if(response){
                        if(response.status===200){
                            this.$message({
                                message:'删除成功',
                                type:'success'
                            })
                            this.$router.push('/Admin')
                        }
                    }
                })
            },

        },
        mounted() {
            this.getBorrow()
        }
    }
</script>

<style scoped>
  .container{

    width: 1000px;

    margin: 0 auto;

    font-size: 16px;

    padding-top: 6%;

  }

</style>
