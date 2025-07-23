// 封装购物车模块
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCartStore = defineStore('cart', () => {
    // 1、定义state - cartlist
    const cartList = ref([])
    // 2、定义action - addCart
    const addCart = (goods) => {
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
    // 删除购物车
    const delCart = (skuId) => {
        cartList.value = cartList.value.filter(item => item.skuId !== skuId)
    }
    //单选功能
    const singleCheck = (skuId, selected) => {
        const item =cartList.value.find(item => item.skuId === skuId)
        item.selected = selected
    }
    // 计算价格、数量
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count*c.price, 0))

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
    }
}, {
    persist: true
})