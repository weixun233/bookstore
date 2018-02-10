import cache from 'common/js/cache'
export default {
    namespaced: true,
    state: {
      indexActive: 'index',          // active的栏目
      // 栏目数据
      indexColumn: [
        {
          classname: '追书',
          classpath: 'index'
        },
        {
          classname: '发现',
          classpath: 'find'
        }
      ]
    },
    getters: {
      activeMeta: state => {
        // 当前active的栏目的index
        let index = state.indexColumn.findIndex(item => item.classpath === state.indexActive)
        return { index }
      },
      indexActive: state => state.indexActive
    },
    mutations: {
        set_indexActive(state, val) {
            state.indexActive = val
            cache.setSession('index_Active', val)
        }
    },
    actions: {
        // 获取active栏目缓存
        get_indexActive_cache({ commit, dispatch }) {
          const data = cache.getSession('index_Active')
          if (data) {
            commit('set_indexActive', data)
          } else {
            commit('set_indexActive', 'index')
          }
        }
    }
}
