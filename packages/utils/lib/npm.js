import urlJoin from 'url-join'
import axios from 'axios'
import log from './log.js'

function getNpmInfo(npmName) {
  // cnpm源：https://registry.npm.taobao.org/
  const registry = 'https://registry.npmjs.org/'
  const url = urlJoin(registry, npmName)
  return axios.get(url).then(res => {
    try {
      return res.data
    } catch (error) {
      return Promise.reject(error)
    }
  })
}

export function getLatestVersion(npmName) {
  return getNpmInfo(npmName).then(data => {
    const latest = data?.['dist-tags']?.latest
    if (!latest) {
      log.error(`无法获取 ${npmName} 的 latest 版本号`)
      return Promise.reject(Error(`无法获取 ${npmName} 的 latest 版本号`))
    }
    return latest
  })
}