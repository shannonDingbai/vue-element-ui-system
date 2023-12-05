<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <common-aside/>
            </el-aside>
            <el-container>
                <el-header>
                    <common-header/>
                </el-header>
                <common-tag/>
                <el-main>
                    <!-- 路由的出口
                    组件的渲染 -->
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script>
import commonAside from '../components/commonAside.vue'
import commonHeader from '../components/commonHeader.vue'
import CommonTag from '../components/commonTag.vue'
import commonTag from '../components/commonTag.vue'
export default {
    components:{commonAside,commonHeader,commonTag, CommonTag},
    data(){
      return{

      }
    }

}
</script>
<style lang='less' scoped>

.el-main{
    height: calc(100vh - 60px);
}
    .el-header {
        padding:0;
    }


</style>