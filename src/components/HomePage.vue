<template>
    <div class="container">
        <h3>홈화면</h3>
        <vueper-slides>
            <vueper-slide v-for="tmp of slides" :key="tmp" :title="tmp.title" :image="tmp.image">
            </vueper-slide>
        </vueper-slides>
        <!-- 슬라이드 띄우기 위해 컴포넌트 설치 -->

        <div class="grid">
            <div class="item" v-for="tmp of state.rows" :key="tmp" style="cursor:pointer;" @click="handleContent(tmp._id)">
                <img :src ="tmp.img" style="width: 100%; height: 140px;" />
                <p>{{ tmp.name }}</p>
                <p>{{ tmp.price }}원</p> 
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useRouter } from 'vue-router';

import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
    components: { 
        // 컴포넌트 표기법 VueperSlides(파스칼), vueper-slides(케밥)
        VueperSlides, // vueper-slides
        VueperSlide  // vueper-slide
    },
    setup () {
        const router = useRouter();

        const state = reactive({
            rows : [],
            page : 1,
        });

        const slides = [
            { title: 'Slide #1', image:'https://picsum.photos/500/300?image=12' },
            { title: 'Slide #2', image:'https://picsum.photos/500/300?image=13' },
            { title: 'Slide #3', image:'https://picsum.photos/500/300?image=14' },
            { title: 'Slide #4', image:'https://picsum.photos/500/300?image=15' },
        ]

        const handleContent = (no) => {
            console.log(no);
            router.push({path:"/itemcontent", query:{no:no}})
        };

        const handleData = async() => {
            const url = `/item101/selectlistpage.json?page=${state.page}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});

            console.log(data);
            if(data.status === 200) {
                state.rows  = data.result;
            }
        };

        onMounted(() => {
            handleData();
        });

        return {
            state,
            slides,
            handleContent,
        };
    }
}
</script>

<style lang="css" scoped src="../assets/css/home.css">
    /* scoped는 이 페이지에서만 적용된다는 뜻 */
</style>