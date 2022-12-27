<template>
    <div class="container">
        <el-form :model="state" label-width="120px">
            <el-form-item label="아이디">
                <el-input v-model="state.id" style="width: 200px;" @keyup="handleIDCheck()"/>
                <label style="padding: 0px 10px;" v-html="state.check"></label>
            </el-form-item>

            <el-form-item label="암호">
                <el-input type="password" v-model="state.pw" style="width: 200px;" />
            </el-form-item>

            <el-form-item label="암호확인">
                <el-input type="password" v-model="state.pw1" style="width: 200px;" />
            </el-form-item>

            <el-form-item label="이름">
                <el-input v-model="state.name" style="width: 200px;" />
            </el-form-item>

            <el-form-item label="이메일">
                <el-input v-model="state.email" style="width: 200px;" />
                <label>@</label>
                <el-select v-model="state.email1" placeholder="이메일 주소를 선택하세요">
                    <el-option value="google.com" />
                    <el-option value="naver.com" />
                    <el-option value="daum.net" />
                </el-select>
            </el-form-item>

            <el-form-item label="나이">
                <el-input type="number" v-model="state.age" style="width: 200px;" />
            </el-form-item>

            <el-form-item>
                <el-button type="info" size="small" :plain="true" @click="handleJoin()">회원가입</el-button>
                <el-button type="info" size="small"><router-link to="/" style="text-decoration: none; color: white;">홈으로</router-link></el-button>
            </el-form-item> 
        </el-form>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            id : '',
            pw : '',
            pw1 : '',
            name : '',
            email : '',
            email1 : '이메일 주소를 선택하세요',
            age : '',
            check : '<label style="color: blue">중복확인</label>',
        });


        const handleIDCheck = async() => {
            console.log('handleIDCheck');
            if(state.id.length > 0){
                const url=`/member101/idcheck.json?id=${state.id}`;
                const headers={"Content-Type":"application/json"};
                const { data } = await axios.get(url, {headers});
                console.log(data); 
                //result가 1이면 사용불가 0이면 사용 가능
                if(data.result === 1) {
                    state.check = '<label style="color: red">사용 불가</label>'
                }
                else if(data.result === 0) {
                    state.check = '<label style="color: greenyellow">사용 가능</label>'
                }
                else{
                    state.check =  '<label style="color: blue">중복확인</label>'
                }
            }
            else{
                state.check = '<label style="color: blue">중복확인</label>'
            }
        };

        const handleJoin = async() => {
            if(state.id === '') {
                ElMessage({
                    message: '아이디를 입력하세요',
                    type: 'warning',
                });
                return false;
            }
            if(state.pw === '') {
                ElMessage({
                    message: '암호를 입력하세요',
                    type: 'warning',
                });
                return false;
            }
            if(state.pw1 === '') {
                ElMessage({
                    message: '암호를 다시 입력하세요',
                    type: 'warning',
                });
                return false;
            }
            if(state.pw !== state.pw1) {
                ElMessage({
                    message: '암호를 확인하세요',
                    type: 'warning',
                });
                return false;
            }
            if(state.name === '') {
                ElMessage({
                    message: '이름을 입력하세요',
                    type: 'warning',
                });
                return false;
            }
            if(state.email === '') {
                ElMessage({
                    message: '이메일을 입력하세요',
                    type: 'warning',
                });
                return false;
            }
            if(state.email1 === '이메일 주소를 선택하세요') {
                ElMessage({
                    message: '이메일 주소를 선택하세요',
                    type: 'warning',
                });
                return false;
            }
            if(state.age === '') {
                ElMessage({
                    message: '나이를 입력하세요',
                    type: 'warning',
                });
                return false;
            }

            const url = `/member101/insert.json`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                id : state.id,
                pw : state.pw,
                name : state.name,
                email : `${state.email}@${state.email1}`,
                age : state.age
            }
            const { data } = await axios.post(url, body, {headers});
            console.log(data);
            if(data.status === 200) {
                ElMessage({
                    message: '회원 가입 성공!',
                    type: 'success',
                });
                router.push({path:"/"});
            }
        };

        return {
            state,
            handleJoin,
            handleIDCheck,
        }
    }
}
</script>

<style lang="css" scoped>
    .container {
        width: 900px;
        padding: 10px;
        margin: 10px auto;
    }

</style>