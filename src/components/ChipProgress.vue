<template>
    <v-card min-height="170" class="rounded-xl ma-2" outlined>
        <v-card-title style="font-size: 18px" class="custom-chip-title"
            >{{ chipTitle }}
        </v-card-title>
        <v-card-subtitle
            style="font-size: 12px; color: #878787"
            class="text-left text-body"
            >{{ chipSubtitle }}</v-card-subtitle
        >
        <div class="custom-chip-progress">
            <div
                style="font-family: Rubik-Medium; font-size: 36px"
                class="text-center mt-n5 txt-weight"
            >
                {{ chipContent }}&nbsp;kg
            </div>
            <div
                style="font-family: Rubik-Regular; font-size: 10px"
                class="text-center mt-3 black--text"
            >
                {{ chipContentSubtitle }}
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    props: {
        chipTitle: String,
        chipSubtitle: String,
        chipContent: Number,
        chipContentSubtitle: String,
    },
};
</script>

<style>
@media only screen and (max-width: 800px) {
    .custom-chip-title {
        max-width: 150px;
        white-space: nowrap;
    }
}

.custom-chip-progress {
    padding: 0px;
}
.txt-weight {
    background: -webkit-linear-gradient(#ff9800, rgba(255, 152, 0, 0.6));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
