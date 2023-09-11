import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Welcome from '../views/Welcome.vue';
import CompileDiary from '../components/CompileDiary.vue';
import MainContentPrime from '../components/MainContentPrime.vue';
import CompileDiaryPrime from '../components/CompileDiaryPrime.vue';
import CompilaMealForm from '../components/CompilaMealForm.vue';
import AddWeight from '../components/AddWeight.vue';
import MyProfile from '../components/MyProfile.vue';
import MonitorProgress from '../components/MonitorProgress.vue';
import PageNotFound from '../views/PageNotFound.vue';
import goTo from 'vuetify/lib/services/goto';

Vue.use(VueRouter);

const routes = [
    {
        path: '/home',
        component: Home,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: '',
                component: MainContentPrime,
                name: 'prime',
            },
            {
                path: 'diary',
                component: CompileDiary,
                children: [
                    {
                        name: 'diaryprime',
                        path: '',
                        component: CompileDiaryPrime,
                    },
                    {
                        name: 'compileform',
                        path: 'compileform',
                        component: CompilaMealForm,
                    },
                ],
            },
            {
                path: 'weighing',
                component: AddWeight,
                name: 'weighing',
            },
            {
                path: 'profile',
                component: MyProfile,
                name: 'profile',
            },
            {
                path: 'progress',
                component: MonitorProgress,
                name: 'progress',
            },
        ],
    },
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome,
        meta: {
            requiresAuth: true,
        },
    },
    // and finally the default route, when none of the above matches:
    { path: '*', component: PageNotFound },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,

    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo = 0;

        if (to.hash) {
            scrollTo = to.hash;
        } else if (savedPosition) {
            scrollTo = savedPosition.y;
        }

        return goTo(scrollTo);
    },
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters['moduleUser/isLoggedIn']) {
            next();
            return;
        }
        next('/');
    } else {
        if (store.getters['moduleUser/isLoggedIn']) {
            next('/home');
            return;
        }
        next();
    }
});

export default router;
