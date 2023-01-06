<template>
    <div>
        <h3>Vuex 실습</h3>
        {{ state }}
        <button @click="handle1()">모듈 A의 num1을 77로 변경</button>
        <button @click="handle2()">모듈 A의 num2을 888로 변경</button>
        <button @click="handle3()">모듈 B의 logged을 true로 변경</button>
        <hr />
        <!-- v-model은 양방향, 입력한게 바로 state변수에 적용됨. 
            v-text => {{  }}, v-html 2개는 단방향, 내용을 가져와서 표시하는것만 가능 -->
        <input type="text" v-model="state.name" />
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useStore } from 'vuex'
import { computed, watch } from '@vue/runtime-core';
export default {
    setup () {
        const store = useStore();

        // Ape.vue에서 주로 사용 -> store.getter를 수동으로 처리 가능
        store.subscribe((mutations, state) => {
            console.log(mutations, state);
        });

        const state = reactive({
            name  : '',
            name1 : '', 
            // '' 대신 computed(() => state.name.toLowerCase()), 쓰면 watch쓰는것과 같은 효과. 입력한 값을 실시간으로 변경. 
            // computed때문에 자동화 된것. 데이터가 변경되면 감지해서 실시간으로 오도록 한것. 그래서 오는걸 따로 처리 안해도 변경된 값이 바로 온것!

            // n1, n2 표현만 다르게 한것. {}이걸 쓰면 함수처럼 보여서 return해야하는것
            n1 : computed(()=> { return store.getters["moduleA/getNum1"] }),
            n2 : computed(()=> store.getters["moduleA/getNum2"] ),
            logged : computed(()=> store.getters["moduleB/getLogged"] ), 
        }); 
        // 이 페이지에서만 쓸꺼면 state만 쓰면 되지... 여기서 호출하는경우는 없다!!! 원래는 vux페이지에서 로그인, 로그아웃 같은 다른 페이지 호출하려고 쓰는것.
        // 지금은 실습이니까 페이지 새로 만들기 귀찮아서 이 페이지에 만들어서 쓰는것


        // 실시간으로 변수를 감지
        watch(() => state.name, () => {
            state.name1 = state.name.toLowerCase();
        },{
            immediate : true,
            deep : true,
        });


        const handle1 = () => {
            store.commit("moduleA/setNum1", 77);
            // actions 호출 방법 = > store.dispatch("moduleA/handleData", "전달하려는 내용")
        };

        const handle2 = () => {
            store.commit("moduleA/setNum2", 888);
        };

        const handle3 = () => {
            store.commit("moduleB/setLogged", true);
        };

        return {
            state,
            handle1,
            handle2,
            handle3
        }
    }
}
</script>

<style lang="scss" scoped>

</style>