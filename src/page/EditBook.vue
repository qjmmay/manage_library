<template>
  <div>
    <!-- <Header></Header>-->
    <div class="container">
      <div class="left">
        <img :src="require(`../../service/${Books.bkCover.replace(/\\/g, '\/')}`)">
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
            <Input v-model="Books.bkAuthor" placeholder="请输入"  type="text"/>
          </FormItem>
          <FormItem label="出版社" prop="bkPress">
            <Input v-model="Books.bkPress" placeholder="请输入"  type="text"/>
          </FormItem>
          <FormItem label="出版日期" prop="bkDatePress">
            <span class="demonstration">默认</span>
            <el-date-picker
              v-model="Books.bkDatePress"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </FormItem>
          <FormItem label="ISBN书号" prop="bkISBN">
            <Input type="text" v-model="Books.bkISBN" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="分类号" prop="bkCatalog">
            <Input type="text" v-model="Books.bkCatalog" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="语言" prop="bkLanguage">
            <el-select v-model="Books.bkLanguage" placeholder="请选择">
              <el-option label="0-中文" value="0">
              </el-option>
              <el-option label="1-英文" value="1">
              </el-option>
              <el-option label="2-日文" value="2">
              </el-option>
              <el-option label="3-俄文" value="3">
              </el-option>
              <el-option label="4-德文" value="4">
              </el-option>
              <el-option label="5-法文" value="5">
              </el-option>
            </el-select>
            <!--<Input type="text" v-model="Books.bkLanguage" placeholder="请输入"></Input>-->
          </FormItem>
          <FormItem label="页数" prop="bkPages">
            <Input type="text" v-model="Books.bkPages" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="价格" prop="bkPrice">
          <Input type="text" v-model="Books.bkPrice" placeholder="请输入"></Input>
        </FormItem>
          <FormItem label="数量" prop="bkQuantity">
            <Input type="number" v-model="Books.bkQuantity" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="入馆日期" prop="bkDateIn">
            <span class="demonstration">默认</span>
            <el-date-picker
              v-model="Books.bkDateIn"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </FormItem>
          <FormItem label="内容简介" prop="bkBrief">
            <Input type="text" v-model="Books.bkBrief" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="在馆状态" prop="bkStatus">
            <el-select v-model="Books.bkStatus" placeholder="请选择">
            <el-option label="在馆" value="在馆">
            </el-option>
            <el-option label="借出" value="借出">
            </el-option>
            <el-option label="遗失" value="遗失">
            </el-option>
            <el-option label="变卖" value="变卖">
            </el-option>
            <el-option label="销毁" value="销毁">
            </el-option>
            </el-select>
         <!--   <Input type="text" v-model="Books.bkStatus" placeholder="请输入"></Input>-->
          </FormItem>
        </Form>
      </div>
      <div class="footer">
        <el-button type="primary" size="large" @click="ModifyGoods('Books')" style="margin-top: 400px;margin-right: 30px;">提交修改</el-button>
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
            ModifyGoods(formName){
                const self=this;
                /*sessionStorage.getItem('bkID'),*/
                let books={
                    bkID:sessionStorage.getItem('bkID'),
                    bkCode:this.Books.bkCode,
                    bkName:this.Books.bkName,
                   bkAuthor:this.Books.bkAuthor,
                   bkPress:this.Books.bkPress,
                   bkDatePress:this.Books.bkDatePress,
                    bkISBN:this.Books.bkISBN,
                    bkCatalog:this.Books.bkCatalog,
                    bkLanguage:this.Books.bkLanguage,
                    bkPages:this.Books.bkPages,
                    bkPrice:this.Books.bkPrice,
                    bkQuantity:this.Books.bkQuantity,
                    bkDateIn:this.Books.bkDateIn,
                    bkBrief:this.Books.bkBrief,
                    bkStatus:this.Books.bkStatus
                }
                console.log(books.bkID)
                self.$http.post('/api/admin/updateBook',books).then(function(response){
                    console.log(response);
                    console.log('书籍更新成功');
                    this.$message({
                        message:'更新成功',
                        type:"success"
                    })
                    self.$router.push('/Book');
                }).then(function (error) {
                    console.log(error);
                })
            }
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
