import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:7001'
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
})

function onSuccess(res) {
  return res.data
}
function onFailed(err) {
  return Promise.reject(err)
}

service.interceptors.response.use(onSuccess, onFailed)

export default service
