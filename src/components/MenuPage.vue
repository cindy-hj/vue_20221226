<!-- App.vue에 있던 메뉴들이 너무 길어지니까 따로 component로 빼낸것. import나 함수들도 통째로 다 가져와야함! -->
<template>
    <div>
        <el-menu :mode="state.mode" :router="state.router" :default-active="state.defaultActive" @select="handleSelect"> 
            <!-- // mode앞에 :이 빠지면 문자! 메뉴는 컴포넌트 안쪽으로 정보 전달해야하는데 :가 없으면 mode라는 곳에 스트링 형태로 지정해준것 -->
            <!-- 참으로 인식하도로 하려면 : 필요 -->
            <!-- 위에 바로 :router="true"로 해도 되지만 나중에 찾기가 어려워서 변수로 설정하는것 -->
            <!-- 컴포넌트 event보고 select 써야겠다 정한것   -->
            <!-- // index는 주소 -->
            <el-menu-item index="/">홈</el-menu-item>
            <el-menu-item index="/seller">판매자</el-menu-item> 
            <el-menu-item index="/login" v-if="state.logged === false">로그인</el-menu-item> 
            <el-menu-item index="/join" v-if="state.logged === false">회원가입</el-menu-item>
            <el-menu-item index="/logout" v-if="state.logged === true">{{ state.userid }}님 로그아웃</el-menu-item> 
            <el-menu-item index="/boardinsert">게시판글쓰기</el-menu-item>
            <el-menu-item index="/boardselect1">게시판목록</el-menu-item>
            <!-- 게시판 검색 이후 게시판 목록 눌렀을때 검색어가 풀린 상태로 해주기 위해서 
                이동만 시키는 페이지(boardselect1)을 만들었고 게시판 목록을 누르면 무조건 이동만 시키는 페이지로 가도록 함. 
                이렇게 하면 어떤 경우라도 이동용페이지->게시판목록을 받아오는거기때문에 딜레이는 좀 있지만... 새로고침한 효과를 받을수 있다 -->
            <el-menu-item index="/chart">chart</el-menu-item>
            
        </el-menu>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

export default {
    setup () {
        const store = useStore()
        const state = reactive({
            mode : 'horizontal',
            router : true, 
            logged : computed(()=>store.getters.getLogged),
            userid : computed(()=>store.getters.getUserid),
            defaultActive : computed(()=>store.getters.getDefaultActive),
        });

        // 메뉴를 클릭할때 마다 defaultActive를 변경 -> 그렇게 되야지만 로그인, 로그아웃할떄 홈으로 활성화됨
        // element plus 썼더니 같은페이지에서는 활성화 안되네! 다른메뉴 클릭할때마다 바꿔줘야함. 다른 component 썼으면 다른 방식으로 해야함...
        const handleSelect = (e) => {
        console.log(e);
        // store의 값을 바꾸기
        store.commit('setDefaultActive', e);
        }
    
        return {
            state,
            handleSelect
        }
    }
}
</script>

<style lang="scss" scoped>

</style>