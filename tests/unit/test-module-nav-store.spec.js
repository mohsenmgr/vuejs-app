import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import modNav from '../../src/store/module-nav';

const localVue = createLocalVue();

localVue.use(Vuex);

const {
    setCurrentPage,
    removeCurrentPage,
    removeAllHistory,
    setNavWarning,
    setSnackAlert,
} = require('@/store/module-nav/actions.js');

describe('TEST Module Diet actions, mutations and state', () => {
    let store;
    let http;

    beforeAll(() => {
        http = new MockAdapter(axios);
    });

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                moduleNav: {
                    namespaced: false,
                    state: modNav.state,
                    mutations: modNav.mutations,
                    getters: modNav.getters,
                },
            },
        });
    });

    afterEach(() => {
        http.reset();
    });

    afterAll(() => {
        http.restore();
    });

    test('SETTING NAV MODEL CURRENT PAGE', () => {
        setCurrentPage(store, 'test');
        expect(store.state.moduleNav).toHaveProperty('navModel');
        expect(store.state.moduleNav.navModel).toHaveLength(1);
        expect(store.state.moduleNav.navModel).toContain('test');
    });
    test('REMOVING NAV MODEL CURRENT PAGE', () => {
        setCurrentPage(store, 'test');
        removeCurrentPage(store);
        expect(store.state.moduleNav).toHaveProperty('navModel');
        expect(store.state.moduleNav.navModel).toHaveLength(0);
    });
    test('REMOVING NAV MODEL HISTORY', () => {
        setCurrentPage(store, 'test1');
        setCurrentPage(store, 'test2');
        setCurrentPage(store, 'test3');
        removeAllHistory(store);
        expect(store.state.moduleNav).toHaveProperty('navModel');
        expect(store.state.moduleNav.navModel).toHaveLength(0);
    });
    test('SETTING NAV MODEL navWarning', () => {
        setCurrentPage(store, { page: 'test1' });
        setNavWarning(store, true);
        expect(store.state.moduleNav).toHaveProperty('navModel');
        expect(store.state.moduleNav.navModel).toContainEqual(
            expect.objectContaining({
                navWarning: true,
                page: 'test1',
            })
        );
    });
    test('SETTING NAV MODEL snackAlert', () => {
        setCurrentPage(store, { page: 'test1' });
        setSnackAlert(store, true);
        expect(store.state.moduleNav).toHaveProperty('navModel');
        expect(store.state.moduleNav.navModel).toContainEqual(
            expect.objectContaining({
                snackAlert: true,
                page: 'test1',
            })
        );
    });

    test('SETTING NAV MODEL snackAlert for last page only', () => {
        setCurrentPage(store, { page: 'test1' });
        setCurrentPage(store, { page: 'test2' });
        setCurrentPage(store, { page: 'test3' });

        setSnackAlert(store, true);
        expect(store.state.moduleNav).toHaveProperty('navModel');
        expect(store.state.moduleNav.navModel).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    snackAlert: true,
                    page: 'test3',
                }),
            ])
        );
    });
});
