import { createApp } from 'vue';
import App from './App.vue';

// element-plus
import ElementPlus from 'element-plus'; 
import 'element-plus/dist/index.css';

// router
import routes from './routes/index'; // index는 안넣어도 되지만 헷갈릴까봐

//createApp(App).설정라이브러리.mount('#app'); 이렇게 하면 중간이 계속 길어지는거라 아래와 깉이 표현 한것
const app = createApp(App);
app.use(routes);
app.use(ElementPlus);
app.mount('#app');
