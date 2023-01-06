// 로그인 관련 정보
export const moduleB = {
    namespaced:true,
    
    state : {
        logged : false,
        userid : '',
        username : '',
    },
    
    getters : {
        getLogged(state) {
            return state.logged;
        },
        getUserid(state) {
            return state.userid;
        },
    },

    mutations : {
        setLogged(state, value) {
            state.logged = value;
        },
        setUserid(state, value) {
            state.userid = value;
        }
    },

    actions : {
        handleData(context) {
            context.commit("setUserid", "백엔드에서 받은 아이디값");
        }
    }
}