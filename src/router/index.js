import Vue from 'vue'
import Router from 'vue-router'
import Login from "../page/Login";
import HelloWorld from "../components/HelloWorld";
import Admin from "../page/Admin";
import UserMessage from "../components/UserMessage";
import UserInfo from "../components/UserInfo";
import AdminMenu from "../components/AdminMenu";
import ModifyPassword from "../page/ModifyPassword";
import Book from "../page/Book";
import AddBook from "../page/AddBook";
import EditBook from "../page/EditBook";
import searchBook from "../page/searchBook";
import AllUser from "../page/AllUser";
import editUser from "../page/editUser";
import AdminIndex from "../page/AdminIndex";
import Index from "../page/Index";
import borrowBook from "../page/borrowBook";
import borrowIndex from "../page/borrowIndex";
import returnBook from "../page/returnBook";
import rdType from "../page/rdType";
import addRdType from "../page/addRdType";
import ModifyRdType from "../page/ModifyRdType";
import continueLend from "../page/continueLend";
import BorrowRecord from "../page/BorrowRecord";
import showBook from "../page/showBook";
import Header from "../components/Header";
import user from "../page/user";
import HandleRecord from "../page/HandleRecord";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/BorrowRecord',
      name: 'BorrowRecord',
      component: BorrowRecord,
    },
    {
      path: '/Header',
      name: 'Header',
      component: Header
    },
    {
      path:'/showBook',
      name:'showBook',
      components:showBook,
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      children:[
        {
          path: '/ModifyPassword',
          name: 'ModifyPassword',
          component: ModifyPassword
        },
        {
          path: '/UserInfo',
          name: 'UserInfo',
          component: UserInfo
        },
        {
          path: '/Book',
          name: 'Book',
          component: Book,
        },
        {
          path: '/AdminIndex',
          name: 'AdminIndex',
          component: AdminIndex
        },
        {
          path: '/AddBook',
          name: 'AddBook',
          component: AddBook
        },
        {
          path: '/EditBook',
          name: 'EditBook',
          component: EditBook
        },

        {
          path: '/searchBook',
          name: 'searchBook',
          component: searchBook
        },
        {
          path: '/AllUser',
          name: 'AllUser',
          component: AllUser
        },
        {
          path: '/editUser',
          name: 'editUser',
          component: editUser
        },
        {
          path: '/borrowBook',
          name: 'borrowBook',
          component: borrowBook
        },
        {
          path: '/borrowIndex',
          name: 'borrowIndex',
          component: borrowIndex
        },
        {
          path: '/returnBook',
          name: 'returnBook',
          component: returnBook
        },
        {
          path: '/rdType',
          name: 'rdType',
          component: rdType
        },
        {
          path: '/addRdType',
          name: 'addRdType',
          component: addRdType
        },
        {
          path: '/ModifyRdType',
          name: 'ModifyRdType',
          component: ModifyRdType
        },
        {
          path: '/continueLend',
          name: 'continueLend',
          component: continueLend
        },
        {
          path: '/HandleRecord',
          name: 'HandleRecord',
          component: HandleRecord
        }
      ],
    },
    {
      path:'/Index',
      name:'Index',
      component:Index
    },
    {
      path: '/UserMessage',
      name: 'UserMessage',
      component: UserMessage
    },
   {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/AdminMenu',
      name: 'AdminMenu',
      component: AdminMenu
    },
    {
      path:'/user',
      name:'user',
      component:user
    }

  ]
})
