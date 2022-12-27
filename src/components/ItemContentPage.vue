<template>
    <div class="container">
        <div class="grid">
            <div class="item">
                <p><img :src="state.row.img" style="width: 400px;" /></p>
                <p><img :src="tmp.img" v-for="tmp of state.imageurl" :key="tmp" style="width: 100; height: 100px;"/></p>
            </div>
            <div class="item">
                <p>물품명: {{ state.row.name }} </p>
                <p>물품설명: {{ state.row.content }} </p>
                <p>물품가격: {{ state.row.price }} </p>
                <select v-model="state.cnt">
                    <option v-for="tmp of 100" :key="tmp" :value="tmp">{{ tmp }}</option>
                </select>
                <button @click="handleOrder">주문하기</button>
            </div>       
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from '@vue/runtime-core';

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            no       : Number( route.query.no),
            row      : '',
            imageurl : [],  
            cnt      : 0,      
        }); 

        // 물품정보
        const handleData = async() => {
            const url = `/item101/selectone.json?no=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);
            if(data.status === 200) {
                state.row = data.result;
            }
        }

        // 서브 이미지 정보
        const handleData1 = async() => {
            const url = `/item101/subimagecode.json?code=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);
            if(data.status === 200) {
                state.imageurl = data.result; 
            }
        }

        onMounted(()=> {
            handleData();
            handleData1();
        })

        const handleOrder = () => {
            router.push({
                path:'/order', 
                query:{
                    no     : state.no, // 물품정보(물품번호)
                    cnt    : state.cnt, // 주문수량
                    userid : '주문자', // 주문자 -> 확보가 안됐으면 로그인페이지로 보내기
                }
            });
        }

        return {
            state,
            handleOrder,
        };
    }
}
</script>

<style lang="css" scoped src="../assets/css/itemcontent.css">

</style>