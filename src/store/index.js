import Vue from 'vue';
import Vuex from 'vuex';
import moduleUser from './module-user';
import moduleDiet from './module-diet';
import moduleWeight from './module-weight';
import moduleNav from './module-nav';
import moduleDiary from './module-diary';
import moduleProgress from './module-progress';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        moduleUser,
        moduleDiet,
        moduleWeight,
        moduleNav,
        moduleDiary,
        moduleProgress,
    },
    plugins: [createPersistedState()],
});
