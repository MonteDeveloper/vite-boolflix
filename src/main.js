import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import LangFlag from 'vue-lang-code-flags';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.component('lang-flag', LangFlag);

app.mount('#app');
