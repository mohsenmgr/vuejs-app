export function ADD_PROGRESS(state, mealProgress) {
    let meals = [
        'breakfast',
        'morningSnack',
        'lunch',
        'afternoonSnack',
        'dinner',
    ];
    let eatenArray = [];
    let recomArray = [];

    let eaten = 0;
    let recom = 0;

    if (mealProgress) {
        meals.forEach((meal) => {
            eaten = mealProgress[meal].eatenPercent;
            recom = mealProgress[meal].recommendedPercent;
            recomArray.push(recom);
            eatenArray.push(eaten);
        });
        state.progress.nutritionist = recomArray;
        state.progress.patient = eatenArray;
    } else {
        console.log('Err: MODULE-PROGRESS MUTATION ERROR');
    }
}
