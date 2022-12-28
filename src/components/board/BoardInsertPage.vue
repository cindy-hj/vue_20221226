<template>
    <div class="container">
        <h3>게시판 글쓰기</h3>

        {{ state }}
        <div class="item">
            <label class="lbl">제목</label>
            <input type="text" v-model="state.title" placeholder="제목" autofocus/>
        </div>
        <div class="item">
            <label class="lbl">내용</label>
            <textarea rows="6" cols="22" v-model="state.content" placeholder="내용"></textarea>
        </div>
        <div class="item">
            <label class="lbl">작성자</label>
            <input type="text" v-model="state.writer" placeholder="작성자" />
        </div>
        <div class="item">
            <label class="lbl">이미지</label>
            <input type="file" @change="handleImage($event)" />
        </div>
        <div class="item">
            <label class="lbl"></label>
            <button @click="handleInsert()">글쓰기</button>
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

        const state = reactive({
            title   : '',
            content : '',
            writer  : '',
            file    : null,
        })

        const handleImage = (e) => {
            console.log(e);
            if(e.target.files.length > 0) {
                state.file = e.target.files[0];
            }
            else {
                state.file = null;
            }
        };

        const handleInsert = async() => {
            // 유효성 검사
            const url = `/board101/insertimage.json`;
            const headers = {"Content-Type":"multipart/form-data"};
            const body = new FormData();
            body.append("title", state.title);
            body.append("content", state.content);
            body.append("writer", state.writer);
            // 파일명, 크기, 내용, 종류
            body.append("image", state.file); 

            const { data } = await axios.post(url, body, {headers});
            console.log(data);
            if(data.status === 200) {
                router.push({path:'/boardselect'});
            }

        };

        return {
            state,
            handleImage,
            handleInsert,
        }
    }
}
</script>

<style lang="css" scoped>
    .container {
        width   : 600px;
        padding : 10px;
        margin  : 5px;
        border  : 1px solid #cccccc;
    }

    .lbl {
        display : inline-block;
        width   : 100px;
    }

    .item {
        margin-bottom   : 5px;
    }

</style>