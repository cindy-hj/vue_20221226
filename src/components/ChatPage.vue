<template>
    <div>
        <h3>채팅</h3>
        <input type="text" @keyup.enter="handleSend()" v-model="state.message" />

        <hr />
        <table border="1">
            <tr v-for="tmp of state.output" :key="tmp">
                <td>{{ tmp.topic }}</td>
                <!-- 채팅에 태그 걸면 해석해서 볼 수 있다. -->
                <td v-html="tmp.message"></td>
            </tr>
        </table>
    </div>
</template>

<script>
import mqtt from 'precompiled-mqtt'; // 수동으로 import
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
export default {
    setup () {
        const state = reactive({
            client  : null, // 서버 접속 객체
            message : '',
            
            output  : [], // 전송받은 메시지를 보관할 배열

            host    : '1.234.5.158',
            port    : 11884, // 포트는 데이터가 들어오고 나가는 통로 
            options : {
                clean           : true,
                reconnectPeriod : 20000, // 20초마다 접속, 너무 짧으면 성능 떨어짐, 1000이 1초
                clientId        : 'ds203_' + new Date().getTime(), //접속하는 id는 고유해야하므로 시간도 붙여줌 ex) ds203_1687467886
                username        : 'ds606',
                password        : 'ds606'
            }
        });

        onMounted(()=> {
            handleConnect(); // 접속
            handleSubscribe(); // 구독설정
        });

        const handleConnect = () => {
            try{
                
                // host와 port가 변경되는 값은 아니지만 나중에 수정하는 경우를 고려해서 따로 변수 설정해둔걸 가져와서 쓰는것.
                // 실제로는 변수에다가 값을 하드 코딩하는게 아니라 백엔드에서 데이터 가져오도록 코딩한다!
                // ws://1.234.5.158:11884
                const url = `ws://${state.host}:${state.port}`;
                state.client = mqtt.connect(url, state.options); // url로 접속. option정보 이용해서

                // 아래 3개는 서버가 알려주기를 기다리는것. 콜백!
                state.client.on('connect', () => {
                    console.log('connect success');
                });

                state.client.on('error', (error) => {
                    console.log(`connect fail -> ${error}`);
                });

                state.client.on('message', (topic, message) => {
                    console.log(`receive message => ${topic} => ${message}`);
                    // state.output.push({topic:topic, message:JSON.parse(message)}); push는 새로운 메세지가 뒤쪽에 붙음
                    state.output.unshift({topic:topic, message:JSON.parse(message)}) // unshift는 위에 붙음
                });
            }
            catch(e){
                console.log(e);
            }
        }

        const handleSubscribe = () => {
            // ex) /ds/class606/a는 받을수 있지만class605는 못받음. /ds로 보낸건 받을수있음
            const topic = '/ds/class606/#';
            state.client.subscribe(topic, {qos:0}, (error, res) => {
                if(error){
                    console.log(`subscribe fail => ${error}`);
                    return false;
                }
                console.log(`subscribe success=> ${res}`);
            });
        }
        // 메세지 안보내고 받기만 할꺼면 여기까지만 해도 반응 한다!

        const handleSend = () => {
            const topic = '/ds/class606/ds203';
            // object => string으로 변경
            const payload = JSON.stringify( state.message );
            state.client.publish(topic, payload, 0, error => {
                if(error) {
                    console.log(`send fail => ${error}`);
                }
                console.log('send success');
            });
        }

        return {
            state,
            handleSend
        };
    }
}
</script>

<style lang="css" scoped>

</style>