<template>
    <v-card class="rounded-lg ma-4" outlined>
        <v-card-title style="font-size: 18px">Acqua</v-card-title>
        <v-card-subtitle
            style="font-family: Rubik-Regular; font-size: 12px"
            class="grey--text"
            >Ti suggeriamo di bere almeno 8 bicchieri d'acqua al
            giorno</v-card-subtitle
        >
        <div class="pa-6">
            <v-icon id="btn-add" @click="addWater" size="35" color="black"
                >mdi-plus-circle-outline</v-icon
            >
            <v-icon
                @click="removeWater"
                v-for="i in waterNumber"
                :key="i"
                class="btn-acqua ml-5"
                size="50"
                color="blue"
                >mdi-cup-water</v-icon
            >
        </div>
        <!-- 
        <div class="pa-6">
            <v-btn
                id="btn-add"
                plain
                :ripple="false"
                text
                width="35"
                height="35"
                @click="addWater"
            >
                <v-icon size="35" color="black">mdi-plus-circle-outline</v-icon>
            </v-btn>
            <v-btn
                class="btn-acqua"
                plain
                :ripple="false"
                text
                @click="removeWater"
                v-for="i in waterNumber"
                :key="i"
            >
                <v-icon size="50" class="ml-5" color="blue"
                    >mdi-cup-water</v-icon
                >
            </v-btn>
        </div>

        !-->
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters({ waterNumber: 'moduleDiary/getDiaryOverviewWater' }),
    },

    data() {
        return {};
    },
    props: {
        date: String,
    },
    methods: {
        addWater: async function () {
            if (this.waterNumber < 16) {
                await this.$store
                    .dispatch('moduleDiary/modifyWater', { action: 'add' })
                    .catch((err) => console.log(err));
            } else
                alert(
                    'Congratulations: You have had enough water for today! :)'
                );
        },
        removeWater: async function () {
            if (this.waterNumber > 0) {
                await this.$store
                    .dispatch('moduleDiary/modifyWater', { action: 'remove' })
                    .catch((err) => console.log(err));
            } else {
                ('Please consider drinking a fresh glass of water ASAP !');
            }
        },
    },
};
</script>

<style></style>
