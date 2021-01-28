// 对axios进行二次封装
import axios from 'axios'

const ajax = axios.create({
  baseURL: ' http://api-toutiao-web.itheima.net'
})

export default ajax
