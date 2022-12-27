<template>
    <div>
        {{ state }}
        <div v-if="row !== null">
            <div>
            <label>물품명</label>
            <el-input v-model="row.name" style="width: 400px;" />
            </div>
            
            <div>
                <label>물품 설명</label>
                <el-input type="textarea" v-model="row.content" :rows="6" style="width: 400px;" />
            </div>

            <div>
                <label>수량</label>
                <el-input-number v-model="row.quantity" :min="1" />
            </div>

            <div>
                <label>가격</label>
                <el-input-number v-model="row.price" :min="1" />
            </div>

            <div>
                <label></label>
                <el-button type="info" size="small" @click="handleUpdate()">수정하기</el-button>
            </div>
            <hr />

            <div v-for="tmp of state.imageurl" :key="tmp" style="display:inline-block;">
                <img :src="tmp.img" style="width: 100px;" />
                <button @click="handleImageDelete(tmp._id)">x</button>
            </div>

            <div v-for="tmp of state.cnt" :key="tmp">
                <input type="file" @change="handleImage(tmp, $event)" /> 
                <!-- // tmp는 위치정보, $event는 이미지의 정보(첨부 또는 취소 정보)
                // input type="file"에는 v-model이 안걸린다..! -->
            </div>
        
            <button @click="FilePlus()">항목+</button>
            <button @click="FileMinus()">항목-</button>
            <button @click="handleSubImage()">서브이미지등록</button>
        
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';

export default {
    setup () {
        
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            no       : Number( route.query.no ), // 주소창 ?no=557
            row      : null,
            cnt      : 2,
            images   : [null, null, null, null, null], //최대 5개 가능
            imageurl : [],
        });

        // 물품번호x, 서버 이미지의 번호
        const handleImageDelete = async(no) => { // no는 서버 이미지의 번호! 삭제할때는 물품번호가 아니라 서버 이미지의 번호가 필요함
            console.log(no);
            const url = `/item101/subimagedelete.json?no=${no}`;
            const headers = {"Content-Type":"application/json"};
            const body = {};

            const { data } = await axios.delete(url, {headers:headers, data:body})
            console.log(data);
            if(data.status === 200) {
                handleData1();
            }
        };

        // 이미지가 변경될 시 정보를 state.images배열에 추가
        // v-model을 사용할 수 없음, 수동으로 처리해야함.
        const handleImage = (tmp, img) => {
            console.log(tmp-1, img); // 배열은 0부터 시작이므로 tmp-1
            if(img.target.files.length > 0) {
                state.images[tmp-1] = img.target.files[0];
            }
            else {
                state.images[tmp-1] = null;
            }
        }

        // 추가시 물품번호를 필요
        const handleSubImage = async() => {
            console.log('handleSubImage');
            const url = `/item101/insertimages.json`;
            const headers = {"Content-Type":"multipart/form-data"};
            const body = new FormData();

            body.append("code", state.no); // code가 물품번호! 조회할때는 물품번호 필요
            for(let i=0; i<state.cnt; i++) { // 배열은 시작하는 값이 0이므로 등호 안들어감
                body.append("image", state.images[i]);
            }

            const { data } = await axios.post(url, body, {headers})
            console.log(data);
            if(data.status === 200) {
                handleData1();
            }
        };

        const FilePlus = () => {
            state.cnt++;
            if(state.cnt > 5) {
                state.cnt = 5; // 파일 첨부 창 최대 5개
            }
        };

        const FileMinus = () => {
            state.cnt--;
            if(state.cnt < 2) {
                state.cnt = 2; // 파일 첨부 창 최소 2개
            }
        };

        const handleUpdate = async() => {
            const url = `/item101/update.json?no=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                name        : state.row.name,
                price       : state.row.price,
                content     : state.row.content,
                quantity    : state.row.quantity
            }

            const { data } = await axios.put(url, body, {headers});
            console.log(data);
            if(data.status === 200) {
                router.push({path:'/seller'});
            }
        };

        const handleData = async() => {
            const url = `/item101/selectone.json?no=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);
            if(data.status === 200) {
                state.row = data.result;
            }
        };

        // 서브 이미지 읽기
        const handleData1 = async() => {
            const url = `/item101/subimagecode.json?code=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, {headers});
            console.log(data);
            if(data.status === 200) {
                state.imageurl = data.result; 
            }
        };

        onMounted(() => {
            handleData();
            handleData1();
        })

        return {
            state,
            ...toRefs(state),
            handleUpdate,
            FilePlus,
            FileMinus,
            handleSubImage,
            handleImage,
            handleImageDelete,
        }
    }
}
</script>

<style lang="css" scoped>
    label {
        display: inline-block;
        width: 100px;
    }
</style>