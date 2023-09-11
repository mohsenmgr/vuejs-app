import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockData from './mock-data-diary';
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import modDiary from '../../src/store/module-diary';
import modDiet from '../../src/store/module-diet';

const localVue = createLocalVue();

localVue.use(Vuex);

//jest.mock('@/store/module-diary/actions.js');

const {
    setDiaryOverview,
    setDiaryMeal,
    getFoodById,
    setDiaryRecommendedFoods,
    getFoodSearchResults,
    addConsumedFoodToDiaryMeal,
    setOverviewDate,
    modifyWater,
    setOverviewSelectedMeal,
} = require('@/store/module-diary/actions.js');

describe('TEST Module Diary actions', () => {
    let http;
    let store;

    beforeAll(() => {
        http = new MockAdapter(axios);
    });

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                moduleDiary: {
                    state: modDiary.state,
                    mutations: modDiary.mutations,
                    namespaced: false,
                    getters: modDiary.getters,
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

    it('SETS DiaryMeal', async () => {
        // console.log(JSON.stringify(moduleDiary.mutations));

        let skipFlip = mockData.diaryMeal.skipped;
        const data = mockData.diaryMeal;
        data.response = true;

        for (let mockMeal of mockData.mealsMockObject) {
            let endPoint =
                '/food-diary/' +
                'protego-2020/' +
                mockMeal.date +
                '/' +
                mockMeal.mealName;

            skipFlip = !skipFlip;
            data.skipped = skipFlip;
            http.onGet(endPoint).reply(200, data);

            let res = await setDiaryMeal(store, mockMeal);
            expect(res).toEqual('Success');
            expect(store.state.moduleDiary.meal).toHaveProperty('skipped');
            expect(store.state.moduleDiary.meal).toHaveProperty('eatenFoods');
            expect(store.state.moduleDiary.meal).toHaveProperty(
                'recommendedFoods'
            );
            expect(store.state.moduleDiary.meal).toHaveProperty('_links');
            expect(store.state.moduleDiary.meal).toHaveProperty(
                'recommendedFoodDetails'
            );
            expect(store.state.moduleDiary.meal).toHaveProperty('mealName');
            expect(store.state.moduleDiary.meal.mealName).toEqual(
                mockMeal.mealName
            );

            expect(store.state.moduleDiary.meal).toHaveProperty('mealText');
            expect(store.state.moduleDiary.meal).toHaveProperty('mealDate');
            expect(store.state.moduleDiary.meal).toHaveProperty('mealIndex');

            if (store.state.moduleDiary.meal.skipped)
                expect(store.state.moduleDiary.meal.eatenFoods).toHaveLength(0);
        }
    });

    test('SETS DiaryOverview', async () => {
        const data = mockData.diaryOverview;
        data.response = true;

        let endPoint =
            '/food-diary/' + 'protego-2020/' + mockData.OVDATE + '/overview';

        http.onGet(endPoint).reply(200, data);

        let res = await setDiaryOverview(store, mockData.OVDATE);
        expect(res).toEqual('Success');
    });

    test('SETS One Food details from datafood, by passing a food ID', async () => {
        let foodId = mockData.foodIdMock;

        const data = mockData.foodMockObject;
        data.response = true;

        const endPoint =
            'http://foodcoach.api.eservices4life.org' + '/food/' + foodId;

        http.onGet(endPoint).reply(200, data);

        let response = await getFoodById(store, foodId);
        let result = response.data;
        expect(result).toHaveProperty('foodId');
        expect(result.foodId).toEqual(foodId);
        expect(result).toHaveProperty('moleculeDistribution');
        expect(result).toHaveProperty('portion');
        expect(result).toHaveProperty('portionDescription');
        expect(result).toHaveProperty('name');
    });

    test('SETS Diary recommended foods, by passing a/multiple food ID(s)', async () => {
        let foodId = mockData.foodIdMock;

        const data = mockData.foodMockObject;
        data.response = true;

        const endPoint =
            'http://foodcoach.api.eservices4life.org' + '/food/' + foodId;

        http.onGet(endPoint).reply(200, data);

        let res = await setDiaryRecommendedFoods(store, foodId);
        expect(res).toEqual('Success');
        expect(store.state.moduleDiary.meal).toHaveProperty(
            'recommendedFoodDetails'
        );
        expect(
            store.state.moduleDiary.meal.recommendedFoodDetails
        ).toHaveLength(1);
        expect(
            store.state.moduleDiary.meal.recommendedFoodDetails[0]
        ).toHaveProperty('foodId');
        expect(
            store.state.moduleDiary.meal.recommendedFoodDetails[0].foodId
        ).toEqual(foodId);
        expect(
            store.state.moduleDiary.meal.recommendedFoodDetails[0]
        ).toHaveProperty('moleculeDistribution');
        expect(
            store.state.moduleDiary.meal.recommendedFoodDetails[0]
        ).toHaveProperty('portion');
        expect(
            store.state.moduleDiary.meal.recommendedFoodDetails[0]
        ).toHaveProperty('portionDescription');
        expect(
            store.state.moduleDiary.meal.recommendedFoodDetails[0]
        ).toHaveProperty('name');
    });

    test('SETS datafood API Search quary, by passing search pharase', async () => {
        let quary = 'pizza';

        const data = mockData.foodSearchResultsMockObject;
        data.response = true;

        const endPoint =
            'http://foodcoach.api.eservices4life.org' + '/food/?name=' + quary;

        http.onGet(endPoint).reply(200, data);

        let res = await getFoodSearchResults(store, quary);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleDiary.dataFoodList).toHaveProperty('search');
        expect(store.state.moduleDiary.dataFoodList.search).toEqual(quary);
        expect(store.state.moduleDiary.dataFoodList).toHaveProperty('count');
        expect(store.state.moduleDiary.dataFoodList).toHaveProperty('results');
        expect(store.state.moduleDiary.dataFoodList.results).toHaveLength(
            store.state.moduleDiary.dataFoodList.count
        );
    });

    test('SETS consumed foods by calling API, by passing meal name, date and food collection', async () => {
        //adding one consumed food to the eaten foods

        const data = {};
        data.response = true;

        let endPoint =
            '/food-diary/' +
            'protego-2020/' +
            mockData.dateAndMealObjectInternal.date +
            '/' +
            mockData.dateAndMealObjectInternal.mealName;

        http.onPut(endPoint).reply(200, data);

        let res = await addConsumedFoodToDiaryMeal(
            store,
            mockData.dateAndMealObjectInternal
        );
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleDiary.meal).toHaveProperty('eatenFoods');
        expect(store.state.moduleDiary.meal.eatenFoods).toHaveLength(1);
        expect(store.state.moduleDiary.meal.eatenFoods).toMatchObject(
            mockData.dateAndMealObjectInternal.foodCollection
        );
        expect(store.state.moduleDiary.meal.eatenFoods[0]).toHaveProperty(
            'grams'
        );
        expect(store.state.moduleDiary.meal.eatenFoods[0].grams).toEqual(
            mockData.dateAndMealObjectInternal.foodCollection[0].grams
        );
        expect(store.state.moduleDiary.meal.eatenFoods[0]).toHaveProperty(
            'kcal'
        );
        expect(store.state.moduleDiary.meal.eatenFoods[0].kcal).toEqual(
            mockData.dateAndMealObjectInternal.foodCollection[0].kcal
        );
        expect(store.state.moduleDiary.meal).toHaveProperty('skipped');
        expect(store.state.moduleDiary.meal.skipped).toEqual(
            mockData.dateAndMealObjectInternal.skipped
        );
        //editing one consumed food kcal/grams
        let res2 = await addConsumedFoodToDiaryMeal(
            store,
            mockData.dateAndMealObjectInternalEdited
        );
        expect(res2).toEqual('SUCCESS');
        expect(store.state.moduleDiary.meal).toHaveProperty('eatenFoods');
        expect(store.state.moduleDiary.meal.eatenFoods).toHaveLength(1);
        expect(store.state.moduleDiary.meal.eatenFoods[0]).toHaveProperty(
            'grams'
        );
        expect(store.state.moduleDiary.meal.eatenFoods[0]).toHaveProperty(
            'kcal'
        );
        expect(store.state.moduleDiary.meal.eatenFoods[0].grams).toEqual(
            mockData.dateAndMealObjectInternalEdited.foodCollection[0].grams
        );
        expect(store.state.moduleDiary.meal.eatenFoods[0].kcal).toEqual(
            mockData.dateAndMealObjectInternalEdited.foodCollection[0].kcal
        );

        // adding pizza and removing Mirtilli from consumed food
        // expect splice to be called in mutation
        res2 = await addConsumedFoodToDiaryMeal(
            store,
            mockData.dateAndMealObjectModifiedFoodCollection
        );
        expect(res2).toEqual('SUCCESS');
        expect(store.state.moduleDiary.meal).toHaveProperty('eatenFoods');
        expect(store.state.moduleDiary.meal.eatenFoods).toHaveLength(1);
        expect(store.state.moduleDiary.meal.eatenFoods[0]).toHaveProperty(
            'name'
        );
        expect(store.state.moduleDiary.meal.eatenFoods[0]).toHaveProperty('id');
        expect(store.state.moduleDiary.meal.eatenFoods[0]).toHaveProperty(
            'grams'
        );
        expect(store.state.moduleDiary.meal.eatenFoods[0]).toHaveProperty(
            'kcal'
        );
        expect(store.state.moduleDiary.meal.eatenFoods[0].id).toEqual(
            mockData.dateAndMealObjectModifiedFoodCollection.foodCollection[0]
                .id
        );
        expect(store.state.moduleDiary.meal.eatenFoods[0].name).toEqual(
            mockData.dateAndMealObjectModifiedFoodCollection.foodCollection[0]
                .name
        );
        expect(store.state.moduleDiary.meal.eatenFoods[0].grams).toEqual(
            mockData.dateAndMealObjectModifiedFoodCollection.foodCollection[0]
                .grams
        );
        expect(store.state.moduleDiary.meal.eatenFoods[0].kcal).toEqual(
            mockData.dateAndMealObjectModifiedFoodCollection.foodCollection[0]
                .kcal
        );
        //deleting one consumed food from store
        let res3 = await addConsumedFoodToDiaryMeal(
            store,
            mockData.dateAndMealObjectInternalDeleted
        );
        expect(res3).toEqual('SUCCESS');
        expect(store.state.moduleDiary.meal).toHaveProperty('eatenFoods');
        expect(store.state.moduleDiary.meal.eatenFoods).toHaveLength(0);
    });

    test('SETS MEAL as Skipped Meal', async () => {
        //adding one consumed food to the eaten foods

        const data = {};
        data.response = true;

        let endPoint =
            '/food-diary/' +
            'protego-2020/' +
            mockData.dateAndMealObjectSkippedInternal.date +
            '/' +
            mockData.dateAndMealObjectSkippedInternal.mealName;

        http.onPut(endPoint).reply(200, data);

        let res = await addConsumedFoodToDiaryMeal(
            store,
            mockData.dateAndMealObjectSkippedInternal
        );
        expect(res).toEqual('SUCCESS');
    });

    test('SETS OverviewDate, by passing a date string', () => {
        let res = setOverviewDate(store, mockData.OVDATE);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleDiary.overviewDate).toBe(mockData.OVDATE);
    });

    test('SETS +=1 for water, by passing state.overviewDate', async () => {
        const data = {};
        data.response = true;
        //add one water
        let endPoint =
            '/food-diary/' +
            'protego-2020/' +
            mockData.OVDATE +
            '/glasses-of-water/' +
            'add';

        http.onPut(endPoint).reply(200, data);

        let payload = { action: 'add' };

        let res = setOverviewDate(store, mockData.OVDATE);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleDiary.overviewDate).toEqual(mockData.OVDATE);

        let waterNumber = store.state.moduleDiary.diaryOverview.glassesOfWater;
        let res2 = await modifyWater(store, payload);
        expect(res2).toEqual('SUCCESS');
        expect(store.state.moduleDiary.diaryOverview.glassesOfWater).toEqual(
            waterNumber + 1
        );

        //remove the one added water
        endPoint =
            '/food-diary/' +
            'protego-2020/' +
            mockData.OVDATE +
            '/glasses-of-water/' +
            'remove';

        http.onPut(endPoint).reply(200, data);

        payload = { action: 'remove' };
        res = setOverviewDate(store, mockData.OVDATE);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleDiary.overviewDate).toEqual(mockData.OVDATE);

        waterNumber = store.state.moduleDiary.diaryOverview.glassesOfWater;
        res2 = await modifyWater(store, payload);
        expect(res2).toEqual('SUCCESS');
        expect(store.state.moduleDiary.diaryOverview.glassesOfWater).toEqual(
            waterNumber - 1
        );
    });

    test('SETS OverviewDate SELECTED MEAL', () => {
        setOverviewSelectedMeal(store, 'test-meal');
        expect(store.state.moduleDiary.overviewSelectedMeal).toBe('test-meal');
    });

    test('SETS WATER, FAULURE', async () => {
        const data = {};
        data.response = false;
        //add one water
        let endPoint =
            '/food-diary/' +
            'protego-2020/' +
            mockData.OVDATE +
            '/glasses-of-water/' +
            'add';

        http.onPut(endPoint).reply(504, data);

        let payload = { action: 'add' };

        let res = setOverviewDate(store, mockData.OVDATE);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleDiary.overviewDate).toEqual(mockData.OVDATE);

        try {
            await modifyWater(store, payload);
        } catch (error) {
            expect(error).not.toEqual('SUCCESS');
        }
    });

    test('SETS WATER, FAULURE with TRIAL ID', async () => {
        store.state.moduleDiet.trialId = null;

        let payload = { action: 'add' };

        let res = setOverviewDate(store, mockData.OVDATE);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleDiary.overviewDate).toEqual(mockData.OVDATE);

        try {
            await modifyWater(store, payload);
        } catch (error) {
            expect(error).not.toEqual('SUCCESS');
        }
    });

    test('SETS WATER, FAULURE with NULL action', async () => {
        let res = setOverviewDate(store, mockData.OVDATE);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleDiary.overviewDate).toEqual(mockData.OVDATE);

        try {
            await modifyWater(store, null);
        } catch (error) {
            expect(error).not.toEqual('SUCCESS');
        }
    });

    test('SETS WATER, FAULURE with NULL action, payload exists', async () => {
        let payload = {};

        let res = setOverviewDate(store, mockData.OVDATE);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleDiary.overviewDate).toEqual(mockData.OVDATE);

        try {
            await modifyWater(store, payload);
        } catch (error) {
            expect(error).not.toEqual('SUCCESS');
        }
    });

    test('SETS WATER, FAULURE with non existant OverviewDate', async () => {
        let payload = {};

        try {
            await modifyWater(store, payload);
        } catch (error) {
            expect(error).not.toEqual('SUCCESS');
        }
    });

    test('ADDING NULL COLLECTION TO CONSUMED FOOD, FAILURE TEST', async () => {
        const data = {};
        data.response = true;

        let customObject = mockData.dateAndMealObjectInternal;
        customObject.foodCollection = null;

        try {
            await addConsumedFoodToDiaryMeal(store, customObject);
        } catch (e) {
            expect(e).not.toEqual('SUCCESS');
        }
    });

    test('ADDING FOOD COLLECTION TO CONSUMED FOOD, FAILURE TEST AXIOS', async () => {
        const data = {};
        data.response = false;

        let endPoint =
            '/food-diary/' +
            'protego-2020/' +
            mockData.dateAndMealObjectInternal.date +
            '/' +
            mockData.dateAndMealObjectInternal.mealName;

        http.onPut(endPoint).reply(504, data);

        try {
            await addConsumedFoodToDiaryMeal(
                store,
                mockData.dateAndMealObjectInternal
            );
        } catch (e) {
            expect(e).not.toEqual('SUCCESS');
        }
    });

    test('FAILURE TEST ADD CONSUMED FOOD, TRIAL ID NULL', async () => {
        const data = {};
        data.response = false;

        store.state.moduleDiet.trialId = null;

        let endPoint =
            '/food-diary/' +
            'protego-2020/' +
            mockData.dateAndMealObjectInternal.date +
            '/' +
            mockData.dateAndMealObjectInternal.mealName;

        http.onPut(endPoint).reply(200, data);

        try {
            await addConsumedFoodToDiaryMeal(
                store,
                mockData.dateAndMealObjectInternal
            );
        } catch (e) {
            expect(e).not.toEqual('SUCCESS');
        }
    });
});
