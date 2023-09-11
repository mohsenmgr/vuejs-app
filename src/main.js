import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import { env } from '../env.js';

import Axios from 'axios';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
    Vue.prototype.$http.defaults.headers.common[
        'Authorization'
    ] = `Bearer ${token}`;
}

Axios.defaults.baseURL = env.VUE_APP_BACKEND_URI || 'http://localhost:4000';

Vue.config.productionTip = false;
Vue.prototype.$appName = 'FoodCoach';

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
