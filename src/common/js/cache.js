/* 保存用户数据到HTML5，Web存储 */
// localStorage 无限期 sessionStorage 页面关闭清除
import storage from 'good-storage'

export default {
  // localStorage
  getLocal: (name, def = {}) => {
    if (!name) return
    return storage.get(name, def)
  },
  setLocal: (name, content) => {
    if (!name) return
    storage.set(name, content)
  },
  removeLocal: (name) => {
    if (!name) return
    return storage.remove(name)
  },
  // sessionStorage
  getSession: (name, def = {}) => {
    if (!name) return
    return storage.session.get(name, def)
  },
  setSession: (name, content) => {
    if (!name) return
    storage.session.set(name, content)
  },
  removeSession: (name) => {
    if (!name) return
    return storage.session.remove(name)
  }
}
