<template>
    <div>
        <h3>책 수정 페이지</h3>
        {{ state }}
        <div>
            <label class="lbl">책이름</label>
            <input type="text" v-model="state.title"/>
        </div>
        <div>
            <label class="lbl">작가</label>
            <input type="text" v-model="state.author"/>
        </div>
        <div>
            <label class="lbl">가격</label>
            <input type="number" v-model="state.price"/>
        </div>
        <div>
            <label class="lbl"></label>
            <button @click="handleUpdate()">수정</button>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup () {

        const router = useRouter();
        const route = useRoute();

        const state = reactive ({
            id : Number( route.query.id ),
            title : '',
            author : '',
            price : 0,
        });

        const handleUpdate = async() => {
            const url = `/api/book/update.json`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                _id : state.id,
                title : state.title,
                author : state.author,
                price : state.price,
            };
            const { data } = await axios.put(url, body, {headers});
            console.log(data);
            if(data.status === 200) {
                router.push({path:'/book'});
            }
        }
        
        const handleData = async() => {
            const url = `/api/book/selectone.json?_id=${state.id}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);
            if(data.status === 200) {
                state.title = data.result.title;
                state.author = data.result.author;
                state.price = data.result.price;
            }
            
        };
    

        onMounted(()=> {
            handleData();
        });

        return {
            state,
            handleUpdate,
        }
    }
}
</script>

<style lang="css" scoped>
    .lbl{
        width: 100px;
        display: inline-block;
    }
</style>