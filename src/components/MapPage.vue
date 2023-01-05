<template>
    <div>
        <h3>카카오맵</h3>
        <button @click="handleMarker()">마크추가</button>
        <div id="map" style="width: 100%; height: 350px; border: 1px solid #cccccc;"></div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
export default {
    setup () {

        const state = reactive({
            position : [],
            map : null,
        });

        const handleData = () => {
            const data = [
                {id : '부산시청', lat:35.17974, lng:129.07507},
                {id : '거제역', lat:35.18864035765581, lng:129.0737848860592},
                {id : '연산역', lat:35.18602843527152, lng:129.0815778764658},
                {id : '시청역', lat:35.17964462576777, lng:129.07654173261616},
                {id : '거제해맞이역', lat:35.18103126561205, lng:129.06897605066274},
            ]

            state.position = data;
        }
        
        onMounted(()=> {
            // 수동으로 script 추가하기
            // 1. script 태그 만들어라
            let script = document.createElement("script");
            // 2. script 태그에 추가해라(쿼리에 autoload=false와 개인 앱키를 넣어줌)
            script.setAttribute("src", "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=ef544498aae2f966b0b0a3f8383c89f6");
            // 3. window에 추가해라
            document.head.appendChild(script);
            // window에 kakao 추가 된것 확인. 예제에서 kakao로 시작되는 코드들 앞에 전부 window 붙여줘야함!
            console.log(window); 

            // 스크립트가 로드될때 initmap실행시켜라
            script.onload = () => { 
                window.kakao.maps.load( initMap );
            }

            handleData();
        });

        const initMap = () => {
            const container = document.getElementById('map')
            // window 콘솔 찍어보면 kakao밑에 maps있음. f붙은것들 함수라는뜻 LatLng는(a,b) 2개 들어가서 포지션 만들어짐
            const position = new window.kakao.maps.LatLng(35.17974, 129.07507); 

            const options = {
                center : position, // 위치
                level : 5, // 배율. 크면 클수록 작게 나온다 
            }
            // Map도 (a,b) 2개 들어감
            state.map = new window.kakao.maps.Map(container, options);  
            
            // 위치 표시하기 위한 Marker 필요
            const markerOptions = {
                map : state.map,
                position : position
            } 

            new window.kakao.maps.Marker(markerOptions);
        }

        const handleMarker = () => {
            // for문을 어디다 돌려야 하는지가 아직 익숙하지 않음... 
            // 냅다 변수안에서 돌리려고 하지말고 함수 내에서 돌리고 그 안에서 다시 변수 선언을 하면 되는군!
            for(let tmp of state.position) {
                const position  = new window.kakao.maps.LatLng( tmp.lat, tmp.lng );

                const markerOptions = {
                    map : state.map,
                    position :position
                }

                new window.kakao.maps.Marker(markerOptions);
            }
        }

        return {
            state,
            handleMarker,
        }
    }
}
</script>

<style lang="css" scoped>

</style>