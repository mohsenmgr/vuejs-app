<template>
    <v-app id="welcome">
        <v-main>
            <v-container fluid>
                <v-layout align-center justify-center>
                    <!-- DESKTOP !-->
                    <v-flex class="mx-auto hidden-sm-and-down">
                        <v-row justify="center">
                            <v-col class="ma-6 d-flex" cols="3">
                                <v-img
                                    max-width="325"
                                    max-height="69"
                                    lazy-src="@/assets/fc-logo.svg"
                                    src="@/assets/fc-logo.svg"
                                ></v-img>
                                <v-btn
                                    id="btn-progress"
                                    v-show="showProgress"
                                    @click="proceed"
                                    color="orange"
                                    text
                                    >PROSEGUI</v-btn
                                >
                            </v-col>
                        </v-row>
                        <v-row no-gutters justify="center">
                            <v-col cols="12" class="d-flex">
                                <v-card
                                    width="1215"
                                    height="793"
                                    class="mx-auto rounded-xl"
                                >
                                    <v-carousel
                                        height="95%"
                                        @change="onChange"
                                        class="mt-0 custom"
                                        light
                                        :continuous="false"
                                        :show-arrows="false"
                                        hide-delimiter-background
                                    >
                                        <v-carousel-item
                                            v-for="(slide, i) in slides"
                                            :key="i"
                                        >
                                            <v-sheet
                                                class="overflow-hidden"
                                                tile
                                            >
                                                <v-row
                                                    v-if="i == 0"
                                                    no-gutters
                                                    class="fill-height"
                                                    justify="center"
                                                >
                                                    <v-col
                                                        cols="12"
                                                        class="d-flex"
                                                    >
                                                        <v-img
                                                            class="mt-10"
                                                            width="1131"
                                                            height="472"
                                                            contain
                                                            :lazy-src="
                                                                slide.image
                                                            "
                                                            :src="slide.image"
                                                        >
                                                        </v-img>
                                                    </v-col>
                                                </v-row>
                                                <v-row no-gutters>
                                                    <v-col cols="12">
                                                        <v-card-title
                                                            style="
                                                                font-size: 36px !important;
                                                                font-family: Rubik-Medium;
                                                            "
                                                            class="
                                                                mt-6
                                                                black--text
                                                                justify-center
                                                            "
                                                            >{{
                                                                slide.title
                                                            }}</v-card-title
                                                        ></v-col
                                                    >
                                                </v-row>
                                                <v-row no-gutters>
                                                    <v-col>
                                                        <v-card-subtitle
                                                            style="
                                                                font-family: Rubik-Medium;
                                                                color: #878787;
                                                                font-size: 18px !important;
                                                            "
                                                            class="text-center"
                                                            >{{
                                                                slide.subtitle
                                                            }}</v-card-subtitle
                                                        >
                                                    </v-col>
                                                </v-row>
                                                <v-row
                                                    no-gutters
                                                    v-if="i == 1"
                                                    justify="space-around"
                                                >
                                                    <v-col
                                                        class="
                                                            d-flex
                                                            justify-center
                                                            pa-0
                                                            ma-0
                                                        "
                                                        v-for="(
                                                            page, j
                                                        ) in slide.pages"
                                                        :key="j"
                                                    >
                                                        <v-card
                                                            :ripple="false"
                                                            max-width="340"
                                                            width="338"
                                                            elevation="0"
                                                            class="
                                                                mx-auto
                                                                mt-0
                                                                pa-0
                                                            "
                                                            :class="
                                                                j != 1
                                                                    ? 'ml-0 mr-0'
                                                                    : 'ml-0 mr-0'
                                                            "
                                                            style="
                                                                background-color: white;
                                                            "
                                                        >
                                                            <v-img
                                                                aspect-ratio="1"
                                                                class="ma-0"
                                                                width="338"
                                                                height="470"
                                                                :lazy-src="
                                                                    page.image
                                                                "
                                                                :src="
                                                                    page.image
                                                                "
                                                            >
                                                            </v-img>

                                                            <v-card-subtitle
                                                                style="
                                                                    font-family: Rubik-Medium;
                                                                    font-size: 18px;
                                                                    color: #878787;
                                                                "
                                                                class="
                                                                    text-center
                                                                "
                                                                >{{
                                                                    page.title
                                                                }}
                                                            </v-card-subtitle>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-sheet>
                                        </v-carousel-item>
                                    </v-carousel>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-flex>

                    <!-- Mobile !-->
                    <v-flex class="mx-auto hidden-md-and-up" xs12 sm6 md5>
                        <v-row justify="space-around">
                            <v-col class="ma-6" cols="9">
                                <v-img
                                    contain
                                    aspect-ratio="1"
                                    max-width="292"
                                    max-height="62"
                                    lazy-src="@/assets/fc-logo_mob.svg"
                                    src="@/assets/fc-logo_mob.svg"
                                ></v-img>
                                <v-btn
                                    v-show="showProgress"
                                    @click="proceed"
                                    color="orange"
                                    text
                                    style="
                                        position: absolute;
                                        left: 240px;
                                        top: 1080px;
                                        z-index: 20001;
                                    "
                                    >PROSEGUI</v-btn
                                >
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12">
                                <v-card
                                    width="328"
                                    :height="showProgress ? '1000' : '520'"
                                    class="mx-auto rounded-xl"
                                >
                                    <v-carousel
                                        height="98%"
                                        @change="onChange"
                                        class="mt-0 pa-0 custom"
                                        light
                                        :continuous="false"
                                        :show-arrows="false"
                                        hide-delimiter-background
                                    >
                                        <v-carousel-item
                                            v-for="(slide, i) in slides"
                                            :key="i"
                                        >
                                            <v-sheet
                                                height="100%"
                                                class="overflow-y-hidden"
                                                tile
                                            >
                                                <v-row
                                                    v-if="i == 0"
                                                    no-gutters
                                                    justify="center"
                                                >
                                                    <v-col class="d-flex">
                                                        <v-img
                                                            width="292"
                                                            height="157"
                                                            contain
                                                            class="mt-5"
                                                            :lazy-src="
                                                                slide.image_mob
                                                            "
                                                            :src="
                                                                slide.image_mob
                                                            "
                                                        >
                                                        </v-img>
                                                    </v-col>
                                                </v-row>
                                                <v-row no-gutters>
                                                    <v-col cols="12">
                                                        <v-card-title
                                                            style="
                                                                line-height: 1.1;
                                                                font-size: 36px !important;
                                                                font-family: Rubik-Medium;
                                                            "
                                                            class="
                                                                justify-center
                                                                text-center
                                                                black--text
                                                            "
                                                            >{{
                                                                slide.title
                                                            }}</v-card-title
                                                        ></v-col
                                                    >
                                                </v-row>
                                                <v-row v-if="i == 0" no-gutters>
                                                    <v-col>
                                                        <v-card-subtitle
                                                            style="
                                                                font-family: Rubik-Medium;
                                                                color: #878787;
                                                                font-size: 18px !important;
                                                            "
                                                            class="text-center"
                                                            >{{
                                                                slide.subtitle
                                                            }}</v-card-subtitle
                                                        >
                                                    </v-col>
                                                </v-row>

                                                <v-row
                                                    no-gutters
                                                    v-if="i == 1"
                                                    justify="space-around"
                                                >
                                                    <v-col
                                                        class="
                                                            d-flex
                                                            justify-center
                                                            pa-0
                                                            ma-0
                                                        "
                                                        v-for="(
                                                            page, j
                                                        ) in slide.pages"
                                                        :key="j"
                                                    >
                                                        <v-card
                                                            :ripple="false"
                                                            max-width="340"
                                                            width="338"
                                                            elevation="0"
                                                            class="
                                                                mx-auto
                                                                mt-0
                                                                pa-0
                                                            "
                                                            :class="
                                                                j != 1
                                                                    ? 'ml-0 mr-0'
                                                                    : 'ml-0 mr-0'
                                                            "
                                                            @click.prevent="
                                                                func(page)
                                                            "
                                                            style="
                                                                background-color: white;
                                                            "
                                                        >
                                                            <v-card-actions
                                                                class="
                                                                    justify-center
                                                                "
                                                            >
                                                                <v-img
                                                                    class="ma-0"
                                                                    :lazy-src="
                                                                        page.image_mob
                                                                    "
                                                                    :src="
                                                                        page.image_mob
                                                                    "
                                                                >
                                                                </v-img>
                                                            </v-card-actions>

                                                            <v-card-subtitle
                                                                style="
                                                                    font-family: Rubik-Medium;
                                                                    font-size: 18px;
                                                                    color: #878787;
                                                                "
                                                                class="
                                                                    text-center
                                                                "
                                                                >{{
                                                                    page.title
                                                                }}
                                                            </v-card-subtitle>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-sheet>
                                        </v-carousel-item>
                                    </v-carousel>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <!-- Mobile !-->
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            showProgress: false,
            slides: [
                {
                    title: 'Il benessere passa dalle abitudini',
                    subtitle:
                        'Il piano nutrizionale personalizzato verso il raggiungiamento del tuo obiettivo',
                    image: require('@/assets/welcome_img_1.webp'),
                    image_mob: require('@/assets/welcome_img_1_mob.webp'),
                },
                {
                    title: 'Il servizio di coaching alimentare',
                    pages: [
                        {
                            title: 'Per migliorare le proprie abitudini alimentari',
                            image: require('@/assets/welcome_img_p2_1.webp'),
                            image_mob: require('@/assets/welcome_img_p2_1_mob.webp'),
                        },
                        {
                            title: 'Per raggiungere il proprio peso forma ideale',
                            image: require('@/assets/welcome_img_p2_2.webp'),
                            image_mob: require('@/assets/welcome_img_p2_2_mob.webp'),
                        },
                        {
                            title: 'Per aumentare il proprio benessere',
                            image: require('@/assets/welcome_img_p2_3.webp'),
                            image_mob: require('@/assets/welcome_img_p2_3_mob.webp'),
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        func(page) {
            console.log(page.image);
        },
        proceed() {
            console.log('hello');
            this.$router.push('/home/');
        },
        onChange(param) {
            if (param === 1) this.showProgress = true;
            else this.showProgress = false;
        },
    },
};
</script>

<style>
/** Large Size Width Desktop - Mac Pro */
@media only screen and (min-width: 1201px) {
    #btn-progress {
        position: absolute;
        left: 1150px;
        top: 865px;
        z-index: 20001;
        font-size: 18px;
    }
}
/** Very Wide Device */
@media only screen and (min-width: 1500px) {
    #btn-progress {
        position: absolute;
        left: 1270px;
        top: 865px;
        z-index: 20001;
        font-size: 18px;
    }
}
/** Small Size Width Desktop - Mac Air */
@media only screen and (max-width: 1231px) {
    #btn-progress {
        position: absolute;
        left: 1045px;
        top: 865px;
        z-index: 20001;
        font-size: 18px;
    }
}

#welcome {
    background-image: linear-gradient(
        to bottom,
        #ff9800,
        rgba(255, 152, 0, 0.6)
    );
}

#rounded-card {
    border-radius: 24px;
}

.router-link {
    font-size: medium;
    text-decoration: none !important;
    color: orange;
    font-weight: bold;
}

.v-carousel__controls {
    margin-bottom: 0px;
}

.custom .v-carousel__controls__item.v-btn {
    color: white !important;
    border: 4px solid gray;
}

.custom .v-carousel__controls__item.v-btn.v-btn--active {
    color: orange !important;
    border: 4px solid orange;
}

.custom .v-carousel__controls__item.v-btn.v-btn--active:before {
    opacity: 0;
}

.custom .v-carousel__controls__item.v-btn:hover {
    color: orange !important;
}

.custom .v-carousel__controls__item.v-btn:hover:before {
    opacity: 0;
}

.v-application a {
    color: orange !important;
}
</style>
