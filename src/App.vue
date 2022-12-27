<template>
  <div>
    <el-menu :mode="state.mode" :router="state.router" :default-active="state.defaultActive" @select="handleSelect"> 
    <!-- // mode앞에 :이 빠지면 문자! 메뉴는 컴포넌트 안쪽으로 정보 전달해야하는데 :가 없으면 mode라는 곳에 스트링 형태로 지정해준것 -->
    <!-- 참으로 인식하도로 하려면 : 필요 -->
    <!-- 위에 바로 :router="true"로 해도 되지만 나중에 찾기가 어려워서 변수로 설정하는것 -->
      <el-menu-item index="/">홈</el-menu-item>
      <el-menu-item index="/seller">판매자</el-menu-item> 
      <el-menu-item index="/login" v-if="state.logged === false">로그인</el-menu-item> 
      <el-menu-item index="/join" v-if="state.logged === false">회원가입</el-menu-item>
      <el-menu-item index="/logout" v-if="state.logged === true">{{ state.userid }}님 로그아웃</el-menu-item>  
      <!-- // index는 주소 -->
    </el-menu>

    <router-view></router-view>
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

<style lang="css" scoped>

</style>