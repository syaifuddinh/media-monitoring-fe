<template>
    <div>
        <div class="d-flex justify-content-center align-items-center mb-24px">
            <div class="d-flex align-items-center">
                <div class="w-32px h-12px bg-primary">
                    
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
                <div class="w-32px h-12px bg-dark-grey">
                    
                </div>
                <SmallText
                    :weight="600"
                    class-name="ml-8px"
                >
                    Total Sentimen
                </SmallText>
            </div>
        </div>
        
        <div class="position-relative pt-16px">
            <div
                v-if="false"
                id="eventsContainer"
                ref="events"
                class="position-absolute p-16px bg-grey rounded-8px"
                style="top:0;left:12px"
            >
                <NormalText
                    display="block"
                    :weight="600"
                >
                    Events
                </NormalText>

                <div class="mt-4px">
                    <SmallText
                        display="block"
                        :margin-top="4"
                    >
                        Some Event
                    </SmallText>
                </div>
            </div>
            <Bar
                ref="chartElement"
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
    </div>
</template>

<script>
import SmallText from '@elements/Text/Small/Index';
import NormalText from '@elements/Text/Normal/Index';
import { Bar } from 'vue-chartjs/legacy';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, LineController, PointElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Event from "@endpoints/Event";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, LineController, PointElement, ChartDataLabels);

export default {
    name: 'BarChart',
    components: {
        Bar,
        NormalText,
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
        dateInterval: {
            type: Array,
            default: () => []
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
        const totalBackgroundColor = this.positif.map(() => "#A0AABF");
        const positifBorderColor = this.positif.map(() => "#00CDB4");
        const negatifBorderColor = this.positif.map(() => "#FF5630");
        const netralBorderColor = this.positif.map(() => "#FFA600");
        return {
            isShowEvents: false,
            events: [],
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
                    tooltip: {
                        callbacks: {
                            afterLabel: this.showEvents
                        }
                    },
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
    },
    mounted() {
        this.setEvents();
        setTimeout(() => {
            const chart = this.$refs.chartElement.getCurrentChart();
            const chartImage = chart.toBase64Image('image/png', 1)
            this.$emit("load", chartImage);
        }, 500);
    },
    methods: {
        async setEvents() {
            const events = await Event.list({});
            this.events = events.list;
        },
        hideEvents() {
            this.isShowEvents = false;
        },
        showEvents(e) {
            const date = this.dateInterval[e.dataIndex];
            let content = "";
            // console.log(this.events);
            const events = this.events.filter(value => value.date === date).map(value => value.description).join(", ");
            if(events)
                content = "Events : \n" + events;
            return content;
        }
    }
}
</script>
