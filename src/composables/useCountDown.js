import { ref, computed,onUnmounted } from 'vue'
import dayjs from 'dayjs'
// 封装倒计时逻辑函数
export const useCountDown = () => {
    let timer = null
    // 创建一个ref对象保存倒计时的剩余时间
    const time = ref(0)
    // 格式化时间 为 xx分xx秒
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    // 定时器对象
    // 创建一个函数，用于开始倒计时
    const start = (currentTime) => {
        time.value = currentTime
        setInterval(() => {
            time.value--
        }, 1000)
    }
    // 组件销毁时清除定时器
    onUnmounted(() => {
        timer && clearInterval(timer)
    })
    return { formatTime, start }
}