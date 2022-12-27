import axios from "axios";
import { createStore } from "vuex";

const stores = createStore({
    state () { // 변수 지정
        let tmp = false;
        let tmp1 = '';
        
        if(sessionStorage.getItem("TOKEN") !== null) {
            tmp = true;
            tmp1 = sessionStorage.getItem("ID");
        }

        return {
            logged : tmp,
            userid : tmp1,
            defaultActive : '/',
        }
    },

    getters : { // 가지고 가는 내용
        getLogged(state) {
            return state.logged;
        },
        getUserid : (state) => {
            return state.userid;
        },
        getDefaultActive(state) {
            return state.defaultActive;
        }
    },

    mutations :{ // 1. 변수값을 변경 (변경하는 내용), 비동기 사용 불가
        setLogged(state, value) {
            state.logged = value;
        },
        setUserid(state, value) {
            state.userid = value;
        },
        setDefaultActive(state, value) {
            state.defaultActive = value;
        }
    },
    
    actions :{ // 2. 변수값을 변경 (비동기 호출 수행 (백엔드 연동))
        async handleData(context) {
            const url = ``;
            const headers = {};
            const {data} = await axios.get(url, {headers});
            if(data.status === 200) {
                context.commit('setUserid', 'aaa');
            }
        }
        // 백엔드에 갔다가 받은 데이터를 userid에 넣으려면.. mutation에 바로 넣을수가 없다! 이렇게 하면 뮤테이션이 호출되어서 setUserid를 변경
    }
});

export default stores;