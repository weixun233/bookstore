import cache from 'common/js/cache'
import {getSearchAuto, getSearch, getSearchHot} from 'api/rank'
export default {
    namespaced: true,
    state: {
      searchHistory: cache.getLocal('searchHistory', [])  // 搜索历史数据
    },
    getters: {
    },
    mutations: {
      set_searchHistory(state, val) {
        let index = state.searchHistory.findIndex(item => {
          return item === val
        })
        if (index > -1) {
          state.searchHistory.splice(index, 1)
        }
        state.searchHistory.unshift(val)
        cache.setLocal('searchHistory', state.searchHistory)
      },
      delete_searchHistory(state, index) {
        state.searchHistory.splice(index, 1)
        cache.setLocal('searchHistory', state.searchHistory)
      },
      clear_searchHistory(state, index) {
        state.searchHistory = []
        cache.setLocal('searchHistory', state.searchHistory)
      }
    },
    actions: {
    }
}
