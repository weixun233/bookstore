import Vue from 'vue'
import Vuex from 'vuex'
import indexModule from './index/index'
import bookModule from './book/index'
import searchModule from './search/index'
import loadModule from './load/index'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
// 本项目为了尽可能深入vue的层面，这里vuex使用modules，以页面级的方式来进行状态管理 （适合大型项目：native端将会展示）
// 这里的全局状态可以用来管理类似：登录、设备信息等（更多内容请查看vuex官网）

const state = {}

const getters = {}

const mutations = {}

const actions = {}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        index: indexModule,
        book: bookModule,
        search: searchModule,
        load: loadModule
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
