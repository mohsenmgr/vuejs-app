import axios from 'axios';
import { env } from '../../../env.js';

const DATAFOOD_URI =
    env.VUE_APP_DATAFOOD_URI || 'http://foodcoach.api.eservices4life.org';

export function setDiaryMeal(store, dateAndMealObject) {
    //food-diary/2021-10-04/morning-snack

    if (
        !dateAndMealObject ||
        !dateAndMealObject.date ||
        !dateAndMealObject.mealName
    )
        return Promise.reject('dateAndMealObject missing props or not exist');

    let meals = [
        'breakfast',
        'morning-snack',
        'lunch',
        'afternoon-snack',
        'dinner',
        'extra-meal',
    ];
    if (!meals.includes(dateAndMealObject.mealName))
        return Promise.reject(
            `dateAndMealObject=> meal ${dateAndMealObject.mealName} is not valid`
        );

    let trialIdFromModuleDiet;
    if (store.rootGetters)
        trialIdFromModuleDiet = store.rootGetters['moduleDiet/getTrialId'];
    else if (store.state.moduleDiet.trialId)
        trialIdFromModuleDiet = store.state.moduleDiet.trialId;
    else
        Promise.reject(
            'moduleDiary:actions:Error => Can not read trial ID from moduleDiet'
        );

    let endPoint;

    if (!trialIdFromModuleDiet || trialIdFromModuleDiet === '')
        endPoint =
            '/food-diary/' +
            dateAndMealObject.date +
            '/' +
            dateAndMealObject.mealName;
    else
        endPoint =
            '/food-diary/' +
            trialIdFromModuleDiet +
            '/' +
            dateAndMealObject.date +
            '/' +
            dateAndMealObject.mealName;
    return axios({
        method: 'get',
        url: endPoint,
    }).then((response) => {
        let mealObject = response.data;
        if (mealObject.skipped) {
            mealObject.eatenFoods = [];
        }

        mealObject.mealName = dateAndMealObject.mealName;
        mealObject.mealText = dateAndMealObject.mealText;
        mealObject.recommendedFoodDetails = [];
        mealObject.mealDate = dateAndMealObject.date;
        mealObject.mealIndex = dateAndMealObject.mealIndex;
        store.commit('SET_DIARY_MEAL', mealObject);
        return 'Success';
    });
}
// API END POINT FOR OVERVIEW PAGE
export function setDiaryOverview(store, date) {
    //food-diary/2021-10-04/overview
    let endPoint;
    let trialIdFromModuleDiet;

    if (store.rootGetters)
        trialIdFromModuleDiet = store.rootGetters['moduleDiet/getTrialId'];
    else if (store.state.moduleDiet.trialId)
        trialIdFromModuleDiet = store.state.moduleDiet.trialId;
    else Promise.reject('Error: Can not SET trail ID');
    //console.log(store.rootGetters['moduleDiet/getTrialId']);
    //console.log(store.rootGetters['moduleDiet/getTrialId']);

    //let trialIdFromModuleDiet = store.rootGetters['moduleDiet/getTrialId'];

    if (date) {
        if (!trialIdFromModuleDiet || trialIdFromModuleDiet === '')
            endPoint = '/food-diary/' + date + '/overview';
        else
            endPoint =
                '/food-diary/' +
                trialIdFromModuleDiet +
                '/' +
                date +
                '/overview';
    } else return Promise.reject('date undefined');

    return axios({
        method: 'get',
        url: endPoint,
    }).then((response) => {
        store.commit('SET_DIARY_OVERVIEW', response.data);
        return 'Success';
    });
}

export function getFoodById(_, foodId) {
    if (!foodId) return Promise.reject('foodId is null');
    const endpoint = DATAFOOD_URI + '/food/' + foodId;

    return axios({
        url: endpoint,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch((e) => {
        console.log('error: Module-Diary:actions:getFoodById Error => ' + e);
    });
}

export function setDiaryRecommendedFoods({ commit }, foodId) {
    const endpoint = DATAFOOD_URI + '/food/' + foodId;
    if (!foodId) return Promise.reject('foodId is null');

    return axios({
        url: endpoint,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            commit('SET_RECOMMENDED_FOODS', res.data);
            return Promise.resolve('Success');
        })
        .catch((err) => {
            return Promise.reject('FAILURE => ' + err);
        });
}

export function getFoodSearchResults(context, query) {
    const endpoint = DATAFOOD_URI + '/food/?name=' + query;
    if (!query) return Promise.reject('query is null');

    let result = axios({
        url: endpoint,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            context.commit('SET_FOODS', res.data);
            return Promise.resolve('SUCCESS');
        })
        .catch((err) => {
            return Promise.reject('FAILURE => ' + err);
        });

    return result;
}

export function addConsumedFoodToDiaryMeal(store, dateAndMealObject) {
    if (
        !dateAndMealObject ||
        !dateAndMealObject.date ||
        !dateAndMealObject.mealName
    )
        return Promise.reject('Error: date and/or mealName is null.');

    let endPoint;

    let trialIdFromModuleDiet;
    if (store.rootGetters)
        trialIdFromModuleDiet = store.rootGetters['moduleDiet/getTrialId'];
    else if (store.state.moduleDiet.trialId)
        trialIdFromModuleDiet = store.state.moduleDiet.trialId;
    else return Promise.reject('Error: Can not SET trail ID');

    if (!trialIdFromModuleDiet || trialIdFromModuleDiet === '')
        endPoint =
            '/food-diary/' +
            dateAndMealObject.date +
            '/' +
            dateAndMealObject.mealName;
    else {
        endPoint =
            '/food-diary/' +
            trialIdFromModuleDiet +
            '/' +
            dateAndMealObject.date +
            '/' +
            dateAndMealObject.mealName;
    }

    if (dateAndMealObject.foodCollection) {
        return axios
            .put(endPoint, {
                skipped: dateAndMealObject.skipped,
                foods: dateAndMealObject.foodCollection,
                time: dateAndMealObject.time,
            })
            .then(() => {
                store.commit(
                    'ADD_CONSUMED_FOOD_TO_DIARY_Meal',
                    dateAndMealObject
                );
                return Promise.resolve('SUCCESS');
            })
            .catch((err) => {
                return Promise.reject(
                    'MODULE DIARY:ACTIONS:addConsumedFoodToDiaryMeal ERROR => ' +
                        err
                );
            });
    } else
        return Promise.reject(
            'Error: trying to add null food array to consumed food.'
        );
}

export function setOverviewDate(context, dateStr) {
    context.commit('SET_OVERVIEW_DATE', dateStr);
    return 'SUCCESS';
}

export function modifyWater(store, payload) {
    // /food-diary/2021-10-07/glasses-of-water/add

    // console.log(store.state.moduleDiary.overviewDate);
    let ovDate;

    if (store.state.overviewDate) ovDate = store.state.overviewDate;
    else if (store.state.moduleDiary.overviewDate)
        ovDate = store.state.moduleDiary.overviewDate;
    else
        return Promise.reject(
            'Module-Diary:actions:modifyWater:Error => state.overviewDate is null.'
        );

    let mutation;
    if (payload) {
        let action = payload.action;
        if (action === 'add') mutation = 'ADD_WATER';
        else if (action === 'remove') mutation = 'REMOVE_WATER';
        else
            return Promise.reject(
                'Module-Diary:actions:modifyWater:Error => payload.action does not exist.'
            );
    } else
        return Promise.reject(
            'Module-Diary:actions:modifyWater:Error => payload.action is null.'
        );

    let endPoint;

    let trialIdFromModuleDiet;
    if (store.rootGetters)
        trialIdFromModuleDiet = store.rootGetters['moduleDiet/getTrialId'];
    else if (store.state.moduleDiet.trialId)
        trialIdFromModuleDiet = store.state.moduleDiet.trialId;
    else return Promise.reject('Error: Can not SET trail ID');

    if (!trialIdFromModuleDiet || trialIdFromModuleDiet === '')
        endPoint =
            '/food-diary/' + ovDate + '/glasses-of-water/' + payload.action;
    else
        endPoint =
            '/food-diary/' +
            trialIdFromModuleDiet +
            '/' +
            ovDate +
            '/glasses-of-water/' +
            payload.action;

    return axios({
        url: endPoint,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(() => {
            store.commit(mutation);
            return Promise.resolve('SUCCESS');
        })
        .catch((err) =>
            Promise.reject('Module-Diary:actions:modifyWater:Error => ' + err)
        );
}

export function setOverviewSelectedMeal({ commit }, mealName) {
    commit('SET_OVERVIEW_SELECTED_MEAL', mealName);
}
