// 管理用户数据相关
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { ref } from 'vue'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'
export const useUserStore = defineStore('user', () => {
    // 定义管理用户数据的state
    const userInfo = ref({})
    const cartStore = useCartStore()
    // 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        // 合并购物车操作
        await mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        cartStore.updateNewList()
    }
    // 退出登录时清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
        // 执行清除购物车的action
        cartStore.clearCart()
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