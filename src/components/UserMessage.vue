<template>

  <div v-if="!isLogin" class="header">
    <Row>
      <i-col span="2" offset="22">
        <router-link to="/">
          <div class="header_menu">登录</div>
        </router-link>
      </i-col>
    </Row>
  </div>
  <div v-else class="header">
    <Row>
      <i-col span="8" offset="16">

        <div class="header_menu" @click=logout() style="cursor: pointer">注销</div>

      <!-- <router-link :to="{path: '/userInfo', query:{ rdID: rdID}}">

          <div class="header_menu" v-if="!isAdmin">个人信息</div>

        </router-link>-->
        <div class="header_menu">已登录：{{rdName}}</div>
        <div class="header_menu" v-if="isAdmin">后台管理</div>
      </i-col>

    </Row>

  </div>
</template>

<script>
    export default {
        name: "UserMessage",
        data(){
            return{
                isLogin:false,
                isAdmin:true,
                rdName:'',
                rdID:''
            }
        },
        created() {
            let rdID=sessionStorage.getItem('rdID');
            this.rdID=rdID
            let rdName=sessionStorage.getItem('rdName');
            this.rdName=rdName
            console.log(rdName);
            let rdAdminRoles=sessionStorage.getItem('rdAdminRoles')
            console.log(rdAdminRoles)
            if(rdName){
                this.isLogin=true
                if(rdAdminRoles==0){
                    this.isAdmin=false;
                }
            }
        },
        methods:{
            logout(){
                sessionStorage.clear();
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
  .header{

    width: 100%;

    height: 40px;

    left: 0;

    top: 0;

    color: #000;

    background-color: rgba(94, 153, 180, 0.75);
  }

  .header_menu{

    padding-right: 30px;

    padding-top: 6px;

    float: right;

    color: darkslategrey;

    font-size: 16px;

  }
</style>
