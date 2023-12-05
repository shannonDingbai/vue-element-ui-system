import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex)

// 创建一个vuex实例并暴露出去
export default new Vuex.Store({
    modules: {
        tab
    }
})