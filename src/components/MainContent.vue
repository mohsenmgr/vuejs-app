<template>
    <v-layout>
        <!-- Mobile Navigation Drawer !-->
        <v-app-bar height="71" class="header-space pa-0" app dense fixed>
            <v-app-bar-nav-icon
                dark
                class="hidden-md-and-up"
                @click="clickHamburger"
            ></v-app-bar-nav-icon>
            <v-toolbar
                fixed
                height="71"
                width="1400"
                color="rgb(0, 0, 0, 0)"
                elevation="5"
                dir="ltr"
                class="pa-0 elevation-0"
            >
                <v-spacer class="hidden-md-and-up"></v-spacer>

                <div class="mt-2 ml-0">
                    <img
                        class="elevation-0"
                        width="172"
                        height="37"
                        contain
                        lazy-src="@/assets/fc-logo.svg"
                        src="@/assets/fc-logo.svg"
                    />
                </div>
                <v-toolbar-title> </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon @click="openAlert" dark medium>mdi-bell</v-icon>
                <!--
                <v-toolbar-items dir="ltr" class="mt-2"></v-toolbar-items>
                !-->
            </v-toolbar>
            <v-navigation-drawer
                :style="{ top: $vuetify.application.top + 'px', zIndex: 6 }"
                height="1500"
                v-model="drawer"
                absolute
                temporary
                app
                clipped
                hide-overlay
            >
                <template v-slot:prepend>
                    <v-list-item two-line>
                        <v-list-item-avatar>
                            <img :src="require('@/assets/profile_pic.png')" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title
                                style="
                                    font-family: Rubik-Medium;
                                    font-size: 18px;
                                "
                                >{{ fullName }}</v-list-item-title
                            >
                            <v-list-item-subtitle
                                style="
                                    font-family: Rubik-Regular;
                                    font-size: 12px;
                                    color: #878787;
                                "
                                >{{ user.username }}</v-list-item-subtitle
                            >
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <!-- Mobile Navigation Drawer Items Code !-->
                <v-list nav dense>
                    <v-list-item-group v-model="group">
                        <v-list-item
                            active-class="accent--text"
                            v-ripple="{ class: 'primary--text' }"
                            @click="handler(i)"
                            v-for="(item, i) in items"
                            :key="item.title"
                        >
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title
                                style="
                                    font-family: Rubik-Medium;
                                    font-size: 14px;
                                    color: #878787;
                                "
                                v-text="item.title"
                            ></v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            <template v-slot:extension v-if="alert_info" class="">
                <v-alert
                    v-model="alert_info"
                    :width="viewPortWidth"
                    class="grey lighten-4 red--text ml-n4 mr-n4 mt-12"
                    outlined
                    color="primary"
                    elevation="6"
                    dismissible
                    icon="mdi-calendar-alert"
                >
                    Prossima visita nutrizionistica {{ visitDate }}
                </v-alert>
            </template>
        </v-app-bar>

        <!--Desktop Navigation Drawer and Router View !-->
        <v-flex class="hidden-sm-and-down">
            <v-row class="white lighten-4" no-gutters>
                <v-col cols="2">
                    <v-card elevation="0">
                        <v-navigation-drawer
                            fixed
                            floating
                            :style="
                                alert_info
                                    ? 'margin-top:160px;'
                                    : 'margin-top: 85px;'
                            "
                            height="900"
                            :width="navDrawerWidth"
                            permanent
                            left
                        >
                            <template v-slot:prepend>
                                <v-list-item two-line>
                                    <v-list-item-avatar>
                                        <img
                                            :src="
                                                require('@/assets/profile_pic.png')
                                            "
                                        />
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="
                                                font-family: Rubik-Medium;
                                                font-size: 18px;
                                            "
                                            >{{ fullName }}</v-list-item-title
                                        >
                                        <v-list-item-subtitle
                                            style="
                                                font-family: Rubik-Regular;
                                                font-size: 12px;
                                                color: #878787;
                                            "
                                            >{{
                                                user.username
                                            }}</v-list-item-subtitle
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                            </template>

                            <v-divider></v-divider>
                            <v-list nav>
                                <v-list-item-group v-model="group">
                                    <v-list-item
                                        active-class="accent--text"
                                        v-ripple="{ class: 'primary--text' }"
                                        v-for="(item, i) in items"
                                        @click="handler(i)"
                                        :key="item.title"
                                    >
                                        <v-list-item-icon>
                                            <v-icon size="25">{{
                                                item.icon
                                            }}</v-icon>
                                        </v-list-item-icon>

                                        <v-list-item-content
                                            style="
                                                font-family: Rubik-Medium;
                                                font-size: 14px;
                                                color: #878787;
                                            "
                                        >
                                            {{ item.title }}
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                            <v-divider></v-divider>
                        </v-navigation-drawer>
                    </v-card>
                </v-col>
                <v-col class="grey lighten-4" cols="10">
                    <v-sheet
                        v-if="loading"
                        height="1000"
                        class="pa-3"
                        color="grey lighten-4"
                    >
                        <v-skeleton-loader
                            v-for="i in 2"
                            :key="i"
                            class="mx-auto"
                            max-width="1100"
                            type="card"
                        ></v-skeleton-loader>
                    </v-sheet>

                    <router-view
                        v-else
                        @onBackButtonPress="handleBackButton"
                    ></router-view>
                </v-col>
            </v-row>
        </v-flex>
        <!-- MOBILE CONTENT !-->
        <v-flex class="mx-auto overflow-hidden hidden-md-and-up">
            <v-card class="grey lighten-4 rounded-0">
                <v-flex md12>
                    <v-container class="d-sm-flex" fluid fill-height>
                        <v-overlay :value="drawer" z-index="4"> </v-overlay>

                        <v-layout v-if="loading">
                            <v-flex>
                                <v-row class="mt-5" justify="center" no-gutters>
                                    <v-col cols="12">
                                        <v-skeleton-loader
                                            v-for="i in 2"
                                            :key="i"
                                            class="mx-auto"
                                            max-width="1100"
                                            type="card"
                                        ></v-skeleton-loader>
                                    </v-col>
                                </v-row>
                            </v-flex>
                        </v-layout>

                        <router-view
                            v-else
                            @onBackButtonPress="handleBackButton"
                        ></router-view>
                    </v-container>
                </v-flex>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    // mounted() {
    //     var my = this;
    //     // if back button is pressed
    //     window.onpopstate = function (event) {
    //         my.group = [];
    //         console.log(event);
    //     };
    // },
    computed: {
        ...mapGetters({ navigationModel: 'moduleNav/getNavigationObject' }),
        viewPortWidth() {
            return this.$vuetify.breakpoint.width;
        },
        navDrawerWidth() {
            if (this.viewPortWidth > 1321) return '240px';
            else return '205px';
        },
    },
    data() {
        return {
            group: null,
            alert_info: false,
            visitDate: 'Martedi 30/01/2021',

            drawer: false,
            menu: false,
        };
    },
    props: {
        user: {},
        fullName: null,
        items: Array,
        loading: Boolean,
    },
    methods: {
        handler: function (index) {
            if (this.navigationModel != null)
                this.$store.dispatch('moduleNav/removeAllHistory');

            switch (index) {
                case 0:
                    {
                        let navObject = new Object({
                            childView: 'diaryprime',
                            parentView: '/home',
                            pageTitle: 'Compila il diario',
                        });
                        this.$store.dispatch(
                            'moduleNav/setCurrentPage',
                            navObject
                        );
                    }

                    if (this.$route.name !== 'diaryprime') {
                        this.$router.push('/home/diary');
                    }
                    break;
                case 1:
                    {
                        let navObject = new Object({
                            childView: 'weighing',
                            parentView: '/home',
                            pageTitle: 'Aggiungi un peso',
                        });
                        this.$store.dispatch(
                            'moduleNav/setCurrentPage',
                            navObject
                        );
                    }
                    if (this.$route.name !== 'weighing') {
                        this.$router.push('/home/weighing');
                    }
                    break;
                case 2:
                    {
                        let navObject = new Object({
                            childView: 'progress',
                            parentView: '/home',
                            pageTitle: 'Monitora i progressi',
                        });
                        this.$store.dispatch(
                            'moduleNav/setCurrentPage',
                            navObject
                        );
                    }
                    if (this.$route.name !== 'progress') {
                        this.$router.push('/home/progress');
                    }
                    break;
                case 3:
                    {
                        let navObject = new Object({
                            childView: 'profile',
                            parentView: '/home',
                            pageTitle: 'Il mio profilo',
                        });
                        this.$store.dispatch(
                            'moduleNav/setCurrentPage',
                            navObject
                        );
                    }
                    if (this.$route.name !== 'profile') {
                        this.$router.push('/home/profile');
                    }
                    break;
                case 5:
                    this.$store.dispatch('moduleUser/logout', null).then(() => {
                        this.$router.push('/');
                    });

                    break;
            }
        },

        openAlert() {
            this.alert_info = !this.alert_info;
        },
        handleBackButton() {
            this.group = [];
        },
        clickHamburger() {
            this.alert_info = false;
            this.drawer = !this.drawer;
        },
    },
    components: {},
};
</script>

<style>
.header-space {
    background-image: linear-gradient(
        to bottom,
        #ff9800,
        rgba(255, 152, 0, 0.6)
    );
}
</style>
