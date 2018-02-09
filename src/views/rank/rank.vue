<template>
  <zf-container>
    <son-header title="排行榜"></son-header>
    <zf-scroll-y :data="rank" class="scroll">
      <div>
        <!--男生-->
        <rank-list :data="rank.male" title="男生" @selectRank="selectItem"></rank-list>
        <!--女生-->
        <rank-list :data="rank.female" title="女生" @selectRank="selectItem"></rank-list>
      </div>
    </zf-scroll-y>
  </zf-container>
</template>
<script>
  import {getRank} from 'api/rank'
  import RankList from './components/rank-list'

  export default {
    components: {RankList},
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
        rank: {}
      }
    },
    methods: {
      init() {
        this.$emit('load')
        getRank().then(res => {
          if (res.data) {
            this.rank = res.data
            this.$emit('loadOk')
          } else {
            this.$emit('loadNo', this.init)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this.init)
        })
      },
      // 跳转排行详情
      selectItem(item) {
        this.$router.push({
          path: `/index/rank-details?_id=${item._id}&title=${item.title}&monthRank=${item.monthRank}&totalRank=${item.totalRank}`
        })
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  .scroll
    position: fixed
    width: 100%
    top: .5rem
    bottom: 0
    overflow: hidden
</style>
