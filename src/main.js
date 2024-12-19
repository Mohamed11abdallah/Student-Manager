import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"

import 'bootstrap';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import { createPinia } from 'pinia'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
import NavBar from './components/NavBar.vue';
import { createApp } from 'vue'
const app = createApp(App)
const pinia = createPinia()
import './style.css'
import App from './App.vue'

dom.watch();
app.component('NavBar', NavBar)


app.use(Toast);
app.use(pinia)
app.use(router)
app.mount('#app')
