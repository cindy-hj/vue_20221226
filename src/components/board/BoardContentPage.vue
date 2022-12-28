<template>
    <div>
        {{ state }}
        <p>글번호: {{ state.row._id }}</p>
        <p>제목: {{ state.row.title }}</p>
        <p>내용: {{ state.row.content }}</p>
        <p>이미지: <img :src="state.row.img" style="height: 400px;"/></p>
        <p>작성자: {{ state.row.writer }}</p>
        <p>조회수: {{ state.row.hit }}</p>
        <p>등록일: {{ state.row.regdate }}</p>
        <button>수정</button>
        <button>삭제</button>
        <button @click="handlePrev()">이전글</button>
        <button @click="handleNext()">다음글</button>
        <hr />

        <div v-for="tmp of state.rows" :key="tmp">
            <p>답글 내용: {{ tmp.content }}</p>
            <p>작성자: {{ tmp.writer }}</p>
            <hr />
        </div>
        <input type="text" v-model="state.recontent" placeholder="답글쓰기" />
        <input type="text" v-model="state.rewriter" placeholder="답글작성자" />
        <button @click="handleRe()">답글 쓰기</button>
    </div>
</template>

<script>
import { onMounted, reactive } from '@vue/runtime-core';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {

    setup () {
        const route = useRoute();     
        const router = useRouter();
        const state = reactive({
            no      : Number(route.query.no),
            row     : '',
            prev    : 0,
            next    : 0,
            rows    : '',
            recontent : '',
            rewriter: '',
        });   

        
        const handleRe = async() => {
            const url = `/board101/insertreply.json`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                brdno: state.no,
                content : state.recontent,
                writer: state.rewriter,
            }
            const { data } = await axios.post(url, body, {headers});
            console.log('handleRe =>', data);
            if(data.status === 200) {
                alert('답글이 작성되었습니다.');
                handleData1();
                state.recontent = '';
                state.rewriter = '';
            }

        };

        const handlePrev = () => {
            if(state.prev === 0) {
                alert('이전글이 없습니다.')
                router.push({path:"/boardcontent", query:{no:state.no}});
            }
            // router.push({path:"/boardcontent", query:{no:state.prev}});
            // state.no = state.prev;
            // handleContent();
            else {
                router.push({path:"/boardcontent", query:{no:state.prev}});
                state.no = state.prev;
                handleData();
                handleData1();
            } // else 없이 짜니 이전글로 안넘어 가긴 하는데 no가 null이라고 오류가 나네...?
        };

        const handleNext = () => {
            if(state.next !== 0) {
                router.push({path:"/boardcontent", query:{no:state.next}});
                state.no = state.next;
                handleData();
                handleData1();
            }
            // alert('다음글이 없습니다.')
            // router.push({path:"/boardcontent", query:{no:state.no}});
            else {
                alert('다음글이 없습니다.')
                router.push({path:"/boardcontent", query:{no:state.no}});
            } // else 없이 짜니까 다음글이 있을때 다음글 없습니다 뜨고 다음글로 넘어감...? 

            // else가 없으면 if 조건 만족하면 if 문 돌리고 if문 바깥을 실행하고, if 조건 만족하지 않으면 if 문 안돌리고 바깥을 실행하나?
            // if 안에서 return하면 함수가 거기에서 종료되므로 else를 생략해도 바깥이 실행안됨
            // 당연하지! else 안쓴건 if문이랑 붙어있다 하더라도 if문과 별개의 것이니까. 단지 if 내에서 return하면 함수가 종료되어서 그이후가 안돌아가는것뿐
        };

        // 게시물 상세 내역 가져오기
        const handleData = async() => {
            const url =`/board101/selectoneimage.json?no=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);
            if(data.status === 200) {
                state.row = data.result;
                state.prev = data.prevNo;
                state.next = data.nextNo;
            }    
        };
        
        // 해당 게시물의 답글 목록 가져오기
        const handleData1 = async() => {
            const url = `/board101/selectreply.json?brdno=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);
            if(data.status === 200) {
                state.rows = data.rows;
            } 
        }

        // 화면이 로딩될떄 즉시 출력해야 하는 것들..
        onMounted(()=> {
            handleData();
            handleData1();
        })

        return {
            state,
            handlePrev,
            handleNext,
            handleRe,
        }
    }
}
</script>

<style lang="css" scoped>

</style>