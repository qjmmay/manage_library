<template>
  <div>
  <Form :model="rdTypeForm" status-icon ref="ruleForm" :label-width="80">
    <FormItem label="读者类别" prop="rdType">
      <el-input type="text" v-model="rdTypeForm.rdType" placeholder="请输入......."></el-input>
    </FormItem>
    <FormItem label="读者类别名称" prop="rdTypeName">
      <el-input type="text" v-model="rdTypeForm.rdTypeName"  placeholder="请输入......."></el-input>
    </FormItem>
    <FormItem label="可借数量" prop="CanLendQty">
      <el-input type="number" v-model="rdTypeForm.CanLendQty" min="1" placeholder="请输入......."></el-input>
    </FormItem>
    <FormItem label="可借天数" prop="CanLendDay">
      <el-input type="number" v-model="rdTypeForm.CanLendDay" min="1" placeholder="请输入......."></el-input>
    </FormItem>
    <FormItem label="可续借次数" prop="CanContinueTimes">
      <el-input type="number" v-model="rdTypeForm.CanContinueTimes"  placeholder="请输入......."></el-input>
    </FormItem>
    <FormItem label="罚款率(元/天)" prop="PunishRate">
      <el-input type="number" v-model="rdTypeForm.PunishRate"  placeholder="请输入......."></el-input>
    </FormItem>
    <FormItem label="证书有效期(/年)" prop="DateValid">
      <el-input type="number" v-model="rdTypeForm.DateValid"  placeholder="请输入......."></el-input>
    </FormItem>
    <FormItem>
      <el-button @click="UpdateType()"  type="primary" size="large">修改读者类型</el-button>
    </FormItem>
  </Form>
  </div>
</template>

<script>
    import rdType from "./rdType";

    export default {
        name: "ModifyRdType",
        data(){
            return{
                rdTypeForm:{
                    rdType:'',
                    rdTypeName:'',
                    CanLendQty:'',
                    CanLendDay:'',
                    CanContinueTimes:'',
                    PunishRate:'',
                    DateValid:''
                }
            }
        },
        methods:{
            getRdType(){
                let rdType=this.$route.params.rdType;
                console.log(rdType)
                this.$http.post('/api/user/readerType',{rdType:rdType},{}).then((response)=>{
                    if(response.data==='-1'){
                        this.$message({
                            message:'查找失败',
                            type:'success'
                        })
                    }
                    else if(response.status===200){
                        console.log('查找成功')
                        this.rdTypeForm=response.data[0]
                      /*  let result=response.data[0]
                        this.rdTypeForm.rdType=result.rdType
                        this.rdTypeForm.rdTypeName=result.rdTypeName
                        this.rdTypeForm.CanLendQty=result.CanLendQty
                        this.rdTypeForm.CanLendDay=result.CanLendDay
                        this.rdTypeForm.CanContinueTimes=result.CanContinueTimes
                        this.rdTypeForm.PunishRate=result.PunishRate
                        this.rdTypeForm.DateValid=result.DateValid*/
                    }
                })
            },
            UpdateType(){
                this.$http.post('/api/user/UpdateType',this.rdTypeForm,{}).then((response)=>{
                    if(response.status===200){
                        this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        this.$router.push('/rdType')
                    }
                    else{
                        this.$message({
                            message:'修改失败',
                            type:'success'
                        })
                    }
                })
            }
        },
        mounted() {
            this.getRdType()
        }
    }
</script>

<style scoped>

</style>
