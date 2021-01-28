import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css' // 引入全局样式
// 引入组件
import ElementUI from 'element-ui'
// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
// 为Vue开发的额外插件,需要用vue.use()集成到Vue的类身上,让所有对象使用
Vue.use(ElementUI) // 全局组件,可以直接使用

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
