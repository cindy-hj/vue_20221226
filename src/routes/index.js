// 1. 라이브러리 가져오기
import { createWebHashHistory, createRouter } from 'vue-router' ;
// 이번엔 # 들어간 주소로 해보자
import store from '../stores/index' ;
// 수동으로 import시켜야한다

// 2. 라우트 설정
import Home from '@/components/HomePage.vue' ; // 앞엔 변수명이라서 짧아도 돼~ 뒤에는 파일명
import Seller from '@/components/SellerPage.vue' ;
import ItemInsert from '@/components/ItemInsertPage.vue' ;
import ItemUpdate from '@/components/ItemUpdatePage.vue' ;
import ItemContent from '@/components/ItemContentPage.vue' ;
import Order from '@/components/OrderPage.vue' ;
import Join from '@/components/JoinPage.vue' ;
import Login from '@/components/LoginPage.vue' ;
import Logout from '@/components/LogoutPage.vue' ;
import BoardInsert from '@/components/board/BoardInsertPage.vue' ;
import BoardSelect from '@/components/board/BoardSelectPage.vue' ;
import BoardContent from '@/components/board/BoardContentPage.vue' ;

const router = createRouter({ 
    history : createWebHashHistory(),
    routes : [
        {path :'/', component:Home},
        {path :'/seller', component:Seller},
        {path :'/iteminsert', component:ItemInsert},
        {path :'/itemupdate', component:ItemUpdate},
        {path :'/itemcontent', component:ItemContent},
        {path :'/order', component:Order},
        {path :'/join', component:Join},
        {path :'/login', component:Login},
        {path :'/logout', component:Logout},
        {path :'/boardinsert', component:BoardInsert},
        {path :'/boardselect', component:BoardSelect},
        {path :'/boardcontent', component:BoardContent},
    ]
});

// 이전페이지 이동페이지 정보 확인용
router.beforeEach((to, from, next)=>{
    console.log(to, from);
    // 홈에 있다가 주문하기 누를때 로그인이 안되어 있다면 로그인페이지로 가야하는데 
    // 로그인 이후 이전페이지로 보내면 로그인 페이지로 이동
    // 로그인, 로그아웃은 되돌아가려는 페이지가 아니다! 기록하면 안됨
    if(to.path !== '/login' && to.path !=='/logout'){
        // 서버 : 포트번호/itemcontent
        sessionStorage.setItem("CURRENT_PATH", to.path);
        // 저장소에는 object 타입 저장 불가능->stringify로 문자로 바꿔줌 ex) ? no=580
        sessionStorage.setItem("QUERY", JSON.stringify(to.query));
        // sessionStorage에 각각의 페이지 방문할때 마다 저장
        // url의 앞부분(/itemcontent)은 path에 ?뒷부분(no=580)은 query에 보관!

        // 주문하기 눌렀을때 바로 로그인 페이지로 넘어가면 로그인 이후 이전페이지로 보내면 다시 주문수량 선택하는 페이지(itemcontent)로 옴. 주문 정보가 기록이 안된것! 
        // 주문하는 정보 기록하기 위해 보여주지 않아도 주문페이지(order)로 갔다가 로그인 페이지로 가야함. 
        // 로그인 되어야 표시되는 페이지들 ex)주문페이지... or로 다른 페이지 더 넣어도됨!
        if(to.path === '/order' || to.path === "/test" ) { // ||는 or의 의미
            const logged = store.getters.getLogged;
            // 로그인 여부를 store에서 받아옴
            console.log(logged);
            if(logged === false) { // 로그인 되어 있지 않으면
                next({path:'/login'}); // 강제로 페이지 변경
                return; // 함수종료, 아래쪽 next 수행하지 않기 위해서
            }
        }

        
    }
    next(); // next가 없으면 페이지 이동이 안됨. () 안에 페이지가 없으면 기존에 이동하고자 하는 페이지로 이동.
});

// 3. 모듈 export
export default router;