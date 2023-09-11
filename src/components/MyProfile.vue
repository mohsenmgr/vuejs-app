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
                <v-row>
                    <v-col md="12" sm="12" lg="12">
                        <v-layout justify-center>
                            <v-flex xs12 sm10 md10 lg10>
                                <v-row>
                                    <v-col lg="12">
                                        <v-card
                                            width=""
                                            elevation="0"
                                            class="rounded-xl pa-4 mx-auto"
                                        >
                                            <v-card-title class="ml-0"
                                                >Dati Generali</v-card-title
                                            >
                                            <v-container>
                                                <v-row justify="center">
                                                    <v-col cols="12">
                                                        <v-flex xs12 sm12 md12>
                                                            <v-container
                                                                class="pa-1"
                                                            >
                                                                <v-row
                                                                    justify="start"
                                                                    no-gutters
                                                                >
                                                                    <v-col
                                                                        cols="12"
                                                                        sm="8"
                                                                        md="5"
                                                                    >
                                                                        <v-text-field
                                                                            disabled
                                                                            v-model="
                                                                                userData.name
                                                                            "
                                                                            label="Nome"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                    <v-col
                                                                        cols="1"
                                                                    >
                                                                    </v-col>
                                                                    <v-col
                                                                        cols="12"
                                                                        sm="8"
                                                                        md="5"
                                                                    >
                                                                        <v-text-field
                                                                            disabled
                                                                            v-model="
                                                                                userData.surname
                                                                            "
                                                                            label="Cognome"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row
                                                                    justify="start"
                                                                    no-gutters
                                                                >
                                                                    <v-col
                                                                        cols="12"
                                                                        sm="8"
                                                                        md="5"
                                                                    >
                                                                        <v-select
                                                                            disabled
                                                                            v-model="
                                                                                userData.sex
                                                                            "
                                                                            outlined
                                                                            label="Sesso"
                                                                            :items="
                                                                                sexItems
                                                                            "
                                                                            item-text="italianText"
                                                                            item-value="val"
                                                                        ></v-select>
                                                                    </v-col>
                                                                    <v-col
                                                                        cols="1"
                                                                    >
                                                                    </v-col>
                                                                    <v-col
                                                                        cols="12"
                                                                        sm="8"
                                                                        md="5"
                                                                    >
                                                                        <v-select
                                                                            v-model="
                                                                                userData.maritalStatus
                                                                            "
                                                                            outlined
                                                                            label="Stato civille"
                                                                            :items="
                                                                                maritalStatus
                                                                            "
                                                                            item-text="italianText"
                                                                            item-value="val"
                                                                        ></v-select>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row
                                                                    no-gutters
                                                                    justify="start"
                                                                >
                                                                    <v-col
                                                                        cols="12"
                                                                        sm="8"
                                                                        md="5"
                                                                    >
                                                                        <v-text-field
                                                                            disabled
                                                                            v-model="
                                                                                userData.fiscalCode
                                                                            "
                                                                            label="Codice fiscale"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                    <v-col
                                                                        cols="1"
                                                                    ></v-col>
                                                                    <v-col
                                                                        cols="12"
                                                                        sm="8"
                                                                        md="5"
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
                                                                                    disabled
                                                                                    outlined
                                                                                    v-model="
                                                                                        userData.birthDate
                                                                                    "
                                                                                    label="Data di nascita"
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
                                                                                    date
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
                                                                </v-row>
                                                                <v-row
                                                                    no-gutters
                                                                    justify="start"
                                                                >
                                                                    <v-col
                                                                        cols="12"
                                                                        sm="8"
                                                                        md="5"
                                                                    >
                                                                        <v-text-field
                                                                            v-model="
                                                                                userData.telephone
                                                                            "
                                                                            label="Telefono"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row>
                                                                    <v-col>
                                                                        <v-divider />
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row>
                                                                    <v-col>
                                                                        <v-card-title
                                                                            class="
                                                                                ml-n3
                                                                            "
                                                                            >Account
                                                                        </v-card-title>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row
                                                                    no-gutters
                                                                    justify="start"
                                                                >
                                                                    <v-col
                                                                        class=""
                                                                        cols="12"
                                                                        sm="8"
                                                                        md="5"
                                                                    >
                                                                        <v-text-field
                                                                            v-model="
                                                                                userData.username
                                                                            "
                                                                            label="Nome utente"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row
                                                                    no-gutters
                                                                    justify="start"
                                                                >
                                                                    <v-col
                                                                        class=""
                                                                        cols="12"
                                                                        sm="8"
                                                                        md="5"
                                                                    >
                                                                        <v-text-field
                                                                            v-model="
                                                                                userData.email
                                                                            "
                                                                            :rules="[
                                                                                (
                                                                                    v
                                                                                ) =>
                                                                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                                                                        v
                                                                                    ) ||
                                                                                    'E-mail must be valid',
                                                                            ]"
                                                                            label="E-mail"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                                <!-- ******** !-->
                                                                <v-row>
                                                                    <v-col>
                                                                        <v-divider />
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row>
                                                                    <v-col>
                                                                        <v-card-title
                                                                            class="
                                                                                ml-n4
                                                                            "
                                                                            >Goal
                                                                            e
                                                                            motivazione
                                                                        </v-card-title>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row
                                                                    no-gutters
                                                                    justify="start"
                                                                    class=""
                                                                >
                                                                    <v-col
                                                                        class=""
                                                                        cols="12"
                                                                        xs="12"
                                                                        sm="8"
                                                                        md="5"
                                                                    >
                                                                        <v-text-field
                                                                            disabled
                                                                            v-model="
                                                                                userData.goal
                                                                            "
                                                                            label="Goal"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row
                                                                    no-gutters
                                                                    justify="start"
                                                                >
                                                                    <v-col
                                                                        class=""
                                                                        cols="12"
                                                                        xs="12"
                                                                        sm="8"
                                                                        md="10"
                                                                    >
                                                                        <v-text-field
                                                                            v-model="
                                                                                userData.motivation
                                                                            "
                                                                            label="Motivazione"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                                <!-- OTHER !-->
                                                                <v-row>
                                                                    <v-col>
                                                                        <v-divider />
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row>
                                                                    <v-col>
                                                                        <v-card-title
                                                                            class="
                                                                                ml-n4
                                                                            "
                                                                            >Rituale
                                                                            della
                                                                            bilancia
                                                                        </v-card-title>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row
                                                                    no-gutters
                                                                    justify="start"
                                                                    class=""
                                                                >
                                                                    <v-col
                                                                        cols="12"
                                                                        sm="8"
                                                                        md="5"
                                                                    >
                                                                        <v-text-field
                                                                            disabled
                                                                            v-model="
                                                                                myfield
                                                                            "
                                                                            label="Ricorrenza settimanale"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                    <v-col
                                                                        cols="1"
                                                                    >
                                                                    </v-col>
                                                                    <v-col
                                                                        cols="12"
                                                                        sm="8"
                                                                        md="5"
                                                                    >
                                                                        <v-text-field
                                                                            disabled
                                                                            v-model="
                                                                                myfield
                                                                            "
                                                                            label="Fascia oraria"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row>
                                                                    <v-col>
                                                                        <v-divider />
                                                                    </v-col>
                                                                </v-row>

                                                                <v-row>
                                                                    <v-col>
                                                                        <v-card-title
                                                                            class="
                                                                                ml-n4
                                                                            "
                                                                            >Istituto
                                                                            e
                                                                            nutrizionista
                                                                        </v-card-title>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row
                                                                    no-gutters
                                                                    justify="start"
                                                                    class=""
                                                                >
                                                                    <v-col
                                                                        cols="12"
                                                                        sm="8"
                                                                        md="5"
                                                                    >
                                                                        <v-text-field
                                                                            disabled
                                                                            v-model="
                                                                                myfield
                                                                            "
                                                                            label="Istituto"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                    <v-col
                                                                        cols="1"
                                                                    >
                                                                    </v-col>
                                                                    <v-col
                                                                        cols="12"
                                                                        sm="8"
                                                                        md="5"
                                                                    >
                                                                        <v-text-field
                                                                            disabled
                                                                            v-model="
                                                                                myfield
                                                                            "
                                                                            label="Nutrizionista"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row>
                                                                    <v-col>
                                                                        <v-divider />
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row>
                                                                    <v-col>
                                                                        <v-card-title
                                                                            class="
                                                                                ml-n4
                                                                            "
                                                                            >Preferenze
                                                                            per
                                                                            le
                                                                            notifiche
                                                                            via
                                                                            e-mail
                                                                        </v-card-title>
                                                                    </v-col>
                                                                </v-row>

                                                                <v-row
                                                                    no-gutters
                                                                >
                                                                    <v-col
                                                                        class="
                                                                            ml-2
                                                                        "
                                                                        cols="12"
                                                                        sm="6"
                                                                        md="6"
                                                                    >
                                                                        <v-checkbox
                                                                            disabled
                                                                            v-model="
                                                                                userData.checkbox1
                                                                            "
                                                                        >
                                                                            <template
                                                                                v-slot:label
                                                                            >
                                                                                <div
                                                                                    style="
                                                                                        font-family: Rubik-Regular !important;
                                                                                    "
                                                                                    class="
                                                                                        text-body-1
                                                                                    "
                                                                                >
                                                                                    Per
                                                                                    ricordarmi
                                                                                    dell'imminente
                                                                                    rituale
                                                                                    della
                                                                                    bilancia
                                                                                </div>
                                                                            </template>
                                                                        </v-checkbox>
                                                                        <v-checkbox
                                                                            disabled
                                                                            v-model="
                                                                                userData.checkbox2
                                                                            "
                                                                        >
                                                                            <template
                                                                                v-slot:label
                                                                            >
                                                                                <div
                                                                                    style="
                                                                                        font-family: Rubik-Regular !important;
                                                                                    "
                                                                                    class="
                                                                                        text-body-1
                                                                                    "
                                                                                >
                                                                                    Per
                                                                                    ricordarmi
                                                                                    dell'imminente
                                                                                    visita
                                                                                    nutrizionistica
                                                                                </div>
                                                                            </template>
                                                                        </v-checkbox>
                                                                        <v-checkbox
                                                                            disabled
                                                                            v-model="
                                                                                userData.checkbox3
                                                                            "
                                                                        >
                                                                            <template
                                                                                v-slot:label
                                                                            >
                                                                                <div
                                                                                    style="
                                                                                        font-family: Rubik-Regular !important;
                                                                                    "
                                                                                    class="
                                                                                        text-body-1
                                                                                    "
                                                                                >
                                                                                    Quando
                                                                                    i
                                                                                    suggerimenti
                                                                                    alimentari
                                                                                    vengono
                                                                                    aggiornati
                                                                                </div>
                                                                            </template>
                                                                        </v-checkbox>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-container>
                                                        </v-flex>
                                                    </v-col></v-row
                                                ></v-container
                                            >
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-flex>
                        </v-layout>
                    </v-col>
                </v-row>
            </v-flex></v-layout
        >
    </v-container>
</template>

<script>
import NavBox from './NavBox.vue';
export default {
    methods: {
        save(date) {
            this.$refs.menuCal.save(date);
        },
    },
    computed: {
        emailRule: function () {
            let rules = {};

            if (this.userData.email == '') rules['Required'] = true;
            const mRules = Object.keys(rules);
            return mRules;
        },
    },
    data() {
        return {
            myfield: 'Mohsen',
            date: null,
            menuCal: false,
            userData: {
                name: 'Matteo',
                surname: 'Rossi',
                sex: 'male',
                maritalStatus: 'single',
                fiscalCode: 'MTRYU789M243E1',
                birthDate: '07-08-1992',
                telephone: '3334567890',
                username: 'matteo.rossi',
                email: 'matteo.rossi@gmail.com',
                goal: 'Perdere peso',
                motivation: 'Sentirmi bene con me stesso',
                weeklyOccurance: 'Martedi',
                measurementTime: 'Sera, dopo di cena',
                institute: 'Ospedale San Raffaele',
                nutritionist: 'Francesca Saccitelli',
                checkbox1: true,
                checkbox2: true,
                checkbox3: true,
            },
            sexItems: [
                {
                    italianText: 'Maschio',
                    val: 'male',
                },
                {
                    italianText: 'femminile',
                    val: 'female',
                },
            ],
            maritalStatus: [
                {
                    italianText: 'Celibe',
                    val: 'single',
                },
                {
                    italianText: 'No Celibe',
                    val: 'married',
                },
            ],
        };
    },
    components: {
        NavBox,
    },
};
</script>

<style></style>
