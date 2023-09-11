<template>
    <v-container fluid>
        <v-layout>
            <v-flex xs12 lg12 md12>
                <v-row justify="center">
                    <v-col class="mt-6" cols="12" sm="10" lg="10">
                        <NavBox
                            @onBackButtonPress="$emit('onBackButtonPress')"
                        />
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="12" sm="10" lg="10">
                        <v-layout justify-center>
                            <v-flex xs12>
                                <v-row>
                                    <v-col lg="12">
                                        <v-card
                                            elevation="0"
                                            class="rounded-xl pa-6"
                                        >
                                            <v-flex xs12 sm12 md12>
                                                <v-row
                                                    no-gutters
                                                    class="pa-0"
                                                    v-if="
                                                        weightItems.length === 3
                                                    "
                                                >
                                                    <v-col
                                                        v-for="i in weightItems.length"
                                                        :key="i"
                                                        cols="12"
                                                        sm="4"
                                                        md="4"
                                                        ><ChipProgress
                                                            :chipTitle="
                                                                weightItems[
                                                                    i - 1
                                                                ].cardTitle
                                                            "
                                                            :chipSubtitle="
                                                                weightItems[
                                                                    i - 1
                                                                ].day
                                                            "
                                                            :chipContent="
                                                                weightItems[
                                                                    i - 1
                                                                ].weight
                                                            "
                                                            :chipContentSubtitle="
                                                                weightItems[
                                                                    i - 1
                                                                ].cardSubtitle
                                                            "
                                                    /></v-col>
                                                </v-row>
                                                <v-row
                                                    class="mt-5"
                                                    justify="center"
                                                >
                                                    <v-col cols="12">
                                                        <v-divider />
                                                    </v-col>
                                                </v-row>
                                                <v-row
                                                    class=""
                                                    justify="center"
                                                >
                                                    <v-col cols="12">
                                                        <v-container>
                                                            <v-card
                                                                height="460"
                                                                v-if="
                                                                    weights.length !=
                                                                    0
                                                                "
                                                                outlined
                                                                class="
                                                                    mx-auto
                                                                    text-center
                                                                    rounded-xl
                                                                    pa-1
                                                                "
                                                                light
                                                            >
                                                                <v-card-title
                                                                    style="
                                                                        font-size: 18px;
                                                                    "
                                                                    >Andamento
                                                                    del
                                                                    peso</v-card-title
                                                                >
                                                                <v-card-subtitle
                                                                    style="
                                                                        font-size: 14px;
                                                                    "
                                                                    class="
                                                                        text-left
                                                                    "
                                                                    >Espresso in
                                                                    chilogrammi</v-card-subtitle
                                                                >
                                                                <apexchart
                                                                    class="
                                                                        hidden-sm-and-up
                                                                    "
                                                                    height="300"
                                                                    type="area"
                                                                    :options="
                                                                        chartOptions
                                                                    "
                                                                    :series="
                                                                        series
                                                                    "
                                                                ></apexchart>
                                                                <apexchart
                                                                    class="
                                                                        hidden-xs-only
                                                                    "
                                                                    height="300"
                                                                    type="area"
                                                                    :options="
                                                                        chartOptions
                                                                    "
                                                                    :series="
                                                                        series
                                                                    "
                                                                ></apexchart>
                                                            </v-card>
                                                        </v-container>
                                                    </v-col>
                                                </v-row>
                                                <v-row
                                                    class="mt-5"
                                                    justify="center"
                                                >
                                                    <v-col cols="12">
                                                        <v-divider />
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col
                                                        cols="12"
                                                        class="pa-5"
                                                    >
                                                        <v-card
                                                            v-if="
                                                                weights.length !=
                                                                0
                                                            "
                                                            outlined
                                                            class="
                                                                mx-auto
                                                                text-center
                                                                rounded-xl
                                                                pa-1
                                                            "
                                                            light
                                                        >
                                                            <v-card-title
                                                                style="
                                                                    font-size: 18px;
                                                                "
                                                                >Andamento della
                                                                dieta
                                                            </v-card-title>
                                                            <v-container
                                                                class="pl-4"
                                                            >
                                                                <v-row
                                                                    no-gutters
                                                                    align="center"
                                                                    justify="start"
                                                                >
                                                                    <v-col
                                                                        cols="12"
                                                                        sm="5"
                                                                        md="5"
                                                                    >
                                                                        <v-menu
                                                                            ref="menuCal1"
                                                                            v-model="
                                                                                menuCal1
                                                                            "
                                                                            :close-on-content-click="
                                                                                false
                                                                            "
                                                                            transition="scale-transition"
                                                                            offset-y
                                                                            min-width="190"
                                                                        >
                                                                            <template
                                                                                v-slot:activator="{
                                                                                    on,
                                                                                    attrs,
                                                                                }"
                                                                            >
                                                                                <v-text-field
                                                                                    v-model="
                                                                                        date1
                                                                                    "
                                                                                    outlined
                                                                                    label="Data d'inizio"
                                                                                    readonly
                                                                                    v-bind="
                                                                                        attrs
                                                                                    "
                                                                                    v-on="
                                                                                        on
                                                                                    "
                                                                                ></v-text-field>
                                                                            </template>
                                                                            <v-date-picker
                                                                                v-model="
                                                                                    date1
                                                                                "
                                                                                :max="
                                                                                    new Date(
                                                                                        Date.now() -
                                                                                            new Date().getTimezoneOffset() *
                                                                                                60000
                                                                                    )
                                                                                        .toISOString()
                                                                                        .substr(
                                                                                            0,
                                                                                            10
                                                                                        )
                                                                                "
                                                                                min="1950-01-01"
                                                                                @change="
                                                                                    save1
                                                                                "
                                                                            ></v-date-picker>
                                                                        </v-menu>
                                                                    </v-col>
                                                                    <v-col
                                                                        cols="1"
                                                                    >
                                                                        <div
                                                                            class="
                                                                                mb-6
                                                                            "
                                                                        >
                                                                            a
                                                                        </div>
                                                                    </v-col>
                                                                    <v-col
                                                                        cols="12"
                                                                        sm="5"
                                                                        md="5"
                                                                    >
                                                                        <v-menu
                                                                            ref="menuCal2"
                                                                            v-model="
                                                                                menuCal2
                                                                            "
                                                                            :close-on-content-click="
                                                                                false
                                                                            "
                                                                            transition="scale-transition"
                                                                            offset-y
                                                                            min-width="190"
                                                                        >
                                                                            <template
                                                                                v-slot:activator="{
                                                                                    on,
                                                                                    attrs,
                                                                                }"
                                                                            >
                                                                                <v-text-field
                                                                                    :disabled="
                                                                                        date2Disabled
                                                                                    "
                                                                                    v-model="
                                                                                        dateFinalText
                                                                                    "
                                                                                    outlined
                                                                                    label="Data di fine"
                                                                                    readonly
                                                                                    v-bind="
                                                                                        attrs
                                                                                    "
                                                                                    v-on="
                                                                                        on
                                                                                    "
                                                                                ></v-text-field>
                                                                            </template>
                                                                            <v-date-picker
                                                                                range
                                                                                v-model="
                                                                                    date2
                                                                                "
                                                                                :max="
                                                                                    new Date(
                                                                                        Date.now() -
                                                                                            new Date().getTimezoneOffset() *
                                                                                                60000
                                                                                    )
                                                                                        .toISOString()
                                                                                        .substr(
                                                                                            0,
                                                                                            10
                                                                                        )
                                                                                "
                                                                                :min="
                                                                                    minDate
                                                                                "
                                                                                @change="
                                                                                    save2
                                                                                "
                                                                            ></v-date-picker>
                                                                        </v-menu>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row
                                                                    no-gutters
                                                                    ><v-col>
                                                                        <div
                                                                            class="
                                                                                small
                                                                            "
                                                                        >
                                                                            <BarChart
                                                                                :myData="
                                                                                    dataCollection
                                                                                "
                                                                                :options="
                                                                                    barChartOptions
                                                                                "
                                                                            ></BarChart>
                                                                        </div>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row>
                                                                    <v-col>
                                                                        <ul
                                                                            class="
                                                                                legend
                                                                            "
                                                                        >
                                                                            <li>
                                                                                <span
                                                                                    class="
                                                                                        legend1
                                                                                    "
                                                                                ></span>
                                                                                Obiettivo
                                                                            </li>
                                                                            <li>
                                                                                <span
                                                                                    class="
                                                                                        legend2
                                                                                    "
                                                                                ></span>
                                                                                Importo
                                                                                registrato
                                                                                sbagliato
                                                                            </li>
                                                                            <li>
                                                                                <span
                                                                                    class="
                                                                                        legend3
                                                                                    "
                                                                                ></span>
                                                                                Importo
                                                                                registrato
                                                                                corretto
                                                                            </li>
                                                                            <li>
                                                                                <span
                                                                                    class="
                                                                                        legend4
                                                                                    "
                                                                                ></span>
                                                                                Importo
                                                                                registrato
                                                                                migliorabile
                                                                            </li>
                                                                        </ul>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-container>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-flex>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-flex>
                        </v-layout>
                    </v-col>
                </v-row>
            </v-flex></v-layout
        ></v-container
    >
</template>

<script>
import { mapGetters } from 'vuex';
import ChipProgress from './ChipProgress.vue';
import NavBox from './NavBox.vue';
import BarChart from './BarChart';

export default {
    watch: {
        date1: function () {
            if (!this.date1) this.date2Disabled = true;
            else this.date2Disabled = false;
        },
    },
    created() {
        this.$store.dispatch('moduleWeight/getWeights');
    },
    computed: {
        ...mapGetters({ weights: 'moduleWeight/getWeights' }),
        ...mapGetters({
            recommendedArray: 'moduleProgress/getRecommendedValues',
        }),
        ...mapGetters({ patientArray: 'moduleProgress/getEatenValues' }),
        weightItems: function () {
            let firstWeight = this.weights.filter((e) => {
                return Object.keys(e._links).length === 0;
            })[0];

            let weightCollection = this.weights;

            let today = new Date();
            let date =
                today.getFullYear() +
                '/' +
                (today.getMonth() + 1) +
                '/' +
                today.getDate();

            let primoTitle = 'Primo peso registrato';
            let ultimoTitle = 'Ultimo peso registrato';
            let variazioneTitle = 'Variazione peso';
            let sovrappesoSubTitle1 = '+ 10 KG SOVRAPPESO';
            let sovrappesoSubTitle2 = '- 0.4 KG OGNI 7 GIORNI';
            let sovrappesoSubTitle3 = '+ 7 KG SOVRAPPESO';

            let weightsArr = [];
            let weightObj = {};

            if (weightCollection.length === 1) {
                weightObj.cardTitle = primoTitle;
                weightObj.weight = firstWeight.weight / 1000;
                weightObj.day = firstWeight.day;
                weightObj.cardSubtitle = sovrappesoSubTitle1;
                weightsArr.push(weightObj);
                //
                weightObj = {};
                weightObj.cardTitle = ultimoTitle;
                weightObj.weight = firstWeight.weight / 1000;
                weightObj.day = firstWeight.day;
                weightObj.cardSubtitle = sovrappesoSubTitle3;
                weightsArr.push(weightObj);
                //
                weightObj = {};
                weightObj.cardTitle = variazioneTitle;
                weightObj.weight = 0;
                weightObj.day = date;
                weightObj.cardSubtitle = sovrappesoSubTitle2;
                weightsArr.push(weightObj);
            } else {
                weightObj.cardTitle = primoTitle;
                weightObj.weight = firstWeight.weight / 1000;
                weightObj.day = firstWeight.day;
                weightObj.cardSubtitle = sovrappesoSubTitle1;
                weightsArr.push(weightObj);
                //
                weightObj = {};
                weightObj.cardTitle = ultimoTitle;
                weightObj.weight =
                    weightCollection[weightCollection.length - 1].weight / 1000;
                weightObj.day =
                    weightCollection[weightCollection.length - 1].day;
                weightObj.cardSubtitle = sovrappesoSubTitle3;
                weightsArr.push(weightObj);
                //
                weightObj = {};
                weightObj.cardTitle = variazioneTitle;
                weightObj.weight =
                    Math.abs(
                        weightCollection[weightCollection.length - 1].weight -
                            firstWeight.weight
                    ) / 1000;

                weightObj.day = date;
                weightObj.cardSubtitle = sovrappesoSubTitle2;
                weightsArr.push(weightObj);
            }

            return weightsArr;
        },
        dateFinalText: function () {
            if (!this.date2) return this.date1;
            return this.date2[1];
        },
        minDate: function () {
            return this.date1;
        },

        series: function () {
            var serie = [
                {
                    name: '',
                    data: [],
                },
            ];
            if (this.weights)
                this.weights.map((item) => {
                    serie[0].data.push(item.weight / 1000);
                });

            return serie;
        },
        chartOptions: function () {
            let categoriesArray = [];

            if (this.weights)
                this.weights.map((item) => {
                    let date = new Date(item.day);
                    let mo = new Intl.DateTimeFormat('en', {
                        month: 'short',
                    }).format(date);
                    let da = new Intl.DateTimeFormat('en', {
                        day: '2-digit',
                    }).format(date);
                    categoriesArray.push(da + ' ' + mo);
                });

            let a = new Object({
                colors: ['#FF9800'],
                chart: {
                    type: 'area',
                    height: 350,
                    zoom: {
                        enabled: false,
                    },
                    toolbar: { show: false },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'straight',
                },

                title: {
                    text: '',
                    align: 'left',
                },
                subtitle: {
                    text: '',
                    align: 'left',
                },

                xaxis: {
                    categories: categoriesArray,
                },
                yaxis: {
                    opposite: false,
                    min: 40,
                    max: 100,
                    tickAmount: 12,
                },
                legend: {
                    horizontalAlign: 'left',
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 90, 100],
                    },
                },
            });
            return a;
        },
        dataCollection() {
            let red = 'red';
            let green = 'green';
            let yellow = 'yellow';

            var barColors = [];

            //Read the two arrays from API and put them in computed property
            let nutritionistRecommended = this.nut;
            let patientConsumed = this.pat;

            for (let i = 0; i < nutritionistRecommended.length; i++) {
                let nutritionistValue = nutritionistRecommended[i];
                let patientConsumedValue = patientConsumed[i];

                let difference = Math.abs(
                    patientConsumedValue - nutritionistValue
                );

                if (nutritionistValue === patientConsumedValue)
                    barColors.push(green);
                else if (difference <= 0.05 * nutritionistValue)
                    barColors.push(yellow);
                else barColors.push(red);
            }

            let a = new Object({
                labels: [
                    'Colazione',
                    'Spuntino del mattino',
                    'Pranzo',
                    'Spuntino del pomeriggio',
                    'Cena',
                ],
                datasets: [
                    {
                        categoryPercentage: 0.6,
                        barPercentage: 0.6,
                        label: [
                            'Nutritionist',
                            'Nutritionist',
                            'Nutritionist',
                            'Nutritionist',
                            'Nutritionist',
                        ],
                        backgroundColor: '#d8d8d8',
                        data: nutritionistRecommended,
                    },
                    {
                        categoryPercentage: 0.6,
                        barPercentage: 0.6,
                        label: [
                            'Consumed',
                            'Consumed',
                            'Consumed',
                            'Consumed',
                            'Consumed',
                        ],
                        backgroundColor: barColors,
                        data: patientConsumed,
                    },
                ],
            });
            return a;
        },
    },
    methods: {
        save1(date) {
            this.$refs.menuCal1.save(date);
            this.menuCal2 = true;
            this.date2 = [];
            this.date2.push(date);

            this.nut = [];
            this.pat = [];
        },
        async save2(date) {
            this.$refs.menuCal2.save(date);
            this.date2Disabled = true;
            if (this.date2) {
                if (this.date2[0] != this.date1) {
                    this.date1 = null;
                    this.date2 = [];
                    this.nut = [];
                    this.pat = [];
                }
            }

            if (this.date1 && this.date2[1]) {
                let obj = {};
                obj.beginDate = this.date1;
                obj.endDate = this.date2[1];

                await this.$store
                    .dispatch('moduleProgress/getProgress', obj)
                    .catch((err) => console.log(err));

                if (this.recommendedArray)
                    for (let i = 0; i < this.recommendedArray.length; i++) {
                        this.nut.splice(
                            i,
                            1,
                            (this.recommendedArray[i] * 100).toFixed(2)
                        );
                    }
                if (this.patientArray)
                    for (let i = 0; i < this.patientArray.length; i++) {
                        this.pat.splice(
                            i,
                            1,
                            (this.patientArray[i] * 100).toFixed(2)
                        );
                    }
            }
        },
    },
    data() {
        return {
            // nutritionist recommended values
            nut: [],
            // patient eaten values
            pat: [],
            range: {},
            dialog: false,
            date1: null,
            date2: null,
            date2Disabled: true,

            menuCal1: false,
            menuCal2: false,

            barChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            stacked: false,
                        },
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Importo calorico giornaliero',
                            },
                            stacked: false,
                            display: true,
                            ticks: {
                                suggestedMax: 50,
                                beginAtZero: true,
                            },
                        },
                    ],
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var dataset =
                                data.datasets[tooltipItem.datasetIndex];
                            var index = tooltipItem.index;
                            return (
                                dataset.label[index] +
                                ': ' +
                                dataset.data[index]
                            );
                        },
                    },
                },
            },
        };
    },
    props: {},
    components: {
        ChipProgress,
        NavBox,
        BarChart,
    },
};
</script>

<style scoped>
.small {
    min-width: 200px;
    margin: 0px auto;
}
/* basic positioning */
.legend {
    white-space: pre-wrap;

    list-style: none;
}
.legend li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.25px;
    text-align: left;
    float: left;
    margin-right: 10px;
}
.legend span {
    border-radius: 25px;
    float: left;
    width: 24px;
    height: 24px;
    margin: 0px;
}
.legend .legend1 {
    background-color: #d8d8d8;
}
.legend .legend2 {
    background: linear-gradient(rgba(176, 0, 32, 0.8), rgba(176, 0, 32, 0.4));
}
.legend .legend3 {
    background: linear-gradient(rgba(0, 176, 32, 0.8), rgba(0, 176, 32, 0.4));
}
.legend .legend4 {
    background: linear-gradient(rgba(0, 176, 32, 0.8), rgba(176, 0, 32, 0.4));
}
.legendText {
    vertical-align: middle;
    display: inline;
}
</style>
