<template>
    <div>
        <el-menu default-active="1-4-1" 
                class="el-menu-vertical-demo" 
                @open="handleOpen" 
                @close="handleClose" 
                :collapse="isCollapse"  
                background-color="#545c64" 
                text-color="#fff"
                active-text-color="#ffd04b">
            <h3>{{isCollapse?'后台':"通用后台系统管理"}}</h3>
            <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
            <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
              <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
              </template>
                    <el-menu-item-group  v-for="subitem in item.children" :key="subitem.label">
                        <el-menu-item @click="clickMenu(subitem)" :index="subitem.path">{{subitem.label}}</el-menu-item>
                    </el-menu-item-group>
            </el-submenu>
</el-menu>
</div>
</template>

<style lang='less' scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-menu {
        border: none;
        height: 100vh;
        h3 {
            text-align: center;
            line-height: 48px;
            color: #fff;
            font-size: 16px;
            font-weight: 400;
        }
    }

</style>

<script>
    export default {
        data() {
            return {
                menuData: [
                    {
                    path: "/",
                    name: "home",
                    label: "首页",
                    icon: "s-home",
                    url: "Home/Home",
                    },
                    {
                    path: "/Mall",
                    name: "mall",
                    label: "商品管理",
                    icon: "video-play",
                    url: "MallManage/MallManage",
                    },
                    {
                    path: "/user",
                    name: "user",
                    label: "用户管理",
                    icon: "user",
                    url: "UserManage/UserManage",
                    },
                    {
                    label: "其他",
                    icon: "location",
                    children: [
                        {
                        path: "/page1",
                        name: "page1",
                        label: "页面一",
                        icon: "setting",
                        url: "Other/PageOne",
                        },
                        {
                        path: "/page2",
                        name: "page2",
                        label: "页面二",
                        icon: "setting",
                        url: "Other/PageTwo",
                        },
                    ],
                    },
            ]
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            clickMenu(item) {
                //当前的页面与跳转页面的路由不一样才跳转，this.$route：当前页面路由
                if(this.$route.path !== item.path  && !(this.$route.path === '/home' && item.path == "/") ){
                    //this.$router:这只得是路由实例
                    this.$router.push(item.path)
                    console.log(item);
                }
                this.$store.commit('selectMenu',item)
                
            }
        },
        computed: {
            //没有子菜单
            noChildren() {
                return this.menuData.filter(item => !item.children)
            },
            //有子菜单
            hasChildren() {
                return this.menuData.filter(item => item.children)
            },
            isCollapse() {
                return this.$store.state.tab.isCollapse
            }
        }
    }
</script>