// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPlugunPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/src/index.scss'
//引入初始化样式文件
import '@/styles/common.scss'
// 引入懒加载指令插件并且注册
import { lazyPlugin } from '@/directives/index'
// 引入全局组件
import { componentPlugin } from '@/components'

const app = createApp(App)
const pinia = createPinia()
//注册持久化插件
pinia.use(piniaPlugunPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')


