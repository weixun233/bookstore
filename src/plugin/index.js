import * as zfBanner from './zf-banner/index'
import * as zfConfirm from './zf-confirm/index'
import * as zfContainer from './zf-container/index'
import * as zfEjectBlock from './zf-eject-block/index'
import * as zfEjectBottom from './zf-eject-bottom/index'
import * as zfHint from './zf-hint/index'
import * as zfLading from './zf-loading/index'
import * as zfNoResult from './zf-no-result/index'
import * as zfProgressCircle from './zf-progress-circle/index'
import * as zfScrollContainer from './zf-scroll-container/index'
import * as zfScrollX from './zf-scroll-x/index'
import * as zfScrollY from './zf-scroll-y/index'
import * as zfSlider from './zf-slider/index'
import * as zfTab from './zf-tab/index'

const components = {
  ...zfBanner,
  ...zfConfirm,
  ...zfContainer,
  ...zfEjectBlock,
  ...zfEjectBottom,
  ...zfHint,
  ...zfLading,
  ...zfNoResult,
  ...zfProgressCircle,
  ...zfScrollContainer,
  ...zfScrollX,
  ...zfScrollY,
  ...zfSlider,
  ...zfTab
}

const install = (Vue, Option) => {
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key])
  })
}

export default {
  install
}
