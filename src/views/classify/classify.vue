<template>
  <zf-container>
    <son-header title="分类"></son-header>
    <zf-scroll-y :data="Classify" class="scroll">
      <div>
        <!--男生-->
        <classify-list :data="Classify.male" title="男生" @selectClass="selectItem"></classify-list>
        <!--女生-->
        <classify-list :data="Classify.female" title="女生" @selectClass="selectItem"></classify-list>
      </div>
    </zf-scroll-y>
  </zf-container>
</template>
<script>
  import ClassifyList from './components/classify-list'
  import {getClassify, getClassifySon} from 'api/classify'

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
    data() {
      return {
        Classify: [],   // 分类
        ClassifySon: [] // 子分类
      }
    },
    methods: {
      async init() {
        this.$emit('load')
        getClassify().then(res => {
          if (res.data) {
            this.Classify = res.data
            this.$emit('loadOk')
          } else {
            this.$emit('loadNo', this.init)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this.init)
        })

        getClassifySon().then(res => {
          if (res.data) {
            this.ClassifySon = res.data
            this.$emit('loadOk')
          } else {
            this.$emit('loadNo', this.init)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this.init)
        })
      },
      // 跳转分类
      selectItem(item) {
        this.$router.push({
          path: `/index/classify-details?&major=${item.name}`
        })
      }
    },
    components: {
      ClassifyList
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  .scroll
    max-width: 640px
    position: fixed
    width: 100%
    top: .5rem
    bottom: 0
    overflow: hidden
</style>
