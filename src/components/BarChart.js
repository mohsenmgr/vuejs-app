import { Bar } from 'vue-chartjs';

export default {
    data() {
        return {
            greenGradient: null,
            redGradient: null,
            greenToRedGradient: null,
        };
    },
    extends: Bar,
    props: ['options', 'myData'],

    watch: {
        myData: function () {
            this.renderMyChart();
        },
    },

    mounted() {
        this.renderMyChart();
    },
    methods: {
        renderMyChart() {
            //greenToRed
            this.greenToRedGradient = this.$refs.canvas
                .getContext('2d')
                .createLinearGradient(0, 0, 0, 450);
            this.greenToRedGradient.addColorStop(0, 'rgba(0, 176, 32, 0.8)');
            this.greenToRedGradient.addColorStop(1, 'rgba(176, 0, 32, 0.4)');

            //green
            this.greenGradient = this.$refs.canvas
                .getContext('2d')
                .createLinearGradient(0, 0, 0, 450);
            this.greenGradient.addColorStop(0, 'rgba(0, 176, 32, 0.8)');
            this.greenGradient.addColorStop(1, 'rgba(0, 176, 32, 0.4)');

            //Red
            this.redGradient = this.$refs.canvas
                .getContext('2d')
                .createLinearGradient(0, 0, 0, 450);
            this.redGradient.addColorStop(0, 'rgba(176, 0, 32, 0.8)');
            this.redGradient.addColorStop(1, 'rgba(176, 0, 32, 0.4)');

            let chartData = this.myData;
            let colorArray = [];

            if (chartData.datasets[1].backgroundColor) {
                chartData.datasets[1].backgroundColor.forEach((element) => {
                    switch (element) {
                        case 'green':
                            colorArray.push(this.greenGradient);
                            break;
                        case 'red':
                            colorArray.push(this.redGradient);
                            break;
                        case 'yellow':
                            colorArray.push(this.greenToRedGradient);
                            break;

                        default:
                            console.log('default');
                            break;
                    }
                });
            }
            chartData.datasets[1].backgroundColor = colorArray;
            this.renderChart(chartData, this.options);
        },
    },
};
