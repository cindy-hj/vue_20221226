<template>
    <div>
        <h3>물품 상세페이지</h3>
        <div v-if="state.row !== null">
            <p>번호: {{ state.row._id }}</p>
            <p>물품명: {{ state.row.name }}</p>
            <p>가격: {{ state.row.price }}</p>
            <p>수량: {{ state.row.quantity }}</p>
            <p>등록일: {{ state.row.regdate1 }}</p>
            <p>이미지: <img :src="state.row.imageurl" style="height: 100px;"/> </p>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        const route = useRoute();

        const state = reactive({
            _id: Number(route.query._id),
            row : null,
        });

        const handleData = async() => { // parameter를 넣을 필요가 없음 어차피 받아오는 데이터가 1개 게시물 정보이므로
            const url = `/api/item/selectone?_id=${state._id}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log('1개조회', data);
            if(data.status === 200) {
                state.row = data.result;
            }
        }

        onMounted(() => {
            handleData();
        })

        return {
            state
        }
    }
}
</script>

<style lang="css" scoped>

</style>