<template>
  <zf-container>
    <son-header :title="author"></son-header>
    <book-list class="bookList"
              :data="authorBook"
              listClass="two"
              @select="selectBook"></book-list>
  </zf-container>
</template>
<script>
  import SonHeader from 'components/son-header'
  import BookList from 'components/book-list'
  import {routerList} from 'common/js/mixin'
  import {getBookAuthor} from 'api/book'

  export default {
    components: {SonHeader, BookList},
    mixins: [routerList],
    mounted() {
      setTimeout(() => {
        this.init()
      }, 20)
    },
    activated() {
      this.$emit('activatedLoad')
    },
    beforeDestroy() {
      this.$emit('leave')
    },
    data() {
      return {
        author: this.$route.query.author,  // 作者
        authorBook: []
      }
    },
    methods: {
      init() {
        this.$emit('load')
        getBookAuthor(this.author).then((res) => {
          if (res.data.books) {
            this.authorBook = res.data.books
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
