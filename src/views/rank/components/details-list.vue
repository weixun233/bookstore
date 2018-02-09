<template>
  <div style="height: 100%">
    <book-list class="book-list"
               :data="listdata"
               :noResult="noResult"
               @select="selectBook"></book-list>
  </div>
</template>
<script>
  import {getRankDetails} from 'api/rank'
  import {routerList} from 'common/js/mixin'

  export default {
    mixins: [routerList],
    mounted() {
      setTimeout(() => {
        this.init()
      }, 20)
    },
    // 组件停用时调用
    beforeDestroy () {
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
      },
      // 请求的id
      _id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        noResult: false,
        listdata: []
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
        if (this.navIndex === this.index && this.listdata.length === 0 && this._id !== 'undefined') {
          this.$emit('load')
          getRankDetails(this._id).then(res => {
            if (res.data.ranking.books) {
              this.listdata = res.data.ranking.books
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
        if (this._id === 'undefined') {
          this.noResult = true
        }
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
