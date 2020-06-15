<template>
  <div class="container">
    <Header></Header>
    <AdminMenu></AdminMenu>
    <div class="table">
    <h2>个人信息</h2>

    <Divider />

    <table align="center">
      <tr>
        <el-popover trigger="hover" placement="top">
          <p>读者类别的名称: {{ readerType.rdTypeName }}</p>
          <p>可借书数量: {{ readerType.CanLendQty }}</p>
          <p>可借书天数: {{ readerType.CanLendDay }}</p>
          <p>可续借的次数: {{ readerType.CanContinueTimes }}</p>
          <p>罚款率(元/天): {{ readerType.PunishRate }}</p>
          <p>证书有效期(年): {{ readerType.DateValid }}</p>
          <el-button slot="reference">读者类别：{{detail.rdType}}</el-button>
        </el-popover>
      </tr>
      <tr>

        <td>用户号：</td>

        <td>{{detail.rdID}}</td>

      </tr>

      <tr>

        <td>用户名：</td>

        <td>{{detail.rdName}}</td>

      </tr>
      <tr>
        <td>单位名称：</td>
        <td>{{detail.rdDept}}</td>
      </tr>
      <tr>
        <td>性别：</td>
        <td>{{detail.rdSex}}</td>
      </tr>
      <tr>

        <td>电话：</td>

        <td>{{detail.rdPhone}}</td>

      </tr>
      <tr>
        <td>读者登记时间：</td>
        <td>{{detail.rdDateReg}}</td>
      </tr>
      <tr>

        <td>用户邮箱：</td>

        <td>{{detail.rdEmail}}</td>

      </tr>

      <tr>

        <td>用户证件状态：</td>

        <td>{{detail.rdStatus}}</td>

      </tr>
      <tr>
        <td>已借书数量：</td>
        <td>{{detail.rdBorrowQty}}</td>
      </tr>
      <tr>
        <td>读者密码：</td>
        <td>{{detail.rdPwd}}</td>
      </tr>
      <tr>

        <td>用户身份：</td>

        <td>{{rdAdminRoles}}</td>

      </tr>
    </table>
    </div>
  </div>
</template>

<script>
    import Header from "../components/Header";
    import AdminMenu from "../components/AdminMenu";
    export default {
        name: "user",
        components:{Header,AdminMenu},
        data () {

            return {

                detail: [],
                /* rdType:'',*/
                readerType:[],
                rdAdminRoles: ''
            }

        },
        // 获取用户数据

        created () {
            /*let rdID = this.$route.query.rdID
            console.log(rdID)*/
            let rdID=sessionStorage.getItem('rdID')
            if (rdID) {
                this.$http.post('/api/user/userInfo', {rdID:rdID}).then((response) => {

                    if (response.status===200) {
                        console.log(response.data)
                        this.detail = response.data[0];
                        if(response.data[0].rdAdminRoles===0){
                            this.rdAdminRoles='读者'
                        }
                        else if(response.data[0].rdAdminRoles===1){
                            this.rdAdminRoles='借书证管理人'
                        }
                        else if(response.data[0].rdAdminRoles===2){
                            this.rdAdminRoles='图书管理人'
                        }
                        else if(response.data[0].rdAdminRoles===4){
                            this.rdAdminRoles='借阅管理人'
                        }
                        else if(response.data[0].rdAdminRoles===8){
                            this.rdAdminRoles='系统管理人'
                        }
                        let readerType=response.data[0].rdType;
                        console.log(readerType);
                        this.$http.post('/api/user/readerType', {rdType:readerType}).then((response) => {
                            console.log(response)
                            this.readerType=response.data[0]
                        })
                    }
                    else {
                        alert('查询失败')
                    }

                })

            } /*else {

                alert('请先登录再查看个人信息')

            }*/

        }
    }
</script>

<style scoped>
.table{

  margin-left: 150px;
  margin-top: -340px;
}
</style>
