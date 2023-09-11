import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockData from './mock-data-diet';
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import modDiet from '../../src/store/module-diet';

const localVue = createLocalVue();

localVue.use(Vuex);

const { getDietPlan } = require('@/store/module-diet/actions.js');

describe('TEST Module Diet actions, mutations and state', () => {
    let store;
    let http;

    beforeAll(() => {
        http = new MockAdapter(axios);
    });

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                moduleDiet: {
                    namespaced: false,
                    state: modDiet.state,
                    mutations: modDiet.mutations,
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

    test('SETTING DIET PLAN, PATIENT NAME,SURNAME, RECOMMENDED MEAL CALORIES AND FOODS', async () => {
        const data = mockData.dietPlanMockObject;
        data.response = true;

        const endPoint = 'diet-plan';

        http.onGet(endPoint).reply(200, data);

        let res = await getDietPlan(store);
        expect(res).toEqual('SUCCESS');
        expect(store.state.moduleDiet).toHaveProperty('patientName');
        expect(store.state.moduleDiet.patientName).toEqual(
            mockData.dietPlanMockObject.name
        );

        expect(store.state.moduleDiet).toHaveProperty('patientSurname');
        expect(store.state.moduleDiet.patientSurname).toEqual(
            mockData.dietPlanMockObject.surname
        );

        expect(store.state.moduleDiet).toHaveProperty('trialId');
        expect(store.state.moduleDiet.trialId).toEqual(
            mockData.dietPlanMockObject.trialId
        );
        expect(store.state.moduleDiet).toHaveProperty('weekDays');
        expect(store.state.moduleDiet.weekDays).toHaveLength(7);

        expect(store.state.moduleDiet.weekDays).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    day: 'monday',
                    diet: expect.arrayContaining([
                        expect.objectContaining({
                            breakfast: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            morningSnack: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            lunch: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            afternoonSnack: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            dinner: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                    ]),
                }),
                expect.objectContaining({
                    day: 'tuesday',
                    diet: expect.arrayContaining([
                        expect.objectContaining({
                            breakfast: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            morningSnack: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            lunch: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            afternoonSnack: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            dinner: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                    ]),
                }),
                expect.objectContaining({
                    day: 'wednesday',
                    diet: expect.arrayContaining([
                        expect.objectContaining({
                            breakfast: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            morningSnack: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            lunch: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            afternoonSnack: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            dinner: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                    ]),
                }),
                expect.objectContaining({
                    day: 'thursday',
                    diet: expect.arrayContaining([
                        expect.objectContaining({
                            breakfast: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            morningSnack: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            lunch: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            afternoonSnack: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            dinner: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                    ]),
                }),
                expect.objectContaining({
                    day: 'friday',
                    diet: expect.arrayContaining([
                        expect.objectContaining({
                            breakfast: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            morningSnack: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            lunch: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            afternoonSnack: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            dinner: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                    ]),
                }),
                expect.objectContaining({
                    day: 'saturday',
                    diet: expect.arrayContaining([
                        expect.objectContaining({
                            breakfast: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            morningSnack: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            lunch: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            afternoonSnack: expect.any(Array),
                        }),
                        expect.objectContaining({
                            dinner: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                    ]),
                }),
                expect.objectContaining({
                    day: 'sunday',
                    diet: expect.arrayContaining([
                        expect.objectContaining({
                            breakfast: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            morningSnack: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            lunch: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            afternoonSnack: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                        expect.objectContaining({
                            dinner: expect.any(Array),
                            reCalories: expect.any(Number),
                        }),
                    ]),
                }),
            ])
        );

        let mealArray;
        let cumCalories;
        let recommendedCalories;
        let mealName;

        let getMealNameByIndex = (index) => {
            switch (index) {
                case 0:
                    return 'breakfast';
                case 1:
                    return 'morningSnack';
                case 2:
                    return 'lunch';
                case 3:
                    return 'afternoonSnack';
                case 4:
                    return 'dinner';
            }
        };

        // i => 7 days of week
        // j => 5 meals of each day
        // these loop check wether the recommended calories are equal to the cummulative sum of
        // recommended food calories for each meal of each day
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 5; j++) {
                cumCalories = 0;

                recommendedCalories =
                    store.state.moduleDiet.weekDays[i].diet[j].reCalories;

                mealName = getMealNameByIndex(j);
                mealArray = store.state.moduleDiet.weekDays[i].diet[j];

                mealArray[mealName].forEach((elem) => {
                    cumCalories += elem.kcal;
                });

                expect(cumCalories).toEqual(recommendedCalories);
            }
        }

        expect(store.state.moduleDiet).toHaveProperty('links');
    });

    test('SETTING DIET PLAN, FAILURE', async () => {
        const data = {};
        data.response = false;

        const endPoint = 'diet-plan';

        http.onGet(endPoint).reply(502, data);

        try {
            await getDietPlan(store);
        } catch (error) {
            expect(error).not.toEqual('SUCCESS');
        }
    });
});
