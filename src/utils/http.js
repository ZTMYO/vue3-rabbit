// axios基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'
import 'element-plus/theme-chalk/el-message.css'
const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 50000
})

//axios请求拦截器
httpInstance.interceptors.request.use(config => {
    // 从pinia获取token数据
    const userStore = useUserStore()
    // 按照后端的要求拼接token数据
    const token = userStore.userInfo.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

//axios响应拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    // 统一错误提示
    ElMessage.error({
        message: e.response.data.message,
        type: 'error'
    })
    // 401token失效处理
    // 清除本地用户数据,跳转到登陆页
    if (e.response.status === 401) {
        const userStore = useUserStore()
        userStore.clearUserInfo()
        router.push('/login')
    }

    return Promise.reject(e)
})


export default httpInstance