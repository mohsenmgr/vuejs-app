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
                                            class="rounded-xl pa-4"
                                        >
                                            <v-card-title
                                                >Rituale della
                                                bilancia</v-card-title
                                            >
                                            <v-card-subtitle
                                                >Consigliato ogni lunedi sera
                                                prima di cena</v-card-subtitle
                                            >
                                            <v-flex xs12 sm12 md12>
                                                <v-row>
                                                    <v-col
                                                        class="ml-4"
                                                        cols="12"
                                                    >
                                                        <v-btn
                                                            color="primary"
                                                            dark
                                                            @click="openDialog"
                                                        >
                                                            REGISTRA UN PESO
                                                        </v-btn>
                                                        <v-dialog
                                                            v-model="dialog"
                                                            persistent
                                                            max-width="600px"
                                                        >
                                                            <v-card>
                                                                <v-card-title>
                                                                    {{
                                                                        editSelected
                                                                            ? 'Modifica'
                                                                            : 'Registra'
                                                                    }}
                                                                    un peso
                                                                </v-card-title>
                                                                <v-container>
                                                                    <v-row
                                                                        v-if="
                                                                            weightObject
                                                                        "
                                                                    >
                                                                        <v-col
                                                                            cols="12"
                                                                        >
                                                                            <v-menu
                                                                                ref="menuCal"
                                                                                v-model="
                                                                                    menuCal
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
                                                                                        :rules="
                                                                                            dateRule
                                                                                        "
                                                                                        outlined
                                                                                        v-model="
                                                                                            weightObject.date
                                                                                        "
                                                                                        label="Data"
                                                                                        prepend-inner-icon="mdi-calendar"
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
                                                                                    id="w-input-date"
                                                                                    v-model="
                                                                                        weightObject.date
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
                                                                                        save
                                                                                    "
                                                                                ></v-date-picker>
                                                                            </v-menu>
                                                                        </v-col>
                                                                        <v-col
                                                                            cols="12"
                                                                        >
                                                                            <v-select
                                                                                id="w-input-time"
                                                                                v-model="
                                                                                    weightObject.timeSelect
                                                                                "
                                                                                prepend-inner-icon="mdi-clock-time-four-outline"
                                                                                outlined
                                                                                :items="
                                                                                    selectItems
                                                                                "
                                                                                item-text="time_it"
                                                                                item-value="val"
                                                                                label="Orario"
                                                                                required
                                                                            ></v-select>
                                                                        </v-col>
                                                                        <v-col
                                                                            cols="12"
                                                                        >
                                                                            <v-text-field
                                                                                id="w-input-weight"
                                                                                @keydown.prevent="
                                                                                    preventWrongInput
                                                                                "
                                                                                v-model="
                                                                                    weightObject.weight
                                                                                "
                                                                                prepend-inner-icon="mdi-scale-bathroom"
                                                                                type="text"
                                                                                label="Peso"
                                                                                placeholder="Peso"
                                                                                outlined
                                                                                :rules="
                                                                                    weightRule
                                                                                "
                                                                            ></v-text-field>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-container>
                                                                <v-card-actions>
                                                                    <v-icon
                                                                        id="btn-delete"
                                                                        @click="
                                                                            deleteWeight
                                                                        "
                                                                        v-show="
                                                                            editSelected
                                                                        "
                                                                        color="orange"
                                                                        >mdi-trash-can-outline
                                                                    </v-icon>
                                                                    <v-spacer />
                                                                    <v-btn
                                                                        id="btn-close"
                                                                        color="grey darken-1"
                                                                        text
                                                                        @click="
                                                                            closeEdit
                                                                        "
                                                                    >
                                                                        CHIUDI
                                                                    </v-btn>
                                                                    <v-btn
                                                                        id="btn-save"
                                                                        :disabled="
                                                                            disableSave
                                                                        "
                                                                        color="primary"
                                                                        text
                                                                        @click="
                                                                            saveWeight
                                                                        "
                                                                    >
                                                                        SALVA
                                                                    </v-btn>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
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
                                                <v-row
                                                    class=""
                                                    justify="center"
                                                >
                                                    <v-col
                                                        cols="12"
                                                        class="d-flex"
                                                        lg="6"
                                                        sm="12"
                                                        md="6"
                                                    >
                                                        <v-container>
                                                            <v-card
                                                                v-if="
                                                                    weights.length !=
                                                                    0
                                                                "
                                                                :min-height="
                                                                    min_height
                                                                "
                                                                outlined
                                                                class="
                                                                    rounded-xl
                                                                "
                                                            >
                                                                <v-card-title>
                                                                    Pesi
                                                                    registrati
                                                                </v-card-title>
                                                                <v-container
                                                                    fluid
                                                                >
                                                                    <v-responsive
                                                                        class="
                                                                            overflow-y-auto
                                                                        "
                                                                        :max-height="
                                                                            min_height -
                                                                            140
                                                                        "
                                                                    >
                                                                        <table>
                                                                            <tr
                                                                                v-for="(
                                                                                    weight,
                                                                                    idx
                                                                                ) in weights"
                                                                                v-bind:key="
                                                                                    idx
                                                                                "
                                                                            >
                                                                                <div
                                                                                    class="
                                                                                        pa-2
                                                                                        ma-2
                                                                                        tr-container-with-border
                                                                                    "
                                                                                >
                                                                                    <td
                                                                                        class="
                                                                                            label-weight
                                                                                            font-weight-medium
                                                                                            custom-left
                                                                                        "
                                                                                    >
                                                                                        {{
                                                                                            weight.weight /
                                                                                            1000
                                                                                        }}&nbsp;&nbsp;kg
                                                                                    </td>

                                                                                    <td
                                                                                        class="
                                                                                            date
                                                                                            text--secondary
                                                                                        "
                                                                                    >
                                                                                        {{
                                                                                            weight.day
                                                                                        }}
                                                                                    </td>
                                                                                    <td
                                                                                        class="
                                                                                            edit
                                                                                            custom-right
                                                                                        "
                                                                                    >
                                                                                        <v-icon
                                                                                            class="
                                                                                                btn-edit
                                                                                            "
                                                                                            v-show="
                                                                                                !weight.disableEdit
                                                                                            "
                                                                                            @click="
                                                                                                editWeight(
                                                                                                    idx
                                                                                                )
                                                                                            "
                                                                                            >mdi-pencil</v-icon
                                                                                        >
                                                                                    </td>
                                                                                </div>
                                                                            </tr>
                                                                        </table>
                                                                    </v-responsive>
                                                                </v-container>
                                                            </v-card>
                                                        </v-container>
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        class="d-flex"
                                                        lg="6"
                                                        sm="12"
                                                        md="6"
                                                    >
                                                        <v-container>
                                                            <v-card
                                                                :height="
                                                                    min_height
                                                                "
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
                                                                    >Andamento
                                                                    del
                                                                    peso</v-card-title
                                                                >
                                                                <v-card-subtitle
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
                                            </v-flex>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-flex>
                        </v-layout>
                    </v-col>
                </v-row> </v-flex></v-layout
    ></v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBox from './NavBox.vue';
export default {
    watch: {
        weightObject: {
            deep: true,
            handler() {
                if (
                    this.weightObject.date != '' &&
                    this.weightObject.timeSelect != '' &&
                    this.weightObject.weight != ''
                ) {
                    if (!this.editSelected) {
                        this.disableSaveState = false;
                    } else {
                        let index = this.modifiedWeightIndex;
                        if (
                            this.weights[index].moment !=
                                this.weightObject.timeSelect ||
                            this.weights[index].day != this.weightObject.date ||
                            this.weights[index].weight !==
                                parseFloat(this.weightObject.weight) * 1000
                        )
                            this.disableSaveState = false;
                        else this.disableSaveState = true;
                    }
                } else {
                    if (!this.editSelected) {
                        this.disableSaveState = true;
                    }
                }
            },
        },
    },
    created() {
        this.$store.dispatch('moduleWeight/getWeights');
    },
    computed: {
        min_height() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs':
                    return null;
                case 'sm':
                    return null;
                case 'md':
                    return 460;
                case 'lg':
                    return 460;
                case 'xl':
                    return 800;
                default:
                    return 400;
            }
        },
        ...mapGetters({ weights: 'moduleWeight/getWeights' }),
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
        weightRule: function () {
            let rules = [];

            if (
                (this.weightObject.weight &&
                    parseFloat(this.weightObject.weight) < 20) ||
                parseFloat(this.weightObject.weight) > 100
            ) {
                rules['Weight must be between 20 and 100'] = true;
            }
            const mRules = Object.keys(rules);
            return mRules;
        },
        dateRule: function () {
            let rules = [];
            if (this.editSelected) {
                let idx = this.modifiedWeightIndex;

                // inside edit -> if the new date is not the same as old date
                // check if the new date already exists in other submitted dates
                if (this.weights[idx].day !== this.weightObject.date) {
                    if (
                        this.weights.findIndex(
                            (element) => element.day === this.weightObject.date
                        ) > -1
                    )
                        rules['Date already exists'] = true;
                }
                const mRules = Object.keys(rules);
                return mRules;
            } else {
                this.weights.forEach((element) => {
                    if (element.day === this.weightObject.date) {
                        rules['Date already exists'] = true;
                    }
                });
                const mRules = Object.keys(rules);
                return mRules;
            }
        },
        disableSave: function () {
            if (
                this.weightRule.length ||
                this.dateRule.length ||
                this.disableSaveState ||
                this.weightObject.weight === ''
            )
                return true;

            return false;
        },
    },
    methods: {
        openDialog() {
            this.dialog = true;
            this.weightObject.date = '';
            this.weightObject.timeSelect = '';
            this.weightObject.weight = '';
        },
        preventWrongInput($event) {
            //console.log($event);
            var charCode = $event.which ? $event.which : $event.keyCode;
            var eventCode = $event.code;
            //console.log(charCode);

            //handling backspace character
            if (charCode == 8) {
                let str = this.weightObject.weight;
                //console.log(str[str.length - 1]);
                if (str[str.length - 1] === '.') this.flag = false;
                str = str.slice(0, -1);
                //console.log(str);
                this.weightObject.weight = str;
            } else if (this.weightObject.weight.length < 5) {
                //first character must be a number
                if (this.weightObject.weight.length === 0) {
                    if (charCode > 48 && charCode < 58)
                        this.weightObject.weight +=
                            String.fromCharCode(charCode);
                }
                //if first char is already entered, check for first period
                else {
                    if (eventCode === 'Period' && this.flag === false) {
                        //console.log('got period');
                        this.weightObject.weight += '.';
                        this.flag = true;
                    }
                    // if period already exists, do not allow another period
                    else if (this.flag === true && eventCode === 'Period') {
                        //console.log('You shall not pass');
                    }
                    // if length is less than 5 and not zero and it is not a period and it is a number add it
                    else if (charCode > 47 && charCode < 58) {
                        this.weightObject.weight +=
                            String.fromCharCode(charCode);
                    }
                }
            }
        },
        save(date) {
            this.$refs.menuCal.save(date);
        },
        async saveWeight() {
            // if Add button is selected
            if (!this.editSelected) {
                let obj = {
                    day: this.weightObject.date,
                    moment: this.weightObject.timeSelect,
                    weight: parseFloat(this.weightObject.weight) * 1000,
                    disableEdit: false,
                };
                let postResult = this.$store
                    .dispatch('moduleWeight/addWeight', obj)
                    .catch((err) => console.log(err));

                // post the item then immediately await the result and fetch the
                // new collection, this is useful in case user edits the item right after insertion
                // since we do not have the idea of new item we have to await postResult and then fetch.
                await postResult;

                this.$store
                    .dispatch('moduleWeight/getWeights')
                    .catch((err) => console.log(err));
            }
            // if edit is selected
            else {
                let idx = this.modifiedWeightIndex;
                //console.log(JSON.stringify(this.weights[idx]));

                let obj = {
                    index: idx,
                    moment: this.weightObject.timeSelect,
                    weight: parseFloat(this.weightObject.weight) * 1000,
                    day: this.weightObject.date,
                    link: this.weights[idx]._links['edit-weighing'].href,
                };
                this.$store
                    .dispatch('moduleWeight/editWeight', obj)
                    .catch((err) => console.log(err));
            }

            this.closeEdit();
        },
        editWeight(index) {
            this.editSelected = true;
            this.modifiedWeightIndex = index;

            this.weightObject.date = this.weights[index].day;
            let foundObj = this.selectItems.filter((item) => {
                return item.val === this.weights[index].moment;
            })[0];
            //
            this.weightObject.timeSelect = foundObj.val;
            this.weightObject.weight = (
                this.weights[index].weight / 1000
            ).toString();
            this.dialog = true;
            this.disableSaveState = true;
        },
        deleteWeight() {
            // console.log('inside delete');
            let idx = this.modifiedWeightIndex;
            let weightObj = {
                index: idx,
                link: this.weights[idx]._links['delete-weighing'].href,
            };

            this.$store
                .dispatch('moduleWeight/deleteWeight', weightObj)
                .catch((err) => console.log(err));

            this.closeEdit();
        },
        closeEdit() {
            this.weightObject.weight = null;
            this.weightObject.date = null;
            this.weightObject.timeSelect = null;

            this.dialog = false;
            this.editSelected = false;
            this.flag = false;
        },
    },
    data() {
        return {
            weightObject: {
                date: '',
                timeSelect: '',
                weight: '',
            },
            flag: false,

            menuCal: false,
            selectItems: [
                {
                    time_it: 'Mattina - prima della colazione',
                    val: 'before-breakfast',
                },
                {
                    time_it: 'Mattina - dopo la colazione',
                    val: 'after-breakfast',
                },
                {
                    time_it: 'Sera - prima di cena',
                    val: 'before-dinner',
                },
                {
                    time_it: 'Sera - dopo di cena',
                    val: 'after-dinner',
                },
            ],

            dialog: false,
            editSelected: false,
            modifiedWeightIndex: null,

            disableSaveState: true,
        };
    },
    props: {},
    components: {
        NavBox,
    },
};
</script>

<style scoped>
table {
    width: 100%;
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

    text-align: center;
}

.tr-container-with-border {
    border: 1px solid rgb(224, 224, 233);
    border-radius: 6px;
}
</style>
