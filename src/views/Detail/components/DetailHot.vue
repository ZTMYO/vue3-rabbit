<script setup>
import { fetchHotGoodsAPI } from '@/apis/detail'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { computed, defineProps } from 'vue'
//设计props参数适配不同的title和数据
const props = defineProps({
    hotType: {
        type: Number,
    }
})
const TYPEMAP = {
    1: '24小时热榜',
    2: '周热榜'
}
const title = computed(() => TYPEMAP[props.hotType])
const route = useRoute()
const hotList = ref([])
const getHotList = async () => {
    const res = await fetchHotGoodsAPI({
        id: route.params.id,
        type: props.hotType,
    })
    hotList.value = res.result
}
onMounted(() => getHotList())
</script>


<template>
    <div class="goods-hot">
        <h3>{{ title }}</h3>
        <!-- 商品区块 -->
        <RouterLink to="/" class="goods-item" v-for="item in hotList" :key="item.id">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="desc ellipsis">{{ item.desc }}</p>
            <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
    </div>
</template>


<style scoped lang="scss">
.goods-hot {
    h3 {
        height: 70px;
        background: $helpColor;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    .goods-item {
        display: block;
        width: 220px;
        padding: 20px 30px;
        text-align: center;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }
}
</style>