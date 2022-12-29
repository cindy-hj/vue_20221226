<template>
    <div>
        <h3>게시판 목록</h3>
        <div>
            <input type="text" @keyup.enter="handleSearch()" v-model="state.text" placeholder="검색어 입력"/>
        </div>
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>이미지</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tmp of state.rows" :key="tmp">
                        <td>{{ tmp._id }}</td>
                        <td @click="handleContent(tmp._id)" style="cursor:pointer;">{{ tmp.title }}</td>
                        <td><img :src= "tmp.img" style="width: 100px;" /></td>
                        <td>{{ tmp.writer }}</td>
                        <td>{{ tmp.hit }}</td>
                        <td>{{ tmp.regdate }}</td>
                    </tr>
                </tbody>
            </table>

            <!-- component 이용안하고 pagination 만든것 -->
            <div v-for="tmp of state.pages" :key="tmp" style="display: inline-block;">
                <button @click="handlePage(tmp)">{{ tmp }}</button>
            </div>
            <!-- 새로고침해도 페이지 유지하고싶으면 파라미터 이용했어야함 -->
        </div>        
            </div>
</template>

<script>
import { onMounted, reactive } from '@vue/runtime-core';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup () {
        // 변수 설정-----------------------------------------
        const route = useRoute();
        const router = useRouter();
        //--------------------------------------------------

        // 상태 변수-----------------------------------------
        // f5를 누르면 초기화
        const state = reactive({
            page  : Number(route.query.page),
            text  : String(route.query.text), // trim이 문자로 인식하게 하기 위해서 강제로 형을 붙여줌
            rows  : [],
            total : 0,
            pages : 0,
        });
        //---------------------------------------------------

        // 게시물 목록 데이터 읽기(목록, 전체 게시물 수)--------
        const handleData = async() => {
            const url = `/board101/selectlistimage.json?page=${state.page}&text=${state.text}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);
            if(data.status === 200) {
                state.rows = data.rows;
                state.total = data.total;
                state.pages = Math.floor((data.total-1)/10) + 1 ; // pagination 직접 계산한것
            }
        };
        //---------------------------------------------------

        // 게시물 상세 페이지로 이동
        // boardcontent?no=게시물번호
        const handleContent = async(id) => {
            console.log(id); // 글 번호 정보, 확인용
            const url = `/board101/updatehit.json?no=${id}`;
            const headers = {"Content-Type":"application/json"};
            const body = {};
            const { data } = await axios.put(url, body, {headers});
            console.log('handleContent', data);
            if(data.status === 200) {
                router.push({path:'/boardcontent', query:{no:id}});
            }
        };

        // 페이지네이션----------------------------------------
        const handlePage = (tmp) => {
            state.page = tmp;
            router.push({path:'/boardselect', query:{page:tmp, text:state.text}});
            // 새로 고침해도 pagination 유지 위해서 주소에 query 넣어주는것 (주소 바꿔줌)
            handleData();
        };
        //----------------------------------------------------

        // f5누를때 호출됨, page 유지 위해서 query(page)가져오기(parameter 유지)----------
        // state 변수보다 뒤에 실행됨
        onMounted(() => {
            // // 주소창의 page와 text 정보를 읽음
            // const page = route.query.page;
            // const text = route.query.text;
            // // 서버주소: 8080/boardselect로 들어와도 8080/boardselect?page=1&text= 로 강제로 주소 변경! undefined일때 계속if 문 넣기 싫어서...
            // // page, text 정보가 없으면 초기값이 1, ''가 됨
            // if(typeof(page) ==='undefined' && typeof(text) ==='undefined') {
            //     router.push({path:'/boardselect', query:{page:1, text:''}});
            // }
            // 이렇게 처리하니까 state변수 값을 먼저 읽어서 status가 -1  뜨고 한번 더 새로고침 해야 값을 불러옴
            // 해결-> menu에서 index 주소 자체에 query 붙은걸로 바꿔줌 
            // 문제-> 글 등록하고 게시글 목록으로 router.push하는 과정에서 -1이뜸. push하는 주소에 ?page=1&text= 붙여도 해결 안됨
            // 해결-> routes에서 if문 처리해서 query 없이 접근했을때는 query를 부여함
            handleData();
        });
        //----------------------------------------------------

        // 검색어 처리-----------------------------------------
        const handleSearch = () => {
            // 문자열.trim() => 앞 뒤의 공백 제거
            state.text = state.text.trim();
            state.page = 1; // 검색하면 1페이지로 이동
            router.push({path:'/boardselect', query:{page:1, text:state.text}});

            handleData();
        };
        //----------------------------------------------------

        return {
            state,
            handlePage,
            handleContent,
            handleSearch
        };
    }
    // 정보를 보관하기 위해서는 저장소에 보관하거나 query에 보관해야함 
    // 노출되도 되는 정보를 주로 query에 보관. 아이디나 암호는 노출되면 안되니 storage에 보관
}
</script>

<style lang="css" scoped>

</style>