<template>
  <div>
    <el-input
      placeholder="书名、作者、图书序号、分类号"
      suffix-icon="el-icon-search"
      v-model="keyWords">
    </el-input><el-button @click="search_book()">搜索</el-button>
  <el-table
    ref="multipleTable"
    :data="book"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      type="selection"
      width="50">
    </el-table-column>
    <el-table-column
      prop="image"
      label="书籍"
      width="100">
      <template slot-scope="scope"><img :src="require(`../../service/${scope.row.bkCover.replace(/\\/g, '\/')}`)" style="width: 100px;height: 100px;">
      </template>
    </el-table-column>
    <el-table-column
      label="图书编号"
      width="80">
      <template slot-scope="scope">{{ scope.row.bkCode }}</template>
    </el-table-column>
    <el-table-column
    label="书名"
    width="170">
      <template slot-scope="scope">
      <el-popover trigger="hover" placement="top">
        <p>作者: {{ scope.row.bkAuthor }}</p>
        <p>出版社: {{ scope.row.bkPress}}</p>
        <p>出版日期: {{ scope.row.bkDatePress }}</p>
        <p>图书分类号: {{ scope.row.bkISBN }}</p>
        <p>页数：{{scope.row.bkPages}}</p>
        <p>语言：{{scope.row.bkLanguage}}</p>
        <el-button slot="reference">{{ scope.row.bkName }}</el-button>
      </el-popover>
      </template>
  </el-table-column>
    <el-table-column
      label="价格"
      width="70">
      <template slot-scope="scope">{{ scope.row.bkPrice}}</template>
    </el-table-column>
    <el-table-column
      label="数量"
      width="70">
      <template slot-scope="scope">{{ scope.row.bkQuantity}}</template>
    </el-table-column>
    <el-table-column
      label="入馆日期"
      width="90"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.bkDateIn}}</template>
    </el-table-column>
    <el-table-column
      label="内容简介"
      width="150"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.bkBrief}}</template>
    </el-table-column>
    <el-table-column
      label="图书状态"
      width="80"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.bkStatus}}</template>
    </el-table-column>
    <el-table-column
      label="操作"
    >
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          @click="handleEdit(scope.row.bkID)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.bkID)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>

</template>

<script>
  import App from "../App";
    export default {
        name: "Book",
        components:{App},
        inject:['reload'],
        data(){
            return{
                isLogin:false,
                keyWords:'',
                image:{

                }
                ,
                book:[{
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
                }],
                multipleSelection: []
            }
        },
        methods:{
            search_book(){
                console.log(this.keyWords)
                this.$router.push({name:'searchBook',params:{search:this.keyWords}})
            },
            getALlBooks:function () {

                let self=this;
                self.$http.post('/api/admin/getBook',{},{}).then((response) => {
                    console.log(response);
                    if(response.data==-1){
                        console.log('没有存储任何物品');
                        this.$message({
                            message:'没有存储任何商品',
                            type:"success"
                        })
                    }
                    else if(response.status==200){
                        console.log('查找成功');
                        this.book = response.data;
                        console.log(this.book)
                        let result = response.data;
                       self.book.bkID=result.bkID;
                        self.book.bkCode=result.description;
                        self.book.bkName=result.bkName;
                        self.book.bkAuthor=result.bkAuthor;
                        self.book.bkPress=result.bkPress;
                        self.book.bkDatePress=result.bkDatePress;
                        self.book.bkISBN=result.bkISBN;
                        self.book.bkCatalog=result.bkCatalog;
                        self.book.bkLanguage=result.bkLanguage;
                        self.book.bkPages=result.bkPages;
                        self.book.bkPrice=result.bkPrice;
                        self.book.bkQuantity=result.bkQuantity;
                        self.book.bkDateIn=JSON.stringify(result.bkDateIn);
                        self.book.bkBrief=result.bkBrief;
                       self.book.bkCover=result.bkCover
                        this.image=result.bkCover
                        console.log('照片路径'+this.image)
                        self.book.bkStatus=result.bkStatus;
                    }
                })
            },
            handleEdit(bkID){
                console.log('编辑参数'+bkID);
                this.$router.push({name:'EditBook',params:{bkID:bkID}})
            },
            handleDelete(bkID){
                console.log('参数' + bkID);
                this.$Modal.confirm({
                    title: '管理员您确认要删除',
                    content: '<p>确定删除此商品</p>',
                    onOk: () => {
                        this.$http.post('/api/admin/deleteBook', {bkID:bkID}, {}).then((response) => {
                            console.log(response);
                            if (response.status === 200) {
                                console.log('删除成功');
                                this.$message({
                                    message: '管理员您已将此商品删除，亲~~',
                                    type: 'success'
                                });
                                this.reload();
                            }
                        })
                    },
                    onCancel: () => {
                        this.$message.info('Clicked cancel');
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        },
        mounted() {
            this.getALlBooks()
        }
    }
</script>

<style scoped>
  *{
    padding-top: 15px;
  }
</style>
