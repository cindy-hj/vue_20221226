<template>
    <div>
        <h3>판매자</h3>

        
        <el-button type="info" size="small" @click="handleItemInsert()">물품등록</el-button>
        <!-- 라우터 링크로 하니까 밑줄생겨서 함수로 했으나 style 조절하면 밑줄 없어진다구요 -->
        
        <el-table :data="rows" size="small">
            <!-- to refs했기 때문에 state 생략가능 -->
            <el-table-column prop="_id" label="물품번호" width="70" />
            <el-table-column label="이미지" width="70">
                <template #default="scope">
                    <img :src="scope.row.img" style="width: 50px;"/>
                    <!-- 이미지 넣으려면 예제에서 버튼 들어가있는것.. 이런것 찾아야해. 기존의 것은 string만 들어감 -->
                    <!-- 최초에 한번만 데이터를 주고 나머지는 내부에서 꺼내서 사용해야함 -->
                    <!-- 데이터를 통으로 줬기때문에 하나의 정보만 꺼내는게 필요-> scope 이용! -->
                    <!-- scope는 component안의 데이터를 다시 꺼낼때 사용하는것 -->
                    <!-- 예제를 보니 scope.row.tag에서 가져왔구나... 그래서 row에 데이터를 받았다는걸 추측해서 사용 component 내부를 못보기 때문에..! -->
                </template>
                
            </el-table-column>
            <el-table-column prop="name" label="물품명" width="70" />
            <el-table-column prop="price" label="가격" width="70" />
            <el-table-column prop="quantity" label="수량" width="70" />
            <el-table-column prop="content" label="내용" />
            <el-table-column prop="regdate" label="날짜" width="170" />
            <el-table-column label="버튼">
                <template #default="scope">
                    <el-button type="info" size="small" @click="handleUpdate(scope.row._id)">수정</el-button>
                    <el-button type="info" size="small" @click="handleDelete(scope.row._id)">삭제</el-button>
                    <!-- 삭제하고자하는 번호 정보를 줘야한다 -->
                    <!-- 여기에 scope를 쓰는 이유? 밑에서 준 data를 다운받은 components에 넣어주고 싶어서...? -->
                </template>
            </el-table-column>
        </el-table>

        <div>
            <el-pagination small background layout="prev, pager, next" :page-size="12" :total="total" @current-change="handlePage"/> 
            <!-- 함수뒤에 ()안붙이는 이유는 주는 파라미터가 몇갠지 모르기때문에 비워둬야함 -->
        </div>

        <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
            <span>
                삭제할까요?
            </span>
            <template #footer>
                <el-button type="primary" @click="handleDeleteAction()">확인</el-button>
                <el-button @click="centerDialogVisible = false">취소</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
export default {
    setup () {
        // 상태 변수
        const state = reactive({
            page    : 1,
            rows    : null,
            total   : 0,
            centerDialogVisible : false,
            no : 0,
        });

        const router = useRouter();

        // 함수
        const handleUpdate = (no) => {
            router.push({path:'/itemupdate', query:{no:no}});
        }

        const handleItemInsert = () => {
            router.push({path:'/iteminsert'})
        }

        const handleDeleteAction = async( ) => {
            // 백엔드를 호출해서 삭제하기
            const url =`/item101/delete.json?no=${state.no}`;
            const headers ={"Content-Type":"application/json"};
            const body = {};
            const { data } = await axios.delete(url, {headers:headers, data:body});
            console.log(data);
            if(data.status === 200) {
                // 다이얼로그 닫기
                state.centerDialogVisible = false;
                handleData();
            }
        }

        const handleDelete = ( no ) => {
            console.log(no);
            state.no = no;
            state.centerDialogVisible = true;
        }
        // dialog는 화면상에 있지만 숨겨져있다가 삭제버튼 눌리면 보이게 하는것. 보이게 하는 타이밍이 centerDialogVisible 값이 참이 될때 인것! 취소 눌러서 창 사라지게 하려면 centerDialogVisible값을 거짓으로 바꾸면 되는것!

        const handlePage = ( no ) => {
            console.log(no);
            state.page = no;
            handleData();
        };

        const handleData = async() => {
            const url = `/item101/selectlistpage.json?page=${state.page}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            // import안되서 수동으로 함..
            console.log(data);
            if(data.status === 200) {
                state.rows  = data.result;
                state.total = data.total;
            }
        };

        // 생명 주기
        onMounted(()=> {
            handleData();
        });

        // 리턴
        return {
            state,
            ...toRefs(state),
            handlePage,
            handleDelete,
            handleDeleteAction,
            handleItemInsert,
            handleUpdate
        }
    }
}
</script>

<style lang="css" scoped>

</style>