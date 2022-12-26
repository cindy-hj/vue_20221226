<template>
    <div>
        <div>
            <label>물품명</label>
            <el-input v-model="state.name" style="width: 400px;" placeholder="Please input" />
        </div>

        <div>
            <label>물품 설명</label>
            <el-input type="textarea" v-model="state.content" :rows="6" style="width: 400px;" placeholder="Please input" />
        </div>

        <div>
            <label>수량</label>
            <el-input-number v-model="state.quantity" :min="1" />
        </div>

        <div>
            <label>가격</label>
            <el-input-number v-model="state.price" :min="1" />
        </div>

        <div>
            <label>이미지</label>
            <img :src="state.imageurl" style="width: 100px;"/>
            <input type="file" style="width: 200px;" @change="handleImage($event)" />
            <!-- 여기에 el-input으로 하니 e.target.files에 보관 되있지 않네...! 어디에 들어가있는지 예를 봐도 모르면 어떻게 하나? -->
            <!-- input에는 change 안되게 되어있었음... 업로드 이용해야함 -->
        </div>

        <div>
            <label></label>
            <el-button type="info" size="small" @click="handleInsert()">등록하기</el-button>
        </div>
        
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    setup () {
        const state = reactive({
            name : null,
            content : null,
            quantity : 0,
            price : 0,
            imagedata : null,
            imageurl : require('../assets/imgs/noimage.png')
        });

        const router = useRouter();

        const handleImage = (e) => {
            console.log(e);
            if(e.target.files.length > 0) {
                state.imagedata = e.target.files[0];
                state.imageurl = URL.createObjectURL(e.target.files[0]);
            }
            else {
                state.imagedata = null;
                state.imageurl = require('../assets/imgs/noimage.png')
            }
        }

        const handleInsert = async() => {
            const url = `/item101/insert.json`;
            const headers = {"Content-Type":"multipart/form-data"};
            let body = new FormData();

            body.append('name', state.name);
            body.append('price', Number(state.price) ); 
            body.append('content', state.content);
            body.append('quantity', Number(state.quantity) );
            body.append('image', state.imagedata);

            const { data } = await axios.post(url, body, {headers});
            console.log(data);
            if(data.status === 200) {
                router.push({path:'/seller'});
            }
        }


        return {
            state,
            handleImage,
            handleInsert
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