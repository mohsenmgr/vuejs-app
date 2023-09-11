import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader

import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';

import VueApexCharts from 'vue-apexcharts';
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);

import it from '@/locales/it';
import en from '@/locales/en';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { it, en },
        current: 'it',
    },

    icons: {
        iconfont: 'mdi',
    },
    theme: {
        dark: false,
        themes: {
            light: {
                primary: colors.orange,
                secondary: colors.grey.lighten4,
                accent: colors.orange,
            },
        },
    },
});

/*
export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: '#FFFFFF',
                secondary: colors.grey.base,
                accent: colors.shades.black,
                error: colors.red.accent3,
            },
            dark: {
                primary: '#0064A2',
            },
        },
    },
});
*/
