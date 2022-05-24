<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from 'vue-chartjs/legacy';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, LineController, PointElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, LineController, PointElement, ChartDataLabels);

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
          type: Number,
          default: 400
        },
        height: {
          type: Number,
          default: 200
        },
        cssClasses: {
          default: '',
          type: String
        },
        styles: {
          type: Object,
          default: () => {}
        },
        interval: {
            type: Array,
            default: () => []
        },
        positif: {
            type: Array,
            default: () => []
        },
        negatif: {
            type: Array,
            default: () => []
        },
        netral: {
            type: Array,
            default: () => []
        },
        total: {
            type: Array,
            default: () => []
        }
    },
    data() {
        const backgroundColor = this.positif.map(() => "#2E3A44");
        const positifBorderColor = this.positif.map(() => "#5FC790");
        const negatifBorderColor = this.positif.map(() => "#FF5630");
        const netralBorderColor = this.positif.map(() => "#FFA600");
        const totalBackgroundColor = this.positif.map(() => "#00CDB4");
        return {
            chartData: {
                labels: this.interval,
                datasets: [
                    {
                        label: "Positif",
                        type: "line",
                        data: this.positif,
                        backgroundColor,
                        cubicInterpolationMode: 'monotone',
                        borderColor: positifBorderColor
                    },
                    {
                        label: "Negatif",
                        type: "line",
                        data: this.negatif,
                        cubicInterpolationMode: 'monotone',
                        backgroundColor,
                        borderColor: negatifBorderColor
                    }, 
                    {
                        label: "Netral",
                        type: "line",
                        data: this.netral,
                        cubicInterpolationMode: 'monotone',
                        backgroundColor,
                        borderColor: netralBorderColor
                    }, 
                    {
                        label: "Total sentimen",
                        type: "bar",
                        data: this.total,
                        backgroundColor: totalBackgroundColor
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        formatter: null,
                        color: "#2E3A44",
                        font: {
                            weight: 'bold',
                            size: 16
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        }
    }
}
</script>
