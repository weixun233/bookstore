<template>
  <div class="index">
    <!--header-->
    <index-header></index-header>
    <!--content-->
    <zf-scroll-container ref="scrollContainer" @scrollEnd="scrollEnd">
      <index-home></index-home>
      <index-find></index-find>
    </zf-scroll-container>
  </div>
</template>
<script>
  import indexHeader from './components/index_header'
  import indexHome from './components/index_home'
  import indexFind from './components/index_find'
  import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
  export default {
    components: { indexHeader, indexHome, indexFind },
    created() {
      this.loop = false
      this.autoPlay = false
      this.dotControl = false
      this.groupH = true
      this.get_indexActive_cache()
    },
    watch: {
      indexActive() {
        this.$refs.scrollContainer._bannerTo(this.activeMeta.index)
      }
    },
    mounted() {
      this.$refs.scrollContainer._bannerTo(this.activeMeta.index, 0, 0)
    },
    computed: {
      ...mapState('index', [
        'indexActive',
        'indexColumn'
      ]),
      ...mapGetters('index', [
        'activeMeta'
      ])
    },
    methods: {
      ...mapMutations('index', [
        'set_indexActive'
      ]),
      ...mapActions('index', [
        'get_indexActive_cache'
      ]),
      // 滚动元素 修改active
      scrollEnd(index) {
        let type = this.indexColumn[index].classpath
        this.set_indexActive(type)
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  .index
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    .container
      height: 100%
</style>
