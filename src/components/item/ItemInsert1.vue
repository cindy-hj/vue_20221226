<template>
    <div>
        <div class="item">
            <div class="lbl">물품명</div>
            <input type="text" v-model="state.name"/>
        </div>
        <div class="item">
            <div class="lbl">내용</div>
            <input type="text" v-model="state.content"/>
        </div>
        <div class="item">
            <div class="lbl">가격</div>
            <input type="number" v-model="state.price"/>
        </div>
        <div class="item">
            <div class="lbl">수량</div>
            <input type="number" v-model="state.quantity"/>
        </div>
        <div class="item">
            <div class="lbl">이미지</div>
            <img :src="state.imageurl" style="height: 100px;"/>
            <input type="file" @change="handleImage($event)"/>
        </div>
        <div class="item">
            <div class="lbl"></div>
            <button @click="handleInsert()">등록하기</button>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    setup () {
        const router = useRouter();

        const state = reactive ({
            name : '',
            content : '',
            price : 0,
            quantity : 0,
            imagedata: '',
            imageurl: require('../../assets/imgs/noimage.png'),
        });

        const handleImage = async(e) => {
            console.log(e);
            if(e.target.files.length === 1){
                state.imagedata = e.target.files[0];
                state.imageurl = URL.createObjectURL(e.target.files[0]);
            }
            else {
                state.imagedata = null;
                state.imageurl = require('../../assets/imgs/noimage.png')
            }

        }

        const handleInsert = async() => {
            const url = `api/item/insert`;
            const headers = {"Content-Type":"multipart/form-data"};
            let body = new FormData () 

            body.append( 'name', state.name );
            body.append( 'content', state.content );
            body.append( 'price', Number(state.price) );
            body.append( 'quantity', Number(state.quantity) );
            body.append( 'image', state.imagedata );

            const { data } = await axios.post(url, body, {headers});
            console.log(data);
            if(data.status === 200) {
                alert('등록되었습니다.');
                router.push({path:'/itemselect'});
            }

        }

        return {
            state,
            handleInsert,
            handleImage,
        }
    }
}
</script>

<style lang="css" scoped>
    .item {
        padding: 5px;
    }
    .lbl {
        display: inline-block;
        width: 100px;
    }

</style>