export default {
  namespaced: true,
  state: {
    // 加载load
    loading: false,      // 是否显示加载页面
    loadVisible: true,   // 加载中/失败
    loadTitle: '加载中...',
    loadReload: Function  // 失败后点击重试 执行的方法
  },
  getters: {
  },
  mutations: {
    set_loading(state, Boolean) {
      state.loading = Boolean
    },
    set_loadVisible(state, Boolean) {
      state.loadVisible = Boolean
    },
    set_loadTitle(state, String) {
      state.loadTitle = String
    },
    set_loadReload(state, func) {
      state.loadReload = func
    }
  },
  actions: {}
}
