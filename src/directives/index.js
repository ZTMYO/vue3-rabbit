//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
    install(app) {
        // 懒加载指令逻辑
        //定义全局指令
        app.directive('img-lazy', {
            mounted(el, binding) {//el:当前元素，binding:binding.value 指令绑定的数据 图片url

                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        if (isIntersecting) {
                            el.src = binding.value
                            stop()
                        }
                    }
                )
            }
        })
    }
}

