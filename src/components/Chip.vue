<template>
    <div class="custom-chip">
        <div
            style="font-family: Rubik-Regular; font-size: 10px"
            class="chip-title text-center grey--text"
        >
            {{ chipTitle }}
        </div>
        <div
            style="
                font-family: Rubik-Medium;
                font-size: 18px;
                color: #ff9800;
                letter-spacing: 0.15px;
            "
            class="mt-1 text-center"
        >
            {{ chipValue }}
        </div>
        <div
            style="
                font-family: Rubik-Medium;
                font-size: 18px;
                color: #ff9800;
                letter-spacing: 0.15px;
            "
            class="mt-0 text-center"
        >
            kcal
        </div>
    </div>
</template>

<script>
export default {
    props: {
        chipTitle: null,
        chipValue: null,
    },
};
</script>

<style>
.chip-title {
    white-space: nowrap;
}

@media only screen and (max-width: 361px) {
    .custom-chip {
        margin: 5px;
        padding: 10px;
        display: inline-block;
        min-width: 90px;
        max-width: max-content;
        min-height: 85px;
        border: 1px solid rgb(224, 224, 233);
        border-radius: 25px;
    }
}

@media only screen and (max-width: 769px) {
    .custom-chip {
        margin: 5px;
        padding: 10px;
        display: inline-block;
        min-width: 80px;
        max-width: max-content;
        min-height: 85px;
        border: 1px solid rgb(224, 224, 233);
        border-radius: 25px;
    }
}
@media only screen and (min-width: 800px) {
    .custom-chip {
        margin: 5px;
        padding: 10px;
        display: inline-block;
        min-width: 130px;
        max-width: max-content;
        min-height: 85px;
        border: 1px solid rgb(224, 224, 233);
        border-radius: 25px;
    }
}
</style>
