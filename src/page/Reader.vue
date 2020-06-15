<template>

</template>

<script>
    export default {
        name: "Reader",

    }
</script>

<style scoped>
  .rec-banner{
    margin:20px auto;
    background-color: #fff;
    padding-bottom: 40px;
    padding-top: 20px;
    width: 1120px;

  }
  .banner-title{
    padding: 10px 15px;
  }
  .rec-list{
    border-top: 1px solid #cccccc;
    list-style: none;
  }
  .rec-card{
    display: inline-block;
    cursor: pointer;
    width:25%;
    text-align: center;
    vertical-align: top;
  }
  .rec-media{
    width:240px;
    height:300px;
  }
  .rec-profile{
    display: inline-block;
    color: #444;
    margin:20px 0;
  }
  .rec-params{
    color:#888;
    font-size: 14px;
    margin: 12px;
  }
  .rec-price{
    text-decoration: line-through;
  }
  .rec-online-price{
    font-size: 16px;
    color:#ff0036;
  }
</style>
