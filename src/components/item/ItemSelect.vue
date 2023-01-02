<template>
    <div>
        <h3>물품목록</h3>
        <hr />
        <button @click="handleInsert()">물품등록</button>
        <table border="1">
            <tr>
                <th>번호</th>
                <th>사진</th>
                <th>물품명</th>
                <th>내용</th>
                <th>수량</th>
                <th>가격</th>
                <th>등록일</th>
            </tr>
            <tr v-for="tmp of state.rows" :key=tmp>
                <td>{{ tmp._id }}</td>
                <td><img :src="tmp.imageurl" style="width: 100px;"/></td>
                <td @click="handleContent(tmp._id)" style="cursor: pointer;">{{ tmp.name }}</td>
                <td>{{ tmp.content }}</td>
                <td>{{ tmp.quantity }}</td>
                <td>{{ tmp.price }}</td>
                <td>{{ tmp.regdate1 }}</td> 
                <!-- 타임존 설정한 값 -->
            </tr>
        </table>

        <div v-for="tmp of state.pages" :key="tmp" style="display: inline-block;">
            <button @click="handlePage(tmp)">{{ tmp }}</button>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup () {
        const router = useRouter();
        const route = useRoute();

        const state = reactive({
            page : Number(route.query.page), // 여길 1로 하면 새로고침할때마다 1페이지로 감, query인 page값을 가져옴
            rows : [],
            pages : 0,
        });

        const handleInsert = async() => {
            router.push({path:'/iteminsert1'});
        }

        const handleContent = async(_id) => {
            router.push({path:'/itemcontent1', query:{_id:_id}});
            // 여기서는 쿼리를 물품1개조회 페이지로 넘겨주는 역할만 하면 된다... url, headers, data... 다 필요 없어!!!!
        }

        const handlePage = async(tmp) => {
            state.page = tmp;
            router.push({path:"/itemselect", query:{page:tmp}});
            handleData();
        }

        const handleData = async() => {
            const url = `/api/item/select?page=${state.page}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);
            if(data.status === 200){
                state.rows = data.result;
                state.pages = Math.floor((data.total-1)/10)+1; 
            }
        }
        
        onMounted(() => {
            handleData();
        });

        return {
            state,
            handlePage,
            handleContent,
            handleInsert,
        }
    }
}
</script>

<style lang="css" scoped>

</style>