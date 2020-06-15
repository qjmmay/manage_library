<template>
  <section class="admin-layout-container">
    <div class="layout">

      <Layout>
        <Sider ref="sidebar" class="sidebar" hide-trigger collapsible width="230" :collapsed-width="78" v-model.trim="isCollapsed">
          <div class="logo" >
            <div class="xfind-line" v-if="!isCollapsed">
              <div class="line-h"></div>
            </div>
            <div v-if="!isCollapsed" class="logo-saiqu">
              <Avatar icon="ios-person" size="large"/>
              <span class="user-name" >{{username}}</span>
            </div>
            <Avatar icon="ios-person" size="large" v-else/>
          </div>
          <Menu
            ref="side_menu"
            :active-name="activeMenuName"
            :open-names="openMenuName"
            theme="light"
            width="230px"
            :class="menuitemClasses"
            @on-select="choosedMenu"
            v-if="!isCollapsed">
            <template v-for="(menu,menu_index) in menus">
              <Submenu :name="menu.name" v-if="menu.children" :key="menu_index">
                <template slot="title">
                  <Icon :size="20" :type="menu.icon"></Icon>
                  <span>{{menu.title}}</span>
                </template>
                <MenuItem :name="child.name" v-for="(child ,child_index) in menu.children" :key="child_index">
                  <Icon :size="20" :type="child.icon"></Icon>
                  <span>{{child.title}}</span>
                </MenuItem>
              </Submenu>
              <MenuItem :name="menu.name" v-if="!menu.children && menu.showInMenus" :key="menu_index">
                <Icon :size="20" :type="menu.icon" :key="menu_index"></Icon>
                <span>{{menu.title}}</span>
              </MenuItem>
            </template>
          </Menu>

          <div class="dropdown-wrap"  v-if="isCollapsed">
            <div class="dw-content">
              <template v-for="(menu,menu_index) in menus">
                <Dropdown transfer placement="right-start" v-if="menu.children" @on-click="dropdownClick" :key="menu_index">
                  <Button class="dd-btn" type="text">
                    <Icon :size="25" :type="menu.icon"></Icon>
                  </Button>
                  <DropdownMenu class="dd-menu" slot="list">
                    <template v-for="(child, i) in menu.children">
                      <DropdownItem :name="child.name" :key="i">
                        <div class="ddi-wapper">
                          <Icon :size="16" :type="child.icon"></Icon>
                          <span class="ddi-text">
                              {{ child.title }}
                          </span>
                        </div>
                      </DropdownItem>
                    </template>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown transfer v-if="!menu.children && menu.showInMenus" placement="right-start" @on-click="dropdownClick" :key="menu_index">
                  <Button class="dd-btn" type="text">
                    <Icon :size="25" :type="menu.icon"></Icon>
                  </Button>
                  <DropdownMenu class="dd-menu" slot="list">
                    <DropdownItem :name="menu.name">
                      <div class="ddi-wapper">
                        <Icon :size="16" :type="menu.icon"></Icon>
                        <span class="ddi-text">
                          {{ menu.title }}
                      </span>
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </template>
            </div>
          </div>
        </Sider>
        <Layout>
          <Header class="layout-header-bar">
            <div class="header-wapper">
              <div class="header-left">
                <Icon @click.native="collapsedSider" :class="rotateIcon" type="md-menu" size="28"></Icon>
                <span class="header-title">图书管理系统</span>
              </div>

              <div class="header-right">
                <Button type="text" icon="md-exit" class="btn-blue" size="large" @click="quit">退出系统</Button>
              </div>
            </div>
          </Header>
          <Content class="main-content">

            <Layout class="main-layout-con">

              <div class="tags-nav-wapper">

                <div class="tags-nav">

                  <div class="btn-con left-btn">

                    <Button type="text" @click="handleScroll(240)">

                      <Icon :size="18" type="ios-arrow-back" />

                    </Button>

                  </div>

                  <div ref="scrollOuter" class="scroll-outer" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">

                    <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">

                      <transition-group name="taglist-moving-animation">

                        <Tag type="dot"

                             v-for="tab in tags"

                             :closable="tab.closable"

                             :color="tab.choosed? 'primary':'#e9eaec'"

                             :name="tab.name"

                             @click.native="clickTag(tab)"

                             @on-close="closeTag"

                             :key="tab.name">

                          {{tab.title}}

                        </Tag>

                      </transition-group>

                    </div>

                  </div>

                  <div class="btn-con right-btn">

                    <Button type="text" @click="handleScroll(-240)">

                      <Icon :size="18" type="ios-arrow-forward" />

                    </Button>

                  </div>

                </div>

              </div>

              <Content class="content-wrapper">


                <!--保存组件状态到内存，避免重新渲染-->

                <keep-alive>

                  <router-view/>

                </keep-alive>

              </Content>

            </Layout>

          </Content>

        </Layout>

      </Layout>

    </div>

  </section>

</template>

<script>
/*import AdminPanel from "../components/AdminPanel";*/
    export default {

        data(){

            return{

                isCollapsed: false,
                title:'首页',
                activeMenuName:'admin',
                openMenuName:[],
                tagBodyLeft: 0,
                rightOffset: 40,
                outerPadding: 4,
                contextMenuLeft: 0,
                contextMenuTop: 0,
                visible: false,
                menus:[
                    {

                        title:'首页',

                        num:1,

                        name:'admin',

                        icon:'ios-home',

                        href:'/AdminIndex',

                        closable:false,

                        showInTags:true,

                        showInMenus:true,

                        choosed:true

                    },

                    {

                        title:'用户管理',

                        name:'members-agents',

                        icon:'ios-people',

                        children:[

                            {

                                title:'个人用户信息',

                                name:'userManage',

                                href:'/UserInfo',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                            {

                                title:'管理用户信息',

                                name:'memberLevels',

                                href:'/AllUser',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                            {

                                title:'会员',

                                name:'memberRemit',

                                href:'/home',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                            {

                                title:'读者照片管理',

                                name:'agentManage',

                                href:'/home',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                            {

                                title:'审核情况',

                                name:'agent-audit',

                                href:'/home',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            }

                        ]

                    },

                    {

                        title:'图书管理',

                        name:'system-manage',

                        icon:'ios-cog',

                        children:[

                            {

                                title:'显示所有图书',

                                name:'backwater-setting',

                                href:'/Book',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                            {

                                title:'添加图书',

                                name:'commissionSetting',

                                href:'/AddBook',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                            {

                                title:'图书修改',

                                name:'subAccount',

                                href:'/home',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                            {

                                title:'图书删除',

                                name:'onlinePayAccount',

                                href:'/home',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                        ]

                    },

                    {

                        title:'借阅管理',

                        name:'accounting-manage',

                        icon:'ios-cash',

                        children:[

                            {

                                title:'借书',

                                name:'companyPayment',

                                href:'/borrowBook',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                            {

                                title:'续借',

                                name:'paymentBoard',

                                href:'/continueLend',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                            {

                                title:'还书',

                                name:'withdrawalAudit',

                                href:'/returnBook',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },


                        ]

                    },

                    {

                        title:'读者类别管理',

                        name:'frontend-setting',

                        icon:'logo-html5',
                        href:'/rdType',

                        children:[

                            {

                                title:'查看类别',

                                name:'about26',

                                href:'/rdType',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                            {

                                title:'添加类别',

                                name:'about27',

                                href:'/addRdType',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                            {

                                title:'待审核',

                                name:'about28',

                                href:'/home',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            }

                        ]

                    },

                    {

                        title:'管理员密码修改',

                        name:'game-platform-manage',

                        icon:'ios-game-controller-b',

                        children:[

                            {

                                title:'密码修改',

                                name:'platform-manage',

                                href:'/ModifyPassword',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                            {

                                title:'管理',

                                name:'game-manage',

                                href:'/home',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            }

                        ]

                    },

                    {

                        title:'借阅记录',

                        name:'activity-center',

                        icon:'ios-cafe',

                        children:[

                            {

                                title:'查看读者记录',

                                name:'about29',

                                href:'/HandleRecord',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                            {

                                title:'活动模板设置',

                                name:'about30',

                                href:'/home',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            },

                        ]

                    },

                    {

                        title:'账号管理',

                        name:'notice-manage',

                        icon:'md-volume-mute',

                        children:[

                            {

                                title:'注销',

                                name:'system-notice',

                                href:'/Login',

                                closable:true,

                                showInTags:false,

                                showInMenus:true,

                                choosed:false

                            }

                        ]

                    },

                ]

                // ------------------------------  菜单操作结束  --------------------------------

            }

        },

        computed: {

            // 筛选menus中选中的menu
            username(){
                return sessionStorage.getItem('rdName')
            },

            tags(){

                let tags = [];

                // 将menus中showInTags=true的标签放到tags数组中

                this.menus.forEach(menu=>{

                    if(menu.showInTags){

                        tags.push(menu);

                    }else if(menu.children){

                        menu.children.forEach(child=>{

                            if(child.showInTags){

                                tags.push(child)

                            }

                        })

                    }

                });

                //标签数组排序，从小到到

                tags.sort((a,b)=>{

                    return (a.num - b.num)

                })

                return tags;

            },

            rotateIcon () {

                return [

                    'menu-icon',

                    this.isCollapsed ? 'rotate-icon' : ''

                ];

            },

            menuitemClasses () {

                return [

                    'menu-item',

                    this.isCollapsed ? 'collapsed-menu' : ''

                ]

            }

        },

        // ------------------------------  菜单操作开始  --------------------------------

        //刷新页面之后保存并选中最后一次菜单和标签

        beforeRouteEnter (to, from, next) {

            next(vm => {

                // 通过 `vm` 访问组件实例

                let activeMenuName = localStorage.activeMenuName;

                vm.activeMenuName = activeMenuName;



                let tags_last_num = vm.tags[vm.tags.length - 1].num;



                if(activeMenuName && activeMenuName.length != 0){

                    vm.menus.forEach(_menu=>{

                        if(activeMenuName == _menu.name){

                            _menu.choosed = true;

                            _menu.showInTags = true;

                            _menu.num = tags_last_num + 1;

                        }

                        else if(_menu.children){

                            _menu.children.forEach(child=>{

                                if(activeMenuName == child.name){

                                    child.choosed = true;

                                    child.showInTags = true;

                                    child.num = tags_last_num + 1;

                                    vm.openMenuName = [_menu.name];

                                }

                            })

                        }

                        else{

                            // 排除首页

                            if(_menu.name != 'admin'){

                                _menu.choosed = false;

                                _menu.showInTags = false;

                            }else{

                                _menu.choosed = false;

                            }

                        }

                    })

                }

                vm.$nextTick(()=>{

                    // console.log(vm.$refs.side_menu, 22)

                    // vm.$refs.side_menu.updateOpened();

                    // vm.$refs.side_menu.updateActiveName();

                });

            })

        },

        // ------------------------------  菜单操作结束  --------------------------------

        methods: {

            /*tags 滚动事件 */

            handlescroll (e) {

                var type = e.type

                let delta = 0

                if (type === 'DOMMouseScroll' || type === 'mousewheel') {

                    delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40

                }

                this.handleScroll(delta)

            },

            /*tags 滑动事件 */

            handleScroll (offset) {

                const outerWidth = this.$refs.scrollOuter.offsetWidth

                const bodyWidth = this.$refs.scrollBody.offsetWidth

                if (offset > 0) {

                    this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)

                } else {

                    if (outerWidth < bodyWidth) {

                        if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {

                            this.tagBodyLeft = this.tagBodyLeft

                        } else {

                            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)

                        }

                    } else {

                        this.tagBodyLeft = 0

                    }

                }

            },

            quit(){
                sessionStorage.removeItem('rdName');
                this.$router.push('/')

            },

            clickNotice(){

                this.choosedMenu('notice');

            },

            collapsedSider() {

                this.$refs.sidebar.toggleCollapse();

            },

            // ------------------------------  菜单操作开始  --------------------------------

            closeTag(event, name){

                // 判断该标签是否是选中状态

                // 如果是那么就要设置标签数组中最后一个标签成选中状态

                // 如果否那么就直接删除就好

                let is_choosed = false;

                this.menus.forEach((menu)=>{

                    if(menu.name == name){

                        is_choosed = menu.choosed;

                        menu.showInTags = false;

                    }else if(menu.children){

                        menu.children.forEach(child=>{

                            if(child.name == name){

                                is_choosed = child.choosed;

                                child.showInTags = false;

                            }

                        })

                    }

                })

                // 关闭标签并选中tags中最后一个标签高亮

                if(is_choosed){

                    let last_tag = this.tags[this.tags.length-1];

                    last_tag.choosed = true;

                    this.$router.push(last_tag.href);

                    this.activeMenuName = last_tag.name;

                    localStorage.activeMenuName = this.activeMenuName;

                }

            },

            clickTag(tag){

                this.tags.forEach(_tag=>{

                    if(_tag.name == tag.name){

                        _tag.choosed=true;

                    }else{

                        _tag.choosed= false;

                    }

                })

                // 设置菜单选中name

                this.activeMenuName = tag.name;

                localStorage.activeMenuName = this.activeMenuName;

                // 刷新菜单

                this.$nextTick(()=>{

                    if(this.$refs.side_menu){

                        this.$refs.side_menu.updateActiveName()

                    }

                });

                //点击tab跳转

                this.$router.push(`${tag.href}`);

            },

            choosedMenu(name){

                // 获取标签数组最后一个元素的num

                let tags_last_num = this.tags[this.tags.length - 1].num;

                // 设置选中菜单name

                this.activeMenuName = name;

                localStorage.activeMenuName = this.activeMenuName;



                //根据name查找对应的菜单对象

                let menu = null;

                this.menus.forEach(_menu=>{

                    if(_menu.name == name){

                        // 只有不在tags数组中的元素才能设置num

                        if(!_menu.showInTags){

                            _menu.num = tags_last_num + 1;

                        }

                        menu = _menu;

                        _menu.showInTags = true;

                        _menu.choosed = true;



                    }

                    else if(_menu.children){

                        _menu.children.forEach(child=>{

                            if(child.name == name){

                                // 只有不在tags数组中的元素才能设置num

                                if(!_menu.showInTags){

                                    child.num = tags_last_num + 1;

                                }

                                menu = child;

                                child.showInTags = true;

                                child.choosed = true;



                            }else{

                                child.choosed = false;

                            }

                        })

                    }

                    else {

                        _menu.choosed = false;

                    }

                })

                this.$router.push(`${menu.href}`);

            },

            dropdownClick(name){

                this.choosedMenu(name);

            }

            // ------------------------------  菜单操作结束  --------------------------------

        }

    }

</script>
<style scoped="scss">
/*  @import "../assets/index.scss";
  @import "../assets/common.scss";
  @import "../assets/Layout.scss";
  @import "../assets/master.scss";*/
</style>

