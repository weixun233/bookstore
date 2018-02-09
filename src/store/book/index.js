import cache from 'common/js/cache'
import { getBookSource, getBookCatalog, getBookContent, getBookAuthor, getDiscuss, getBookReview } from 'api/book'
export default {
    namespaced: true,
    state: {
      bookid: '',                    // 当前书bookid
      book: {},
      bookChase: cache.getLocal('bookChase', [])     // 追的书
    },
    getters: {
      // 返回当前书是否已追
      ifLikeBook: (state, getters) => {
        return getters.liveIndex > -1
      },
      // 返回当前书在的追书的index
      liveIndex: state => {
        let index = state.bookChase.findIndex((item) => {
          return item._id === state.bookid
        })
        return index
      },
      // 返回当前书在的追书book
      liveBook: (state, getters) => {
        return state.bookChase[getters.liveIndex]
      }
    },
    mutations: {
      // 设置当前书籍
      set_book(state, book) {
        state.book = book
      },
      // 设置当前书籍的bookid
      set_bookid(state, bookid) {
        state.bookid = bookid
      },
      // 删除某书
      delete_bookChase(state, book) {
        let index = state.bookChase.findIndex(item => {
          return item._id === book._id
        })
        state.bookChase.splice(index, 1)
        cache.setLocal('bookChase', state.bookChase)
      },
      // 点击追书
      btnbookChase(state, book) {
        let index = state.bookChase.findIndex(item => {
          return item._id === book._id
        })
        // 存在删除 否则添加
        if (index > -1) {
          state.bookChase.splice(index, 1)
        } else {
          state.bookChase.push(book)
        }
        cache.setLocal('bookChase', state.bookChase)
      }
    },
    actions: {
      // 换源
      set_myCurrency({state, getters}, currency) {
        if (getters.ifLikeBook) {
          state.bookChase[getters.liveIndex].currency = currency
        } else {
          state.book.currency = currency
        }
      },
      // 点击追书后阅读章节 保存最后阅读的位置
      bookFollowerCount({commit, state, getters}, followerCount) {
        let book = getters.liveBook
        let index = getters.liveIndex
        if (index > 0) {
          state.bookChase.splice(index, 1)
          state.bookChase.unshift(book)
        }
        state.bookChase[0].followerCount = followerCount
        cache.setLocal('bookChase', state.bookChase)
      }
    }
}
