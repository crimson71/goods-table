import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import './assets/css/bootstrap.css'
import axios from 'axios'

const app = createApp(App)

// 将axios挂载到全局，今后每个组件中都 可以直接通过this.$http代替axios发起Ajax请求
app.config.globalProperties.$http = axios
// 设置请求根路径
axios.defaults.baseURL = 'https://www.escook.cn'

app.mount('#app')
