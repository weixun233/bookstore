import axios from 'axios'
import {getTurnJSON} from 'common/js/util'

// 书单 热门默认sort = 'collectorCount', duration = 'last-seven-days'
// 最新created all 收藏collectorCount all
export function getBookAuthor ({sort, duration}) {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: 'http://api.zhuishushenqi.com/book-list',
    sort: sort,
    duration: duration,
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

// 书单详情
export function getBookAuthorDetails (id) {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: `http://api.zhuishushenqi.com/book-list/${id}`,
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
