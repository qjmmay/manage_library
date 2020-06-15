<template>
  <div class="container">
    <div>
      <h2>借书管理</h2>
      <el-input
        placeholder="请输入借书证号......................"
        suffix-icon="el-icon-search"
        v-model="keyWords">
      </el-input><el-button @click="lendBook()" size="large">查询读者</el-button>
    </div>
    <Divider />
    <div v-if="isReader">
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

        <td>{{detail.rdAdminRoles}}</td>

      </tr>
    </table>
    </div>
    <div v-else>{{isInfo}}</div>
    <div>
      <span v-if="idBorrow">{{this.borrowInfo}}</span>
      <span v-if="canBorrow">

        <router-link :to="{name:'borrowIndex',params: {rdID: rdID}}">
        {{canInfo}}
          </router-link>
      </span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "borrowBook",
        data(){
            return{
                isReader:false,
                isInfo:'',
                borrowInfo:'',
                canInfo:'',
                canBorrow:false,
                idBorrow:false,
                keyWords:'',
                detail: [],
                readerType:[],
                rdID:'',
                borrowQty:'',
                readerStatus:''
            }
        },
        methods:{
            lendBook() {
                console.log(this.keyWords)
                this.$http.post('/api/user/userInfo',{rdID:this.keyWords},{}).then((response) => {
                    if(response) {
                        if(response.data==='-1'){
                            this.isReader=false
                            this.isInfo='用户不存在'
                        }else{
                        this.isReader=true
                        console.log(response);
                        this.detail = response.data[0];
                       this.rdID=response.data[0].rdID
                        console.log(response.data[0].rdID)
                        sessionStorage.setItem('lendRdID',response.data[0].rdID)
                        let readerType = response.data[0].rdType;
                       console.log(readerType);
                        console.log('读者已经借的数量'+response.data[0].rdBorrowQty)
                            this.borrowQty=response.data[0].rdBorrowQty
                            this.readerStatus=response.data[0].rdStatus
                        this.$http.post('/api/user/readerType', {rdType: readerType}).then((response) => {
                            console.log(response)
                            this.readerType = response.data[0]
                          /*  console.log('读者已经借的数量'+this.borrowQty)
                            console.log(this.borrowQty<this.readerType.CanLendQty)*/
                            if(this.borrowQty<this.readerType.CanLendQty){
                                if(this.readerStatus!=='有效')
                                {
                                    this.canBorrow=false
                                    this.idBorrow=true
                                    this.borrowInfo='不可借阅，身份不合法'
                                }
                                else{
                                    this.canBorrow=true
                                    this.canInfo='可借阅'
                                }
                            }
                            else{
                                this.canBorrow=false
                                this.idBorrow=true
                                this.borrowInfo='借阅数量已达到上限'
                            }
                        })
                    }}else{

                    }
                })
            }
        },
    }
</script>

<style scoped>
  .container{

    width: 600px;

    margin: 0 auto;

    font-size: 16px;

    padding-top: 6%;

  }
</style>
