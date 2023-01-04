<template>
    <div>
        <button @click="state.menu=1">메뉴1</button>
        <button @click="state.menu=2">메뉴2</button>
        <button @click="state.menu=3">메뉴3</button>
        <hr />
        <menu-1 v-if="state.menu === 1"></menu-1>
        <menu-2 v-if="state.menu === 2"></menu-2>
        <menu-3 v-if="state.menu === 3"></menu-3>
    </div>
</template>

<script>
import Menu1 from '@/components/form/Menu1Page.vue';
import Menu2 from '@/components/form/Menu2Page.vue';
import Menu3 from '@/components/form/Menu3Page.vue';
import { reactive } from '@vue/reactivity';
// @는 src를 의미

export default {
    components:{
        Menu1, // 파스칼
        Menu2,
        Menu3,
    },
    setup () {
        const state = reactive({
            menu : 3,
        })

        return {
            state,
        }
    }
}
</script>

<style lang="css" scoped>

</style>