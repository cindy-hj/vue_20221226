// 1. 라이브러리 가져오기
import { createWebHashHistory, createRouter } from 'vue-router' ;
// 이번엔 # 들어간 주소로 해보자

// 2. 라우트 설정
import Home from '@/components/HomePage.vue' ; // 앞엔 변수명이라서 짧아도 돼~ 뒤에는 파일명
import Seller from '@/components/SellerPage.vue' ;
import ItemInsert from '@/components/ItemInsertPage.vue' ;
import ItemUpdate from '@/components/ItemUpdatePage.vue' ;

const router = createRouter({ 
    history : createWebHashHistory(),
    routes : [
        {path :'/', component:Home},
        {path :'/seller', component:Seller},
        {path :'/iteminsert', component:ItemInsert},
        {path :'/itemupdate', component:ItemUpdate},
    ]
});

// 이전페이지 이동페이지 정보 확인용
router.beforeEach((to, from, next)=>{
    console.log(to, from);
    next(); // next가 없으면 페이지 이동이 안됨.
});

// 3. 모듈 export
export default router;