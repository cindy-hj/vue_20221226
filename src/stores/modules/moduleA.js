// 숫자로 관리
export const moduleA = {
    namespaced:true,
    
    state : {
        num1 : 0,
        num2 : 10,
    },
    
    getters : {
        getNum1(state) {
            return state.num1;
        },
        getNum2(state) {
            return state.num2;
        },
    },

    mutations : {
        setNum1(state, value) {
            state.num1 = value;
        },
        setNum1DoubleCount(state) {
            state.num1 = state.num1*2;
        },
        setNum2(state, value) {
            state.num2 = value;
        }
    },

    actions : {
        // 로그인 후에 토큰을 받음, 세션 저장소 보관
        // (context, value)로 찍으면 value값 전달 가능. 지금은 오류나기때문에 안쓴것.
        handleData(context) {
            // 백엔드 연동 실행 후 mutations에 있는 함수 이용->mutation에서 state 변수값 변경
            // mutations는 백엔드 연동 안됨. 실시간으로 변경되는것만 가능
            // getters는 state값을 가져가는것만 가능. readonly
            // state가 갱신되면 getters는 자동으로 변경된 값을 가져옴
            // mutations와 actions은 둘다 컴포넌트에서 데이터를 변경하는것. 차이점은 actions은 백엔드에 연동되는 시간 필요. mutations은 못기다림.
            context.commit("setNum1", 13);
        }
    }
    
}