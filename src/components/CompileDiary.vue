<template>
    <v-container fluid>
        <v-layout>
            <v-flex style="min-height: 950px">
                <v-row justify="center">
                    <v-col class="mt-6" cols="12" sm="10" md="10" lg="10">
                        <NavBox
                            @onBackButtonPress="$emit('onBackButtonPress')"
                        />
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="12" sm="12" lg="10">
                        <router-view
                            @onMealCardClick="handleMealClick"
                        ></router-view>
                    </v-col>
                </v-row>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBox from './NavBox.vue';
export default {
    destroyed: async function () {
        await this.$store
            .dispatch('moduleDiary/setOverviewDate', null)
            .catch((err) => console.log(err));
    },
    computed: {
        ...mapGetters({
            recommendedFoods: 'moduleDiary/getDiaryMealRecommendedFoodsIds',
            recommendedFoodDetails:
                'moduleDiary/getDiaryMealRecommendedFoodDetails',
        }),
    },
    methods: {
        handleMealClick: async function (date_and_meal_object) {
            // After the user clicks on the meal, we know the index of the meal
            // This way we only load recommended foods for 1 meal at a time.
            // Therefore we must wait for setDiaryMeal action to resolve
            // since that action will set the empty recommended food array in our state.
            await this.$store.dispatch(
                'moduleDiary/setDiaryMeal',
                date_and_meal_object
            );

            if (date_and_meal_object.mealIndex < 5)
                this.recommendedFoods.forEach(async (element) => {
                    try {
                        await this.$store.dispatch(
                            'moduleDiary/setDiaryRecommendedFoods',
                            element.id
                        );
                    } catch (e) {
                        console.log('CompileDiary:error => ' + e);
                    }
                });

            // date_and_meal_object.mealName refers to the actual keyName for the meal in the API, aka. breakfast
            // date_and_meal_object.mealText refers to the italian equivalent, shown in the UI

            let navObject = new Object({
                childView: 'compileform',
                parentView: '/home/diary',
                pageTitle: 'Compila il diario / ',
                pageAlternateTitle: date_and_meal_object.mealText,
            });
            this.$store.dispatch('moduleNav/setCurrentPage', navObject);

            this.$router.push({ name: 'compileform' });
        },
    },
    data() {
        return {};
    },
    props: {},
    components: {
        NavBox,
    },
};

//date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
//                .toISOString()
//                .substr(0, 10),
</script>

<style></style>
