<template>
    <div>
        <h3>메뉴2</h3>
        <table border="1">
            <tr>
                <th>번호</th>
                <th>주문번호</th>
                <th>품명</th>
                <th>가격</th>
                <th>수량</th>
                <th>합계</th>
            </tr>
            <!-- index붙여서 반복되는 위치 알수있음, 0부터 시작 -->
            <!-- state.rows[0].cnt [{0},{1},{2}] => {0} -->
            <!-- {{ tmp.cnt }}는 {{ state.rows[idx].cnt }} 와 동일 -->
            <tr v-for="(tmp, idx) of state.rows" :key="tmp"> 
                <td>
                    <input type="checkbox" :value="idx" v-model="state.chk" />
                    <!-- 내가 푼 방법: 체크박스의 값을 각 주문번호에 해당하는 합계로 만들기
                    <input type="checkbox" :value="(tmp.price)*(tmp.cnt)" v-model="state.chk" /> -->
                    {{ (idx+1) }}
                </td>
                <td>{{ tmp.no }}</td>
                <td>{{ tmp.name }}</td>
                <td>{{ tmp.price }}</td>
                <td>
                    <select v-model="tmp.cnt">
                        <option v-for="tmp1 of 100" :key="tmp1" :value="tmp1">{{ tmp1 }}</option>
                    </select>
                </td> 
                <td>{{ (tmp.price)*(tmp.cnt) }}</td>
            </tr>
            
            <tr>
                <th>총합계</th>
                <td colspan="5" >{{ state.total }}원</td>
                <!-- <td colspan="5" >{{ state.chk.reduce((a,b)=>(a+b)) }}</td> 
                reduce로 체크박스(배열)의 원소값 합하기 -->
            </tr>
        </table>

        <button @click="handleAppend()">아래쪽으로 복사</button>
        <table>
            <tr v-for="(tmp, idx) of state.rows1" :key="tmp">
                <td>{{ (idx+1) }}</td>
                <td>{{ tmp.no }}</td>
                <td>{{ tmp.name }}</td>
                <td>{{ tmp.price }}</td>
                <td>{{ tmp.cnt }}</td> 
            </tr>
        </table>
        
        <hr />
        <table>
            <tr v-for="(tmp, idx) of state.rows2" :key="tmp">
                <td>{{ (idx+1) }}</td> 
                <td>{{ tmp.no }}</td>
                <td>{{ tmp.name }}</td>
                <td>{{ tmp.price }}</td>
                <td>{{ tmp.cnt }}</td> 
            </tr>
        </table>
        <button @click="handlePlus()">가격1씩증가</button>

    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core';
export default {
    setup () {
        const state = reactive ({
            rows : [],
            rows1: [],
            chk  : [],
            // chk  : [0], 체크박스의 값을 합계로 정했으므로 기본값을 빈값으로 두면 오류발생
            total: 0,
            rows2: [], // 임의의 데이터를 3개 추가하기 버튼 누르면 가격 1씩 증가
        });

        // 코딩테스트 -> 문제해결 -> 속도 -> 반복문횟수 줄이기 (시간복잡도)
        watch(() => state.chk, () => {
            state.total = 0;
            for(let tmp1 of state.chk) {// [2,0]
                state.total += state.rows[tmp1].price * state.rows[tmp1].cnt;
            }

            // 비효율적!
            // for(let tmp of state.rows) { // 전체 {111},{222},{333}
            //     for(let tmp1 of state.chk) { // [111, 333]
            //         if(tmp.no === tmp1) {
            //             state.total += tmp.price *tmp.cnt;
            //         }
            //     }
            // }
        },{
            immediate : true,
            deep : true,
        });

        const handleData = () => {
            // 백엔드에서 받은 내용(받았다고 가정) -> 주문번호, 물품명, 가격, 수량
            state.rows = [
                { no: 111, name: '가', price: 10, cnt:20 },
                { no: 222, name: '가', price: 15, cnt:3 },
                { no: 333, name: '가', price: 20, cnt:30 },
            ];

            state.rows2 = [
                { no: 111, name: '가', price: 10, cnt:20 },
                { no: 222, name: '가', price: 15, cnt:3 },
                { no: 333, name: '가', price: 20, cnt:30 },
            ];

            // ------------------------------------------------
            // 추출, 변경..
            // ------------------------------------------------

            for(let i=0; i<3; i++) {
                let obj = {};
                obj.no = (444 + i);
                obj['name'] = '가나다' + i;
                obj.price = 1000;
                obj.cnt = 14;

                state.rows.push(obj); // 배열에 원소 집어넣기
            }
            
            // 위치(0부터), 개수
            state.rows.splice(2,1); // 배열에서 원소 삭제하기
        };

        // 전개연산자(복사)
        // const a = [{id:1, name:'a'},{id:2, name:'b'},{id:3, name:'c'}]
        // const b = {...a[0]}   => {id:1, name:'a'}

        // 전개연산자(병합)
        // const c = [{...a[0]}, {...a[2]}]

        // 원시데이터 [{},{},{}] => 추출 => 배열 [1,2,3] => chart에 사용
        // [1,2,3] => [{},{},{}]

        const handleAppend = () => {
            // state.row에 있는것 중에서 체크된 항목만 state.tows1에 복사
            for(let tmp1 of state.chk) {
                state.rows1.push({ ...state.rows[tmp1] });
            }
        }

        const handlePlus = () => {
            for(let tmp of state.rows2) {
                tmp.price++;
            }
            // 배열에 있는 각각 원소를 반복문으로 먼저 나열! 그 후 key값에 접근 
            // 아래는 나열 안하고 배열 내에서 원소 위치를 찾고 그 후 key값에 접근한것
            // 굳이 slice 써서 배열내 원소의 값을 복사해올 필요가 없었음..

            // for(let i=0; i < state.rows2.length; i++) {
            //     state.rows2[i].price++;
            // }
        }

        onMounted(()=> {
            handleData();
        });

        return {
            state,
            handleAppend,
            handlePlus,
        }
    }
}
</script>

<style lang="css" scoped>
 

</style>