<template>
  <transition name="confirm-fade">
    <div class="confirm-wrapper" v-show="showFlag" @click.stop="cancel">
      <div class="confirm-content">
        <div class="confirm">
          <p class="title">{{title}}</p>
          <input type="text" v-if="confirmInput" v-model="inputText" :placeholder="placeholder">
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'zfConfirm',
    props: {
      // title文字
      title: {
        type: String,
        default: ''
      },
      // 是否启用输入框
      confirmInput: {
        type: Boolean,
        default: false
      },
      // 输入框提示文字
      placeholder: {
        type: String,
        default: ''
      },
      // 是否进行输入内容验证  开启后派发intercept事件
      intercept: {
        type: Boolean,
        default: false
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      }
    },
    data() {
      return {
        showFlag: false,  // 显示/隐藏
        inputText: '',    // 输入框内容
        confirmHint: ''   // 提示语
      }
    },
    methods: {
      // 设置显示
      show() {
        this.showFlag = true
      },
      // 设置隐藏
      hide() {
        this.showFlag = false
      },
      // 取消
      cancel() {
        this.hide()
        this.$emit('cancel')
        this.inputText = ''
      },
      // 确定
      confirm() {
        // 是否开启拦截 提示
        if (this.intercept) {
          this.$emit('intercept', this.inputText)
          this.inputText = ''
          return
        }
        this.hide()
        this.$emit('confirm', this.inputText)
        this.inputText = ''
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import '~common/css/variable'

  .confirm-wrapper
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: $zIndex_10
    background-color: $color-00003
    &.confirm-fade-enter-active
      animation: confirm-fadein 0.3s
      .confirm
        animation: confirm-zoom 0.3s
    .confirm-content
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      .confirm
        width: 2.7rem
        border-radius: .13rem
        background: $color-fff
        input
          width: 80%
          height: .3rem
          box-sizing: border-box
          margin-left: 10%
          margin-bottom: .2rem
          line-height: .3rem
          text-indent: .1rem
          color: $color-999
          border: 1px solid $color-d93f30
        .title
          padding: .2rem .15rem
          line-height: .22rem
          text-align: center
          font-size: $font-size-1_8
          color: $color-999
        .operate
          display: flex
          align-items: center
          text-align: center
          font-size: $font-size-1_8
          .operate-btn
            flex: 1
            line-height: .22rem
            padding: .1rem 0
            border-top: 1px solid $color-00003
            color: $color-d93f30
            &.left
              border-right: 1px solid $color-00003

  @keyframes confirm-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
