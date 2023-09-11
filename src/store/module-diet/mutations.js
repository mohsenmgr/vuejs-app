export function SET_DIET_PLAN(state, dietPlan) {
    let patientName, patientSurname, links, trialId;

    // struct to keep day of the week and diet plan object
    const dayOfWeek = {
        day: '',
        diet: {},
    };

    var weekDictionary = [
        {
            key: 1,
            value: 'monday',
        },
        {
            key: 2,
            value: 'tuesday',
        },
        {
            key: 3,
            value: 'wednesday',
        },
        {
            key: 4,
            value: 'thursday',
        },
        {
            key: 5,
            value: 'friday',
        },
        {
            key: 6,
            value: 'saturday',
        },
        {
            key: 7,
            value: 'sunday',
        },
    ];

    let getWeekDays = function () {
        let days = [];
        weekDictionary.forEach((elem) => {
            days.push(elem.value);
        });

        return days;
    };

    let dayObject;
    let weeklyDietPlan = [];

    for (let [key, value] of Object.entries(dietPlan)) {
        if (key === 'name') {
            patientName = value;
        } else if (key === 'surname') {
            patientSurname = value;
        } else if (key === '_links') {
            links = value;
        } else if (key === 'trialId') {
            trialId = value;
        } else if (getWeekDays().includes(key)) {
            dayObject = Object.create(dayOfWeek);
            dayObject.day = key;

            let diet = value;
            let meals = Object.keys(diet);
            let dietWithEveryMeal = [];

            meals.forEach((meal) => {
                let recommendedCalories = 0;
                let foods = diet[meal];
                foods.forEach((food) => {
                    recommendedCalories += food.kcal;
                });

                let calObject = { reCalories: recommendedCalories };
                let dietOneMeal = {};
                dietOneMeal[meal] = diet[meal];
                let dietOneMealWithCal = { ...dietOneMeal, ...calObject };
                dietWithEveryMeal.push(dietOneMealWithCal);
            });
            dayObject.diet = dietWithEveryMeal;
            weeklyDietPlan.push(dayObject);
        }
    }

    // in case API sends unsorted diet plan (not starting from monday and ending in Sunday)
    // We need to sort the dietplan based by day of the week
    // This function does that.
    // *******************************
    // weeklyDietPlan = weeklyDietPlan.sort(function (dayA, dayB) {
    //     let firstValue = 0,
    //         secondValue = 0;

    //     let idx = weekDictionary.findIndex((day) => day.value == dayA.day);
    //     if (idx !== -1) firstValue = weekDictionary[idx].key;

    //     idx = weekDictionary.findIndex((day) => day.value == dayB.day);
    //     if (idx !== -1) secondValue = weekDictionary[idx].key;

    //     if (firstValue < secondValue) return -1;
    //     else if (firstValue > secondValue) return 1;

    //     return 0;
    // });

    state.patientName = patientName;
    state.patientSurname = patientSurname;
    state.weekDays = weeklyDietPlan;
    state.links = links;
    state.trialId = trialId;
}
