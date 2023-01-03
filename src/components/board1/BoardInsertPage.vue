<template>
    <div>
        <h3>게시판글쓰기</h3>
        <div class="item">
            <div class="lbl">제목</div>
            <input type="text" v-model="state.title" autofocus/>
        </div>
        <div class="item">
            <div class="lbl">내용</div>
            <textarea v-model="state.content"></textarea>
        </div>
        <div class="item">
            <div class="lbl">작성자</div>
            <input type="text" v-model="state.writer" />
        </div>
        <div class="item">
            <div class="lbl">이미지</div>
            <img :src="state.imageurl" style="height: 100px;"/>
            <input type="file" @change="handleImage($event)"/>
        </div>
        <div class="item">
            <div class="lbl"></div>
            <button @click="handleInsert()">글쓰기</button>
            <router-link :to="{path:'/boardselect1'}">
                <button>목록으로</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios';
export default {
    setup () {
        const state = reactive ({
            title : '',
            content : '',
            writer : '',
            file : null,
            imageurl : require('../../assets/imgs/noimage.png'),
        });

        const handleImage = async(e) => {
            if(e.target.files.length > 0) {
                state.file = e.target.files[0];
                state.imageurl = URL.createObjectURL( state.file );
            }
            else {
                state.file = null;
                state.imageurl = require('../../assets/imgs/noimage.png');
            }
        };

        const handleInsert = async() => {
            if(state.title.length <= 0) {
                alert('제목을 입력하세요.');
                return false;
            }
            if(state.content.length <= 0) {
                alert('내용을 입력하세요.');
                return false;
            }
            if(state.writer.length <= 0) {
                alert('작성자를 입력하세요.');
                return false;
            }
            if(state.file === null) {
                alert('파일을 첨부하세요.');
                return false;
            }
            
            const url = `api/board/insert.json`;
            const headers = {"Content-Type":"multipart/form-data"};
            let body = new FormData ();
            body.append('title', state.title);
            body.append('content', state.content);
            body.append('writer', state.writer);
            body.append('file', state.file);

            const { data } = await axios.post(url, body, {headers});
            console.log(data);
        };

        return {
            state,
            handleInsert,
            handleImage
        }
    }
}
</script>

<style lang="css" scoped>
    .item {
        padding: 5px;
    }
    .lbl {
        display: inline-block;
        width: 100px;
    }

</style>