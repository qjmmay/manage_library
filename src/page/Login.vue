<template>
  <div class="login">
    <div class="login-content">
      <h1 style="color:darkblue ">欢迎进入图书管理学系统</h1>
      <Form ref="form" :model="form" :rules="rule" class="login-form">
        <div v-if="errorInfo">
          <span style="color:red">{{errInfo}}</span>
        </div>
        <FormItem prop="rdID">
          <Input type="text" v-model="form.rdID" placeholder="请输入用户号" @keyup.enter.native="handleLogin('form')" style="width: 300px"/>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="form.password" placeholder="请输入密码" @keyup.enter.native="handleLogin('form')" style="width: 300px"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleLogin('form')" style="width:300px;">登录</Button>
        </FormItem>
      <p @click="goRegister()" class="go-register">没有账号，点击注册</p>
      </Form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                errorInfo: false,
                errInfo:'',
                form: {
                    rdID: '',
                    password: '',
                },
                rule: {
                    rdID: [
                        {
                            required: true,
                            message: '用户号不能为空',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '密码不能为空',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: '密码不能少于6位数',
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },

        methods: {
            handleLogin: function (formName) {
              const self = this;
                self.$refs[formName].validate((valid)=>{
                    if(valid){
                            self.$http.post('/api/user/login', JSON.stringify(self.form), {}).then((response) => {
                                console.log(response.data[0]);
                                if (response.data[0] === '1') {
                                    self.errorInfo = true;
                                    self.errInfo = '用户名不存在';
                                    console.log("用户名不存在");
                                } else if (response.data[0] === '0') {
                                    self.errorInfo = true;
                                    self.errInfo = '密码错误';
                                    console.log("密码有误");
                                }
                           else if (response.status === 200) {
                                    self.errorInfo = false;
                                    console.log("登录成功");
                                    console.log('管理角色'+response.data[0].rdAdminRoles)
                                    console.log('用户号'+response.data[0].rdID)
                                    sessionStorage.setItem('rdID', response.data[0].rdID);
                                    sessionStorage.setItem('rdName',response.data[0].rdName);
                                    sessionStorage.setItem('rdAdminRoles',response.data[0].rdAdminRoles);
                                    if(response.data[0].rdAdminRoles>0){
                                        console.log('进入管理区')
                                        self.$router.push({name:'AdminIndex',params:{rdAdminRoles:response.data[0].rdAdminRoles}})
                                    }
                                    else {
                                        console.log('进入普通读者区')
                                        self.$router.push('/index');
                                    }
                                }
                            }).then((error) => {
                                console.log(error);
                            })

                    }
                })

            },
            goRegister() {
                this.$router.push('/Register')
            }
        }
    }
</script>

<style scoped>
  .login{
    width: 100%;
    background-image: url("../../static/images/bg/bg5.jpg");
    background-size: 100% 100%;
    background-position: center center;
    overflow: hidden;
  }
  .login-content{
    width: 400px;
    height: 300px;
    text-align: center;
    background-color: rgba(100,149,237,0.4);
    margin: 200px auto;
    padding-top: 20px;
  }
  .login-form{
    padding-top: 15px;
  }
  .go-register{
   text-align: center;
    font-size: 13px;
    color:midnightblue;
  }
  .go-register:hover{
    cursor: pointer;
    color: darkred;
  }
</style>
