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
import { useStore } from 'vuex';
export default {
    setup () {
        const router = useRouter();
        const store = useStore();

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
                store.commit('setDefaultActive', '/boardselect1');
                // 글쓰기 이후 메뉴 활성화를 게시글목록으로 보내기 위함
                // 로그인, 아웃의 경우 이전페이지가 어디일지 모르고 그 이전페이지로 돌아가야 했기 때문에 route를 이용해서 storage에 값을 보관하고 받고 해야했지만
                // 지금 경우에는 게시글 작성후 무조건! 게시글 목록으로 가게 되있음
                // route 이용할 필요 없고 그냥 값을 지정해주면 된다.
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