import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

Router.prototype.go = function() {
  this.isBack = true
  window.history.go(-1)
}

const index = () => import('views/index/index')
const rank = () => import('views/rank/rank')
const rankDetails = () => import('views/rank/children/rank-details')
const classify = () => import('views/classify/classify')
const classifyDetails = () => import('views/classify/children/classify-details')
const themeBook = () => import('views/themeBook/themeBook')
const themeBookDetails = () => import('views/themeBook/children/themeBook-details')
const book = () => import('views/book/book')
const bookDetails = () => import('views/book/children/book-details')
const bookCurrency = () => import('views/book/children/book-currency')
const bookAuthor = () => import('views/book/children/book-author')
const bookRecommend = () => import('views/book/children/book-recommend')
const search = () => import('views/search/search')

export default new Router({
  routes: [
    {
      path: '',
      name: '/index',       // 默认选中页面
      redirect: '/index'
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/index/rank',
      component: rank
    },
    {
      path: '/index/rank-details',
      component: rankDetails
    },
    {
      path: '/index/classify',
      component: classify
    },
    {
      path: '/index//classify-details',
      component: classifyDetails
    },

    {
      path: '/index/themeBook',
      component: themeBook
    },
    {
      path: '/index/themeBook-details',
      component: themeBookDetails
    },
    {
      path: '/index/book',
      component: book,
      children: [
        {
          path: 'book-author',
          component: bookAuthor
        },
        {
          path: 'book-details',
          component: bookDetails,
          children: [
            {
              path: 'book-currency',
              component: bookCurrency
            }
          ]
        },
        {
          path: 'book-recommend',
          component: bookRecommend
        }
      ]
    },
    {
      path: '/index/search',
      component: search
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
