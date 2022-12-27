<template>
    <div>

    </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup () {
        const router = useRouter();
        const store = useStore();

        onMounted(async() => {
            if(await confirm('로그아웃 할까요?')) {
                sessionStorage.removeItem("TOKEN");
                sessionStorage.removeItem("ID");

                // stores의 state값을 변경
                store.commit('setLogged', false);
                store.commit('setUserid', '');

                // 예시)stores의 action호출
                // store.dispatch('handleData');
            }
            store.commit('setDefaultActive', "/");
            
            router.push({path:'/'})             
        });

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>