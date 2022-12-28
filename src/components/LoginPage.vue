<template>
    <div class="container">
        <el-form :model="state" label-width="120px">
            <el-form-item label="아이디">
                <el-input v-model="state.id" style="width: 200px;"/>
            </el-form-item>

            <el-form-item label="암호">
                <el-input type="password" v-model="state.pw" style="width: 200px;" />
            </el-form-item>

            <el-form-item>
                <el-button type="info" size="small" :plain="true" @click="handleLogin()">로그인</el-button>
                <el-button type="info" size="small"><router-link to="/join" style="text-decoration: none; color: white;">회원가입 하러가기</router-link></el-button>
            </el-form-item> 
        </el-form>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup () {

        const router = useRouter();
        const store = useStore();

        const state = reactive ({
            id : '',
            pw : '',
        });

        const handleLogin = async() => {
            const url = `/member101/select.json`;
            const headers = {"Content-type":"application/json"};
            const body = {
                id : state.id,
                pw : state.pw,
            }
            const { data } = await axios.post(url, body, {headers});
            console.log(data);
            if(data.status === 200) {
                // 저장소 보관
                sessionStorage.setItem("TOKEN", data.result);
                sessionStorage.setItem("ID", data.test._id);
                
                // stores의 state 값을 변경
                store.commit('setLogged', true);
                store.commit('setUserid', data.test._id);

                ElMessage({
                    message: '로그인 성공!',
                    type: 'success',
                });

                // 홈으로 이동이 아니라 이전페이지로 이동이 필요
                // 이전페이지 정보를 보관해야함. router에 페이지 이동 정보가 있다. 컴포넌트 호출될때마다 나오는 부분! 페이지 이동시 마다 내용이 찍힌다. to 안에 path
                const path = sessionStorage.getItem("CURRENT_PATH");
                // 문자를 object로 복원 시켜야 함! 
                const query = JSON.parse (
                    sessionStorage.getItem("QUERY"));

                store.commit('setDefaultActive', path); // 로그인 후 활성화 되는 메뉴도 이전페이지걸로!
                // 이전페이지로 이동
                router.push({path:path, query:query});
            }
            else {
                ElMessage({
                    message: '아이디 또는 비밀번호를 확인하세요',
                    type: 'warning',
                });
            }
        }

        return {
            state,
            handleLogin,
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