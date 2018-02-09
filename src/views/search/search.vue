<template>
  <zf-container>
    <header>
      <i class="iconfont icon-zuojiantou" @click="$router.go(-1)"></i>
      <div class="input">
        <input ref="input" type="text" v-model="query" placeholder="输入书名或作者名">
        <i class="delete" @click="deleteQuery" v-show="query   ">X</i>
      </div>
      <i class="iconfont icon-search"></i>
    </header>
    <!--热门关键词-->
    <h3>
      <span>大家都在搜</span>
      <span @click="setHot">换一换</span>
    </h3>
    <tags-list :data="hotQuery" @selectTags="addQuery"></tags-list>
    <!--搜索历史-->
    <h3 v-show="searchHistory.length">
      <span>搜索历史</span>
      <span class="clear" @click="clearHistory">清空</span>
    </h3>
    <ul class="history" v-show="searchHistory.length">
      <li v-for="(item, index) in searchHistory" :key="index" @click="addQuery(item)">{{item}}</li>
    </ul>
    <!--搜索自动补全-->
    <search-auto :data="queryAuto"
                 v-show="queryAuto.length"
                 @listScroll="blurInput"
                 @selectAuto="selectAuto"></search-auto>
    <!--搜索结果-->
    <book-list class="bookList"
               :data="result"
               v-show="resultAppear"
               listClass="two"
               @select="selectBook"></book-list>
    <zf-confirm ref="confirm" title="是否清空搜索历史" @confirm="clear_searchHistory"></zf-confirm>
    <router-view></router-view>
  </zf-container>
</template>
<script>
  import SearchAuto from './components/search-auto'
  import {getSearchHot, getSearchAuto, getSearch} from 'api/search'
  import {funcThrottle, getRandomInt} from 'common/js/util'
  import {routerList} from 'common/js/mixin'
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'search',
    mixins: [routerList],
    activated() {
      this.$refs.input.focus()
      setTimeout(() => {
        this.init()
      }, 20)
      this.$emit('activatedLoad')
    },
    // keep-alive组件停用时调用
    deactivated() {
      this.$emit('leave')
    },
    data() {
      return {
        resultAppear: false,        // 搜索结页也是否出现
        query: '',  // 搜索关键词
        hot: [],      // 热门关键词
        hotQuery: [], // 提取的热门关键词
        queryAuto: [],  // 自动补全数据
        result: []       // 搜索结果
      }
    },
    watch: {
      query() {
        this.resultAppear = false
        funcThrottle(this._getSearchAuto(), 200)
      }
    },
    computed: {
      ...mapState('search', [
        'searchHistory'
      ])
    },
    methods: {
      ...mapMutations('search', [
        'set_searchHistory',
        'delete_searchHistory',
        'clear_searchHistory'
      ]),
      init() {
        this.$emit('load')
        // 热门关键词
        getSearchHot().then((res) => {
          if (res.ok) {
            this.hot = res.searchHotWords
            this.setHot()
            this.$emit('loadOk')
          } else {
            this.$emit('loadNo', this.init)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this.init)
        })
      },
      // query补全
      _getSearchAuto() {
        this.$emit('load')
        getSearchAuto(this.query).then((res) => {
          console.log(res)
          if (res.ok) {
            this.queryAuto = res.keywords
            this.$emit('loadOk')
          } else {
            this.$emit('loadNo', this._getSearchAuto)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this._getSearchAuto)
        })
      },
      // 搜索结果
      _getSearch(query) {
        this.$emit('load')
        getSearch(query).then((res) => {
          if (res.ok) {
            this.result = res.books
            this.$emit('loadOk')
            this.resultAppear = true
          } else {
            this.$emit('loadNo', this._getSearch)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this._getSearch)
        })
      },
      // 滚动时 收起键盘
      blurInput() {
        this.$refs.input.blur()
      },
      // 删除query
      deleteQuery() {
        this.query = ''
      },
      // 设置query
      addQuery(query) {
        this.query = query
      },
      clearHistory() {
        this.$refs.confirm.show()
      },
      // 搜索书
      selectAuto(query) {
        this.set_searchHistory(query)
        this._getSearch(query)
        this.query = query
      },
      setHot() {
        let len = this.hot.length - 6
        let min = getRandomInt(0, len)
        this.hotQuery = this.hot.slice(min, min + 6)
      }
    },
    components: {
      SearchAuto
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  header
    height: .5rem
    line-height: .5rem
    display: flex
    align-items: center
    padding: 0 .05rem
    background: $color-d93f30
    >i
      flex: 0 0 .4rem
      text-align: center
      color: $color-fff
      font-size: $font-size-1_8
    .input
      position: relative
      flex: 1
      input
        height: .3rem
        background: $color-d93f30
        color: #fff
        padding-left: .1rem
        &::-webkit-input-placeholder
          color: $color-fff05
      .delete
        width: .3rem
        height: .3rem
        line-height: .3rem
        text-align: center
        position: absolute
        right: 0
        top: .1rem
        color: $color-fff05
  .history
    margin: 0 .2rem
    li
      height: .3rem
      line-height: .3rem
  .bookList
    position: fixed
    width: 100%
    top: .5rem
    bottom: 0
    background: $color-f8f8f8
    overflow: hidden
  h3
    display: flex
    align-items: center
    height: .3rem
    line-height: .3rem
    padding: .1rem .2rem
    font-size: $font-size-1_2
    span
      flex: 1
      &:last-child
        text-align: right
</style>
