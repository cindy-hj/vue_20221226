<template>
    <div>
        <div>
            <input type="text" :ref="el => { arr[0] = el}" v-model="id"/>
            <!-- ref 배열화 시켰더니 사용할때 형태가 복잡해졌네... -->
        </div>
        <div>
            <input type="text" :ref="el => { arr[1] = el}" v-model="name"/>
        </div>
        <div>
            <input type="number" v-model="age"/>
        </div>
        <div>
            <button @click="handleAction()">유효성검사</button>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
export default {
    setup () {
        const uid   = ref();
        const uname = ref();
        // 위와 같이 쓰다가 항목이 많아지면 아래처럼 배열화 시키자
        const arr = ref([]);
        
        const state = reactive({
            id : '',
            name : '',
            age : 0,
        });

        const handleAction = () => {
            if(state.id.length <= 0) {
                alert('아이디 입력');
                arr.value[0].focus();
                return false;
            }
            if(state.name.length <= 0) {
                alert('이름 입력');
                arr.value[1].focus();
                return false;
            }
            if(state.age <= 0) {
                alert('나이 입력');
                return false;
            }
            alert('유효성 통과');
        };

        return {
            state,
            ...toRefs(state),
            handleAction,
            arr,
            uid,
            uname,
        };
    }
}
</script>

<style lang="css" scoped>

</style>