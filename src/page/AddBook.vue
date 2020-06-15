<template>
  <div class="form">
    <label>封面照：</label>
    <input type="file" value="" />
 <Form ref="Books" :model="Books" :label-width="80"class="form-add" >
      <FormItem label="图书编号" prop="bkCode">
        <Input v-model="Books.bkCode" placeholder="请输入" type="text"/>
      </FormItem>
      <FormItem label="书名" prop="description">
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
      </FormItem>
      <FormItem label="页数" prop="bkPages">
        <Input type="text" v-model="Books.bkPages" placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="价格" prop="bkPrice">
        <Input type="text" v-model="Books.bkPrice" placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="入库数量" prop="bkQuantity">
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
   <!--<FormItem label="图书封面照" prop="bkCover">
        <Input type="text" v-model="Books.bkCover" placeholder="请输入"></Input>
      </FormItem>-->
      <!-- <FormItem label="图书封面照">
          <input type="file" value="" />
      </FormItem>-->
    <FormItem>
        <Button type="primary" style="width: 300px" @click="addGoods('Books')">确认添加此书籍 </Button>
      </FormItem>
    </Form>

  </div>
</template>

<script>
    export default {
        name: "AddBook",
        data() {
            return {
                isPicture:false,
                Books: {
                    bkID: '',
                    bkCode: '',
                    bkName: '',
                    bkAuthor: '',
                    bkPress: '',
                    bkDatePress: '',
                    bkISBN: '',
                    bkCatalog: '',
                    bkLanguage: '',
                    bkPages: '',
                    bkPrice: '',
                    bkQuantity: '',
                    bkDateIn: '',
                    bkBrief: '',
                    bkCover: '',
                },

            }
        },
        methods: {
            addGoods(Books) {
                this.Books.bkCover=sessionStorage.getItem('picture');
                 this.$http.post('/api/admin/addBook',this.Books,{}).then(function(response){
                    console.log(response);
                    console.log('添加成功');
                    this.$message({
                        message:'恭喜您，商品添加成功~~~~~,请查看',
                        type:"success"
                    })
                     this.$router.push('/Book')
                }).then(function (error) {
                    console.log(error);
                })

            },

        },
        mounted: function () {
            // js
            var Input = document.querySelector("input");
            Input.onchange = function upload(){
                var files = !!this.files ? this.files : [];
                if (!files.length || !window.FileReader) {
                    console.log("浏览器不支持HTML5");
                    return false;
                };
                // 创建一个FormData对象,用来组装一组用 XMLHttpRequest发送请求的键/值对
                var fd = new FormData();
                // 把 input 标签获取的文件加入 FromData 中
                fd.append('file', files[0]);


                /* this.$http.post('/api/upload/load', fd, {}).then((response) => {
                         if (response.status === 200) {
                             console.log('上传成功')
                         } else {
                             console.log('上传失败')
                         }
                     });*/
                var request = new XMLHttpRequest();
                request.open("POST", "/api/admin/addPicture");
                request.send(fd);
                request.onreadystatechange = function(){
                    if(request.readyState === 4 & request.status === 200){
                        console.log("上传成功");
                        var response = JSON.parse(request.responseText);
                        console.log(response);
                        sessionStorage.setItem('picture',response.url)
                    }
                }
            }

        },

    }
</script>

<style scoped>
  .form-add{
    width: 50%;
    margin-top: 20px;
    text-align: center;
  }
  .form{
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;

  }
</style>
