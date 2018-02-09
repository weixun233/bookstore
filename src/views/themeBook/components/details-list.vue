<template>
  <div style="height: 100%">
    <book-list class="book-list"
               :data="listdata"
               :noResult="noResult"
               @select="selectTheme"></book-list>
  </div>
</template>
<script>
  import {getBookAuthor} from 'api/themeBook'

  export default {
    mounted() {
      setTimeout(() => {
        this.init()
      }, 20)
    },
    activated() {
      this.$emit('activatedLoad')
    },
    // keep-alive组件停用时调用
    deactivated() {
      this.$emit('leave')
    },
    props: {
      // 当前 index
      navIndex: {
        type: Number,
        default: 0
      },
      // 本列表 index
      index: {
        type: Number,
        default: -1
      }
    },
    data() {
      return {
        noResult: false,    // 无数据时提示
        listdata: [],
        parameter: [
          { sort: 'collectorCount', duration: 'last-seven-days' },
          { sort: 'created ', duration: 'all' },
          { sort: 'collectorCount', duration: 'all' }
        ]     // 请求的参数
      }
    },
    watch: {
      // 监听navindex
      navIndex() {
        this.init()
      }
    },
    methods: {
      init() {
        if (this.navIndex === this.index && this.listdata.length === 0) {
          this.$emit('load')
          getBookAuthor(this.parameter[this.navIndex]).then(res => {
            if (res.bookLists) {
              this.listdata = res.bookLists
              this.$emit('loadOk')
            } else {
              this.$emit('loadNo', this.init)
            }
          }).catch(err => {
            console.log(err)
            this.$emit('loadNo', this.init)
          })
        } else if (this.listdata.length > 0) {
          this.$emit('loadOk')
        }
      },
      // 跳转书详情
      selectTheme(item, route) {
        this.$router.push({
          path: `/index/themeBook-details?_id=${item._id}`
        })
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  .book-list
    position: fixed
    top: 0
    bottom: .8rem
    overflow: hidden
</style>
