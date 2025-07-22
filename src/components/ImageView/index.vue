<script setup>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

//props适配图片列表
defineProps({
    imageList: {
        type: Array,
        default: () => []
    }
})
//小图切换大图显示
const activeIndex = ref(0)
const enterHandle = (index) => {
    activeIndex.value = index
}
// 获取鼠标相对位置
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)
// 滑块的坐标
const left = ref(0)
const top = ref(0)
//大图的两个坐标
const positionX = ref(0)
const positionY = ref(0)
watch([elementX, elementY, isOutside], () => {
    //如果鼠标没有在图片区域内，则不进行计算
    if (isOutside.value) {
        return
    }
    //有效移动范围内的计算逻辑
    if (elementX.value > 100 && elementX.value < 300) {
        left.value = elementX.value - 100
    }
    if (elementY.value > 100 && elementY.value < 300) {
        top.value = elementY.value - 100
    }
    // 鼠标移出图片区域
    if (elementX > 300) { left = 200 }
    if (elementY > 300) { top = 200 }
    if (elementX < 100) { left = 0 }
    if (elementY < 100) { top = 0 }
    //控制大图的显示
    positionX.value = -left.value * 2
    positionY.value = -top.value * 2





})
</script>


<template>
    <div class="goods-image">
        <!-- 左侧大图-->
        <div class="middle" ref="target">
            <img :src="imageList[activeIndex]" alt="" />
            <!-- 蒙层小滑块 -->
            <div class="layer" :style="{ left: `${left}px`, top: `${top}px` }" v-show="!isOutside"></div>
        </div>
        <!-- 小图列表 -->
        <ul class="small">
            <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterHandle(i)"
                :class="{ active: i === activeIndex }">
                <img :src="img" alt="" />
            </li>
        </ul>
        <!-- 放大镜大图 -->
        <div class="large" :style="[
            {
                backgroundImage: `url(${imageList[activeIndex]})`,
                backgroundPositionX: `${positionX}px`,
                backgroundPositionY: `${positionY}px`,
            },
        ]" v-show="!isOutside"></div>
    </div>
</template>

<style scoped lang="scss">
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;

    .middle {
        width: 400px;
        height: 400px;
        background: #f5f5f5;
    }

    .large {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        z-index: 500;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
        background-size: 800px 800px;
        background-color: #f8f8f8;
    }

    .layer {
        width: 200px;
        height: 200px;
        background: rgba(0, 0, 0, 0.2);
        // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
        left: 0;
        top: 0;
        position: absolute;
        cursor: move;
    }

    .small {
        width: 80px;

        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;

            &:hover,
            &.active {
                border: 2px solid $xtxColor;
            }
        }
    }
}
</style>