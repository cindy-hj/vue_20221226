<template>
  <div>
    <!-- 여기서 그리드를 잘 써야 한다. 여기는 간단하게 배치만 하는것! -->
    <menu-page></menu-page> 
    <!-- // 메뉴 -->
    <router-view></router-view> 
    <!-- // 라우터 설정된 컴포넌트들 교체 되는 위치 -->
    <footer-page></footer-page> 
    <!-- // footer -->
  </div>
</template>

<script>

import FooterPage from '@/components/FooterPage.vue' ; // footer페이지 추가
import MenuPage from '@/components/MenuPage.vue' // menu페이지 추가

export default {
  components: {
    FooterPage, // <footer-page> 
    MenuPage // <menu-page>
  },
  setup () {
    
    return {}
  }
}
</script>

<style lang="css" scoped>

</style>