const windowWidth = 640

// 返回min~max之间的随机整数
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 数字处理(112.5万)
export function getPlayback (t) {
  t = t | 0
  if (t > 10000) {
    let tt = (t / 10000).toFixed(1)
    return `${tt}`
  } else {
    return t
  }
}
// 时间处理 如 音频 04:21
export function getPlayTime (t) {
  t = t | 0
  let m = t / 60 | 0
  let s = t % 60
  m = m >= 10 ? m : '0' + m
  s = s >= 10 ? s : '0' + s
  return `${m}:${s}`
}
// 时间处理
export function getDistanceTime(t) {
  return t.slice(0, 10)
}

// 数组以/连接 如 作者 周杰伦/陈奕迅
export function getSinger (singer) {
  if (!singer) {
    return ''
  }
  if (singer instanceof Array === false) {
    return singer
  }
  let ret = singer.join('/')
  return ret
}
// 数字除以100
export function filterPrice(price) {
  if (!price) {
    return ''
  }
  return price / 100
}

// get htmlSize
export function getHtmlSize () {
  let html = document.getElementsByTagName('html')[0]
  return html.style.fontSize
}
// set htmlSize
export function setHtmlSize () {
  let html = document.getElementsByTagName('html')[0]
  let width = window.innerWidth || document.body.clientWidth
  if (width > windowWidth) {
    width = windowWidth
  }
  // 1rem = 100px 公式为 屏幕宽/设计图宽*100
  html.style.fontSize = parseInt(width / 750 * 200) + `px`
}

// 洗牌函数 (把传入数组打乱顺序后返回)
export function getShuffle (arr) {
  let _arr = arr.slice(0)
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// 节流函数
export function funcThrottle (func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 处理字符串形式的数据，转化为JSON格式
export function getTurnJSON(string) {
  let ret = string.data

  if (typeof ret === 'string') {
    let index = ret.search(/{/)
    let len = ret.lastIndexOf('}') + 1
    let matches = ret.substring(index, len)
    if (matches) {
      ret = JSON.parse(matches)
    }
  }
  return ret
}

// 清除\ 的JSON
export function getTurnSlashJSON (string) {
  let ret = string.data

  if (typeof ret === 'string') {
    let index = ret.search(/{/)
    let len = ret.lastIndexOf('}') + 1
    let matches = ret.substring(index, len)
    matches = matches.replace(/\\/g, '')
    if (matches) {
      ret = JSON.parse(matches)
    }
  }
  return ret
}
