import httpInstance from "@/utils/http";
export function getCheckInfoAPI() {
  return httpInstance({
    url: '/member/order/pre',
  });
}

// 添加地址
export function addAddressAPI(data) {
    return httpInstance({
        url: '/member/address',
        method: 'POST',
        data
    })
}

// 创建订单
export function createOrderAPI(data) {
    return httpInstance({
        url: '/member/order',
        method: 'POST',
        data
    })
}