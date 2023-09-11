<template>
    <v-app>
        <v-layout>
            <v-flex>
                <MainContent
                    :fullName="this.fullName"
                    :user="this.user"
                    :items="this.items"
                    :loading="loader"
                />
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import MainContent from '../components/MainContent.vue';
export default {
    name: 'Home',
    components: {
        MainContent,
    },
    computed: {
        ...mapGetters({ user: 'moduleUser/getUser' }),
        ...mapGetters({ authStat: 'moduleUser/authStatus' }),
        ...mapGetters({ fullName: 'moduleDiet/getPatientFullName' }),
    },
    created: function () {
        //console.log(this.token);
        //Here we can show a loading animation by creating a value loading and show a component and
        // When loading is finished and promise is resolved we can simply make loading false.
        let res = this.$store.dispatch('moduleDiet/getDietPlan');
        res.then(
            () => {
                // console.log('success ' + JSON.stringify(msg.status));
                this.loader = false;
            },
            (err) => {
                console.log(err);
            }
        );
    },
    mounted() {
        document.title = 'FoodCoach';
    },
    data() {
        return {
            token: localStorage.getItem('token'),
            items: [
                {
                    title: 'Compila il diario',
                    icon: 'mdi-book-open-blank-variant',
                    path: '/diary',
                },
                {
                    title: 'Aggiungi un peso',
                    icon: 'mdi-scale-bathroom',
                    path: '/weight',
                },
                {
                    title: 'Monitora i progressi',
                    icon: 'mdi-chart-bar',
                    path: '/progress',
                },
                {
                    title: 'Il mio profilo',
                    icon: 'mdi-account-circle',
                    path: '/profile',
                },
                {
                    title: 'Impostazioni',
                    icon: 'mdi-cog-outline',
                    path: '/settings',
                },
                {
                    title: 'Logout',
                    icon: 'mdi-logout',
                    path: '/logout',
                },
            ],
            loader: true,
        };
    },
};
</script>

<style scoped></style>
