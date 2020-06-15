<template>
<div class="container">
  <Form :model="rdTypeForm" status-icon ref="ruleForm" label-width="100" class="demo-ruleForm">
  <FormItem label="读者类别" prop="rdType">
    <el-input type="text" v-model="rdTypeForm.rdType" autocomplete="off" placeholder="请输入......."></el-input>
  </FormItem>
    <FormItem label="读者类别名称" prop="rdTypeName">
      <el-input type="text" v-model="rdTypeForm.rdTypeName" autocomplete="off" placeholder="请输入......."></el-input>
    </FormItem>
    <FormItem label="可借数量" prop="CanLendQty">
      <el-input type="number" v-model="rdTypeForm.CanLendQty" autocomplete="off" min="1" placeholder="请输入......."></el-input>
    </FormItem>
    <FormItem label="可借天数" prop="CanLendDay">
      <el-input type="number" v-model="rdTypeForm.CanLendDay" autocomplete="off" min="1" placeholder="请输入......."></el-input>
    </FormItem>
    <FormItem label="可续借次数" prop="CanContinueTimes">
      <el-input type="number" v-model="rdTypeForm.CanContinueTimes" autocomplete="off" placeholder="请输入......."></el-input>
    </FormItem>
    <FormItem label="罚款率(元/天)" prop="PunishRate">
      <el-input type="number" v-model="rdTypeForm.PunishRate" autocomplete="off" placeholder="请输入......."></el-input>
    </FormItem>
    <FormItem label="证书有效期(/年)" prop="DateValid">
      <el-input type="number" v-model="rdTypeForm.DateValid" autocomplete="off" placeholder="请输入......."></el-input>
    </FormItem>
    <FormItem>
      <el-button @click="AddType()"  type="primary" size="large">添加读者类型</el-button>
    </FormItem>
  </Form>
</div>
</template>

<script>
    export default {
        name: "addRdType",
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
            AddType(){
                this.$http.post('/api/user/addRdType',this.rdTypeForm,{}).then((response)=>{
                    if(response.status===200){
                        this.$message({
                            message:'添加成功',
                            type:"success"
                        })
                        this.$router.push('/rdType')
                    }
                    else{
                        this.$message({
                            message:'添加失败',
                            type:"success"
                        })
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>
