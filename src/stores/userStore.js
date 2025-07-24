// 管理用户数据相关
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
    // 定义管理用户数据的state
    const userInfo = ref({})

    // 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
    }
    // 退出登录时清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
    }
    // 以对象格式返回state和action函数
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
}, {
    persist: true // 持久化存储
})