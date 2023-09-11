<template>
    <v-layout justify-center>
        <v-flex xs12 sm10 md10 lg12>
            <v-row justify="center">
                <v-col>
                    <!-- timeOfMeal: {{ this.timeOfMeal }} mTime
                    {{ this.mTimeOfMeal }} -->
                    <v-card elevation="0" class="rounded-xl pa-4">
                        <v-card-title>
                            {{ meal.mealText }}
                            <!-- <h1>{{ $route.params.index }}</h1> -->
                        </v-card-title>
                        <v-card-subtitle
                            style="font-weight: 500"
                            class="grey--text"
                        >
                            del&nbsp;{{ meal.mealDate }}
                        </v-card-subtitle>
                        <v-flex>
                            <v-container>
                                <v-row>
                                    <v-col lg="6" sm="6">
                                        <div
                                            v-show="meal.mealIndex !== 5"
                                            style="
                                                font-family: Rubik-Light;
                                                font-size: 16px;
                                            "
                                            class="container-with-border"
                                        >
                                            <v-switch
                                                @change="changeState"
                                                v-model="localSkippedStatus"
                                                label="Ho saltato il pasto"
                                            ></v-switch>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row v-if="localSkippedStatus">
                                    <v-col lg="12" sm="12">
                                        <v-card class="rounded-xl" outlined>
                                            <v-row>
                                                <v-col>
                                                    <v-card-title
                                                        style="font-size: 18px"
                                                        >Indica la
                                                        motivazione</v-card-title
                                                    >
                                                </v-col></v-row
                                            >
                                            <v-row no-gutters
                                                ><v-col
                                                    cols="12"
                                                    class="pl-4 pr-4 grey--text"
                                                >
                                                    <v-text-field
                                                        style="
                                                            font-size: 16px;
                                                            font-family: Rubik-Regular;
                                                        "
                                                        outlined
                                                        label="Motivazione"
                                                    ></v-text-field></v-col
                                            ></v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" lg="6" md="6">
                                        <v-card
                                            :disabled="localSkippedStatus"
                                            elevation="0"
                                            outlined
                                            class="rounded-xl"
                                            height="100%"
                                        >
                                            <v-row>
                                                <v-col>
                                                    <v-card-title
                                                        style="font-size: 18px"
                                                    >
                                                        Seleziona orario
                                                    </v-card-title>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters justify="center">
                                                <v-col cols="11">
                                                    <v-menu
                                                        ref="menu"
                                                        v-model="menu"
                                                        :close-on-content-click="
                                                            false
                                                        "
                                                        :nudge-right="40"
                                                        :return-value.sync="
                                                            timeOfMeal
                                                        "
                                                        transition="scale-transition"
                                                        offset-y
                                                        max-width="290px"
                                                        min-width="290px"
                                                    >
                                                        <template
                                                            v-slot:activator="{
                                                                on,
                                                                attrs,
                                                            }"
                                                        >
                                                            <v-text-field
                                                                style="
                                                                    font-family: Rubik-Regular;
                                                                "
                                                                :rules="
                                                                    timeRuleFunc
                                                                "
                                                                prepend-inner-icon="mdi-clock-time-four-outline"
                                                                outlined
                                                                v-model="
                                                                    timeOfMeal
                                                                "
                                                                :label="
                                                                    'Orario ' +
                                                                    meal.mealText
                                                                "
                                                                readonly
                                                                v-bind="attrs"
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-time-picker
                                                            v-if="menu"
                                                            v-model="timeOfMeal"
                                                            full-width
                                                            @click:minute="
                                                                $refs.menu.save(
                                                                    timeOfMeal
                                                                )
                                                            "
                                                        ></v-time-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <v-row justify="center" no-gutters>
                                                <v-col cols="11">
                                                    <v-divider />
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters
                                                ><v-col>
                                                    <v-card-title
                                                        style="font-size: 18px"
                                                    >
                                                        Aggiungi gli alimenti
                                                        consumati</v-card-title
                                                    ></v-col
                                                ></v-row
                                            >

                                            <v-row justify="center">
                                                <v-col cols="11">
                                                    <v-layout class="mb-9">
                                                        <v-flex>
                                                            <v-row
                                                                v-for="(
                                                                    food, index
                                                                ) in meal.recommendedFoodDetails"
                                                                :key="index"
                                                                align="start"
                                                            >
                                                                <v-col
                                                                    lg="1"
                                                                    cols="2"
                                                                >
                                                                    <v-icon
                                                                        class="
                                                                            btn-add-food
                                                                        "
                                                                        @click="
                                                                            addFoodItem(
                                                                                food
                                                                            )
                                                                        "
                                                                        size="18"
                                                                        color="black"
                                                                        >mdi-plus-circle-outline</v-icon
                                                                    >
                                                                </v-col>
                                                                <v-col
                                                                    lg="11"
                                                                    cols="10"
                                                                >
                                                                    <p
                                                                        style="
                                                                            font-family: Rubik-Light;
                                                                            font-size: 16px;
                                                                        "
                                                                    >
                                                                        {{
                                                                            food.name
                                                                        }}
                                                                    </p>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row>
                                                                <v-col>
                                                                    <v-autocomplete
                                                                        id="search-food-txt"
                                                                        @change="
                                                                            itemClicked
                                                                        "
                                                                        v-model="
                                                                            autoCompleteItem
                                                                        "
                                                                        @update:search-input="
                                                                            onInputUpdate
                                                                        "
                                                                        :filter="
                                                                            customFilter
                                                                        "
                                                                        prepend-inner-icon="mdi-magnify"
                                                                        auto-select-first
                                                                        clearable
                                                                        solo
                                                                        :items="
                                                                            foodNameList
                                                                        "
                                                                        item-text="name"
                                                                        label="Cerca alimento"
                                                                        style="
                                                                            font-family: Rubik-Regular;
                                                                            font-size: 14px;
                                                                        "
                                                                    ></v-autocomplete>
                                                                </v-col>
                                                            </v-row>
                                                        </v-flex>
                                                    </v-layout> </v-col
                                            ></v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col lg="6" cols="12" md="6">
                                        <v-card
                                            v-if="foodCollection"
                                            height="100%"
                                            :disabled="
                                                localSkippedStatus ||
                                                foodItems.length == 0
                                            "
                                            class="rounded-xl"
                                            elevation="0"
                                            outlined
                                        >
                                            <v-card-title
                                                style="font-size: 18px"
                                                >Pasto consumato</v-card-title
                                            >

                                            <v-container fluid>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                v-show="
                                                                    foodItems.length ==
                                                                    0
                                                                "
                                                            >
                                                                Ancora nessun
                                                                pasto aggiunto
                                                            </td>
                                                        </tr>
                                                        <tr
                                                            v-for="(
                                                                food, idx
                                                            ) in foodItems"
                                                            v-bind:key="idx"
                                                        >
                                                            <div
                                                                class="
                                                                    pa-2
                                                                    ma-2
                                                                    tr-container-with-border
                                                                "
                                                            >
                                                                <td
                                                                    style="
                                                                        font-family: Rubik-Regular;
                                                                    "
                                                                    class="
                                                                        custom-left
                                                                    "
                                                                >
                                                                    {{
                                                                        food.name
                                                                    }}
                                                                </td>

                                                                <td
                                                                    style="
                                                                        font-family: Rubik-Regular;
                                                                    "
                                                                    class="
                                                                        date
                                                                        grey--text
                                                                    "
                                                                >
                                                                    {{
                                                                        food.custom_calories
                                                                    }}&nbsp;kcal
                                                                </td>
                                                                <td
                                                                    class="
                                                                        edit
                                                                        custom-right
                                                                    "
                                                                >
                                                                    <v-icon
                                                                        class="
                                                                            btn-edit-food
                                                                        "
                                                                        v-show="
                                                                            !food.disableEdit
                                                                        "
                                                                        @click="
                                                                            editFood(
                                                                                idx
                                                                            )
                                                                        "
                                                                        >mdi-pencil</v-icon
                                                                    >
                                                                </td>
                                                            </div>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <v-footer
                                                                    class="
                                                                        rounded-xl
                                                                    "
                                                                    absolute
                                                                    color="white"
                                                                >
                                                                    <v-sheet>
                                                                        <div
                                                                            style="
                                                                                font-family: Rubik-Regular;
                                                                                font-size: 10px;
                                                                                letter-spacing: 1.5px;
                                                                                color: #878787;
                                                                            "
                                                                            class="
                                                                                mb-2
                                                                                ml-2
                                                                            "
                                                                        >
                                                                            {{
                                                                                consumedCalories
                                                                            }}
                                                                            KCAL
                                                                            CONSUMATE
                                                                        </div>
                                                                        <div
                                                                            style="
                                                                                font-family: Rubik-Regular;
                                                                                font-size: 10px;
                                                                                letter-spacing: 1.5px;
                                                                            "
                                                                            class="
                                                                                black--text
                                                                                mb-2
                                                                                ml-2
                                                                            "
                                                                        >
                                                                            {{
                                                                                recommendedCalories
                                                                            }}
                                                                            KCAL
                                                                            RACCOMANDATE
                                                                        </div>
                                                                    </v-sheet>
                                                                </v-footer>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </v-container>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col lg="10" cols="3"> </v-col>
                                    <v-col lg="2" cols="9">
                                        <v-btn
                                            @click="saveFoodTable"
                                            :disabled="disableBottomSaveButton"
                                            color="primary"
                                        >
                                            SALVA
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-dialog
                                            v-if="selectedFood"
                                            v-model="dialog"
                                            persistent
                                            max-width="600px"
                                        >
                                            <v-card>
                                                <v-card-title
                                                    v-if="selectedFood"
                                                >
                                                    Inserisci la quantita di:
                                                    {{ selectedFood.name }}
                                                </v-card-title>
                                                <v-container>
                                                    <v-row
                                                        class="pl-4"
                                                        justify="start"
                                                    >
                                                        <v-col cols="10">
                                                            <v-select
                                                                @change="
                                                                    onQuantityChange
                                                                "
                                                                v-model="
                                                                    quantityType
                                                                "
                                                                prepend-inner-icon="mdi-clock-time-four-outline"
                                                                outlined
                                                                :items="
                                                                    quantityItems
                                                                "
                                                                item-text="text_it"
                                                                item-value="val"
                                                                label="Quantita"
                                                                required
                                                            ></v-select>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row
                                                        no-gutters
                                                        class="pl-4"
                                                        justify="start"
                                                    >
                                                        <v-col cols="10">
                                                            <v-text-field
                                                                autofocus
                                                                @keydown.prevent="
                                                                    preventWrongInput
                                                                "
                                                                v-show="
                                                                    showGrams
                                                                "
                                                                type="text"
                                                                :rules="
                                                                    gramRule
                                                                "
                                                                v-model="
                                                                    quantityGrams
                                                                "
                                                                outlined
                                                                label="Inserire quantita in grammi"
                                                                required
                                                            >
                                                            </v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters>
                                                        <v-col>
                                                            <v-card-subtitle
                                                                v-show="
                                                                    this
                                                                        .quantityType
                                                                "
                                                                >Porzione
                                                                {{
                                                                    this
                                                                        .quantityType
                                                                }}:
                                                                {{
                                                                    selectedFood.custom_grams
                                                                }}
                                                                grammi ({{
                                                                    selectedFood.custom_desc_number
                                                                }}
                                                                {{
                                                                    selectedFood.custom_desc_text
                                                                }})</v-card-subtitle
                                                            >
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                                <v-card-actions
                                                    v-if="selectedFood"
                                                >
                                                    <div
                                                        :v-show="!selectedFood"
                                                    >
                                                        <v-icon
                                                            class="
                                                                btn-delete-food
                                                            "
                                                            v-show="
                                                                selectedFood.showDelete
                                                            "
                                                            @click="
                                                                removeSelectedFood
                                                            "
                                                            color="orange"
                                                            >mdi-trash-can-outline
                                                        </v-icon>
                                                    </div>
                                                    <v-spacer />
                                                    <v-btn
                                                        color="grey darken-1"
                                                        text
                                                        @click="
                                                            closeQuantityDialog
                                                        "
                                                    >
                                                        CHIUDI
                                                    </v-btn>
                                                    <v-btn
                                                        :disabled="
                                                            disableSaveFoodButton
                                                        "
                                                        @click="saveFood"
                                                        color="primary"
                                                        text
                                                    >
                                                        SALVA
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-flex>
                    </v-card>
                </v-col>
            </v-row>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters({ meal: 'moduleDiary/getDiaryMeal' }),
        ...mapGetters({ eatenFoods: 'moduleDiary/getDiaryMealEatenFoods' }),
        ...mapGetters({
            recommendedCalories:
                'moduleDiary/getDiaryOverviewRecommendedCalories',
        }),
        ...mapGetters({
            skippedStatus: 'moduleDiary/getDiaryMealSkippedStatus',
        }),
        localSkippedStatus: {
            get: function () {
                if (this.mSkipStatus === null) {
                    return this.skippedStatus;
                } else {
                    return this.mSkipStatus;
                }
            },
            set: function (newValue) {
                this.mSkipStatus = newValue;
            },
        },
        foodCollection: function () {
            let foodCollection = [];
            let eatenFoods = this.eatenFoods;

            if (eatenFoods)
                eatenFoods.forEach(async (elm) => {
                    try {
                        let result = await this.$store
                            .dispatch('moduleDiary/getFoodById', elm.id)
                            .catch((err) => console.log(err));

                        let index = this.foodItems.findIndex(
                            (elem) => elem.foodId === elm.id
                        );
                        // if eatenFoods change by saving or loading UI for first time, and UI wants to update the table and add the foods
                        // check if the food does not already exist in table.
                        if (index === -1) {
                            let food = result.data;

                            // custom properties
                            food.showDelete = true;
                            food.quantityType = null;
                            food.custom_grams = parseFloat(elm.grams);
                            food.custom_calories = elm.kcal;

                            foodCollection.push(food);
                            this.foodItems.push(food);
                        }
                    } catch (error) {
                        console.log('CompileMealForm Error => ' + error);
                    }
                });
            return foodCollection;
        },
        showGrams: function () {
            //console.log(this.quantityType);
            if (this.quantityType === 'grammi') return true;
            return false;
        },
        gramRule: function () {
            let rules = [];
            if (this.quantityGrams) {
                if (Number.isNaN(Number.parseFloat(this.quantityGrams)))
                    rules['Not a valid number'] = true;
            }
            const mRules = Object.keys(rules);
            return mRules;
        },
        timeRuleFunc() {
            return [
                (v) => {
                    if (v) return true;
                    // if (v.indexOf('00:00') > -1) {
                    //     //You can disable save button here if you want;
                    //     return 'Time is not valid';
                    // } else {
                    //     return true;
                    // }
                    return 'Time can not be empty';
                },
            ];
        },
        disableSaveFoodButton: function () {
            if (!this.quantityType) return true;
            else if (
                this.quantityType === 'grammi' &&
                (this.quantityGrams === null ||
                    this.quantityGrams === '' ||
                    this.gramRule.length !== 0)
            ) {
                return true;
            } else return false;
        },
        consumedCalories: function () {
            let sum = 0;

            this.foodItems.forEach((elem) => {
                // console.log(elem);
                sum += parseInt(elem['custom_calories']);
            });
            return sum;
        },
        ...mapGetters({ navigationModel: 'moduleNav/getNavigationObject' }),
        timeOfMeal: {
            get: function () {
                let myVar = this.meal.time;
                if (!this.mTimeOfMeal) return myVar;
                return this.mTimeOfMeal;
            },
            set: function (newValue) {
                this.mTimeOfMeal = newValue;
            },
        },
        disableBottomSaveButton: function () {
            if (this.MarkOfChange === true) {
                if (this.mSkipStatus) {
                    this.$store.dispatch('moduleNav/setNavWarning', true);
                    return false;
                } else {
                    if (this.timeOfMeal != null) {
                        this.$store.dispatch('moduleNav/setNavWarning', true);
                        return false;
                    } else {
                        this.$store.dispatch('moduleNav/setNavWarning', false);
                        return true;
                    }
                }
            }
            this.$store.dispatch('moduleNav/setNavWarning', false);
            return true;
        },
    },
    data() {
        return {
            MarkOfChange: false,
            switch1: false,
            menu: false,
            foodItems: [],
            flag: false,

            foodNameList: [],
            quantityItems: [
                {
                    text_it: 'Porzione piccola',
                    val: 'piccola',
                },
                {
                    text_it: 'Porzione media',
                    val: 'media',
                },
                {
                    text_it: 'Porzione grande',
                    val: 'grande',
                },
                {
                    text_it: 'Grammi',
                    val: 'grammi',
                },
            ],
            quantityType: '',
            quantityGrams: null,
            quantityTypeTemp: '',
            quantityGramsTemp: null,
            dialog: false,
            selectedFood: null,
            selectedFoodCustomCalories: null,

            autoCompleteItem: null,
            timerId: null,
            editFoodStatus: false,
            mSkipStatus: null,
            mTimeOfMeal: null,
        };
    },
    methods: {
        onQuantityChange() {
            this.quantityGrams = null;

            this.selectedFoodCustomCalories =
                this.selectedFood['custom_calories'];
            this.calculateCustomCalories();
        },
        calculateCustomCalories() {
            let grams = this.selectedFood.portion.grams;
            let descriptionNumber = this.selectedFood.portionDescription.substr(
                0,
                this.selectedFood.portionDescription.indexOf(' ')
            );
            if (descriptionNumber === '') {
                descriptionNumber = '1';
            }

            let descriptiontext = this.selectedFood.portionDescription.substr(
                this.selectedFood.portionDescription.indexOf(' ') + 1
            );
            let calories =
                this.selectedFood.moleculeDistribution.calories.calories;

            //HERE
            //console.log(this.quantityType);

            switch (this.quantityType) {
                case 'piccola':
                    grams = parseFloat(grams) / 2;
                    descriptionNumber += '/2';
                    calories = parseFloat(calories) / 2;
                    break;
                case 'media':
                    break;

                case 'grande':
                    grams = parseFloat(grams) * 1.5;
                    descriptionNumber += '+ 1/2';
                    calories = parseFloat(calories) * 1.5;
                    break;
                case 'grammi':
                    // since we do not have the grams, onQuantityChange event, because the user has not inserted it yet
                    // we calculate only calories based on portion size, when the user press the save button
                    // in saveFood method we calculate custom_calories for grammi quantityType
                    calories = this.selectedFood['custom_calories'];
                    break;
            }
            this.selectedFood['custom_grams'] = grams;
            this.selectedFood['custom_desc_number'] = descriptionNumber;
            this.selectedFood['custom_desc_text'] = descriptiontext;
            this.selectedFood['custom_calories'] =
                parseFloat(calories).toFixed();
        },
        addFoodItem: function (food) {
            let found = this.foodItems.findIndex((elem) => {
                return elem.foodId === food.foodId;
            });
            if (found !== -1) {
                alert('already exists');
                return;
            }

            this.quantityType = '';
            this.quantityGrams = '';
            this.selectedFood = food;
            this.selectedFood['showDelete'] = false;
            this.editFoodStatus = false;
            this.dialog = true;
        },
        customFilter(item, queryText) {
            let text;
            if (item) {
                text = item.toLowerCase();
                return text.indexOf(queryText.toLowerCase()) > -1;
            }
            return false;
        },
        editFood(idx) {
            this.selectedFood = this.foodItems[idx];
            this.quantityType = this.selectedFood['quantityType'];
            this.quantityGrams = this.selectedFood['grams'];
            this.quantityGramsTemp = this.quantityGrams;
            this.quantityTypeTemp = this.quantityType;
            this.editFoodStatus = true;
            this.dialog = true;
        },
        saveFood() {
            if (this.editFoodStatus === true) {
                let foodId = this.selectedFood.foodId;

                let index = this.foodItems.findIndex((elem) => {
                    return elem.foodId === foodId;
                });

                let result = this.foodItems[index];

                if (this.selectedFood['quantityType'] !== this.quantityType) {
                    this.MarkOfChange = true;
                }
                if (this.quantityGrams != null) {
                    if (this.quantityGrams != this.selectedFood['grams']) {
                        this.MarkOfChange = true;
                    }
                }

                result.quantityType = this.quantityType;
                result.grams = this.quantityGrams;

                if (this.quantityType === 'grammi') {
                    let origGrams = this.selectedFood.portion.grams;
                    let origCalories = parseFloat(
                        this.selectedFood.moleculeDistribution.calories.calories
                    );

                    let ratio =
                        parseFloat(this.quantityGrams) / parseFloat(origGrams);
                    let calories = origCalories * ratio;
                    result.custom_calories = calories.toFixed();
                } else {
                    result.custom_calories = this.selectedFood.custom_calories;
                }
                this.foodItems.splice(index, 1, result);
            } else {
                // console.log(this.selectedFood);
                let obj = this.selectedFood;
                // obj.foodId = this.selectedFood.foodId;
                // obj.name = this.selectedFood.name;
                obj.quantityType = this.quantityType;
                obj.grams = parseFloat(this.quantityGrams);
                obj.showDelete = true;

                if (this.quantityType === 'grammi') {
                    let origGrams = this.selectedFood.portion.grams;
                    let origCalories = parseFloat(
                        this.selectedFood.moleculeDistribution.calories.calories
                    );

                    let ratio = obj.grams / parseFloat(origGrams);
                    let calories = origCalories * ratio;
                    obj.custom_calories = calories.toFixed();
                } else {
                    let calories = parseFloat(
                        this.selectedFood.custom_calories
                    ).toFixed();
                    obj.custom_calories = calories;
                }

                this.foodItems.push(obj);
                this.MarkOfChange = true;
            }
            this.dialog = false;
            this.selectedFood = null;
            this.quantityType = '';
            this.quantityGrams = '';
            this.autoCompleteItem = null;
        },
        saveFoodTable() {
            if (this.timeOfMeal === null) {
                //this.timeOfMeal = '00:00';
                alert('time is null');
                return;
            }

            let dateAndMealObject = {
                mealName: this.meal.mealName,
                date: this.meal.mealDate,
                foodCollection: [],
                skipped: false,
                time: this.mTimeOfMeal || this.timeOfMeal,
            };

            if (!this.mSkipStatus) {
                this.foodItems.forEach((elm) => {
                    let item = {};
                    item.id = elm.foodId;
                    item.name = elm.name;
                    item.grams = elm.custom_grams;
                    item.kcal = Number(elm.custom_calories);
                    dateAndMealObject.foodCollection.push(item);
                });
            } else {
                dateAndMealObject.skipped = true;
            }

            this.$store
                .dispatch(
                    'moduleDiary/addConsumedFoodToDiaryMeal',
                    dateAndMealObject
                )
                .catch((err) => console.log(err));

            this.MarkOfChange = false;
            // go back to diaryprime
            let navObject = new Object({
                childView: 'diaryprime',
                parentView: '/home',
                pageTitle: 'Compila il diario',
                snackAlert: true,
            });
            this.$store.dispatch('moduleNav/setCurrentPage', navObject);

            this.$router.push('/home/diary');
        },
        removeSelectedFood() {
            let selected = this.selectedFood;

            let index = this.foodItems.findIndex((element) => {
                return element.name == selected.name;
            });

            this.selectedFood = null;
            this.dialog = false;
            this.foodItems.splice(index, 1);

            // check to see if an item exists in foodItems (items which are not saved to state)
            // which does not exist in foodCollection (items already saved to state)
            const results = this.foodItems.filter(
                ({ foodId: id1 }) =>
                    !this.foodCollection.some(({ foodId: id2 }) => id2 === id1)
            );
            console.log(JSON.stringify(results));
            if (results.length !== 0) this.MarkOfChange = true;
            else if (this.foodCollection.length != this.foodItems.length)
                this.MarkOfChange = true;
            else this.MarkOfChange = false;
        },
        preventWrongInput($event) {
            var charCode = $event.which ? $event.which : $event.keyCode;
            var eventCode = $event.code;

            //first character must be a number
            if (!this.quantityGrams) {
                if (charCode > 48 && charCode < 58) {
                    let strGram = String.fromCharCode(charCode);
                    this.quantityGrams = parseFloat(strGram);
                }
            } else {
                //handling backspace character
                if (charCode === 8) {
                    let str = this.quantityGrams.toString();
                    if (str.length === 1) {
                        this.quantityGrams = '';
                        this.flag = false;
                    } else if (str[str.length - 1] === '.') {
                        //console.log(str[str.length - 1]);
                        this.flag = false;
                        str = str.slice(0, -1);
                        //console.log(str);
                        this.quantityGrams = parseFloat(str);
                    } else {
                        str = str.slice(0, -1);
                        this.quantityGrams = parseFloat(str);
                        if (this.quantityGrams.toString().indexOf('.') > -1)
                            this.flag = true;
                        else this.flag = false;
                    }
                } else if (this.quantityGrams.toString().length < 5) {
                    //check for first period
                    if (eventCode === 'Period' && this.flag === false) {
                        //console.log('got period');
                        this.quantityGrams += '.';
                        this.flag = true;
                    }
                    // if period already exists, do not allow another period
                    else if (this.flag === true && eventCode === 'Period') {
                        //console.log('You shall not pass');
                    }
                    // if length is less than 5 and not zero and it is not a period and it is a number add it
                    else if (charCode > 47 && charCode < 58)
                        this.quantityGrams += String.fromCharCode(charCode);
                }
            }
        },
        async onInputUpdate(arg) {
            let _this = this;

            async function delayFuncExec() {
                let query = arg;

                try {
                    await _this.$store.dispatch(
                        'moduleDiary/getFoodSearchResults',
                        query
                    );
                    let names = [];
                    let resultObject =
                        _this.$store.getters[
                            'moduleDiary/getFoodSearchResults'
                        ];
                    if (resultObject && resultObject.results)
                        resultObject.results.map((element) => {
                            names.push(element.name);
                        });
                    _this.foodNameList = names;
                } catch (e) {
                    console.log('CompileMealForm Error: ' + e);
                }
            }

            if (this.timerId) {
                clearInterval(this.timerId);
            }
            if (arg && arg !== '')
                this.timerId = setTimeout(delayFuncExec, 800);
            else this.foodNameList = [];
        },
        itemClicked(arg) {
            let foodSaerch =
                this.$store.getters['moduleDiary/getFoodSearchResults'];

            let searchResult = foodSaerch.results.find((element) => {
                return element.name.toLowerCase() === arg.toLowerCase();
            });

            if (searchResult !== undefined)
                if (searchResult.length !== 0) this.addFoodItem(searchResult);
        },
        closeQuantityDialog() {
            this.quantityGrams = this.quantityGramsTemp;
            this.quantityType = this.quantityTypeTemp;
            if (this.selectedFoodCustomCalories)
                this.selectedFood['custom_calories'] =
                    this.selectedFoodCustomCalories;
            this.autoCompleteItem = null;
            this.dialog = false;
        },
        changeState(arg) {
            this.MarkOfChange = (arg ^ this.skippedStatus) === 1 ? true : false;
        },
    },
};
</script>

<style>
.container-with-border {
    border: 1px solid rgb(224, 224, 233);
    border-radius: 25px;
    padding: 20px;
    padding-left: 20px;
}
table {
    width: 100%;
    display: inline-block;
    overflow: auto;
}
tbody {
    display: block;
    height: 280px;
    overflow: auto;
}

td {
    text-align: left;
    padding: 0px;
}
.custom-left {
    width: 180px;

    text-align: left;
}

.custom-right {
    width: 180px;

    text-align: right;
}

td.date {
    width: 150px;

    text-align: right;
}

.tr-container-with-border {
    border: 1px solid rgb(224, 224, 233);
    border-radius: 6px;
}
</style>
