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
    // 以对象格式返回state和action函数
    return {
        userInfo,
        getUserInfo
    }
})