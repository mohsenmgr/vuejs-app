import { it } from 'vuetify/lib/locale';

export default {
    ...it,

    appCreator: 'Mohsen F.Maghrebi',
    appName: 'FoodCoach 2.0',
    appDate: '24/Aug/2021',

    DesktopContentComp: {
        meal_breakfast: { text: 'Colazione', index: 0 },
        meal_morningSnack: { text: 'Spuntino del mattino', index: 1 },
        meal_lunch: { text: 'Pranzo', index: 2 },
        meal_afternoonSnack: { text: 'Spuntino del pomeriggio', index: 3 },
        meal_dinner: { text: 'Cena', index: 4 },
        meal_extraMeal: { text: 'Mangiato fuori pasto?', index: 5 },
    },
    MainContentPrime: {
        weekDays: [
            {
                index: 1,
                value: 'Lunedì',
                key: 'monday',
            },
            {
                index: 2,
                value: 'Martedì',
                key: 'tuesday',
            },
            {
                index: 3,
                value: 'Mercoledì',
                key: 'wednesday',
            },
            {
                index: 4,
                value: 'Giovedì',
                key: 'thursday',
            },
            {
                index: 5,
                value: 'Venerdì',
                key: 'friday',
            },
            {
                index: 6,
                value: 'Sabato',
                key: 'saturday',
            },
            {
                index: 7,
                value: 'Domenica',
                key: 'sunday',
            },
        ],
    },
};
