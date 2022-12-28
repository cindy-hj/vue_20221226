<template>
    <div>
        <h3>게시판 목록</h3>
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
        // 변수 설정----------------------------------------
        const route = useRoute();
        const router = useRouter();
        //-------------------------------------------------

        // 상태 변수----------------------------------------
        const state = reactive({
            page  : 1,
            text  : '',
            rows  : [],
            total : 0,
            pages : 0,
        });
        //--------------------------------------------------

        // 게시물 목록 데이터 읽기(목록, 전체 게시물 수)-------
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
        //--------------------------------------------------

        // 게시물 상세 페이지로 이동
        // boardcontent?no=게시물번호
        const handleContent = (id) => {
            console.log(id); // 글 번호 정보
            router.push({path:'/boardcontent', query:{no:id}});
        };

        // 페이지 니에션
        const handlePage = (tmp) => {
            state.page = tmp;
            router.push({path:'/boardselect', query:{page:tmp}});
            // 새로 고침해도 pagination 유지 위해서 주소에 query 넣어주는것 (주소 바꿔줌)
            handleData();
        };

        // f5누를때 호출됨, page 유지 위해서 query(page)가져오기
        onMounted(() => {
            // 주소창의 ?page=1 정보를 읽음
            const page = route.query.page;
            // page 정보가 없으면 초기값이 1이되고 있으면 읽은 정보로
            if(typeof(page) !=='undefined') {
                state.page = Number(page);
            }
            handleData();
        });

        return {
            state,
            handlePage,
            handleContent
        };
    }
    // 정보를 보관하기 위해서는 저장소에 보관하거나 query에 보관해야함 
    // 노출되도 되는 정보를 주로 query에 보관. 아이디나 암호는 노출되면 안되니 storage에 보관
}
</script>

<style lang="css" scoped>

</style>