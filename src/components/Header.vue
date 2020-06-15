<template>
    <div >

      <Menu mode="horizontal" theme="dark">


        <MenuItem name="1">

         <span style="font-size: 22px;"> <Icon type="ios-apps" />欢迎来到书屋之旅</span>

        </MenuItem>

        <router-link to="/Index">

          <MenuItem name="1">

            <Icon type="md-home"></Icon>主页

          </MenuItem>

        </router-link>

        <router-link to="/">

          <MenuItem name="2">

            <Icon type="ios-videocam"></Icon>个人信息

          </MenuItem>

        </router-link>

        <router-link to="/">

          <MenuItem name="2">

            <Icon type="ios-document"></Icon><span onclick="logout()">{{username}}-------注销</span>

          </MenuItem>

        </router-link>

      </Menu>
    </div>

</template>

<script>
    export default {
        name: "Header",
        inject:['reload'],
        data(){
            return{
                activeIndex:1,
                isLogin:false,
                isAdmin:true
            }
        },
        methods:{
            handleSelect(key,keyPath){
                console.log(key,keyPath);
            },

            logout:function () {
                sessionStorage.clear();
                this.$router.push('/');
            }
        },
        computed:{
           username:function() {
               return sessionStorage.getItem("rdName")
           }
        }
    }
</script>

<style scoped>


</style>
