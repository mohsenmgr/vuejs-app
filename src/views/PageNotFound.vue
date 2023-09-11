<template>
    <div>
        <v-btn @click="goBack()" text>Home</v-btn>

        <v-img
            :src="require('@/assets/404-error.png')"
            :lazy-src="require('@/assets/404-error.png')"
        />
    </div>
</template>

<script>
export default {
    methods: {
        goBack: function () {
            this.$router.push('/home');
        },
    },
};
</script>

<style></style>
