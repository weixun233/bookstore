
// 共享的方法属性
export const createUrl = {
  methods: {
    // image
    image(url) {
      return `http://statics.zhuishushenqi.com${url}`
    }
  }
}
// router 公共跳转路由
export const routerList = {
  created() {
    this.route = this.$route.path
  },
  methods: {
    // 跳转列表下一级
    select(item) {
      this.$emit('select', item, this.route)
    },
    // 跳转书详情
    selectBook(item) {
      this.$router.push({
        path: `/index/book?bookid=${item._id}`
      })
    },
    // 跳转书内容
    selectBookCont(item) {
      this.$router.push({
        path: `/index/book/book-details?bookid=${item._id}`
      })
    },
    // 跳转作者其他书
    selectAuthor(item) {
      this.$router.push({
        path: `/index/book/book-author?author=${item.author}`
      })
    },
    // 跳转书籍相关推荐
    selectRecommend(item) {
      this.$router.push({
        path: `/index/book/book-recommend?bookid=${item._id}`
      })
    }
  }
}
//
export const transmitLoad = {
  methods: {
    load() {
      this.$emit('load')
    },
    loadOk() {
      this.$emit('loadOk')
    },
    loadNo(init) {
      this.$emit('loadNo', init)
    },
    leave() {
      this.$emit('leave')
    }
  }
}
