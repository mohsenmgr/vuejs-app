<template>
    <v-app id="inspire">
        <v-main>
            <v-container fluid fill-height>
                <v-layout justify-center>
                    <v-flex xs12 sm8 md5>
                        <v-row class="pa-12">
                            <v-img
                                lazy-src="@/assets/fc-logo.svg"
                                src="@/assets/fc-logo.svg"
                            ></v-img>
                        </v-row>

                        <v-row class="pt-12" align="center" justify="center">
                            <v-col md="8" align-center justify-center>
                                <v-form>
                                    <v-text-field
                                        autofocus
                                        validate-on-blur
                                        v-model="input.email"
                                        :error="login_error ? true : false"
                                        :rules="emailRule"
                                        dark
                                        color="white"
                                        name="login"
                                        label="Username"
                                        type="text"
                                        outlined
                                    ></v-text-field>
                                    <v-text-field
                                        @keyup.13="handleKey"
                                        validate-on-blur
                                        v-model="input.password"
                                        :error="login_error ? true : false"
                                        :rules="passwordRule"
                                        :append-icon="
                                            show1 ? 'mdi-eye' : 'mdi-eye-off'
                                        "
                                        :type="show1 ? 'text' : 'password'"
                                        @click:append="show1 = !show1"
                                        dark
                                        color="white"
                                        name="password"
                                        label="Password"
                                        outlined
                                    ></v-text-field>
                                </v-form>

                                <v-btn
                                    :disabled="is_disabled ? true : false"
                                    id="btnSubmit"
                                    dark
                                    elevation="2"
                                    x-large
                                    :color="is_disabled ? 'orange' : 'white'"
                                    :class="
                                        is_disabled
                                            ? 'white--text'
                                            : 'orange--text'
                                    "
                                    @click="submit"
                                    >ACCEDI</v-btn
                                >
                            </v-col>
                        </v-row>
                        <v-row class="pt-12" align="center" justify="center">
                            <p class="white--text text-body-2">
                                Non sei ancora registrato? <b>Registrati</b>
                                <!-- <router-link class="router-link" :to="'welcome'"
                                    >&nbsp;Registrati</router-link
                                > -->
                            </p>
                        </v-row>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'Login',
    props: {},
    mounted: function () {
        document.title = 'Foodcoach';
    },
    computed: {
        is_disabled() {
            if (this.input.email != '' && this.input.password != '')
                return false;
            else return true;
        },
        emailRule: function () {
            let rules = {};

            if (this.input.email == '') rules['Required'] = true;
            const mRules = Object.keys(rules);
            return mRules;
        },
        passwordRule: function () {
            let rules = {};
            if (this.input.password == '') rules['Required'] = true;
            if (this.login_error == true)
                rules['Email e password non coincidono!'] = true;
            if (this.backEnd_error === true)
                rules['Oops, sembra che il server sia inattivo!'] = true;

            const mRules = Object.keys(rules);
            return mRules;
        },
    },
    data() {
        return {
            show1: false,

            input: {
                email: '',
                password: '',
            },
            login_error: false,
            backEnd_error: false,
        };
    },
    methods: {
        async submit() {
            if (this.input.email != '' && this.input.password != '') {
                try {
                    var user = {
                        username: this.input.email,
                        password: this.input.password,
                    };
                    await this.$store.dispatch('moduleUser/login', user);
                    this.$router.push('/welcome');
                } catch (e) {
                    if (e === 403) {
                        this.backEnd_error = false;
                        this.login_error = true;
                    } else {
                        this.login_error = false;
                        console.log('Server Error!');
                        this.backEnd_error = true;
                    }
                }
            }
        },
        handleKey() {
            this.submit();
        },
    },
};
</script>

<style scoped>
#inspire {
    background-image: linear-gradient(
        to bottom,
        #ff9800,
        rgba(255, 152, 0, 0.6)
    );
}

#btnSubmit {
    width: 100%;
    height: 56px;
}

.router-link {
    font-size: small;
    text-decoration: none !important;
    color: white;
    font-weight: bold;
}
.v-application a {
    color: white !important;
}
</style>
<!--
 <v-alert
                    v-if="login_error"
                    id="mAlert"
                    type="error"
                    dismissible
                >
                    Controlla i dati inseriti</v-alert
                >
#mAlert {
    width: 99%;
    position: fixed;
    top: -0px;
    right: 2px;
    left: 2px;
}

!-->
