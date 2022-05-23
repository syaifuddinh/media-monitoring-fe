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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, LineController, PointElement);

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
        plugins: {
          type: Object,
          default: () => {}
        }
    },
    data() {
        return {
            chartData: {
                labels: [ '1 Agustus', '2 Agustus', '3 Agustus', '4 Agustus', '5 Agustus', '6 Agustus' ],
                datasets: [
                    {
                        label: "Total sentimen",
                        type: "bar",
                        data: [40, 20, 12, 28, 41, 51]
                    },
                    {
                        label: "Positif",
                        type: "line",
                        data: [21, 31, 45, 11, 21, 31]
                    },
                    {
                        label: "Negatif",
                        type: "line",
                        data: [11, 41, 25, 91, 31, 71]
                    } 
                ]
            },
            chartOptions: {
                responsive: true
            }
        }
    }
}
</script>
