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
            // store 변수는 많이 만들어짐.. 너무 커지면 파일 여러개 만들어서 쪼개기도 함 관리 힘드니까
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

    mutations :{ // 1. 변수값을 변경, 비동기 사용 불가
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
    
    actions :{ // 2. 변수값을 변경, 비동기 호출 수행 (백엔드 연동)
        async handleData(context) {
            const url = ``;
            const headers = {};
            const {data} = await axios.get(url, {headers});
            if(data.status === 200) {
                context.commit('setUserid', 'aaa');
            }
        }
        // 백엔드로 갔다가 다시 받은 데이터를 userid에 넣고싶은데 mutation에 바로 넣을수가 없다! 
        // actions를 이용하면 mutation을 호출해서 setUserid를 변경가능
        // 예시로 입력한 것이고 지금 사용되는것 아님
    }
});

export default stores;