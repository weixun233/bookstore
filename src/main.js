import 'babel-polyfill' // 转义ES6语法
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick' // 点击无300ms延迟
import VueLazyLoad from 'vue-lazyload' // 图片懒加载

import 'common/css/_index.sass'
// 自定义组件库
import plugin from 'plugin/index'

// 自定义组件
import SonHeader from 'components/son-header'
import BookList from 'components/book-list'
import BookNav from 'components/book-nav'
import TagsList from 'components/tags-list'

Vue.component('son-header', SonHeader)
Vue.component('book-list', BookList)
Vue.component('book-nav', BookNav)
Vue.component('tags-list', TagsList)

fastclick.attach(document.body)
Vue.use(plugin)
Vue.use(VueLazyLoad, {
  loading: 'http://ww1.sinaimg.cn/large/005NbQwaly1fnyos8brl5j305x05nmwx.jpg'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
