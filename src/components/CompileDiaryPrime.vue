<template>
    <v-layout justify-center>
        <v-flex xs12 sm10 md10 lg12 style="min-height: 500px">
            <!-- Date Field Mobile !-->
            <v-card elevation="0" class="rounded-xl pa-4">
                <v-card-title>Seleziona la data</v-card-title>
                <v-flex xs10 sm6 md4>
                    <v-container>
                        <v-row>
                            <v-col class="ml-0" cols="12">
                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="190"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            outlined
                                            v-model="date"
                                            label="Data"
                                            prepend-inner-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="date"
                                        :max="
                                            new Date(
                                                Date.now() -
                                                    new Date().getTimezoneOffset() *
                                                        60000
                                            )
                                                .toISOString()
                                                .substr(0, 10)
                                        "
                                        min="1950-01-01"
                                        @change="save"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-flex>
            </v-card>
            <!-- Date Field Desktop -->

            <!-- END -->
            <v-card
                id="diary-card"
                v-show="cardStatus"
                elevation="0"
                class="rounded-xl pa-4 mt-7 mb-7"
            >
                <v-card-title>Diario alimentare</v-card-title>
                <v-card-subtitle class="grey--text"
                    >del {{ date }}</v-card-subtitle
                >
                <v-row no-gutters justify="start">
                    <v-col lg="2" class="ml-2 d-flex">
                        <Chip
                            :chipTitle="'OBIETTIVO'"
                            :chipValue="objectiveCalories"
                        />
                    </v-col>
                    <v-col lg="2" class="d-flex">
                        <Chip
                            :chipTitle="'MANGIATO'"
                            :chipValue="eatenCalories"
                        />
                    </v-col>
                    <v-col lg="2" class="d-flex">
                        <Chip
                            :chipTitle="
                                objectiveCalories - eatenCalories > 0
                                    ? 'RIMANETE'
                                    : 'ECCESSO'
                            "
                            :chipValue="
                                Math.abs(objectiveCalories - eatenCalories)
                            "
                        />
                    </v-col>
                </v-row>
                <v-row class="mt-4">
                    <v-col> <v-divider /> </v-col>
                </v-row>
                <v-row class="mt-4" justify="center">
                    <v-col cols="12"><Acqua /> </v-col>
                </v-row>
                <v-row class="mt-4">
                    <v-col> <v-divider /> </v-col>
                </v-row>
                <v-row class="ma-4">
                    <v-col
                        class="d-flex"
                        lg="4"
                        sm="12"
                        md="12"
                        v-for="(meal, index) in meals"
                        :key="index"
                    >
                        <meal-card
                            :clickable="true"
                            @onMealCardClick="handleMealClick"
                            :cardTitle="
                                $vuetify.lang.t(
                                    '$vuetify.DesktopContentComp.meal_' +
                                        meal.name +
                                        '.text'
                                )
                            "
                            :cardSubTitle="meal.subtitle"
                            :cardImage="meal.img"
                            :hasCompile="true"
                            :compileStatus="
                                meal.status === 'to-be-filled'
                                    ? 'DA COMPILARE'
                                    : 'COMPILATO'
                            "
                            :cardIndex="index"
                            :fade="
                                meal.status === 'already-filled' ? true : false
                            "
                            :cardElevation="
                                meal.status === 'already-filled' ? '1' : '3'
                            "
                        />
                    </v-col>
                </v-row>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import Chip from './Chip.vue';
import Acqua from './Acqua.vue';
import MealCard from './MealCard.vue';
import { mapGetters } from 'vuex';

export default {
    mounted: function () {
        // console.log(this.overviewDate);
        // TODO: an inital state for the date would be nice here
        // Test if existance of an inital state for the date would be better.
        if (this.overviewDate) {
            let parseDate = Date.parse(this.overviewDate);
            if (isNaN(parseDate)) {
                this.date = null;
            } else {
                this.date = this.overviewDate;
                this.save(this.date);
            }
            this.save();
        }
    },
    computed: {
        ...mapGetters({ diaryOverview: 'moduleDiary/getDiaryOverview' }),
        ...mapGetters({ overviewDate: 'moduleDiary/getOverviewDate' }),
    },
    data() {
        return {
            date: null,
            menu: false,
            meals: [
                {
                    name: 'breakfast',
                    img: require('@/assets/compile_diary_img_1.webp'),
                    status: '',
                    recommendedCalories: 0,
                    eatenCalories: 0,
                    subtitle: '',
                },
                {
                    name: 'morningSnack',
                    img: require('@/assets/compile_diary_img_2.webp'),
                    status: '',
                    recommendedCalories: 0,
                    eatenCalories: 0,
                    subtitle: '',
                },
                {
                    name: 'lunch',
                    img: require('@/assets/compile_diary_img_3.webp'),
                    status: '',
                    recommendedCalories: 0,
                    eatenCalories: 0,
                    subtitle: '',
                },
                {
                    name: 'afternoonSnack',
                    img: require('@/assets/compile_diary_img_4.webp'),
                    status: '',
                    recommendedCalories: 0,
                    eatenCalories: 0,
                    subtitle: '',
                },
                {
                    name: 'dinner',
                    img: require('@/assets/compile_diary_img_5.webp'),
                    status: '',
                    recommendedCalories: 0,
                    eatenCalories: 0,
                    subtitle: '',
                },
                {
                    name: 'extraMeal',
                    img: require('@/assets/compile_diary_img_6.webp'),
                    status: '',
                    recommendedCalories: 0,
                    eatenCalories: 0,
                    subtitle: '',
                },
            ],
            cardStatus: false,
            objectiveCalories: '',
            eatenCalories: '',
        };
    },
    methods: {
        save: async function (date) {
            if (date) {
                this.$refs.menu.save(date);
                let objectiveCalories = 0;
                let eatenCalories = 0;

                this.$store
                    .dispatch('moduleDiary/setOverviewDate', this.date)
                    .catch((err) => console.log(err));

                await this.$store
                    .dispatch('moduleDiary/setDiaryOverview', this.date)
                    .catch((err) => console.log(err));

                this.meals.forEach((meal) => {
                    let overView = this.diaryOverview[meal.name];
                    meal.recommendedCalories = overView.recommendedCalories;
                    objectiveCalories += meal.recommendedCalories;
                    meal.status = overView.status;
                    meal.eatenCalories = overView.eatenCalories;

                    if (meal.name !== 'extraMeal')
                        meal.subtitle =
                            'Raccomandate ' +
                            meal.recommendedCalories +
                            ' kcal';
                    else meal.subtitle = 'Qui lo puoi confessare';

                    eatenCalories += meal.eatenCalories;
                });
                this.objectiveCalories = objectiveCalories;
                this.eatenCalories = eatenCalories;
                this.cardStatus = true;
            }
        },
        handleMealClick: function (index) {
            //bubble up the event to the parent (aka. CompileDiary)

            let mealName;
            let mealText;
            let overviewMealName;
            switch (index) {
                case 0:
                    mealName = 'breakfast';
                    mealText = 'Colazione';
                    overviewMealName = this.meals[0].name;
                    break;
                case 1:
                    mealName = 'morning-snack';
                    mealText = 'Spuntino del mattino';
                    overviewMealName = this.meals[1].name;

                    break;
                case 2:
                    mealName = 'lunch';
                    mealText = 'Pranzo';
                    overviewMealName = this.meals[2].name;

                    break;
                case 3:
                    mealName = 'afternoon-snack';
                    mealText = 'Spuntino del pommeriggio';
                    overviewMealName = this.meals[3].name;

                    break;
                case 4:
                    mealName = 'dinner';
                    mealText = 'Cena';
                    overviewMealName = this.meals[4].name;

                    break;
                case 5:
                    mealName = 'extra-meal';
                    mealText = 'Mangiato fuori pasto?';
                    overviewMealName = this.meals[5].name;
                    break;
            }

            this.$store.dispatch(
                'moduleDiary/setOverviewSelectedMeal',
                overviewMealName
            );

            let date_and_meal_Obj = {
                date: this.date,
                mealIndex: index,
                mealName: mealName,
                mealText: mealText,
            };
            // console.log(
            //     'Child: Meal index ' +
            //         date_and_meal_Obj.mealIndex +
            //         ' was clicked!'
            // );

            this.$emit('onMealCardClick', date_and_meal_Obj);
        },
    },
    components: {
        Chip,
        Acqua,
        MealCard,
    },
};
</script>

<style></style>
