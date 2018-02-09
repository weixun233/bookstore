import axios from 'axios'
import {getTurnJSON} from 'common/js/util'

// 书分类 (带书籍数量)
export function getClassify () {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: `http://novel.juhe.im/categories`,
    headers: {
      referer: 'https://novel.juhe.im/',
      host: 'novel.juhe.im'
    }
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return getTurnJSON(res)
  })
}

// 取带子分类的分类
export function getClassifySon () {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: `http://novel.juhe.im/sub-categories`,
    headers: {
      referer: 'https://novel.juhe.im/',
      host: 'novel.juhe.im'
    }
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return getTurnJSON(res)
  })
}

// type (new、hot、male、over)
// 书分类详情 (type、类别major、子分类minor、开始、数量)
export function getClassifyDetails ({ type = 'new', major,  start = 0, limit = 20, minor = '' }) {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: 'http://novel.juhe.im/category-info',
    gender: 'male',
    type: type,
    major: major,
    start: start,
    limit: limit,
    minor: minor,
    headers: {
      referer: 'https://novel.juhe.im/',
      host: 'novel.juhe.im'
    }
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return getTurnJSON(res)
  })
}
