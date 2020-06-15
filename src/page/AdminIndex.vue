<template>
<div class="image">
  <p style="text-align: center;font-size: 30px;font-weight: bold;color: #0d58ab" @click="getDate">欢迎进入管理员区</p>
</div>
</template>

<script>
    import date from '../../src/utils/date'
    export default {
        name: "AdminIndex",
        data(){
            return{
                /*getDate:''*/
            }
        },
        methods:{
            getDate(){
                var dt='2019-12-19'
                var day=30
              console.log(date.Confirm(dt,day))
                console.log(date.getDate())
                var a1="2019-12-1";
                var a2="2019-11-11";
                var b=date.GetNumberOfDays(a1,a2)
                console.log(b);
            }
        }
    }
</script>

<style scoped>
.image {
  width: 100%;
  height:500px;
  background-image: url("../../static/images/bg/bg1.jpg");
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
}
</style>
