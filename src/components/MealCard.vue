<template>
    <v-card
        :outlined="cardElevation === '0'"
        :elevation="cardElevation"
        v-ripple="cardElevation !== '0'"
        hover
        v-on="clickable ? { click: () => clickHandler(cardIndex) } : {}"
        :height="cardHeight"
        class="mx-auto rounded-xl meal-card"
    >
        <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
        </template>

        <v-img
            :style="fade ? 'opacity:0.6;' : ''"
            :lazy-src="lazyImage"
            :src="cardImage"
        ></v-img>

        <v-card-title
            :style="fade ? 'opacity:0.6;' : ''"
            style="font-size: 18px"
            class="primary--text"
            >{{ cardTitle }}</v-card-title
        >
        <v-card-subtitle
            style="font-family: 'Rubik-Regular'; font-size: 12px"
            :style="fade ? 'opacity:0.6' : ''"
            class="grey--text"
            >{{ cardSubTitle }}</v-card-subtitle
        >

        <div class="food-tbl mt-n8" v-show="foodItems" style="overflow-x: auto">
            <!--
            in case we want to use flex box
            <v-flex class="pt-8 ml-4">
                <v-row v-for="(food, idx) in foodItems" v-bind:key="idx">
                    <v-col cols="8">
                        {{ food.name }}
                    </v-col>
                    <v-col cols="4"> {{ food.grams }}&nbsp;&nbsp;gr </v-col>
                </v-row>
            </v-flex>
            !-->
            <table>
                <tr v-for="(food, idx) in foodItems" v-bind:key="idx">
                    <td style="font-family: Rubik-Light; font-size: 16px">
                        {{ food.name }}
                    </td>
                    <td
                        style="
                            font-family: Rubik-Regular;
                            font-size: 16px;
                            color: #878787;
                        "
                        class="custom"
                    >
                        {{ food.grams }}&nbsp;&nbsp;gr
                    </td>
                </tr>
            </table>
        </div>

        <div
            style="
                font-family: Rubik-Regular;
                font-size: 10px;
                letter-spacing: 1.5px;
            "
            :class="fade ? 'orange--text' : 'black--text'"
            v-show="hasCompile"
            class="text-center card-status"
        >
            {{ compileStatus }}
        </div>
        <v-card-actions></v-card-actions>
    </v-card>
</template>
<script>
export default {
    props: {
        clickable: Boolean,
        cardHeight: null,
        cardTitle: null,
        cardSubTitle: null,
        cardImage: null,
        lazyImage: null,
        foodItems: [],
        hasCompile: null,
        compileStatus: null,
        cardIndex: null,
        fade: null,
        cardElevation: null,
    },
    data: () => ({}),

    methods: {
        clickHandler: function (e) {
            this.$emit('onMealCardClick', e);
        },
    },
};
</script>
<style scoped>
table {
    padding-top: 20px;
    width: 100%;
}

td {
    width: 190px;
    text-align: left;
    padding: 14px;
}
.custom {
    width: 70px;
    text-align: right;
    padding-right: 0px;
}
</style>
