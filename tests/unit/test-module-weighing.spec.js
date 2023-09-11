import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockData from './mock-data-weight';
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import modWeight from '../../src/store/module-weight';
import modDiet from '../../src/store/module-diet';

const localVue = createLocalVue();

localVue.use(Vuex);

const {
    getWeights,
    addWeight,
    editWeight,
    deleteWeight,
} = require('@/store/module-weight/actions.js');

describe('TEST Module Weighing actions, mutations and state', () => {
    let store;
    let http;

    beforeAll(() => {
        http = new MockAdapter(axios);
    });

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                moduleWeight: {
                    namespaced: false,
                    state: modWeight.state,
                    mutations: modWeight.mutations,
                    getters: modWeight.getters,
                },
                moduleDiet: {
                    namespaced: false,
                    state: {
                        trialId: 'protego-2020',
                    },
                    getters: modDiet.getters,
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

    test('SETTING ALL WEIGHTS', async () => {
        const data = mockData.weightsMockObject;
        data.response = true;

        const endPoint = 'weighings/protego-2020';

        http.onGet(endPoint).reply(200, data);

        let res = await getWeights(store);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleWeight.weights).toHaveLength(
            mockData.weightsMockObject._embedded.item.length
        );
        expect(store.state.moduleWeight.weights).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    weight: expect.any(Number),
                    day: expect.any(String),
                    moment: expect.any(String),
                    _links: expect.any(Object),
                }),
            ])
        );
    });

    test('ADD WEIGHT TO STATE', async () => {
        const data = {};
        data.response = true;

        const endPoint = '/weighing/protego-2020';
        http.onPost(endPoint).reply(200, data);

        let res = await addWeight(store, mockData.weightMockObject);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleWeight.weights).toHaveLength(1);
        expect(store.state.moduleWeight.weights).toEqual(
            expect.arrayContaining([
                expect.objectContaining(mockData.weightMockObject),
            ])
        );
    });

    test('EDIT WEIGHT STATE', async () => {
        const data = {};
        data.response = true;

        var endPoint = '/weighing/protego-2020';
        http.onPost(endPoint).reply(200, data);

        let res = await addWeight(store, mockData.weightMockObject);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleWeight.weights).toHaveLength(1);

        endPoint = mockData.weightObjectEditMock.link;
        http.onPut(endPoint).reply(200, data);

        res = await editWeight(store, mockData.weightObjectEditMock);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleWeight.weights).toHaveLength(1);
        expect(store.state.moduleWeight.weights[0]).toEqual(
            expect.objectContaining({
                day: mockData.weightObjectEditMock.day,
                moment: mockData.weightObjectEditMock.moment,
                weight: mockData.weightObjectEditMock.weight,
            })
        );
    });

    test('DELETE WEIGHT STATE', async () => {
        const data = {};
        data.response = true;

        var endPoint = '/weighing/protego-2020';
        http.onPost(endPoint).reply(200, data);

        let res = await addWeight(store, mockData.weightMockObject);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleWeight.weights).toHaveLength(1);

        endPoint = mockData.weightObjectDeleteMock.link;
        http.onDelete(endPoint).reply(200, data);

        res = await deleteWeight(store, mockData.weightObjectDeleteMock);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleWeight.weights).toHaveLength(0);
    });
});
