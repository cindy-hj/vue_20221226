<template>
    <div>
        <h3>메뉴1</h3>
        <div class="item">
            <input type="text" :readonly="state.readonly"/>
            <button @click="handleReadonly()">{{ state.label }}</button>
        </div>
        <div class="item">
            <button :disabled="state.disabled">버튼</button>
            <button @click="handleDisabled()">{{ state.label1 }}</button>
        </div>
        <div class="item">
            <input type="text" v-model="state.name" />
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { watch } from '@vue/runtime-core';
export default {
    setup () {
        const state = reactive({
            name : '',

            readonly : true, // true 글자 입력 불가
            label : '현재는 읽기만 가능',

            disabled : false,
            label1 : '버튼 클릭 가능'
        });

        // state 변수의 변화를 감지
        watch(state, () => {
            console.log('watch state =>', state);
        },{
            immediate : true,
        });

        // state 변수의 name값 변화 감지
        watch(() => state.name, () => {
            console.log('watch name state =>', state);
        },{
            immediate : true,
            deep : true,
        });

        const handleDisabled = () => {
            if(state.disabled === true) {
                state.disabled = false;
                state.label1 = '버튼 클릭 가능'
            } else {
                state.disabled = true;
                state.label1 = '버튼 클릭 불가'
            }
        };

        const handleReadonly = () => {
            if(state.readonly === true) {
                state.readonly = false;
                state.label = '현재는 읽기쓰기 가능'
            } else {
                state.readonly = true;
                state.label = '현재는 읽기만 가능'
            }
        };

        return {
            state,
            handleReadonly,
            handleDisabled,
        }
    }
}
</script>

<style lang="css" scoped>
    .item {
        padding: 10px;
    }

</style>