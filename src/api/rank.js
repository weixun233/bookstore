import axios from 'axios'
import {getTurnJSON} from 'common/js/util'

// 榜单
export function getRank () {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: 'http://novel.juhe.im/rank-category',
    headers: {
      referer: 'http://novel.juhe.im/',
      host: 'novel.juhe.im'
    }
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return getTurnJSON(res)
  })
}

// 榜单详情
export function getRankDetails (id) {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: `http://novel.juhe.im/rank/${id}`,
    headers: {
      referer: 'http://novel.juhe.im/',
      host: 'novel.juhe.im'
    }
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return getTurnJSON(res)
  })
}
