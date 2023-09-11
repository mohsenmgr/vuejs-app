export default function () {
    return {
        diaryOverview: {
            glassesOfWater: 0,
        },
        dataFoodList: [],
        meal: {
            time: '',
            eatenFoods: [],
            recommendedFoods: [],
            _links: {},
            recommendedFoodDetails: [],
            skipped: false,

            mealName: '',
            mealText: '',
            mealDate: '',
            mealIndex: '',
        },
        overviewDate: '',
        overviewSelectedMeal: '',
    };
}
