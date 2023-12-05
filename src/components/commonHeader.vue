<template>
    <div class="header-container">
        <div class="l-container">
            <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
</el-breadcrumb>
        </div>
        <div class="r-container">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user_info" src="../assets/logo.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {

        }
    },
    methods:{
        handleMenu() {
            this.$store.commit('clickMenu')
        }
    },
    computed:{
        ...mapState({
        tags:state=>state.tab.tabsList
    })

}}
</script>
<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .l-container {
        display: flex;
        align-items: center;
        // span {
        //     font-size: 14px;
        //     color: #fff;
        //     margin-left: 10px;
        // }
        .el-breadcrumb__item {
            margin-left: 20px;
            /deep/.el-breadcrumb__inner {
                &is-link {
                    color: #fff;
            }
        }
            // &:last-child {
            // .el-breadcrumb__inner{
            //     color: #fff;
            // }    
            // }
    }
    }
    .r-container {
        .user_info {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
</style>