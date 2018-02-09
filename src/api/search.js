import axios from 'axios'
import {getTurnJSON} from 'common/js/util'

// 搜索自动补充 (query)
export function getSearchAuto (query) {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: 'http://api.zhuishushenqi.com/book/auto-complete',
    query: query,
    headers: {
      referer: 'https://api.zhuishushenqi.com/',
      host: 'api.zhuishushenqi.com'
    }
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return getTurnJSON(res)
  })
}

// 模糊搜索
export function getSearch (query) {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: 'http://api.zhuishushenqi.com/book/fuzzy-search',
    query: query,
    headers: {
      referer: 'https://api.zhuishushenqi.com/',
      host: 'api.zhuishushenqi.com'
    }
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return getTurnJSON(res)
  })
}

// 热门关键词
export function getSearchHot () {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: 'http://api.zhuishushenqi.com/book/search-hotwords',
    headers: {
      referer: 'https://api.zhuishushenqi.com/',
      host: 'api.zhuishushenqi.com'
    }
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return getTurnJSON(res)
  })
}
