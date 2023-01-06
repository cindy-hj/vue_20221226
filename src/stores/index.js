import { createStore } from "vuex";

// 상대경로로 가져옴
import { moduleA } from './modules/moduleA';
// 절대경로로 가져옴
import { moduleB } from '@/stores/modules/moduleB';

export default createStore({
    modules : { moduleA, moduleB }
});

// props와 emit은 component 둘 사이에만 주고 받을떄
// 여러 component에서 공통으로 데이터 주고 받으려고 하면 복잡! 그래서 따로 store(vuex, 리액트에서는 redux) 만들어서 바로 가져가도록함.
// 가져온 component(element plus)를 사용하기 위해서 props, emit설명했던것 실제 쓸일 없을것이야...