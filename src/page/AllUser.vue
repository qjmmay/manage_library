<template>
  <el-table
    :data="formUser"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline-block class="demo-table-expand">
          <el-form-item label="单位名称">
            <span>{{ props.row.rdDept }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{ props.row.rdSex }}</span>
          </el-form-item>
          <el-form-item label="电话">
            <span>{{ props.row.rdPhone }}</span>
          </el-form-item>
          <el-form-item label="邮箱">
            <span>{{ props.row.rdEmail }}</span>
          </el-form-item>
          <el-form-item label="读者密码">
            <span>{{ props.row.rdPwd }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="用户号"
      prop="rdID"
      width="120">
    </el-table-column>
    <el-table-column
      label="读者姓名"
      prop="rdName"
      width="90">
    </el-table-column>
    <el-table-column
      label="读者登录时间"
      prop="rdDateReg"
      width="150">
    </el-table-column>
    <el-table-column
      label="读者类别"
      width="120"
      prop="rdType">
      <!--<el-button type="text" @click="dialogTableVisible = true">{{formUser.rdType}}</el-button>
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-table :data="readerType">
          <el-table-column property="rdTypeName" label="日期" width="150"></el-table-column>
          <el-table-column property="CanLendQty" label="姓名" width="200"></el-table-column>
          <el-table-column property="CanLendDay" label="地址"></el-table-column>
        </el-table>
      </el-dialog>-->
    </el-table-column>
    <el-table-column
      label="证件状态"
      prop="rdStatus"
      width="90">
    </el-table-column>
    <el-table-column
      label="已借数量"
      prop="rdBorrowQty"
      width="90">
    </el-table-column>
    <el-table-column
      label="用户身份"
      prop="rdAdminRoles"
      width="90">
    </el-table-column>
    <el-table-column
      label="管理用户"
    >
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          @click="show(scope.row.rdID,scope.row.rdName)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="remove(scope.row.rdID)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
  import App from "../App";
    export default {
        name: "AllUser",
        components:{App},
        inject:['reload'],
        data(){

            return{
                dialogTableVisible: false,
                dialogFormVisible: false,
                formUser:{
                    rdID:'',
                    rdName:'',
                    rdSex:'',
                    rdType:'',
                    rdDept:'',
                    rdPhone:'',
                    rdEmail:'',
                    rdDateReg:'',
                    rdPhoto:'',
                    rdStatus:'',
                    rdBorrowQty:'',
                    rdPwd:'',
                    rdAdminRoles:''
                },
            }
        },
        methods: {
            show(index, username) {
                console.log(index)
                this.$router.push({name: 'editUser', params: {rdID: index, rdName: username}})
            },
            remove(index) {
                console.log('参数' + index);
                let self = this;
                self.$Modal.confirm({
                    title: '管理员您确认要删除此用户',
                    content: '<p>确定删除该用户</p>',
                    onOk: () => {
                        self.$http.post('/api/admin/deleteUser', {id: index}, {}).then((response) => {
                            console.log(response);
                            if (response.status === 200) {
                                console.log('删除成功');
                                this.$message({
                                    message: '管理员您已将此用户删除',
                                    type: 'success'
                                });
                                this.reload();
                            } else {
                                console.log('删除失败')
                            }
                        })
                    },
                    onCancel: () => {
                        this.$message.info('Clicked cancel');
                    }
                })
            },
            getUser() {
                let self = this;
                self.$http.post('/api/user/userInfo', {}, {}).then((response) => {
                    console.log(response);
                    if (response.data === -1) {
                        console.log("用户名不存在");
                    } else if (response.status === 200) {
                        console.log("查找成功");
                        self.formUser = response.data;
                        console.log(this.formUser)
                        let result = response.data;
                        self.formUser.rdID = result.rdID;
                        self.formUser.rdName = result.rdName;
                        self.formUser.rdEmail = result.rdEmail;
                        self.formUser.rdPhone = result.rdPhone;
                        self.formUser.rdSex = result.rdSex;
                        self.formUser.rdType = result.rdType;
                        self.formUser.rdDept = result.rdDept;
                        self.formUser.rdDateReg = result.rdDateReg;
                        self.formUser.rdPhoto = result.rdPhoto;
                        self.formUser.rdStatus = result.rdStatus;
                        self.formUser.rdBorrowQty = result.rdBorrowQty;
                        self.formUser.rdPwd = result.rdPwd;
                        self.formUser.rdAdminRoles = result.rdAdminRoles;
                    }
                })
            }
        },
      mounted() {
          this.getUser();
      }
    }
</script>

<style scoped>

</style>
