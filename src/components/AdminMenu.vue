<template>
  <div>

    <Menu theme="light"  width="150px">

      <br><br>

      <Submenu name="0">

        <template slot="title">

          <Icon type="ios-people" />

          图书信息

        </template>

        <router-link :to="{path: '/Index'}">

          <MenuItem name="0-1">查看全部信息</MenuItem>

        </router-link>

      </Submenu>

      <Submenu name="1">

        <template slot="title">

          <Icon type="ios-paper" />

         借阅信息

        </template>

        <router-link :to="{path: '/BorrowRecord'}">

          <MenuItem name="1-1">个人已借阅</MenuItem>

        </router-link>


      </Submenu>

      <Submenu name="2">

        <template slot="title">

          <Icon type="ios-people" />

          个人信息

        </template>

        <router-link :to="{path: '/user'}">

          <MenuItem name="2-1">查看</MenuItem>

        </router-link>



      </Submenu>


      <br><br><br><br><br><br><br><br>

    </Menu>

  </div>
</template>

<script>
    export default {
        name: "AdminMenu",

    }
</script>

<style scoped>

</style>
