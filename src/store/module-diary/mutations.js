export function SET_DIARY_MEAL(state, meal) {
    state.meal = meal;
}

export function SET_FOODS(state, foodlist) {
    state.dataFoodList = foodlist;
}

export function SET_DIARY_OVERVIEW(state, overview) {
    state.diaryOverview = overview;
}

export function SET_RECOMMENDED_FOODS(state, food) {
    state.meal.recommendedFoodDetails.push(food);
}

export function ADD_CONSUMED_FOOD_TO_DIARY_Meal(state, mealObject) {
    if (mealObject.skipped) {
        state.meal.skipped = true;
    } else {
        state.meal.skipped = false;

        // removing deleted items from the store
        // deleted items are items which are not present in foodCollection but are present state.meal.eatenFoods
        const results = state.meal.eatenFoods.filter(
            ({ id: id1 }) =>
                !mealObject.foodCollection.some(({ id: id2 }) => id2 === id1)
        );
        results.forEach((item) => {
            let idx = state.meal.eatenFoods.findIndex(
                (elm) => elm.id === item.id
            );
            state.meal.eatenFoods.splice(idx, 1);
        });
        // console.log('************ RESULTS IS ***********');
        // console.log(JSON.stringify(results));

        mealObject.foodCollection.forEach((elem) => {
            let idx = state.meal.eatenFoods.findIndex(
                (obj) => obj.id === elem.id
            );
            //console.log('******EATEN FOODS ********');
            //console.log(JSON.stringify(state.meal.eatenFoods));

            if (idx === -1) {
                state.meal.eatenFoods.push(elem);
                // console.log(
                //     'MODULE DIARY: MUTATION: INSIDE ADD CONSUMED_FOOD_ INSERT'
                // );
            } else {
                state.meal.eatenFoods[idx].grams = elem.grams;
                state.meal.eatenFoods[idx].kcal = elem.kcal;
                // console.log(
                //     'MODULE DIARY: MUTATION: INSIDE ADD CONSUMED_FOOD_ EDIT'
                // );
            }
        });
    }
}

export function SET_OVERVIEW_DATE(state, date) {
    state.overviewDate = date;
}

export function ADD_WATER(state) {
    let water = state.diaryOverview.glassesOfWater;
    state.diaryOverview.glassesOfWater = water + 1;
}

export function REMOVE_WATER(state) {
    let water = state.diaryOverview.glassesOfWater;
    state.diaryOverview.glassesOfWater = water - 1;
}

export function SET_OVERVIEW_SELECTED_MEAL(state, mealName) {
    state.overviewSelectedMeal = mealName;
}
