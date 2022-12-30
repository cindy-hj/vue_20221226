<template>
    <div>
        <div v-show="state.div === 1" v-if="state.row">
            <!-- 평상시 보이는 화면, 답글도 포함시켜야함 -->
            <p>글번호: {{ state.row._id }}</p>
            <p>제목: {{ state.row.title }}</p>
            <p>내용: {{ state.row.content }}</p>
            <p>이미지: <img :src="state.row.img" style="height: 400px;"/></p>
            <p>작성자: {{ state.row.writer }}</p>
            <p>조회수: {{ state.row.hit }}</p>
            <p>등록일: {{ state.row.regdate }}</p>
            <button @click="state.div = 2">수정</button>
            <button @click="handleDelete()">삭제</button>
            <button @click="handlePrev()">이전글</button>
            <button @click="handleNext()">다음글</button>
            <hr />

            <table border="1">
                <tr v-for="tmp of state.reply" :key="tmp">
                    <td>{{ tmp._id }}</td>
                    <td>{{ tmp.content }}</td>
                    <td>{{ tmp.writer }}</td>
                    <td>{{ tmp.regdate }}</td>
                    <td><button @click="handleReplyDelete(tmp._id)">삭제</button></td> 
                    <!-- 답글이 여러개이면 삭제하는 버튼도 여러개이므로 어떤 답글을 삭제할지 parmeter필요 -->
                    <hr />
                </tr>
            </table>
            <input type="text" v-model="state.recontent" placeholder="답글쓰기" />
            <input type="text" v-model="state.rewriter" placeholder="답글작성자" />
            <button @click="handleReplyInsert()">답글 쓰기</button>
        </div>

        <div v-show="state.div === 2" v-if="state.row1">
        <!-- 수정시 보이는 화면 -->
            <p>작성자: <input type="text" v-model="state.row1.writer" /></p>
            <p>제목: <input type="text" v-model="state.row1.title" /></p>
            <p>내용: <textarea v-model="state.row1.content"></textarea></p>
            <button @click="handleUpdate()">수정완료</button>
            <button @click="state.div = 1">취소</button>
        </div>
       
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
            no      : Number(route.query.no), // 현재 글번호
        
            row1    : null, // 수정시 사용할 게시글 1개 정보
            div     : 1, // 기본으로 보여주는 화면, 수정시 2로 

            row     : null, // 게시글 1개정보
            prev    : 0, // 이전글
            next    : 0, // 다음글

            reply    : [], // 답글 목록
            recontent : '', // 답글 내용
            rewriter: '', // 답글 작성자
            // 답글 내용과 답글 작성자는 v-model과 연결하기 위해 변수 설정이 필요. 답글 번호나 작성일자는 변수 설정할 필요 없다!
            // 필요한 답글 정보는 reply가 배열 형태로 이미 다 받아옴
        });   

        const handleDelete = async() => {
            if(confirm('삭제할까요?')) {
                const url = `/board101/delete.json?no=${state.no}`;
                const headers = {"Content-Type":"application/json"};
                const body = {};
                const { data } = await axios.delete(url, {headers:headers, data:body});
                console.log('handleDelete', data);
                if(data.status === 200) {
                    router.push({path:'/boardselect'});
                }
            }
        };

        const handleUpdate = async() => {
            const url =`/board101/update.json?no=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const body = { // row1의 값을 ''로 받으니까 밑줄생기네..null로 하니 됨
                title : state.row1.title, 
                content : state.row1.content,
                writer : state.row1.writer,
            }
            const { data } = await axios.put(url, body, {headers});
            console.log('handleUpdate', data);
            if(data.status === 200) {
                handleData();
                state.div = 1;
            }
        };

        const handleReplyDelete = async(reno) => {
            if(confirm('삭제할까요?')) { // 삭제 전 확인 필
                const url = `/board101/deletereply.json?no=${reno}`;
                const headers = {"Content-Type":"application/json"};
                const body = {};

                const { data } = await axios.delete(url, {headers:headers, data:body});
                console.log('handleReplyDelete', data);
                if(data.status === 200) {
                    handleData1();
                }
            }
        };
        
        const handleReplyInsert = async() => {
            const url = `/board101/insertreply.json`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                brdno: state.no,
                content : state.recontent,
                writer: state.rewriter,
            }
            const { data } = await axios.post(url, body, {headers});
            console.log('handleReply =>', data);
            if(data.status === 200) {
                alert('답글이 작성되었습니다.');
                handleData1();
                state.recontent = '';
                state.rewriter = ''; // 답글 작성 완료 후 입력하는 창 내용 비우기  
            }

        };

        const handlePrev = () => {
            if(state.prev === 0) {
                alert('이전글이 없습니다.')
                router.push({path:"/boardcontent", query:{no:state.no}});
            }
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
            else {
                alert('다음글이 없습니다.')
                router.push({path:"/boardcontent", query:{no:state.no}});
            } // else 없이 짜니까 다음글이 있을때 다음글 없습니다 뜨고 다음글로 넘어감...? 

            // if를 값이 0일때로 잡냐 0이 아닐때로 잡냐 일부러 다르게 해봤는데 실행에 있어서 차이는 아직 잘 모르겠다.. 백엔드 배우면 메모리 잡아먹는 정도가 다른게 보일지도..?
          
            // else가 없으면 if 조건 만족하면 if 문 돌리고 if문 바깥을 실행하고, if 조건 만족하지 않으면 if 문 안돌리고 바깥을 실행하네?
            // if문 돌아가는 조건에서 if문 안에서 return하면 함수가 거기에서 종료되므로 else를 생략해도 바깥이 실행안됨
            // 당연하지! else 안쓴건 if문이랑 붙어있다 하더라도 if문과 별개의 것이니까 if가 돌든 안돌든 실행됨
            // 단지 if 내에서 return하면 함수가 종료되어서 그 이후가 안돌아가는것뿐!
        };

        // 게시물 상세 내역 가져오기
        const handleData = async() => { 
            const url =`/board101/selectoneimage.json?no=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log('handleData =>', data);
            if(data.status === 200) {
                state.row = data.result;
                state.prev = data.prevNo;
                state.next = data.nextNo;
                state.row1 = { ...data.result }; 
            }    
        };
        
        // 해당 게시물의 답글 목록 가져오기
        const handleData1 = async() => {
            const url = `/board101/selectreply.json?brdno=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log('handleData1 =>', data);
            if(data.status === 200) {
                state.reply = data.rows;
            } 
        }

        // 화면이 로딩될떄 즉시 출력해야 하는 것들..
        onMounted(()=> {
            handleData();
            handleData1();
            // 시작은 handelData를 먼저 읽지만 뭐가 먼저 끝날지는 보장할 수 없다. 
            // console 찍어보면 handleData1이 먼저 찍힐때도.. 아닐때도.. 그때그떄 다르네-> 끝나는 시점은 우리가 정할수없다!
            // 그래서 데이터 콘솔로 찍어볼때 함수이름 넣어서 찍는 습관들이기!
        })

        return {
            state,
            handlePrev,
            handleNext,
            handleReplyInsert,
            handleReplyDelete,
            handleUpdate,
            handleDelete,
        }
    }
}
</script>

<style lang="css" scoped>

</style>