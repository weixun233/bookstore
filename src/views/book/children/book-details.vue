<template>
  <zf-container>
    <son-header title="返回"></son-header>
    <zf-scroll-y :data="bookInfo" class="scroll" ref="scroll">
      <div class="scroll-cont">
        <p class="title" v-html="bookInfo.title"></p>
        <div class="btn">
          <span @click="prev">上一章</span>
          <span @click="catalog">目录</span>
          <span @click="next">下一章</span>
          <span @click="selectCurrency">换源</span>
        </div>
        <div class="content" v-html="bookInfo.cpContent"></div>
        <div class="btn">
          <span @click="prev">上一章</span>
          <span @click="catalog">目录</span>
          <span @click="next">下一章</span>
        </div>
      </div>
    </zf-scroll-y>
    <zf-eject-block ref="Catalog">
      <h3 class="catalog-title" v-if="book">{{book.title}}</h3>
      <zf-scroll-y :data="bookCatalog" ref="scrollCatalog" class="scrollCatalog">
        <ul class="catalog">
          <li v-for="(item, index) in bookCatalog"
              :key="index"
              ref="catalogItem"
              :class="catalogIndex(index)"
              @click="selectCatalog(item, index)">{{item.title}}</li>
        </ul>
      </zf-scroll-y>
    </zf-eject-block>
    <router-view></router-view>
  </zf-container>
</template>
<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  import {getBookSource, getBookCatalog, getBookContent} from 'api/book'

  export default {
    mounted() {
      setTimeout(() => {
        this.init()
      }, 20)
    },
    watch: {
      $route() {
        this.init()
      }
    },
    data() {
      return {
        bookid: '',
        bookCatalog: [],   // 书目录
        bookCont: [],      // 缓存章节
        bookInfo: {},      // 当前章节
        currency: 0,       // 书源
        followerCount: 0  // 阅读的章节
      }
    },
    computed: {
      ...mapState('book', [
        'book'
      ]),
      ...mapGetters('book', [
        'ifLikeBook',           // 返回当前书是否已追
        'liveIndex',        // 返回当前书在的追书的index
        'liveBook'          // 返回当前书在的追书book
      ]),
      bookCatalogLen() {
        return this.bookCatalog.length
      }
    },
    // 页面退出之前
    beforeDestroy() {
      this.setBook()
    },
    methods: {
      ...mapMutations('book', [
        'set_bookid',
        'set_bookCatalog'
      ]),
      ...mapActions('book', [
        'bookFollowerCount'
      ]),
      // 书内容处理
      createBookInfo(res) {
        res.cpContent = res.cpContent.replace(/(\s+)/g, '<br><p style="display: inline-block; width: 2em; height: 1px"></p>')
        return res
      },
      async init() {
        this.bookid = this.$route.query.bookid
        this.set_bookid(this.bookid)
        this.$emit('load')
        // 判断是否已追书
        if (this.ifLikeBook) {
          this.currency = this.liveBook.currency
          this.followerCount = this.liveBook.followerCount
        } else {
          this.currency = this.book.currency
          this.followerCount = this.book.followerCount
        }
        // 获取书源
        await getBookSource(this.bookid).then(res => {
          this.source = res.data[this.currency]._id
        })
        // 获取书目录
        await getBookCatalog(this.source).then(res => {
          this.catalogmu = res.data.chapters[this.followerCount].link
          this.bookCatalog = res.data.chapters
        })
        // 获取书内容
        await getBookContent(encodeURIComponent(this.catalogmu)).then(res => {
          if (res) {
            this.$emit('loadOk')
            this.bookInfo = this.createBookInfo(res.data.chapter)
            this.bookCont[this.followerCount] = res
          } else {
            this.$emit('loadNo', this.init)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this.init)
        })
      },
      prev() {
        if (this.followerCount === 0) {
          return
        }
        this.followerCount--
        let index = this.followerCount
        // 判断该章节是否已存在
        if (this.bookCont[index]) {
          this.bookInfo = this.bookCont[index]
        } else {
          this.$emit('load')
          // 获取书内容
          getBookContent(encodeURIComponent(this.bookCatalog[index].link)).then(res => {
            if (res) {
              this.$emit('loadOk')
              this.bookInfo = this.createBookInfo(res.data.chapter)
              this.bookCont[this.followerCount] = res
            } else {
              this.$emit('loadNo', this.init)
            }
          }).catch(err => {
            console.log(err)
            this.$emit('loadNo', this.init)
          })
        }
        this.$refs.scroll.scrollTo(0, 0, 0)
      },
      next() {
        if (this.followerCount > this.bookCatalogLen) {
          return
        }
        this.followerCount++
        let index = this.followerCount
        // 判断该章节是否已存在
        if (this.bookCont[index]) {
          this.bookInfo = this.bookCont[index]
        } else {
          this.$emit('load')
          // 获取书内容
          getBookContent(encodeURIComponent(this.bookCatalog[index].link)).then(res => {
            if (res) {
              this.$emit('loadOk')
              this.bookInfo = this.createBookInfo(res.data.chapter)
              this.bookCont[this.followerCount] = res
            } else {
              this.$emit('loadNo', this.init)
            }
          }).catch(err => {
            console.log(err)
            this.$emit('loadNo', this.init)
          })
        }
        this.$refs.scroll.scrollTo(0, 0, 0)
      },
      // 显示目录
      catalog() {
        this.$refs.Catalog.show()
        setTimeout(() => {
          this.$refs.scrollCatalog.refresh()
          this.scrollToCurrent()
        }, 20)
      },
      // 滚动到当前目录处
      scrollToCurrent() {
        if (this.followerCount < 5) {
          return
        }
        const index = this.followerCount - 4
        this.$refs.scrollCatalog.scrollToElement(this.$refs.catalogItem[index], 0)
      },
      // 目录当前章节加class
      catalogIndex(index) {
        return this.followerCount === index ? 'active' : ''
      },
      // 章节目录跳转
      selectCatalog(item, index) {
        this.$emit('load')

        // 获取书内容
        getBookContent(encodeURIComponent(item.link)).then(res => {
          if (res) {
            this.$emit('loadOk')
            this.bookInfo = this.createBookInfo(res.data.chapter)
            this.bookCont[this.followerCount] = res
          } else {
            this.$emit('loadNo', this.init)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this.init)
        })
        this.followerCount = index
      },
      // 保存读书位置
      setBook() {
        if (this.ifLikeBook) {
          this.bookFollowerCount(this.followerCount)
        }
      },
      // 跳转书源选择
      selectCurrency() {
        this.$router.push({
          path: `/index/book/book-details/book-currency?bookid=${this.bookid}&followerCount=${this.followerCount}&prevcurrency=${this.currency}`
        })
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"
  .scroll
    position: fixed
    width: 100%
    top: .5rem
    bottom: 0
    max-width: 640px
    background: $color-f6f0d6
    overflow: hidden
    .scroll-cont
      padding: .1rem
      .title
        color: $color-999
        font-size: $font-size-1_2
        height: .3rem
        line-height: .3rem
      .content
        line-height: .3rem
      .btn
        padding: .1rem 0
        text-align: center
        color: $color-67ccb7
        span
          margin: 0 .1rem
  .catalog-title
    height: .4rem
    line-height: .4rem
    width: 70%
    text-align: center
    margin: .2rem auto 0
    background: $color-fff
  .num
    margin: 0 auto
  .scrollCatalog
    position: fixed
    width: 70%
    top: .6rem
    bottom: .2rem
    left: 0
    right: 0
    max-width: 640px
    margin: 0 auto
    background: $color-fff
    overflow: hidden
    li
      height: .4rem
      line-height: .4rem
      padding-left: .2rem
      border-bottom: 1px solid $color-00001
      &.active
        color: $color-d93f30
  .scrollSource
    top: 1rem
    li
      height: .6rem
      line-height: 0.2rem
</style>
