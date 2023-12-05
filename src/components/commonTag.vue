<template>
    <div class="tag-group">
        <el-tag
            v-for="(item,index) in items"
            :closable="item.name !=='home'"
            :key="item.path"
            :effect="$route.name === item.name?'dark':'plain'"
            @click="changeMenu(item)"
            @close="closeMenu(item,index)"
            size="small">
            {{ item.label }}
        </el-tag>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default({
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            items: state=>state.tab.tabsList
        })
    },
    mounted(){
    },
    methods:{
        //想要获取mutation中的方法
        ...mapMutations(['closeTag']),
        //点击切换页面
        changeMenu(item){
            //当前的页面与跳转页面的路由不一样才跳转，this.$route：当前页面路由    
            // if(this.$route.path !== item.path  && !(this.$route.path === '/home' && item.path == "/") ){
            //         //this.$router:这只得是路由实例
            //         this.$router.push({name:item.name})
            //         console.log(item);
            //     }
            this.$router.push({name:item.name})
            console.log(item);
            
        },
                //关掉tag并使得最后一个tag成高亮状态
        closeMenu(item,index) {
            //调用store中的mutation，获取数据
            this.closeTag(item)
            const length =this.items.length
            //删除之后的跳转逻辑
            //如果删除的tag与当前激活的页面没有关系，就不跳转
            if(item.name !== this.$route.name){
                return
            }
            //表示删除的最后一项
            if(index===length){
                //此时应该跳转到删除的这个tag的前一个tag
                this.$router.push({
                    name:this.items[index-1].name
                })
            }else {
                this.$router.push({
                    name:this.items[index].name
                })
            }

        }
    }

})
</script>
<style lang="less" scoped>
.tag-group{
    padding: 20px;
    .el-tag {
        margin-right: 15px;
    }
}
</style>
