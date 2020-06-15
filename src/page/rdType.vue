<template>
<div>
  <h1 style="text-align: center">读者类别的管理</h1>
  <el-table
    :data="rdTypeForm"
    style="width: 100%">
    <el-table-column
      label="读者类别"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.rdType }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="读者类别名称"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.rdTypeName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="可借数量"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.CanLendQty }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="可借天数"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.CanLendDay }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="可续借的次数"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.CanContinueTimes }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="罚款率(元/天)"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.PunishRate }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="证书有效期(\年)"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.DateValid }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="类别操作"
    >
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          @click="handleEdit(scope.row.rdType)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.rdType)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  import App from "../App";
    export default {
        name: "rdType",
        components:{App},
        inject:['reload'],
        data(){
            return{
                rdTypeForm:[{
                    rdType:'',
                    rdTypeName:'',
                    CanLendQty:'',
                    CanLendDay:'',
                    CanContinueTimes:'',
                    PunishRate:'',
                    DateValid:''
                }]
            }
        },
        methods:{
            getRdType(){
                this.$http.post('/api/user/readerType',{},{}).then((response)=>{
                    if(response.data=='-1'){
                        this.$message({
                            message:'查询失败',
                            type:"success"
                        })
                    }
                    else if(response.status===200){
                        console.log('查找成功')
                        this.rdTypeForm=response.data
                    }
                })
            },
            handleEdit(rdType){
              this.$router.push({name:'ModifyRdType',params:{rdType:rdType}})
            },
            handleDelete(rdType){
                this.$Modal.confirm({
                    title: '管理员您确认要删除',
                    content: '<p>确定删除此商品</p>',
                    onOk: () => {
                        this.$http.post('/api/user/deleteRdType', {rdType: rdType}, {}).then((response) => {
                            if (response.status === 200) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                })
                                this.reload()
                            }
                        })
                    },
                    onCancel: () => {
                        this.$message.info('Clicked cancel');
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
