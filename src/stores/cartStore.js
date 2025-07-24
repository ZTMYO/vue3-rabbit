// 封装购物车模块
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 获取最新购物车列表action
    const updateNewList = async () => {
        if (isLogin) {
            const res = await findNewCartListAPI()
            cartList.value = res.result
        }
    }
    // 1、定义state - cartlist
    const cartList = ref([])
    // 2、定义action - addCart
    const addCart = async (goods) => {
        if (isLogin.value) {
            // 登陆之后的加入购物车逻辑
            const { skuId, count } = goods
            await insertCartAPI({ skuId, count })
            updateNewList()
        }
        else {
            // 添加购物车操作
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                // 找到了
                item.count += goods.count
            }
            else {
                cartList.value.push(goods)
            }
        }

    }
    // 删除购物车
    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            updateNewList()
        }
        else {
            cartList.value = cartList.value.filter(item => item.skuId !== skuId)
        }
    }
    // 清除本地购物车
    const clearCart = async () => {
        cartList.value = []
    }
    //单选功能
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find(item => item.skuId === skuId)
        item.selected = selected
    }
    //全选功能
    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }
    // 计算价格、数量
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
    // 是否全选
    const isAll = computed(() => cartList.value.every(item => item.selected))
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        selectedCount,
        selectedPrice,
        singleCheck,
        isAll,
        allCheck,
        clearCart,
        updateNewList
    }
}, {
    persist: true
})