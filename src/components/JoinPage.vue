<template>
    <div class="container">
        
        {{ state }}
        <!-- // v-model 연결하기 -->
        <input type="text" id="sample6_postcode" v-model="state.postcode" placeholder="우편번호"> 
        <input type="button" @click="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
        <input type="text" id="sample6_address" v-model="state.address" placeholder="주소"><br>
        <input type="text" id="sample6_detailAddress" v-model="state.detail" placeholder="상세주소">
        <input type="text" id="sample6_extraAddress" v-model="state.extra" placeholder="참고항목">


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
import { onMounted } from '@vue/runtime-core';
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
            postcode : '',
            address : '',
            detail : '',
            extra :'',
        });

        // api 가져와서 쓰고 싶을때 vue나 react 용은 거의 없다. 
        // 대부분이 자바스크립트용으로 script src 형태로 라이브러리를 주는데 vue는 npm i axios --save같은 방식으로 라이브러리를 설치한뒤 import해서 사용했음!
        // 결국 vue 안에 javascript를 넣어서 적절히 쓸줄 알아야 한다.

        // 페이지가 로딩될 때
        onMounted(()=> {
            // console.log(window);
            // 자바스크립트에서 라이브러리를 추가한다는 것은 window에 추가한다는것!
            let script = document.createElement('script');
            script.src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
            document.head.appendChild(script); // window에 스크립트 추가
            console.log(window); // windw에 없었던 daum이 생김
        })

        // 추가된 라이브러리 이용한 함수
        const sample6_execDaumPostcode = () => {
            console.log('sample6_execDaumPostcode');
            new window.daum.Postcode({ // daum을 윈도우 안에 넣었으니 window.해줘야함. 속에 내용은 그대로 가져와도돼
                oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.getElementById("sample6_extraAddress").value = extraAddr;
                
                } else {
                    document.getElementById("sample6_extraAddress").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample6_postcode').value = data.zonecode;
                state.postcode = data.zonecode; // v-model과 연동시키기 위함.. 이거 없으면 손으로 입력하는 값만 연동됨
                document.getElementById("sample6_address").value = addr;
                state.address = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("sample6_detailAddress").focus();
            }

            }).open();
        };



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
            sample6_execDaumPostcode,
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