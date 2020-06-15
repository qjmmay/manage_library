<template>
    <div>
      <Form ref="formUser" :model="formUser"  :label-width="80">
        <FormItem label="用户号" prop="rdID">
          <Input v-model="formUser.rdID" readonly/>
        </FormItem>
        <FormItem label="用户名" prop="rdName">
          <Input v-model="formUser.rdName" placeholder="请输入邮箱" />
        </FormItem>
        <FormItem label="性别">
          <el-select v-model="formUser.rdSex" placeholder="请选择">
            <el-option label="女" value="女">
            </el-option>
            <el-option label="男" value="男">
            </el-option>
          </el-select>
        </FormItem>

        <FormItem label="类别" prop="rdType">
          <el-select v-model="formUser.rdType" placeholder="请选择">
            <el-option label="10-教师" value="10">
            </el-option>
            <el-option label="20-本科生" value="20">
            </el-option>
            <el-option label="21-专科生" value="21">
            </el-option>
            <el-option label="30-硕士研究生" value="30">
            </el-option>
            <el-option label="31-博士研究生" value="31">
            </el-option>
          </el-select>
          <!--<Input v-model="formUser.rdType" placeholder="请输入" />-->
        </FormItem>
        <FormItem label="单位名称" prop="rdDept">
          <Input v-model="formUser.rdDept" placeholder="请输入" />
        </FormItem>
        <FormItem label="电话号码" prop="rdPhone">
          <Input v-model="formUser.rdPhone" placeholder="请输入" />
        </FormItem>
        <FormItem label="邮箱" prop="rdEmail">
          <Input v-model="formUser.rdEmail" placeholder="请输入" />
        </FormItem>
        <FormItem label="读者登录时间" prop="rdDateReg">
          <Input v-model="formUser.rdDateReg" placeholder="请输入" />
        </FormItem>
        <FormItem label="证件状态" prop="rdStatus">
          <el-select v-model="formUser.rdStatus" placeholder="请选择">
          <el-option label="有效" value="有效">
          </el-option>
          <el-option label="挂失" value="挂失">
          </el-option>
          <el-option label="注销" value="注销">
          </el-option>
          </el-select>
        </FormItem>
        <FormItem label="已借书量" prop="rdBorrowQty">
          <Input v-model="formUser.rdBorrowQty" placeholder="请输入" type="number"/>
        </FormItem>
        <FormItem label="用户身份" prop="rdAdminRoles">
          <el-select v-model="formUser.rdAdminRoles" placeholder="请选择">
            <el-option label="0-读者" value="0">
            </el-option>
            <el-option label="1-借书证管理" value="1">
            </el-option>
            <el-option label="2-图书管理" value="2">
            </el-option>
            <el-option label="4-借阅管理" value="4">
            </el-option>
            <el-option label="8-系统管理" value="8">
            </el-option>
          </el-select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="updateUser('formUser')" style="width: 300px">更&nbsp;&nbsp;新</Button>
        </FormItem>
      </Form>
    </div>
</template>

<script>
    export default {
        name: "editUser",
        data(){
            return{
                options: [{
                    value: '选项1',
                    label: '男'
                }, {
                    value: '选项2',
                    label: '女'
                }],
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
                }
            }
        },
        methods:{
            updateUser(formName){
                let rdID=this.$route.params.rdID;
               console.log('更新参数'+rdID)
                let userData={
                    rdID:rdID,
                    rdName:this.formUser.rdName,
                    rdSex:this.formUser.rdSex,
                    rdEmail:this.formUser.rdEmail,
                    rdPhone:this.formUser.rdPhone,
                    rdType:this.formUser.rdType,
                    rdDept:this.formUser.rdDept,
                    rdDateReg:this.formUser.rdDateReg,
                    rdStatus:this.formUser.rdStatus,
                    rdBorrowQty:this.formUser.rdBorrowQty,
                    rdAdminRoles:this.formUser.rdAdminRoles
                };
               console.log(userData.rdID)
             /*   this.$refs[formName].validate((valid) => {
                    if (valid) {*/
                        this.$http.post('/api/user/UpdateUser',userData,{}).then(function(response) {
                            console.log(response);
                            this.$message({
                                message: '用户信息更新成功，亲~~',
                                type: 'success'
                            });
                            this.$router.push('/AllUser');
                        }).then(function(error) {
                            console.log(error);
                        })
                  /*  } else {
                        console.log('修改失败!');
                        return false;
                    }*/
              /*  });*/
            },
            getUser(){
                let self=this
                let rdID=this.$route.params.rdID;
                console.log('获取用户'+rdID);
                this.$http.post('api/user/userInfo',{rdID:rdID},{}).then((response)=>{
                    if(response.data===-1){
                        console.log('没有该用户信息');
                    }
                    else if(response.status===200){
                        console.log('获取成功')
                        this.formUser=response.data[0]
                        let result=response.data[0]
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
          this.getUser()
        }
    }
</script>

<style scoped>

</style>
