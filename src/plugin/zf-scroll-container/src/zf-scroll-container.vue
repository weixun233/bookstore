<template>
  <zf-banner class="container"
             ref="banner"
             :loop="loop"
             :autoPlay="autoPlay"
             :dotControl="dotControl"
             :groupH="groupH"
             @scrollEnd="scrollEnd">
    <slot></slot>
  </zf-banner>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'zfScrollContainer',
    created() {
      this.loop = false
      this.autoPlay = false
      this.dotControl = false
      this.groupH = true
    },
    methods: {
      // 滚动结束时 返回当前index
      scrollEnd(index) {
        this.$emit('scrollEnd', index)
      },
      _bannerTo(pageX, pageY = 0, time = 300) {
        this.$refs.banner._bannerTo(pageX, pageY, time)
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  .container
    height: 100%
</style>
