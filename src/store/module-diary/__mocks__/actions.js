import mockData from '../../../../tests/unit/mockData';
import axios from 'axios';

const setDiaryMeal = (store, dateAndMealObject) => {
    //food-diary/2021-10-04/morning-snack

    console.log(store.state.moduleDiet.trialId);

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

    let endPoint =
        'http://localhost:4000/food-diary/protego-2020/2021-10-04/morning-snack';

    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: endPoint,
        }).then(({ status, data }) => {
            if (status === 200) {
                let mealObject = data;
                console.log(mealObject);
                if (mealObject.skipped) {
                    mealObject.eatenFoods = [];
                }

                mealObject.recommendedFoodDetails = [];
                mealObject.mealName = dateAndMealObject.mealName;
                mealObject.mealText = dateAndMealObject.mealText;
                mealObject.mealDate = dateAndMealObject.date;
                mealObject.mealIndex = dateAndMealObject.mealIndex;
                store.commit('SET_DIARY_MEAL', mealObject);

                resolve('Success');
            } else {
                reject(new Error('error'));
            }
        });
    });
};

const setDiaryOverview = (store, date) => {
    if (!date) return Promise.reject('date undefined');

    let promise = new Promise((resolve) => {
        setTimeout(() => {
            store.commit('SET_DIARY_OVERVIEW', mockData.diaryOverview);
            resolve('SUCCESS');
        }, 300);
    });

    return promise;
};

const getFoodById = (_, foodId) => {
    if (!foodId) return Promise.reject('foodId is null');
    let promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData.foodMockObject);
        }, 300);
    });

    return promise;
};

const setDiaryRecommendedFoods = (store, foodId) => {
    if (!foodId) return Promise.reject('foodId is null');
    let promise = new Promise((resolve) => {
        setTimeout(() => {
            store.commit('SET_RECOMMENDED_FOODS', mockData.foodMockObject);
            resolve('Success');
        }, 300);
    });

    return promise;
};

const getFoodSearchResults = (store, query) => {
    if (!query) return Promise.reject('query is null');
    let promise = new Promise((resolve) => {
        setTimeout(() => {
            store.commit('SET_FOODS', mockData.foodSearchResultsMockObject);
            resolve('SUCCESS');
        }, 300);
    });

    return promise;
};

const addConsumedFoodToDiaryMeal = (store, dateAndMealObject) => {
    if (
        !dateAndMealObject ||
        !dateAndMealObject.date ||
        !dateAndMealObject.mealName
    )
        return Promise.reject('Error: date and/or mealName is null.');

    if (dateAndMealObject.foodCollection) {
        store.commit('ADD_CONSUMED_FOOD_TO_DIARY_Meal', dateAndMealObject);
        return Promise.resolve('SUCCESS');
    } else
        return Promise.reject(
            'Error: trying to add null food array to consumed food.'
        );
};

const setOverviewDate = (store, dateStr) => {
    if (!dateStr) return 'FAILURE: Date String is null';
    store.commit('SET_OVERVIEW_DATE', dateStr);
    return 'SUCCESS';
};

const addWater = (store) => {
    if (!store.state.myModule.overviewDate)
        return Promise.reject(
            'Module-Diary:actions:addWater:Error => state.overviewDate is null.'
        );
    store.commit('ADD_WATER');
    return Promise.resolve('SUCCESS');
};

const removeWater = (store) => {
    if (!store.state.myModule.overviewDate)
        return Promise.reject(
            'Module-Diary:actions:removeWater:Error => state.overviewDate is null.'
        );

    store.commit('REMOVE_WATER');
    return Promise.resolve('SUCCESS');
};

const setOverviewSelectedMeal = (store, mealName) => {
    store.commit('SET_OVERVIEW_SELECTED_MEAL', mealName);
};

exports.setDiaryMeal = setDiaryMeal;
exports.setDiaryOverview = setDiaryOverview;
exports.getFoodById = getFoodById;
exports.setDiaryRecommendedFoods = setDiaryRecommendedFoods;
exports.getFoodSearchResults = getFoodSearchResults;
exports.addConsumedFoodToDiaryMeal = addConsumedFoodToDiaryMeal;
exports.setOverviewDate = setOverviewDate;
exports.addWater = addWater;
exports.removeWater = removeWater;
exports.setOverviewSelectedMeal = setOverviewSelectedMeal;
