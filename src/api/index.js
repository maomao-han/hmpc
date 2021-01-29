// 此文件作用
// 统一管理整个项目用到的网络请求接口

import request from '@/utils/request.js' // 引入自定义的请求对象

// 用户登录接口
export const loginAPI = function (data) {
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    data
  })
}

export const userInfoAPI = () => {
  return request({
    url: '/mp/v1_0/user/profile',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  })
}

export const channelListAPI = () => request({
  url: '/mp/v1_0/channels',
  method: 'GET'
})
