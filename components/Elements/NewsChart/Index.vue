<template>
    <div>
        <div class="d-flex justify-content-center align-items-center mb-24px">
            <div class="d-flex align-items-center">
                <div class="w-32px h-12px bg-dark-grey">
                    
                </div>
                <SmallText
                    :weight="600"
                    class-name="ml-8px"
                >
                    Positif
                </SmallText>
            </div>

            <div class="d-flex align-items-center ml-24px">
                <div class="w-32px h-12px bg-danger">
                    
                </div>
                <SmallText
                    :weight="600"
                    class-name="ml-8px"
                >
                    Negatif
                </SmallText>
            </div>
            <div class="d-flex align-items-center ml-24px">
                <div class="w-32px h-12px bg-warning">
                    
                </div>
                <SmallText
                    :weight="600"
                    class-name="ml-8px"
                >
                    Netral
                </SmallText>
            </div>

            <div class="d-flex align-items-center ml-24px">
                <div class="w-32px h-12px bg-primary">
                    
                </div>
                <SmallText
                    :weight="600"
                    class-name="ml-8px"
                >
                    Total Sentimen
                </SmallText>
            </div>
        </div>
        
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
    </div>
</template>

<script>
import SmallText from '@elements/Text/Small/Index';
import { Bar } from 'vue-chartjs/legacy';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, LineController, PointElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, LineController, PointElement, ChartDataLabels);

export default {
    name: 'BarChart',
    components: {
        Bar,
        SmallText
    },
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
        const totalBackgroundColor = this.positif.map(() => "#00CDB4");
        const positifBorderColor = this.positif.map(() => "#A0AABF");
        const negatifBorderColor = this.positif.map(() => "#FF5630");
        const netralBorderColor = this.positif.map(() => "#FFA600");
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
                        backgroundColor,
                        cubicInterpolationMode: 'monotone',
                        borderColor: negatifBorderColor
                    }, 
                    {
                        label: "Netral",
                        type: "line",
                        data: this.netral,
                        backgroundColor,
                        cubicInterpolationMode: 'monotone',
                        borderColor: netralBorderColor
                    }, 
                    {
                        label: "Total Sentimen",
                        type: "bar",
                        data: this.total,
                        backgroundColor: totalBackgroundColor
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        formatter: null,
                        color: "#2E3A44",
                        font: {
                            family: "Montserrat",
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
