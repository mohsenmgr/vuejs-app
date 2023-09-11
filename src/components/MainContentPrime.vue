<template>
    <!-- DESKTOP CONTENT PRIME !-->
    <v-layout justify-center>
        <v-flex xs12 sm8 md10 lg10>
            <v-row
                class="mt-5"
                justify="center"
                no-gutters
                style="font-family: Rubik-Bold; font-size: 49px"
            >
                <v-col
                    id="salute"
                    sm="12"
                    lg="5"
                    cols="4"
                    class="text--secondary text-center"
                    >Ciao</v-col
                >
            </v-row>
            <v-row
                class="mt-n3"
                justify="center"
                no-gutters
                style="font-family: Rubik-Bold; font-size: 49px"
            >
                <v-col
                    style=""
                    sm="12"
                    lg="7"
                    cols="12"
                    class="primary--text text-wrap text-center"
                >
                    <p>
                        {{ name.substr(0, 12) }}
                    </p>
                </v-col>
            </v-row>
            <v-row justify="center" no-gutters class="mb-5">
                <v-col
                    sm="11"
                    cols="12"
                    style="font-family: Rubik-Light; font-size: 14px"
                    class="text-center mt-n2"
                >
                    Ecco i tuoi suggerimenti per la settimana
                </v-col>
            </v-row>

            <v-card class="rounded-xl pa-4 ma-2" elevation="0">
                <v-card-title>La mia dieta</v-card-title>
                <v-card-subtitle> assegnata il 01/01/2021 </v-card-subtitle>
                <v-row>
                    <v-col cols="12">
                        <v-slide-group :mandatory="true">
                            <v-slide-item
                                v-for="day in days"
                                :key="day.index"
                                v-slot="{ active, toggle }"
                                @change="onChipClick(day.key)"
                            >
                                <v-btn
                                    style="font-family: Rubik-Regular"
                                    class="mx-2"
                                    :input-value="active"
                                    active-class="v-chip--active primary--text"
                                    depressed
                                    rounded
                                    @click="toggle"
                                >
                                    {{ day.value }}
                                </v-btn>
                            </v-slide-item>
                        </v-slide-group>
                    </v-col></v-row
                >
                <v-row>
                    <v-col>
                        <v-divider />
                        <v-divider />
                    </v-col>
                </v-row>
                <v-row class="ma-2" justify="start">
                    <v-col
                        sm="12"
                        md="4"
                        lg="4"
                        v-for="(meal, index) in meals"
                        :key="index"
                    >
                        <meal-card
                            :clickable="false"
                            v-if="dayPlan.diet && dayPlan.diet.length > 0"
                            :cardTitle="
                                $vuetify.lang.t(
                                    '$vuetify.DesktopContentComp.meal_' +
                                        meal.name +
                                        '.text'
                                )
                            "
                            :cardSubTitle="
                                'Raccomandate ' +
                                dayPlan.diet[index]['reCalories'] +
                                ' kcal'
                            "
                            :cardImage="meal.img"
                            :foodItems="dayPlan.diet[index][meal.name]"
                            :cardHeight="'100%'"
                            :cardElevation="'0'"
                        />
                    </v-col>
                </v-row>
            </v-card> </v-flex
    ></v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

import MealCard from './MealCard.vue';

export default {
    computed: {
        ...mapGetters({ name: 'moduleDiet/getPatientName' }),
        ...mapGetters({ dietPlans: 'moduleDiet/getDietPlan' }),
        days: function () {
            let current_locale = this.$vuetify.lang.current;
            let dict = this.$vuetify.lang.locales[current_locale];
            return dict.MainContentPrime.weekDays;
        },
        dayPlan: function () {
            let dietPlans = this.dietPlans;
            let result = dietPlans.filter((item) => {
                return item.day === this.currentDay;
            });

            if (result[0]) {
                return result[0];
            }

            return {};
        },
    },
    props: {},
    methods: {
        onChipClick(arg) {
            this.currentDay = arg;
        },
    },
    components: {
        MealCard,
    },
    data() {
        return {
            currentDay: 'monday',
            meals: [
                {
                    name: 'breakfast',
                    img: require('@/assets/compile_diary_img_1.webp'),
                    lazy: require('@/assets/compile_diary_img_1_lazy.webp'),
                },
                {
                    name: 'morningSnack',
                    img: require('@/assets/compile_diary_img_2.webp'),
                    lazy: require('@/assets/compile_diary_img_2_lazy.webp'),
                },
                {
                    name: 'lunch',
                    img: require('@/assets/compile_diary_img_3.webp'),
                    lazy: require('@/assets/compile_diary_img_3_lazy.webp'),
                },
                {
                    name: 'afternoonSnack',
                    img: require('@/assets/compile_diary_img_4.webp'),
                    lazy: require('@/assets/compile_diary_img_4_lazy.webp'),
                },
                {
                    name: 'dinner',
                    img: require('@/assets/compile_diary_img_5.webp'),
                    lazy: require('@/assets/compile_diary_img_5_lazy.webp'),
                },
            ],
        };
    },
};
</script>

<style>
.wHeader-title {
    display: block;
    margin: 5px;
    overflow-wrap: break-word;
    float: right;
}
.wHeader-icon {
    float: left;
}
.wHeaderContainer {
    margin-top: 20px;
    display: inline;
}
</style>
