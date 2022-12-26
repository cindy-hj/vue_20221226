<template>
  <div>
    <el-menu :mode="state.mode" :router="state.router"> 
    <!-- // mode앞에 :이 빠지면 문자! 메뉴는 컴포넌트 안쪽으로 정보 전달해야하는데 :가 없으면 mode라는 곳에 스트링 형태로 지정해준것 -->
    <!-- 참으로 인식하도로 하려면 : 필요 -->
    <!-- 위에 바로 :router="true"로 해도 되지만 나중에 찾기가 어려워서 변수로 설정하는것 -->
      <el-menu-item index="/">홈</el-menu-item>
      <el-menu-item index="/seller">판매자</el-menu-item> 
      <!-- // index는 주소 -->
    </el-menu>

    <router-view></router-view>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  setup () {
    const state = reactive({
      mode : 'horizontal',
      router : true, 
    });
    
    return {
      state
    }
  }
}
</script>

<style lang="css" scoped>

</style>