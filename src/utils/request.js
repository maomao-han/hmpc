// 对axios进行二次封装
import axios from 'axios'
import { Message } from 'element-ui'

const ajax = axios.create({
  baseURL: ' http://api-toutiao-web.itheima.net'
})

// 添加响应拦截器
ajax.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  console.dir(error) // 打印错误用dir打印
  const errorMsg = {
    'Please verify your real information in app.': '请输入正确的手机号',
    'Invalid code.': '验证码错误',
    'User must be authorized.': '身份认证失败'
  }
  const messageKey = error.response.data.message
  // 响应错误提示错误信息
  Message({
    message: errorMsg[messageKey],
    type: 'error',
    onClose () { // 等弹窗消失后,在执行里面的代码
      //   401---token未传, 值不对查看Bearer后面得有空格 (后台规定格式), 过期了
      if (error.response.status === 401) {
        sessionStorage.clear()
        window.location.href = '/#/login' // 这里不能用this.$router.push,因为这里的this不是指的vue
      }
    }
  })
  return Promise.reject(error)
})

export default ajax
