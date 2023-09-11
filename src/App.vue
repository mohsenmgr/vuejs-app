<template>
    <v-app class="my-app">
        <v-main transition="slide-x-transition">
            <!-- <router-link to="/home">Home</router-link> |
            <router-link to="/about">About</router-link
            ><span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span> !-->
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'App',
    components: {},
    computed: {
        ...mapGetters({ isLoggedIn: 'moduleUser/isLoggedIn' }),
    },
    methods: {
        logout: function () {
            let v = '';
            this.$store.dispatch('moduleUser/logout', v).then(() => {
                this.$router.push('/');
            });
        },
    },
    created: function () {
        this.$http.interceptors.response.use(undefined, function (err) {
            return new Promise(function (resolve) {
                if (
                    err.status === 401 &&
                    err.config &&
                    !err.config.__isRetryRequest
                ) {
                    this.$store.dispatch('logout');
                    resolve('logged_out_token_expired');
                }
                throw err;
            });
        });
    },
};
</script>

<style lang="scss">
@font-face {
    font-family: 'Rubik-Black';
    src: local('Rubik-Black'),
        url(./fonts/rubik/Rubik-Black.ttf) format('truetype');
}
@font-face {
    font-family: 'Rubik-BlackItalic';
    src: local('Rubik-BlackItalic'),
        url(./fonts/rubik/Rubik-BlackItalic.ttf) format('truetype');
}
@font-face {
    font-family: 'Rubik-Bold';
    src: local('Rubik-Bold'),
        url(./fonts/rubik/Rubik-Bold.ttf) format('truetype');
}
@font-face {
    font-family: 'Rubik-BoldItalic';
    src: local('Rubik-BoldItalic'),
        url(./fonts/rubik/Rubik-BoldItalic.ttf) format('truetype');
}
@font-face {
    font-family: 'Rubik-Italic';
    src: local('Rubik-Italic'),
        url(./fonts/rubik/Rubik-Italic.ttf) format('truetype');
}
@font-face {
    font-family: 'Rubik-Light';
    src: local('Rubik-Light'),
        url(./fonts/rubik/Rubik-Light.ttf) format('truetype');
}
@font-face {
    font-family: 'Rubik-LightItalic';
    src: local('Rubik-LightItalic'),
        url(./fonts/rubik/Rubik-LightItalic.ttf) format('truetype');
}
@font-face {
    font-family: 'Rubik-Medium';
    src: local('Rubik-Medium'),
        url(./fonts/rubik/Rubik-Medium.ttf) format('truetype');
}
@font-face {
    font-family: 'Rubik-MediumItalic';
    src: local('Rubik-MediumItalic'),
        url(./fonts/rubik/Rubik-MediumItalic.ttf) format('truetype');
}
@font-face {
    font-family: 'Rubik-Regular';
    src: local('Rubik-Regular'),
        url(./fonts/rubik/Rubik-Regular.ttf) format('truetype');
}

.v-application {
    font-family: 'Rubik-Regular' !important;
    [class*='v-card__title'] {
        font-size: 24px;
        font-family: 'Rubik-Medium' !important;
        word-break: break-word;
    }
    [class*='v-v-card__subtitle'] {
        font-family: 'Rubik-Regular' !important;
        font-size: 14px;
    }
    //[class*='text-'] {
    //color: #36405a;
    //}
}
</style>
