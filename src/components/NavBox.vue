<template>
    <v-layout>
        <v-flex>
            <v-row no-gutters align="start">
                <v-col lg="1" cols="2" class="mr-n2">
                    <div class="header-nav">
                        <v-icon
                            size="24"
                            @click="onBackButtonPress"
                            class="font-weight-bold"
                            color="black"
                            medium
                            >mdi-arrow-left</v-icon
                        >
                    </div>
                </v-col>
                <v-col lg="11" cols="10" class="ml-n2">
                    <div
                        style="font-family: Rubik-Medium; font-size: 36px"
                        class="black--text header-nav header-title"
                    >
                        {{ navigationModel ? navigationModel.pageTitle : '' }}
                    </div>
                    <div
                        style="font-family: Rubik-Regular; font-size: 36px"
                        class="black--text header-nav"
                    >
                        {{
                            navigationModel
                                ? navigationModel.pageAlternateTitle
                                : ''
                        }}
                    </div>
                    <v-dialog v-model="exitDialog" persistent max-width="560px">
                        <v-card>
                            <v-card-title>
                                Uscire senza salvare ?
                            </v-card-title>
                            <v-card-subtitle
                                class="mt-5"
                                style="font-size: 14px !important"
                            >
                                Se esci in questo momento, tutte le modifiche
                                effettuate non saranno salvate.
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn
                                    color="grey darken-1"
                                    text
                                    @click="exitDialog = false"
                                >
                                    ANNULLA
                                </v-btn>
                                <v-btn
                                    @click="quitWithoutSave"
                                    color="primary"
                                    text
                                >
                                    ESCI
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-snackbar v-model="snackbar">
                        Le modifiche sono state salvate con successo.

                        <template v-slot:action="{ attrs }">
                            <v-btn
                                color="orange"
                                text
                                v-bind="attrs"
                                @click="snackbar = false"
                            >
                                CHIUDI
                            </v-btn>
                        </template>
                    </v-snackbar>
                </v-col>
            </v-row>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            exitDialog: false,
        };
    },
    computed: {
        ...mapGetters({ navigationModel: 'moduleNav/getNavigationObject' }),
        snackbar: {
            get: function () {
                if (this.navigationModel)
                    return this.navigationModel.snackAlert
                        ? this.navigationModel.snackAlert
                        : false;
                return false;
            },
            set: function (newValue) {
                this.$store.dispatch('moduleNav/setSnackAlert', newValue);
            },
        },
    },
    methods: {
        onBackButtonPress() {
            if (!this.navigationModel) {
                this.$emit('onBackButtonPress');
                this.$router.replace('/home');
                return;
            }
            if (this.navigationModel.navWarning === true)
                this.exitDialog = true;
            else {
                // onBackButtonPress should only be emitted for main pages and not subpages,
                // since it turns off the active effect on the home page navigation bar.
                if (this.navigationModel.parentView === '/home')
                    this.$emit('onBackButtonPress');
                // actual navigation happens here
                if (this.$route.name === this.navigationModel.childView) {
                    this.$router.replace(this.navigationModel.parentView);
                    this.$store.dispatch('moduleNav/removeCurrentPage');
                }
            }
        },
        quitWithoutSave() {
            this.exitDialog = false;
            this.navigationModel.navWarning = false;
            this.onBackButtonPress();
        },
    },
};
</script>

<style>
.header-nav {
    display: inline;
    font-size: 36px;
    word-wrap: break-word;
}

@media only screen and (min-width: 1000px) {
    .header-title {
        margin-left: -20px;
    }
}
</style>
