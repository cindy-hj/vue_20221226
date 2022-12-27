<template>
    <div>
        <h3>주문페이지</h3>
        {{ state }}
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useRoute } from 'vue-router';

export default {
    setup () {
        const route = useRoute();
        const state = reactive({
            no  : Number(route.query.no),
            cnt : Number(route.query.cnt),
            userid : route.query.userid
        });

        return {
            state,
        };
    }
}
</script>

<style lang="css" scoped>

</style>