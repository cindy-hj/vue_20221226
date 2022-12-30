<template>
    <div>
        <h3>책 등록 페이지</h3>
        {{ state }}
        <div>
            <label class="lbl">번호</label>
            <input type="number" v-model="state._id"/>
        </div>
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
            <button @click="handleInsert()">등록</button>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    setup () {

        const router = useRouter();
        const state = reactive ({
            _id: 0,
            title : '',
            author : '',
            price: 0,
        });      
        
        const handleInsert = async() => {
          const url = `/api/book/insert.json`;
          const headers = {"Content-Type":"application/json"};
          const body = {
            _id: Number(state._id),
            title : state.title,
            author : state.author,
            price : Number(state.price),
          };
          const { data } = await axios.post(url, body, {headers})
          console.log(data);
          if(data.status === 200) {
            alert('등록 되었습니다.');
            router.push({path:"/book"});
          }
          
        };

        return {
            state,
            handleInsert,
        }
    }
}
</script>

<style lang="css" scoped>
 .lbl {
    width: 100px;
    display: inline-block;
 }

</style>