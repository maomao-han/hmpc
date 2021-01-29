<template>
    <!-- 自己写的样式名login-container -->
  <div class="login-container">
    <!-- 登录窗口 -->
    <div class="login-form-wrap">
      <!-- 第一行: logo -->
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <!-- element-ui组件-form表单 -->
      <el-form class="login-form" ref="form" :model='form' :rules="rules">
        <!-- 第一行: 手机号 -->
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="form.mobile"></el-input>
        </el-form-item>

        <!-- 第二行: 验证码 -->
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" v-model="form.code"></el-input>
        </el-form-item>

        <!-- 第三行: 协议 -->
        <el-form-item prop="check">
          <el-checkbox v-model="form.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <!-- 第四行: 登录按钮  -->
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="loginFn"  :loading="load">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index.js'
export default {
  name: 'Login',
  data () {
    return {
      load: false, // 加载样式
      form: {
        mobile: '13911111111',
        code: '246810',
        check: false
      },
      rules: { // 验证
        mobile: [
          {
            pattern: /^1[3|5|6|7|8|9]\d{9}$/,
            required: true,
            message: '请输入正确的手机号',
            trigger: 'blur' // 失去焦点时触发
          }
        ],

        code: [
          {
            required: true,
            len: 6,
            message: '验证码必须是6位',
            trigger: 'change' // 一改变就触发
          }
        ],
        check: [
          {
            validator: (rule, value, callback) => {
              // value勾选状态
              if (value === false) {
                callback(new Error('请勾选协议'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    loginFn () {
      this.$refs.form.validate(async valid => { // 点击的时候判断表单验证是否都通过
        if (valid === false) return // 如果为false直接return
        this.load = true
        // 注意:async 和 await要一起用,必须在同一个函数里面
        const res = await loginAPI(this.form) // 如果验证通过,执行loginAPI
        this.$message({ // 引用element-ui组件封装message提示框
          message: '登录成功',
          type: 'success'
        })
        this.load = false
        // console.log(res)
        sessionStorage.setItem('token', res.data.data.token)
        this.$router.push('/layout') // 登录成功后跳转
      })
    }
  }
}

</script>

<style lang="less" scoped>
// 铺满整屏和表单的额外样式
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("../../assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
