import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
// import 'src/styles/main.css';
import './output.css';


const app = createApp(App);
const instance = axios.create({
  baseURL: 'http://localhost:3000', // Altere para a porta correta do seu servidor backend
});

app.config.globalProperties.$axios = instance;

app.mount('#app');
