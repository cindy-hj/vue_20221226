<template>
    <div>
        <h3>book 목록</h3>
    </div>

    <div>
        <button @click="handleInsert()">등록</button>
        <table border="1" style="border-collapse: collapse;">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>책이름</th>
                    <th>작가</th>
                    <th>가격</th>
                    <th>등록일</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tmp of state.rows" :key="tmp">
                    <td>{{ tmp._id }}</td>
                    <td>{{ tmp.title }}</td>
                    <td>{{ tmp.author }}</td>
                    <td>{{ tmp.price }}</td>
                    <td>{{ tmp.regdate }}</td>
                    <td>
                        <button @click="handleDelete(tmp._id)">삭제</button>
                        <button @click="handleUpdate(tmp._id)">수정</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    setup () {
        
        const state = reactive({
            rows : [],
        });
        
        const router = useRouter();

        const handleInsert = () => {
            router.push({path:'/bookinsert'});
        }

        const handleDelete = async(id) => {
            if(confirm('삭제할까요?')) {
                const url = `/api/book/delete.json?code=${id}`;
                // 백엔드에서 줄때부터 형태를 ?code= 로 정해놨었네... 쿼리로 달라고 했음!
                const headers = {"Content-Type":"application/json"};
                const body = { };
                const { data } = await axios.delete(url, {headers:headers, data:body});
                console.log(data);
                if(data.status === 200) {
                    handleData();
                }
            }
        }

        const handleUpdate = (id) => {
            router.push({path:'/bookupdate', query:{id:id}});
        }

        const handleData = async() => {
            const url = `/api/book/select.json`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);
            if(data.status === 200) {
                state.rows = data.result;
            }
        };

        onMounted(()=> {
            handleData();
        })

        return {
            state,
            handleInsert,
            handleDelete,
            handleUpdate,
        }
    }
}
</script>

<style lang="css" scoped>
   

</style>