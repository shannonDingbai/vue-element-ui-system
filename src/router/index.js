import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

import home from '../views/Home.vue'
import user from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
import Cookie from 'js-cookie'

// 1、创建组件
//    引用组件

//2、定义路由
const routes = [{
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            { path: 'home', name: 'home', component: home }, //首页
            { path: 'user', name: 'user', component: user }, //用户管理
            { path: 'Mall', name: 'mall', component: Mall }, //商品管理
            { path: 'page1', name: 'page1', component: PageOne }, //页面一
            { path: 'page2', name: 'page2', component: PageTwo }, //页面二
        ]

    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }

]

// 3、创建路由实例
const router = new VueRouter({
        routes
    })
    //全局导航守卫
router.beforeEach((to, from, next) => {
    const token = Cookie.get('token');
    if (!token && to.name !== 'login') {
        next({ name: 'login' })
    } else if (token && to.name === 'login') {
        next({ name: 'home' })
    } else {
        next()
    }
})

export default router