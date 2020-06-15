<template>
  <div>
    <div>
      <h2>续&nbsp;书&nbsp;管&nbsp;理</h2>
      <el-input
        placeholder="请输入读者的借书证号......................"
        suffix-icon="el-icon-search"
        v-model="keyWords">
      </el-input><el-button @click="findReader()" size="large">查询读者</el-button>
    </div>
    <Divider />
    <div v-if="CLend">
      <el-input
        placeholder="请输入要续借的书籍号......................"
        suffix-icon="el-icon-search"
        v-model="keyBook">
      </el-input><el-button @click="lendBook()" size="large">查询书籍</el-button>
    </div>
  </div>
</template>

<script>
  import App from "../App";
  import date from '../../src/utils/date'
    export default {
        name: "continueLend",
        components:{App},
        inject:['reload'],
        data(){
            return{
                keyWords:'',
                bkID:'',
                CLend:false,
                keyBook:'',
                continueLend:{
                    BorrowID:'',
                    IdDateRetPlan:'',
                    IdContinueTimes:'',
                    IdDateOut: '',
                }

            }
        },
        methods:{
            findReader(){
                this.$http.post('/api/admin/borrowRd',{rdID:this.keyWords},{}).then((response)=>{
                    console.log(response)
                    if(response.data==='-1'){
                        this.$message({
                            message:'该读者没有借过书',
                            type:'success'
                        })
                    }
                    else if(response.status===200){
                        console.log('借阅者查找成功')
                        this.$message({
                            message:'请继续输入读者要续借的书籍号',
                            type:"success"
                        })
                        this.CLend=true
                    }
                })
            },
            lendBook(){
                this.$http.post('/api/admin/book',{bkCode:this.keyBook},{}).then((response)=>{
                    if(response.data==='-1'){
                        this.$message({
                            message:'查找失败',
                            type:'success'
                        })
                    }
                    else if(response.status===200){
                        console.log('查找成功')
                      let bkID=response.data[0].bkID
                        this.$http.post('/api/admin/bkID',{bkID:bkID},{}).then((response)=>{
                            if(response.data=='-1'){
                                this.$message({
                                    message:'读者没有借这本书',
                                    type:"success"
                                })
                            }
                            else if(response.status===200) {
                                if (response.data[0].bkID) {
                                    this.$message({
                                        message: '读者正在借这本书',
                                        type: 'success'
                                    })
                                    this.continueLend.BorrowID=response.data[0].BorrowID
                                    this.continueLend.IdContinueTimes=response.data[0].IdContinueTimes+1
                                    this.$Modal.confirm({
                                        title: '再次续借',
                                        content: '<p>确定是否再续借</p>',
                                        onOk: () => {
                                            let rdID=response.data[0].rdID
                                            console.log('读者编号'+rdID)
                                            this.$http.post('/api/user/userInfo',{rdID:rdID},{}).then((response)=>{
                                                if(response.status==200){

                                                    console.log('读者类型'+response.data[0].rdType)
                                                    this.$http.post('/api/user/readerType',{rdType:response.data[0].rdType},{}).then((response)=>{
                                                        if(response.status==200) {
                                                            console.log('可借的天数：' + response.data[0].CanLendDay)
                                                            this.continueLend.IdDateOut=date.getDate()
                                                            console.log('借书日期改为：'+this.continueLend.IdDateOut)
                                                            this.continueLend.IdDateRetPlan=date.Confirm(this.continueLend.IdDateOut,response.data[0].CanLendDay)
                                                            console.log('应还日期'+this.continueLend.IdDateRetPlan)
                                                            this.$http.post('/api/admin/continueLend',this.continueLend,{}).then((response)=>{
                                                                if(response.status===200){
                                                                    console.log('续借成功')
                                                                    this.$message({
                                                                        message:'续借成功',
                                                                        type:"success"
                                                                    })
                                                                    this.reload()
                                                                }
                                                                else{
                                                                    this.$message({
                                                                        message:'续借失败',
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
                                                else{
                                                    this.$message({
                                                        message:'有误',
                                                        type:"success"
                                                    })
                                                }
                                            })
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
