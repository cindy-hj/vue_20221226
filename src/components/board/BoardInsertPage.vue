<template>
    <div class="container">
        <h3>게시판 글쓰기</h3>

        {{ state }}
        <div class="item">
            <label class="lbl">제목</label>
            <input type="text" v-model="state.title" placeholder="제목" autofocus/>
        </div>
        <div class="item" style="width:700px;">
            <label class="lbl">내용</label>
            <ckeditor :editor="state.editor" v-model="state.editorData" @ready="handleInit"></ckeditor>
            <!-- <textarea rows="6" cols="22" v-model="state.content" placeholder="내용"></textarea> -->
        </div>
        <div class="item">
            <label class="lbl">작성자</label>
            <input type="text" v-model="state.writer" placeholder="작성자" />
        </div>
        <div class="item">
            <label class="lbl">이미지</label>
            <!-- <img :src="state.imageurl" style="height: 100px;" /> -->
            <!-- <input type="file" @change="handleImage($event)" /> -->

            <el-dialog v-model="state.dialogVisible">
                <img style="width:100%" :src="state.dialogImageUrl" alt="Preview Image" />
            </el-dialog>

            <el-upload action="#" 
                list-type="picture-card" 
                :auto-upload="false" 
                :on-remove="handelRemove"
                :on-preview="handlePreview"
                v-model:file-list="state.filelist"
                >
                <el-icon><Plus /></el-icon>
            </el-upload>
            <!--  emit이 아니라 props로 되어 있음.. -->


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

import { Plus } from '@element-plus/icons-vue'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';

export default {
    components : {
        Plus, // plus쓰고 싶으면 import 시키고 여기에 추가해야 한다!
        ckeditor : CKEditor.component,
    },

    setup () {
        const router = useRouter();
        const store = useStore();

        

        const state = reactive({
            title   : '',
            writer  : '',
            // file    : null,
            // imageurl: require('../../assets/imgs/noimage.png'),

            editor: ClassicEditor,
            editorData : '',

            filelist : [], // 첨부파일 목록
            dialogVisible : false, // + 미리보기 다이얼로그
            dialogImageUrl : '', // 미리보기 이미지 url
        });

        const handleInit = (editor) => {
            editor.editing.view.change(writer => {
                writer.setStyle("height","300px", 
                    editor.editing.view.document.getRoot());
            });
            
        };

        // const handleImage = (e) => {
        //     console.log(e);
        //     if(e.target.files.length > 0) {
        //         state.file = e.target.files[0];
        //         state.imageurl = URL.createObjectURL(e.target.files[0]);
        //     }
        //     else {
        //         state.file = null;
        //         state.imageurl = require('../../assets/imgs/noimage.png')
        //     }
        // };

        const handleInsert = async() => {
            // 유효성 검사
            // 사진 여러개 추가했을때 동시에 넣을수 있나 싶어서 반복물 돌렸으나..
            // 그건 백엔드를 수정해야하는거고 이렇게 하면 똑같은 게시글이지만 사진만 다른 게시글이 여러개로 나뉘어서 올라감
            for(let tmp of state.filelist) {
                const url = `/board101/insertimage.json`;
                const headers = {"Content-Type":"multipart/form-data"};
                const body = new FormData();
                body.append("title", state.title);
                body.append("content", state.editorData);
                body.append("writer", state.writer);
                // 파일명, 크기, 내용, 종류
                // body.append("image", state.file);
                body.append("image", tmp.raw); 

                const { data } = await axios.post(url, body, {headers});
                console.log(data);
                console.log(state.filelist);
                if(data.status === 200) {
                    store.commit('setDefaultActive', '/boardselect1');
                    // 글쓰기 이후 메뉴 활성화를 게시글목록으로 보내기 위함
                    // 로그인, 아웃의 경우 이전페이지가 어디일지 모르고 그 이전페이지로 돌아가야 했기 때문에 route를 이용해서 storage에 값을 보관하고 받고 해야했지만
                    // 지금 경우에는 게시글 작성후 무조건! 게시글 목록으로 가게 되있음
                    // route 이용할 필요 없고 그냥 값을 지정해주면 된다.
                    router.push({path:'/boardselect'});
                }
            }
        };

        const handelRemove = (e) => {
            console.log(`삭제 =>`, e);
        }
            // {e}로 확인하면 object로 나와서 내용 확인하려면 e로.. 파일의 정보가 나옴
        const handlePreview = (e) => {
            state.dialogImageUrl = e.url;
            state.dialogVisible = true;
            console.log(`미리보기 =>`, e);
        }

        return {
            state,
            // handleImage,
            handleInsert,
            handleInit,
            handelRemove,
            handlePreview,
        }
    }
}
</script>

<style lang="css" scoped>
    .container {
        width   : 800px;
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