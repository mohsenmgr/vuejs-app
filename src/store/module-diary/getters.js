export function getDiaryMeal(state) {
    return state.meal;
}

export function getDiaryOverview(state) {
    return state.diaryOverview;
}

export function getDiaryMealRecommendedFoodsIds(state) {
    return state.meal.recommendedFoods;
}

export function getDiaryMealRecommendedFoodDetails(state) {
    return state.meal.recommendedFoodDetails;
}

export function getFoodSearchResults(state) {
    return state.dataFoodList;
}

export function getDiaryMealEatenFoods(state) {
    return state.meal.eatenFoods;
}

export function getDiaryOverviewWater(state) {
    return state.diaryOverview.glassesOfWater;
}

export function getDiaryOverviewRecommendedCalories(state) {
    return state.diaryOverview[state.overviewSelectedMeal].recommendedCalories;
}

export function getOverviewDate(state) {
    return state.overviewDate;
}

export function getDiaryMealSkippedStatus(state) {
    return state.meal.skipped;
}
