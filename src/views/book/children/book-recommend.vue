<template>
  <zf-container>
    <son-header title="你可能感兴趣"></son-header>
    <book-list class="bookList"
               :data="recommend"
               listClass="two"
               @select="selectBook"></book-list>
  </zf-container>
</template>
<script>
  import SonHeader from 'components/son-header'
  import BookList from 'components/book-list'
  import {routerList} from 'common/js/mixin'
  import {getBookRecommend} from 'api/book'

  export default {
    components: {SonHeader, BookList},
    mixins: [routerList],
    mounted() {
      setTimeout(() => {
        this.init()
      }, 20)
    },
    data() {
      return {
        bookid: this.$route.query.bookid,  // 作者
        recommend: []
      }
    },
    beforeDestroy() {
      this.$emit('leave')
    },
    methods: {
      init() {
        this.$emit('load')

        getBookRecommend(this.bookid).then((res) => {
          if (res.data.books) {
            this.recommend = res.data.books
            this.$emit('loadOk')
          } else {
            this.$emit('loadNo', this.init)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this.init)
        })
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"
  .bookList
    position: fixed
    width: 100%
    top: .5rem
    bottom: 0
    background: $color-f8f8f8
    overflow: hidden
</style>
