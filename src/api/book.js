import axios from 'axios'
import {getTurnJSON} from 'common/js/util'

// 书详情 (书id) 5816b415b06d1d32157790b1
export function getBookDetails (bookid) {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: `http://novel.juhe.im/book-info/${bookid}`,
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

// 书源 (书id)
export function getBookSource (bookid) {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: 'http://novel.juhe.im/book-sources',
    view: 'summary',
    book: bookid,
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

// 书目录 (书源id)
export function getBookCatalog (Sourceid) {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: `http://novel.juhe.im/book-chapters/${Sourceid}`,
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

// 书内容 (书目录里的章节link)
export function getBookContent (link) {
  const url = 'https://bird.ioliu.cn/v2'
  link = encodeURIComponent(link)
  const data = Object.assign({}, {
    url: `http://novel.juhe.im/chapters/${link}`,
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

// 书籍相关推荐 (书id)
export function getBookRecommend (bookid) {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: `http://novel.juhe.im/recommend/${bookid}`,
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

// 书籍作者的其他书 (书id)
export function getBookAuthor (author) {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: 'http://novel.juhe.im/author-books',
    author,
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

// 评论-讨论
// sort 排序方式 updated|created|comment-count 默认、最新、最多评论
// 书籍id、排序、开始、请求数目
export function getDiscuss ({bookId, sort = 'updated', start = 0, limit = 20}) {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: 'http://api.zhuishushenqi.com/post/by-book',
    book: bookId,
    sort: sort,
    start: start,
    limit: limit,
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

// 评论-书评
export function getBookReview ({bookId, sort = 'updated', start = 0, limit = 20}) {
  const url = 'https://bird.ioliu.cn/v2'

  const data = Object.assign({}, {
    url: 'http://api.zhuishushenqi.com/post/review/by-book',
    book: bookId,
    sort: sort,
    start: start,
    limit: limit,
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
