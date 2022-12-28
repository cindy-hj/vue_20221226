<template>
  <div>
    <menu-page></menu-page>

    <router-view></router-view>

    <footer-page></footer-page>
  </div>
</template>

<script>

import FooterPage from '@/components/FooterPage.vue' ; // footer페이지 추가
import MenuPage from '@/components/MenuPage.vue' // menu페이지 추가

export default {
  components: {
    FooterPage, // <footer-page> 
    MenuPage
  },
  setup () {
    
    return {}
  }
}
</script>

<style lang="css" scoped>

</style>