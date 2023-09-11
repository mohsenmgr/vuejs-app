export default {
    // this is not an API generated object, it is an internal object
    get OVDATE() {
        return '2020-01-01';
    },
    // API generated JSON object
    get dateAndMealObject() {
        return {
            mealName: 'breakfast',
            date: '2020-01-01',
            foodCollection: [
                {
                    id: '7492ddcf-93c1-4d41-b8b7-d935f7d20a79',
                    name: 'Mirtilli',
                    grams: 50,
                    kcal: 26,
                },
            ],
            skipped: false,
            time: '12:00',
        };
    },
    // This object is generated internally, and then is passed to the '/food-diary/' API via PUT method
    // in order to submit consumed foods
    get dateAndMealObjectInternal() {
        return {
            mealName: 'breakfast',
            date: '2020-01-01',
            foodCollection: [
                {
                    id: '7492ddcf-93c1-4d41-b8b7-d935f7d20a79',
                    name: 'Mirtilli',
                    grams: 50,
                    kcal: 26,
                },
            ],
            skipped: false,
            time: '12:00',
        };
    },
    // This object is generated internally representing a skipped meal
    get dateAndMealObjectSkippedInternal() {
        return {
            mealName: 'breakfast',
            date: '2020-01-01',
            foodCollection: [],
            skipped: true,
            time: '12:00',
        };
    },
    // This object is generated internally representing a meal which
    // was edited and one item is deleted from foodCollection (Mirtilli does not exist in this)
    // However pizza exists in foods
    get dateAndMealObjectModifiedFoodCollection() {
        return {
            mealName: 'breakfast',
            date: '2020-01-01',
            foodCollection: [
                {
                    id: '4ec2d1a4-3ccd-485e-89fc-cc03367e52ae',
                    name: 'Pizza ',
                    grams: 300,
                    kcal: 683,
                },
            ],
            skipped: false,
            time: '12:00',
        };
    },

    // This object is generated internally, and then is passed to the '/food-diary/' API via PUT method
    // in order to submit consumed foods
    get dateAndMealObjectInternalEdited() {
        return {
            mealName: 'breakfast',
            date: '2020-01-01',
            foodCollection: [
                {
                    id: '7492ddcf-93c1-4d41-b8b7-d935f7d20a79',
                    name: 'Mirtilli',
                    grams: 100,
                    kcal: 52,
                },
            ],
            skipped: false,
            time: '12:00',
        };
    },
    // This object is generated internally, and then is passed to the '/food-diary/' API via PUT method
    // in order to submit consumed foods
    get dateAndMealObjectInternalDeleted() {
        return {
            mealName: 'breakfast',
            date: '2020-01-01',
            foodCollection: [],
            skipped: false,
            time: '12:00',
        };
    },
    // API generated JSON object
    get FoodDiaryMeal() {
        return {
            skipped: false,
            eatenFoods: [],
            recommendedFoods: [{ id: '36b9cf34-f380-4072-b73e-ebdca64cd8bf' }],
            _links: {
                self: {
                    method: 'GET',
                    href: 'http://localhost:4000/food-diary/2021-11-02/lunch',
                },
                'fc:fill-lunch': {
                    method: 'PUT',
                    href: 'http://localhost:4000/food-diary/2021-11-02/lunch',
                },
            },
        };
    },
    // API generated JSON object
    get diaryOverview() {
        return {
            glassesOfWater: 0,
            breakfast: {
                status: 'already-filled',
                eatenCalories: 149,
                recommendedCalories: 75,
            },
            morningSnack: {
                status: 'already-filled',
                eatenCalories: 0,
                recommendedCalories: 25,
            },
            lunch: {
                status: 'to-be-filled',
                eatenCalories: 0,
                recommendedCalories: 270,
            },
            afternoonSnack: {
                status: 'to-be-filled',
                eatenCalories: 0,
                recommendedCalories: 25,
            },
            dinner: {
                status: 'to-be-filled',
                eatenCalories: 0,
                recommendedCalories: 130,
            },
            extraMeal: {
                status: 'to-be-filled',
                eatenCalories: 0,
                recommendedCalories: 0,
            },
            _links: {
                self: {
                    method: 'GET',
                    href: 'http://localhost:4000/food-diary/2021-11-02/overview',
                },
                'fc:get-water': {
                    method: 'GET',
                    href: 'http://localhost:4000/food-diary/2021-11-02/glasses-of-water',
                },
                'fc:add-water': {
                    method: 'PUT',
                    href: 'http://localhost:4000/food-diary/2021-11-02/glasses-of-water/add',
                },
                'fc:remove-water': {
                    method: 'PUT',
                    href: 'http://localhost:4000/food-diary/2021-11-02/glasses-of-water/remove',
                },
                'fc:get-breakfast': {
                    method: 'GET',
                    href: 'http://localhost:4000/food-diary/2021-11-02/breakfast',
                },
                'fc:get-morning-snack': {
                    method: 'GET',
                    href: 'http://localhost:4000/food-diary/2021-11-02/morning-snack',
                },
                'fc:get-lunch': {
                    method: 'GET',
                    href: 'http://localhost:4000/food-diary/2021-11-02/lunch',
                },
                'fc:get-afternoon-snack': {
                    method: 'GET',
                    href: 'http://localhost:4000/food-diary/2021-11-02/afternoon-snack',
                },
                'fc:get-dinner': {
                    method: 'GET',
                    href: 'http://localhost:4000/food-diary/2021-11-02/dinner',
                },
                'fc:get-extra-meal': {
                    method: 'GET',
                    href: 'http://localhost:4000/food-diary/2021-11-02/extra-meal',
                },
            },
        };
    },
    // API generated JSON Object - breakfast meal
    get diaryMeal() {
        return {
            skipped: false,
            time: '09:02',
            eatenFoods: [
                {
                    id: '199ec1a9-f841-4ccc-86b2-fa459c3d8441',
                    name: 'Yogurt',
                    grams: 187.5,
                    kcal: 149,
                },
            ],
            recommendedFoods: [{ id: '199ec1a9-f841-4ccc-86b2-fa459c3d8441' }],
            _links: {
                self: {
                    method: 'GET',
                    href: 'http://localhost:4000/food-diary/2021-11-02/breakfast',
                },
                'fc:fill-breakfast': {
                    method: 'PUT',
                    href: 'http://localhost:4000/food-diary/2021-11-02/breakfast',
                },
            },
        };
    },
    // this is not an API generated object, it is an internal object (input for setDiaryMeal)
    get mealsMockObject() {
        return [
            {
                date: '2020-01-01',
                mealIndex: 0,
                mealName: 'breakfast',
                mealText: 'Colazione',
            },
            {
                date: '2020-01-01',
                mealIndex: 1,
                mealName: 'morning-snack',
                mealText: 'Spuntino del mattino',
            },
            {
                date: '2020-01-01',
                mealIndex: 2,
                mealName: 'lunch',
                mealText: 'Pranzo',
            },
            {
                date: '2020-01-01',
                mealIndex: 3,
                mealName: 'afternoon-snack',
                mealText: 'Spuntino del pommeriggio',
            },
            {
                date: '2020-01-01',
                mealIndex: 4,
                mealName: 'dinner',
                mealText: 'Cena',
            },
            {
                date: '2020-01-01',
                mealIndex: 5,
                mealName: 'extra-meal',
                mealText: 'Mangiato fuori pasto?',
            },
        ];
    },
    // this is not an API generated object, it is an internal object (input ID for getFoodById)
    get foodIdMock() {
        return '199ec1a9-f841-4ccc-86b2-fa459c3d8441';
    },
    // This is a food object generated by API, by calling getFoodById method and passing the ID of the food
    get foodMockObject() {
        return {
            foodId: '199ec1a9-f841-4ccc-86b2-fa459c3d8441',
            name: 'Yogurt',
            portion: {
                grams: 125.0,
            },
            portionDescription: '1 vasetto',
            moleculeDistribution: {
                carbohydrates: {
                    grams: 14.5,
                },
                sugars: {
                    grams: 14.5,
                },
                proteins: {
                    grams: 4.2375,
                },
                lipids: {
                    grams: 2.675,
                },
                saturatedLipids: {
                    grams: 1.5,
                },
                alcohol: {
                    grams: 0.0,
                },
                water: {
                    grams: 103.4625,
                },
                fiber: {
                    grams: 0.0375,
                },
                caffeine: {
                    grams: 0.0,
                },
                cholesterol: {
                    grams: 0.0875,
                },
                weight: {
                    grams: 125.0,
                },
                calories: {
                    calories: 99.03,
                },
            },
            caloriesDistribution: {
                carbohydrates: {
                    percentage: 59.0,
                },
                proteins: {
                    percentage: 17.0,
                },
                lipids: {
                    percentage: 24.0,
                },
                alcohol: {
                    percentage: 0.0,
                },
                'sugars-carbohydrates': {
                    percentage: 100.0,
                },
                'saturated-lipids': {
                    percentage: 56.0,
                },
            },
            categories: ['milk-yogurt'],
            allergens: [],
            _links: {
                self: {
                    href: 'http://foodcoach.api.eservices4life.org/food/199ec1a9-f841-4ccc-86b2-fa459c3d8441',
                },
                picture: {
                    href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/199ec1a9-f841-4ccc-86b2-fa459c3d8441/image',
                },
                details: {
                    href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/199ec1a9-f841-4ccc-86b2-fa459c3d8441',
                },
            },
        };
    },
    get foodSearchResultsMockObject() {
        return {
            count: 9,
            search: 'pizza',
            results: [
                {
                    foodId: '4ec2d1a4-3ccd-485e-89fc-cc03367e52ae',
                    name: 'Pizza ',
                    portion: {
                        grams: 300.0,
                    },
                    portionDescription: 'pz',
                    moleculeDistribution: {
                        carbohydrates: {
                            grams: 84.93,
                        },
                        sugars: {
                            grams: 7.98,
                        },
                        proteins: {
                            grams: 25.83,
                        },
                        lipids: {
                            grams: 26.64,
                        },
                        saturatedLipids: {
                            grams: 3.0,
                        },
                        alcohol: {
                            grams: 0.0,
                        },
                        water: {
                            grams: 154.8,
                        },
                        fiber: {
                            grams: 7.23,
                        },
                        caffeine: {
                            grams: 0.0,
                        },
                        cholesterol: {
                            grams: 0.57,
                        },
                        weight: {
                            grams: 300.0,
                        },
                        calories: {
                            calories: 682.8,
                        },
                    },
                    caloriesDistribution: {
                        carbohydrates: {
                            percentage: 50.0,
                        },
                        proteins: {
                            percentage: 15.0,
                        },
                        lipids: {
                            percentage: 35.0,
                        },
                        alcohol: {
                            percentage: 0.0,
                        },
                        'sugars-carbohydrates': {
                            percentage: 9.0,
                        },
                        'saturated-lipids': {
                            percentage: 11.0,
                        },
                    },
                    categories: [],
                    allergens: [],
                    _links: {
                        self: {
                            href: 'http://foodcoach.api.eservices4life.org/food/4ec2d1a4-3ccd-485e-89fc-cc03367e52ae',
                        },
                        picture: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/4ec2d1a4-3ccd-485e-89fc-cc03367e52ae/image',
                        },
                        details: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/4ec2d1a4-3ccd-485e-89fc-cc03367e52ae',
                        },
                    },
                },
                {
                    foodId: '2eed9c73-f4b9-416d-af83-37fee34bdac3',
                    name: 'Pizza bianca',
                    portion: {
                        grams: 350.0,
                    },
                    portionDescription: 'pz',
                    moleculeDistribution: {
                        carbohydrates: {
                            grams: 199.08,
                        },
                        sugars: {
                            grams: 0.0,
                        },
                        proteins: {
                            grams: 27.16,
                        },
                        lipids: {
                            grams: 20.3,
                        },
                        saturatedLipids: {
                            grams: 0.0,
                        },
                        alcohol: {
                            grams: 0.0,
                        },
                        water: {
                            grams: 95.585,
                        },
                        fiber: {
                            grams: 7.91,
                        },
                        caffeine: {
                            grams: 0.0,
                        },
                        cholesterol: {
                            grams: 0.0,
                        },
                        weight: {
                            grams: 350.035,
                        },
                        calories: {
                            calories: 1087.66,
                        },
                    },
                    caloriesDistribution: {
                        carbohydrates: {
                            percentage: 73.0,
                        },
                        proteins: {
                            percentage: 10.0,
                        },
                        lipids: {
                            percentage: 17.0,
                        },
                        alcohol: {
                            percentage: 0.0,
                        },
                        'sugars-carbohydrates': {
                            percentage: 0.0,
                        },
                        'saturated-lipids': {
                            percentage: 0.0,
                        },
                    },
                    categories: ['bakery-products', 'oil'],
                    allergens: [],
                    _links: {
                        self: {
                            href: 'http://foodcoach.api.eservices4life.org/food/2eed9c73-f4b9-416d-af83-37fee34bdac3',
                        },
                        picture: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/2eed9c73-f4b9-416d-af83-37fee34bdac3/image',
                        },
                        details: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/2eed9c73-f4b9-416d-af83-37fee34bdac3',
                        },
                    },
                },
                {
                    foodId: '228b020a-1c9a-4506-9ee7-a3abb0f680a6',
                    name: 'Pizza margherita',
                    portion: {
                        grams: 350.0,
                    },
                    portionDescription: 'pz',
                    moleculeDistribution: {
                        carbohydrates: {
                            grams: 179.06,
                        },
                        sugars: {
                            grams: 0.0,
                        },
                        proteins: {
                            grams: 18.97,
                        },
                        lipids: {
                            grams: 18.97,
                        },
                        saturatedLipids: {
                            grams: 0.0,
                        },
                        alcohol: {
                            grams: 0.0,
                        },
                        water: {
                            grams: 133.035,
                        },
                        fiber: {
                            grams: 0.0,
                        },
                        caffeine: {
                            grams: 0.0,
                        },
                        cholesterol: {
                            grams: 0.0,
                        },
                        weight: {
                            grams: 350.035,
                        },
                        calories: {
                            calories: 962.85,
                        },
                    },
                    caloriesDistribution: {
                        carbohydrates: {
                            percentage: 74.0,
                        },
                        proteins: {
                            percentage: 8.0,
                        },
                        lipids: {
                            percentage: 18.0,
                        },
                        alcohol: {
                            percentage: 0.0,
                        },
                        'sugars-carbohydrates': {
                            percentage: 0.0,
                        },
                        'saturated-lipids': {
                            percentage: 0.0,
                        },
                    },
                    categories: ['bakery-products', 'oil'],
                    allergens: [],
                    _links: {
                        self: {
                            href: 'http://foodcoach.api.eservices4life.org/food/228b020a-1c9a-4506-9ee7-a3abb0f680a6',
                        },
                        picture: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/228b020a-1c9a-4506-9ee7-a3abb0f680a6/image',
                        },
                        details: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/228b020a-1c9a-4506-9ee7-a3abb0f680a6',
                        },
                    },
                },
                {
                    foodId: '323baff5-4dbe-4f73-a7d0-ce605c8751b8',
                    name: 'Pizza al formaggio',
                    portion: {
                        grams: 380.0,
                    },
                    portionDescription: '1 pz',
                    moleculeDistribution: {
                        carbohydrates: {
                            grams: 101.65,
                        },
                        sugars: {
                            grams: 28.462,
                        },
                        proteins: {
                            grams: 34.922,
                        },
                        lipids: {
                            grams: 38.722,
                        },
                        saturatedLipids: {
                            grams: 15.694,
                        },
                        alcohol: {
                            grams: 0.0,
                        },
                        water: {
                            grams: 195.168,
                        },
                        fiber: {
                            grams: 8.93,
                        },
                        caffeine: {
                            grams: 0.0,
                        },
                        cholesterol: {
                            grams: 0.646,
                        },
                        weight: {
                            grams: 380.038,
                        },
                        calories: {
                            calories: 894.79,
                        },
                    },
                    caloriesDistribution: {
                        carbohydrates: {
                            percentage: 45.0,
                        },
                        proteins: {
                            percentage: 16.0,
                        },
                        lipids: {
                            percentage: 39.0,
                        },
                        alcohol: {
                            percentage: 0.0,
                        },
                        'sugars-carbohydrates': {
                            percentage: 28.0,
                        },
                        'saturated-lipids': {
                            percentage: 41.0,
                        },
                    },
                    categories: ['cheese', 'bakery-products', 'oil'],
                    allergens: [],
                    _links: {
                        self: {
                            href: 'http://foodcoach.api.eservices4life.org/food/323baff5-4dbe-4f73-a7d0-ce605c8751b8',
                        },
                        picture: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/323baff5-4dbe-4f73-a7d0-ce605c8751b8/image',
                        },
                        details: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/323baff5-4dbe-4f73-a7d0-ce605c8751b8',
                        },
                    },
                },
                {
                    foodId: 'bbd93418-d871-40f0-9f37-91cc233e8886',
                    name: 'Pizza quattro formaggi',
                    portion: {
                        grams: 350.0,
                    },
                    portionDescription: 'pz',
                    moleculeDistribution: {
                        carbohydrates: {
                            grams: 90.825,
                        },
                        sugars: {
                            grams: 5.215,
                        },
                        proteins: {
                            grams: 40.565,
                        },
                        lipids: {
                            grams: 37.31,
                        },
                        saturatedLipids: {
                            grams: 14.49,
                        },
                        alcohol: {
                            grams: 0.0,
                        },
                        water: {
                            grams: 173.74,
                        },
                        fiber: {
                            grams: 6.755,
                        },
                        caffeine: {
                            grams: 0.0,
                        },
                        cholesterol: {
                            grams: 0.805,
                        },
                        weight: {
                            grams: 350.0,
                        },
                        calories: {
                            calories: 861.35,
                        },
                    },
                    caloriesDistribution: {
                        carbohydrates: {
                            percentage: 42.0,
                        },
                        proteins: {
                            percentage: 19.0,
                        },
                        lipids: {
                            percentage: 39.0,
                        },
                        alcohol: {
                            percentage: 0.0,
                        },
                        'sugars-carbohydrates': {
                            percentage: 6.0,
                        },
                        'saturated-lipids': {
                            percentage: 39.0,
                        },
                    },
                    categories: ['cheese', 'bakery-products', 'oil'],
                    allergens: [],
                    _links: {
                        self: {
                            href: 'http://foodcoach.api.eservices4life.org/food/bbd93418-d871-40f0-9f37-91cc233e8886',
                        },
                        picture: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/bbd93418-d871-40f0-9f37-91cc233e8886/image',
                        },
                        details: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/bbd93418-d871-40f0-9f37-91cc233e8886',
                        },
                    },
                },
                {
                    foodId: 'b5ae2e06-5acc-4cc3-970d-d80c51e88baf',
                    name: 'Pizza quattro stagioni',
                    portion: {
                        grams: 350.0,
                    },
                    portionDescription: 'pz',
                    moleculeDistribution: {
                        carbohydrates: {
                            grams: 84.455,
                        },
                        sugars: {
                            grams: 7.385,
                        },
                        proteins: {
                            grams: 25.13,
                        },
                        lipids: {
                            grams: 23.485,
                        },
                        saturatedLipids: {
                            grams: 5.775,
                        },
                        alcohol: {
                            grams: 0.0,
                        },
                        water: {
                            grams: 207.9,
                        },
                        fiber: {
                            grams: 8.715,
                        },
                        caffeine: {
                            grams: 0.0,
                        },
                        cholesterol: {
                            grams: 0.35,
                        },
                        weight: {
                            grams: 350.035,
                        },
                        calories: {
                            calories: 649.71,
                        },
                    },
                    caloriesDistribution: {
                        carbohydrates: {
                            percentage: 52.0,
                        },
                        proteins: {
                            percentage: 15.0,
                        },
                        lipids: {
                            percentage: 33.0,
                        },
                        alcohol: {
                            percentage: 0.0,
                        },
                        'sugars-carbohydrates': {
                            percentage: 9.0,
                        },
                        'saturated-lipids': {
                            percentage: 25.0,
                        },
                    },
                    categories: ['bakery-products'],
                    allergens: [],
                    _links: {
                        self: {
                            href: 'http://foodcoach.api.eservices4life.org/food/b5ae2e06-5acc-4cc3-970d-d80c51e88baf',
                        },
                        picture: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/b5ae2e06-5acc-4cc3-970d-d80c51e88baf/image',
                        },
                        details: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/b5ae2e06-5acc-4cc3-970d-d80c51e88baf',
                        },
                    },
                },
                {
                    foodId: '0f133649-ddbe-4f45-928b-c8b13cf2d872',
                    name: 'Pizza prosciutto e formaggio',
                    portion: {
                        grams: 350.0,
                    },
                    portionDescription: 'pz',
                    moleculeDistribution: {
                        carbohydrates: {
                            grams: 99.61,
                        },
                        sugars: {
                            grams: 0.0,
                        },
                        proteins: {
                            grams: 31.885,
                        },
                        lipids: {
                            grams: 24.92,
                        },
                        saturatedLipids: {
                            grams: 9.38,
                        },
                        alcohol: {
                            grams: 0.0,
                        },
                        water: {
                            grams: 180.25,
                        },
                        fiber: {
                            grams: 12.53,
                        },
                        caffeine: {
                            grams: 0.0,
                        },
                        cholesterol: {
                            grams: 0.735,
                        },
                        weight: {
                            grams: 349.93,
                        },
                        calories: {
                            calories: 750.26,
                        },
                    },
                    caloriesDistribution: {
                        carbohydrates: {
                            percentage: 53.0,
                        },
                        proteins: {
                            percentage: 17.0,
                        },
                        lipids: {
                            percentage: 30.0,
                        },
                        alcohol: {
                            percentage: 0.0,
                        },
                        'sugars-carbohydrates': {
                            percentage: 0.0,
                        },
                        'saturated-lipids': {
                            percentage: 38.0,
                        },
                    },
                    categories: ['cheese', 'bakery-products', 'ham', 'oil'],
                    allergens: [],
                    _links: {
                        self: {
                            href: 'http://foodcoach.api.eservices4life.org/food/0f133649-ddbe-4f45-928b-c8b13cf2d872',
                        },
                        picture: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/0f133649-ddbe-4f45-928b-c8b13cf2d872/image',
                        },
                        details: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/0f133649-ddbe-4f45-928b-c8b13cf2d872',
                        },
                    },
                },
                {
                    foodId: 'c37ad3af-a1d6-4a1a-a674-aa16930779a2',
                    name: 'Pizza prosciutto formaggio e funghi',
                    portion: {
                        grams: 350.0,
                    },
                    portionDescription: 'pz',
                    moleculeDistribution: {
                        carbohydrates: {
                            grams: 80.255,
                        },
                        sugars: {
                            grams: 0.0,
                        },
                        proteins: {
                            grams: 37.1,
                        },
                        lipids: {
                            grams: 24.57,
                        },
                        saturatedLipids: {
                            grams: 10.045,
                        },
                        alcohol: {
                            grams: 0.0,
                        },
                        water: {
                            grams: 195.44,
                        },
                        fiber: {
                            grams: 12.11,
                        },
                        caffeine: {
                            grams: 0.0,
                        },
                        cholesterol: {
                            grams: 0.56,
                        },
                        weight: {
                            grams: 350.035,
                        },
                        calories: {
                            calories: 690.56,
                        },
                    },
                    caloriesDistribution: {
                        carbohydrates: {
                            percentage: 46.0,
                        },
                        proteins: {
                            percentage: 21.0,
                        },
                        lipids: {
                            percentage: 32.0,
                        },
                        alcohol: {
                            percentage: 0.0,
                        },
                        'sugars-carbohydrates': {
                            percentage: 0.0,
                        },
                        'saturated-lipids': {
                            percentage: 41.0,
                        },
                    },
                    categories: ['cheese', 'bakery-products', 'oil'],
                    allergens: [],
                    _links: {
                        self: {
                            href: 'http://foodcoach.api.eservices4life.org/food/c37ad3af-a1d6-4a1a-a674-aa16930779a2',
                        },
                        picture: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/c37ad3af-a1d6-4a1a-a674-aa16930779a2/image',
                        },
                        details: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/c37ad3af-a1d6-4a1a-a674-aa16930779a2',
                        },
                    },
                },
                {
                    foodId: 'a7c0a0de-43cb-4b0f-9eae-c4a67bb04137',
                    name: 'Pizzoccheri',
                    portion: {
                        grams: 139.0,
                    },
                    portionDescription: 'pz',
                    moleculeDistribution: {
                        carbohydrates: {
                            grams: 32.3592,
                        },
                        sugars: {
                            grams: 1.3066,
                        },
                        proteins: {
                            grams: 10.0914,
                        },
                        lipids: {
                            grams: 19.5573,
                        },
                        saturatedLipids: {
                            grams: 9.2852,
                        },
                        alcohol: {
                            grams: 0.0,
                        },
                        water: {
                            grams: 73.8924,
                        },
                        fiber: {
                            grams: 2.7244,
                        },
                        caffeine: {
                            grams: 0.0,
                        },
                        cholesterol: {
                            grams: 0.3614,
                        },
                        weight: {
                            grams: 138.9861,
                        },
                        calories: {
                            calories: 345.83,
                        },
                    },
                    caloriesDistribution: {
                        carbohydrates: {
                            percentage: 37.0,
                        },
                        proteins: {
                            percentage: 12.0,
                        },
                        lipids: {
                            percentage: 51.0,
                        },
                        alcohol: {
                            percentage: 0.0,
                        },
                        'sugars-carbohydrates': {
                            percentage: 4.0,
                        },
                        'saturated-lipids': {
                            percentage: 47.0,
                        },
                    },
                    categories: [
                        'cheese',
                        'pasta-rice',
                        'vegetables',
                        'butter',
                        'oil',
                    ],
                    allergens: [],
                    _links: {
                        self: {
                            href: 'http://foodcoach.api.eservices4life.org/food/a7c0a0de-43cb-4b0f-9eae-c4a67bb04137',
                        },
                        picture: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/a7c0a0de-43cb-4b0f-9eae-c4a67bb04137/image',
                        },
                        details: {
                            href: 'http://datafood.eservices4life.org/datasource/foodcoach/food/a7c0a0de-43cb-4b0f-9eae-c4a67bb04137',
                        },
                    },
                },
            ],
            _links: {
                self: {
                    href: 'http://foodcoach.api.eservices4life.org/food?search=pizza&limit=20',
                },
            },
        };
    },
};
