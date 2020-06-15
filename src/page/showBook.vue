<template>
  <div>
    <!-- <Header></Header>-->
    <div class="container">
      <div class="left">
        <img :src="Books.bkCover">
      </div>
      <div class="right">
        <Form ref="Books" :model="Books" :label-width="80"class="registerForm">
          <FormItem>
            <input v-model="Books.bkID" hidden></input>
          </FormItem>
          <FormItem label="图书编号" prop="bkCode">
            <Input v-model="Books.bkCode" placeholder="请输入" type="text"/>
          </FormItem>
          <FormItem label="书名" prop="bkName">
            <Input v-model="Books.bkName" placeholder="请输入"  type="text"/>
          </FormItem>
          <FormItem label="作者" prop="bkAuthor">
            <Input v-model="Books.bkAuthor" placeholder="请输入"  type="text" />
          </FormItem>
          <FormItem label="出版社" prop="bkPress">
            <Input v-model="Books.bkPress" placeholder="请输入"  type="text" disabled/>
          </FormItem>
          <FormItem label="出版日期" prop="bkDatePress">
            <Input type="text" v-model="Books.bkDatePress" placeholder="请输入" disabled></Input>
          </FormItem>
          <FormItem label="ISBN书号" prop="bkISBN">
            <Input type="text" v-model="Books.bkISBN" placeholder="请输入" disabled></Input>
          </FormItem>
          <FormItem label="分类号" prop="bkCatalog">
            <Input type="text" v-model="Books.bkCatalog" placeholder="请输入" disabled></Input>
          </FormItem>
          <FormItem label="语言" prop="bkLanguage">

            <Input type="text" v-model="Books.bkLanguage" placeholder="请输入" disabled></Input>
          </FormItem>
          <FormItem label="页数" prop="bkPages">
            <Input type="text" v-model="Books.bkPages" placeholder="请输入"disabled></Input>
          </FormItem>
          <FormItem label="价格" prop="bkPrice">
            <Input type="text" v-model="Books.bkPrice" placeholder="请输入" disabled></Input>
          </FormItem>
          <FormItem label="数量" prop="bkQuantity">
            <Input type="number" v-model="Books.bkQuantity" placeholder="请输入" disabled></Input>
          </FormItem>
          <FormItem label="入馆日期" prop="bkDateIn">
            <Input type="text" v-model="Books.bkDateIn" disabled></Input>
          </FormItem>
          <FormItem label="内容简介" prop="bkBrief">
            <Input type="text" v-model="Books.bkBrief" placeholder="请输入" disabled></Input>
          </FormItem>
          <FormItem label="在馆状态" prop="bkStatus">

             <Input type="text" v-model="Books.bkStatus" placeholder="请输入" disabled></Input>
          </FormItem>
        </Form>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "EditBook",
        data(){
            return{
                Books:{
                    bkID:'',
                    bkCode:'',
                    bkName:'',
                    bkAuthor:'',
                    bkPress:'',
                    bkDatePress:'',
                    bkISBN:'',
                    bkCatalog:'',
                    bkLanguage:'',
                    bkPages:'',
                    bkPrice:'',
                    bkQuantity:'',
                    bkDateIn:'',
                    bkBrief:'',
                    bkCover:'',
                    bkStatus:''
                }
            }
        },
        methods:{
            getGoods:function(){
                let self=this
                let bkID=this.$route.params.bkID
                console.log('获得参数'+bkID);
                this.$http.post('/api/admin/getBook',{bkID:bkID},{}).then((response) => {
                    console.log(response);
                    if (response.data === -1) {
                        console.log('查找失败');
                    } else if (response.status === 200) {
                        console.log('查询成功');
                        console.log(response.data[0]);
                        let result=response.data[0];
                        let bkID=result.bkID;
                        sessionStorage.setItem('bkID',bkID);
                        self.Books.bkID=result.bkID;
                        self.Books.bkCode=result.bkCode;
                        self.Books.bkName=result.bkName;
                        self.Books.bkAuthor=result.bkAuthor;
                        self.Books.bkPress=result.bkPress;
                        self.Books.bkDatePress=result.bkDatePress;
                        self.Books.bkISBN=result.bkISBN;
                        self.Books.bkCatalog=result.bkCatalog;
                        self.Books.bkLanguage=result.bkLanguage;
                        self.Books.bkPages=result.bkPages;
                        self.Books.bkPrice=result.bkPrice;
                        self.Books.bkQuantity=result.bkQuantity;
                        self.Books.bkDateIn=result.bkDateIn;
                        self.Books.bkBrief=result.bkBrief;
                        self.Books.bkCover=result.bkCover;
                        self.Books.bkStatus=result.bkStatus;
                    }
                })
            },

        },
        mounted() {
           this.getGoods()
        }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 500px;
    /*  background-image: url("../../static/image/shop1.jpg");*/
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;
  }
  .left{
    float: left;
    width: 40%;
    padding: 30px 80px;
    margin-left: -70px;
  }
  .left,.right{

  }
  .footer{
    margin-top: 400px;
  }
  .left img{
    width: 300px;
    height: 300px;
  }
  .right{
    float: left;
    width: 50%;
    padding: 30px;
  }
</style>
