export default {
    state: {
        //组件之间公用的属性
        isCollapse: false, //控制菜单的展开或者收起
        tabsList: [{
            path: "/",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
        }]
    },
    mutations: {
        clickMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //面包屑数据处理
        selectMenu(state, val) {
            //判断提交的数据是否为首页且判断提交的数据页面是否存在
            if (val.name !== 'home') {
                const idx = state.tabsList.findIndex(item => item.name === val.name)
                if (idx === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        //指定的tag删除处理
        closeTag(state, item) {
            console.log(item, 'item');
            const idx = state.tabsList.findIndex(value => value.name === item.name)
            state.tabsList.splice(idx, 1)
        }
    },

}