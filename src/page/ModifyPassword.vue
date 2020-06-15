<template>
  <div class="container">
  <h1 style="color: #0086b3">{{rdName}}</h1>
    <h2>密码修改</h2>
  <Divider />

  <div class="modifyPassword">
  <Form ref="form" :model="form" :rules="rule" class="login-form" :label-width="80">
    <FormItem prop="password" label="密码">
      <Input type="password" v-model="form.password" placeholder="请输入密码"/>
    </FormItem>
    <FormItem prop="rePassword" label="确认密码">
      <Input type="password" v-model="form.rePassword" placeholder="请再次确认密码"/>
    </FormItem>
    <FormItem>
      <Button @click="changePassword('form')" type="primary">确认</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button @click="cancel()">取消</Button>
    </FormItem>
  </Form>
  </div>
  </div>
</template>

<script>
    export default {
        name: "ModifyPassword",
        data(){
            const rePasswordValidate=(rule,value,callback)=>{
                if(value==''){
                    callback(new Error('请再次确认密码'));
                }
                else{
                    if(value!=''){
                        if(value!=this.form.password){
                            callback(new Error('输入两次密码不一致'));
                        }else{
                            callback();
                        }
                    }
                }
            }
            return{
                form:{
                    password:'',
                    rePassword:''
                },
                rule:{
                    password:[
                        {
                            trigger:'blur',
                            required:true,
                            message:'密码不能为空'
                        },
                        {
                            type:'string',
                            trigger: 'blur',
                            message: '密码不能少于六位数',
                            min:6
                        }
                    ],
                    rePassword: [
                        {
                            trigger:'',
                            required: true,
                            validator:rePasswordValidate,
                        }
                    ]
                }
            }
        },
        computed:{
            rdName(){
                return sessionStorage.getItem('rdName')
            }
        },
        methods:{
            changePassword(formName){
                console.log('rdID='+sessionStorage.getItem('rdID'));
                let pwdData={
                    rdID:sessionStorage.getItem('rdID'),
                    password:this.form.password
                };
                console.log(pwdData.rdID+'---'+pwdData.password);
                this.$refs[formName].validate((valid)=>{
                    if(valid) {
                        this.$http.post('/api/user/modifyPassword', pwdData).then(function (response) {
                            console.log(response);
                            this.$message({
                                message: '用户密码修改成功，亲~~',
                                type: 'success'
                            })
                            sessionStorage.clear();
                            this.$router.push('/');
                        }).then(function (error) {
                            console.log(error);
                        })
                    }
                    else{
                        console.log('无效数据');
                    }
                })
            },
            cancel(){
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
.modifyPassword{
  margin:auto 0;
  text-align: center;
  width: 400px;
}
    .container{

      width: 600px;

      margin: 0 auto;

      font-size: 16px;

      padding-top: 6%;

    }

</style>
