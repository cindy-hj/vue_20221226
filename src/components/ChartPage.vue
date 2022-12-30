<template>
    <div>
        <h3>chart</h3>
        <div class="box">
            
            <div class="item">
                <button @click="handleCount(count), handleChartData2()">차트데이터변경</button>
                <!-- // 이렇게 하면 버튼 한번 클릭에 함수 2개가 출력됨. 약간의 시간차가 있긴 하지만 거의 동시에...
				// parameter를 부여하면 하나씩 실행될까? 고민해보기 -->
                <div style="height: 300px;">
                    <canvas id="myChart2" width="100%" height="100%"></canvas>
                </div>
            </div>

            <div class="item">
                <button @click="handleChartData()">차트데이터변경</button>
                <div style= "height: 300px;">
                    <canvas id="myChart" width="100%" height="100%"></canvas>
                </div>
            </div>

            <div class="item">
                <button @click="handleChartData1()">차트데이터변경</button>
                <div style="height: 300px;">
                    <canvas id="myChart1" width="100%" height="100%"></canvas>
                </div>
            </div>

            <div class="item">
                <button @click="handleChartData3()">차트데이터변경</button>
                <div style="height: 300px;">
                    <canvas id="myChart3" width="100%" height="100%"></canvas>
                </div>
            </div>

        </div>  
    </div>
</template>

<script>
import Chart from 'chart.js'// 수동으로 라이브러리 임포트
import { onMounted, reactive } from '@vue/runtime-core';
import axios from 'axios';
export default {
    setup () {

        // 공통변수. 함수간에 사용하거나, template에 사용하거나
        const state = reactive({
            chart : '',
            chart1: '',
            chart2: '',
            chart3: '',
        });

        // 차트의 종류, 데이터, 색상 등 설정...
        const config = {
            type: 'bar',
            data: { // 데이터 구조 정확히 유지해야한다. key를 바꾼다거나 대소문자나... 임의로 변경하면 안됨!
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [ // 배열형태
                    {
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        borderWidth: 1,
                        backgroundColor : [ // rgb 색상표 검색해서 rgb값 참조
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(47, 186, 255, 0.2)',
                            'rgba(255, 247, 0, 0.2)',
                            'rgba(63, 249, 57, 0.2)',
                            'rgba(205, 57, 249, 0.2)',
                            'rgba(255, 205, 0, 0.2)',
                        ]
                    } 
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        const config1 = {
            type : 'line',
            data : {
                labels : ['1', '2', '3', '4',' 5'],
                datasets: [
                    {
                        label:'라인테스트',
                        data:[34, 123, 26, 457, 63],
                    }
                ]
            }
        };

        const config2 = {
            type : 'bar',
            data : {
                labels : [],
                datasets: [
                    {
                        label:'',
                        data:[],
                        borderWidth:2,
                    }
                ]
            }
        };

        const config3 = {
            type : 'line',
            data : {
                labels : [],
                datasets: [
                    {
                        label:'시간대별 게시글 수',
                        data:[],
                    }
                ]
            }
        };

        const initChart = () => {
            const ctx = document.getElementById('myChart').getContext('2d'); // js부분. 찾아서
            state.chart = new Chart(ctx, config); // 이게 있어서 차트 그려진것, 원래는 앞에 const chart = 있는건데 생략하고 new Chart(ctx, config)로 했다가
            // chart 데이터 변경함수에서 chart 사용하기 위해 공통변수로 만듬-> state.chart로 담는 순간 오류 발생...
            // 해결-> 담는게 문제가 아니라 위애 {{state}}로 출력하는것 때문에 오류 난것. 객체도아니고 스트링도아니고..그래서 오류났나봐

            const ctx1 = document.getElementById('myChart1').getContext('2d');
            state.chart1 = new Chart(ctx1, config1);

            const ctx2 = document.getElementById('myChart2').getContext('2d');
            state.chart2 = new Chart(ctx2, config2);

            const ctx3 = document.getElementById('myChart3').getContext('2d');
            state.chart3 = new Chart(ctx3, config3);

        };

        onMounted(() => {
            initChart();
            handleChartData2();
            handleChartData3();
        });

        const handleCount = (count) => {
            console.log(count);
            count++;
        }

        const handleChartData = () => {
            // chart 데이터 변경
            state.chart.data.datasets[0].data = [12, 34, 97, 36, 22, 73];
            state.chart.data.labels = ['a', 'b', 'c', 'd', 'e', 'f']
            state.chart.update();
        };

        const handleChartData1 = () => {
            state.chart1.data.datasets[0].data = [22, 663, 1, 123, 62, 163];
            state.chart1.data.labels = ['a', 'b', 'c', 'd', 'e', 'f']
            state.chart1.update();
        };

        const handleChartData2 = async() => {
            const url = `/member101/agg.json`;
            const headers = {"Content-Type":"application/json"};

            const { data } = await axios.get(url, {headers});
            console.log('연령대', data);
            if(data.status === 200) { // 변수선언 따로 안하고 위에 있는 변수 그대로 안에 넣으니까 변수명이 너무 길다. 그래서 따로 선언해주기
                let tmpLabel = [];
                let tmpData = [];
                
                for(let i = 0; i< data.result.length; i++) {
                    tmpLabel.push(data.result[i]._id);
                    tmpData.push(data.result[i].count);
                }

                state.chart2.data.labels = tmpLabel;
                state.chart2.data.datasets[0].data = tmpData;
                state.chart2.data.datasets[0].label = '연령대별 가입자 수';
                state.chart2.update();
                console.log('handleChartData2');
            }
        };

        const handleChartData2_1 = async() => {
            const url = `/member101/agg.json`;
            const headers = {"Content-Type":"application/json"};

            const { data } = await axios.get(url, {headers});
            console.log('연령대', data);
            if(data.status === 200) { 
                let tmpLabel = [];
                let tmpData1 = [];

                for(let i = 0; i< data.result.length; i++) {
                    tmpLabel.push(data.result[i]._id);
                    tmpData1.push(data.result[i].sum);
                }

                state.chart2.data.labels = tmpLabel;
                state.chart2.data.datasets[0].data = tmpData1;
                state.chart2.data.datasets[0].label = '연령대별 가입자 연령 합';

                state.chart2.update();
            }
        };

        const handleChartData2_2 = async() => {
            const url = `/member101/agg.json`;
            const headers = {"Content-Type":"application/json"};

            const { data } = await axios.get(url, {headers});
            console.log('연령대', data);
            if(data.status === 200) { 
                let tmpLabel = [];
                let tmpData2 = [];
                
                for(let i = 0; i< data.result.length; i++) {
                    tmpLabel.push(data.result[i]._id);
                    tmpData2.push(data.result[i].avg);
                }

                state.chart2.data.labels = tmpLabel;
                state.chart2.data.datasets[0].data = tmpData2;
                state.chart2.data.datasets[0].label = '연령대별 가입자 연령 평균';

                state.chart2.update();
            }
        };
        
        const handleChartData3 = async() => {
            const url = `/board101/agg.json`;
            const headers = {"Content-Type":"application/json"};

            const { data } = await axios.get(url, {headers});
            console.log('시간대', data);
            if(data.status === 200) { 
                let tmpLabel = [];
                let tmpData = [];

                
                for(let i = 0; i< data.result.length; i++) {
                    tmpLabel.push(data.result[i]._id);
                    tmpData.push(data.result[i].count);
                }

                state.chart3.data.labels = tmpLabel;
                state.chart3.data.datasets[0].data = tmpData;

                state.chart3.update();
            }
        };

        

        return {
            state,
            handleChartData,
            handleChartData1,
            handleChartData2,
            handleChartData2_1,
            handleChartData2_2,
            handleCount,
        }
    }
}
</script>

<style lang="css" scoped>
    .box {
        display: grid;
        grid-template-columns:  1fr 1fr 1fr;
        grid-auto-rows: minmax(400px, auto);
    }

    .item {
        padding: 5px;
        border: 1px solid #cccccc;
    }
</style>