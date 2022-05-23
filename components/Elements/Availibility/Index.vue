<template>
    <div>
        <div class="d-flex">
            <NormalText
                font="poppins"
                display="flex"
                :margin-right="24"
            >
                <div class="h-20px w-20px rounded-2px mr-8px b-1 border-white">
                    
                </div>
                Tidak Tersedia
            </NormalText>
            <NormalText
                font="poppins"
                display="flex"
            >
                <div class="h-20px w-20px rounded-2px mr-8px b-1 border-primary bg-primary">
                    
                </div>
                Tersedia
            </NormalText>
        </div>

        <div class="mt-32px">
            <div id="table">
                <div class="d-flex overflow-y-scroll">
                    <div class="h-32px w-12 d-flex justify-content-center align-items-center"></div>
                    <div
                        v-for="day in days"
                        :key="day"
                        class="b-1 border-white h-32px w-12 d-flex justify-content-center align-items-center bg-transparent"
                     >
                        <SmallText
                            dark-theme-color="light-grey"
                            transform="capitalize"
                        >
                            {{ day }}
                        </SmallText>
                    </div>
                </div>

                <div
                    class="overflow-y-scroll h-430px"
                    @mousedown="onMouseDown"
                    @mouseup="onMouseUp"
                >
                    <div
                        v-for="(hour, hourIndex) in hours"
                        :key="hour"
                        class="d-flex"
                    >
                        <div class="h-32px w-12 d-flex justify-content-center align-items-center">
                            <SmallText
                                dark-theme-color="light-grey"
                                transform="capitalize"
                            >
                                {{ hour }}
                            </SmallText>
                        </div>   

                        <div
                            v-for="(day, dayIndex) in days"
                            :key="day"
                            @click="switchData(data[dayIndex].id, data[dayIndex].hours[hourIndex].id)"
                            @mouseover="activateOnHover(data[dayIndex].id, data[dayIndex].hours[hourIndex].id)"
                            :class="'b-1 cursor-pointer border-white h-32px w-12 d-flex justify-content-center align-items-center ' + (data[dayIndex].hours[hourIndex].isActive ? 'bg-primary' : 'bg-transparent')"
                        >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";
    import NormalText from "@elements/Text/Normal/Index";
    import SmallText from "@elements/Text/Small/Index";

    export default {
        name: 'IndexPage',
        components: {
            SmallText,
            NormalText
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            value: {
                type: Array,
                default: () => []
            },
            dataValue: {
                type: Array,
                default: () => []
            },
            interval: {
                type: Number,
                default: 3600
            }
        },
        data() {
            return {
                isConfirmButtonLoading: false,
                isMouseDown: false,
                hours: [],
                data: [],
                counter: 0,
                days: ["min", "sen", "sel", "rab", "kam", "jum", "sab"]
            }
        },
        mounted() {
            this.setHours();
        },
        methods: {
            setData() {
                const data = [];
                let x, y;
                let row;
                for(x = 0; x < this.days.length;x++) {
                    row = {
                        id: x,
                        hours: []
                    };
                    for(y = 0; y < this.hours.length;y++) {
                        row.hours.push({
                            id: this.hours[y],
                            isActive: false
                        });
                    }
                    data.push(row)
                }
                this.data = data;
            },
            emitData() {
                const actived = [];
                const data = this.data;
                let x, y;
                for(x = 0;x < data.length;x++) {
                    for(y = 0;y < data[x].hours.length;y++) {
                        if(data[x].hours[y].isActive) {
                            actived.push({
                                weekday: data[x].id,
                                hour_minute: data[x].hours[y].id
                            });
                        }
                    }
                }
                this.$emit("change", actived);
                this.$emit("input", actived);
            },
            activateOnHover(dayId, hourId) {
                if(this.isMouseDown === true) {
                    this.switchData(dayId, hourId, true);        
                }
            },
            switchData(dayId, hourId, value = null) {
                const dayIndex = this.data.findIndex(value => value.id === dayId);
                if(dayIndex > -1) {
                    const hourIndex = this.data[dayIndex].hours.findIndex(value => value.id === hourId);
                    if(hourIndex > -1) {
                        if(value === null) {
                            this.data[dayIndex].hours[hourIndex].isActive = !this.data[dayIndex].hours[hourIndex].isActive;
                        } else {
                            this.data[dayIndex].hours[hourIndex].isActive = value;
                        }
                        this.counter++;
                    }
                }
                this.emitData();
            },
            setValue() {
                const items = this.dataValue;
                if(items.length > 0) {
                    items.forEach(value => {
                        const dayId = value.weekday;
                        const hourId = value.hour_minute.replace(/^(.{2}:.{2}).*/, "$1");
                        this.switchData(dayId, hourId, true);
                    });
                }
            },
            setHours() {
                const hours = [];
                const limit = 3600 * 24;
                const interval = this.interval;
                let buffer = 0;
                while(buffer < limit) {
                    hours.push(
                        moment.utc(1000 * buffer).format("HH:mm")
                    );
                    buffer += interval
                }
                this.hours = hours;
                this.setData();
                this.setValue();
            },
            onMouseUp() {
                this.isMouseDown = false;
            },
            onMouseDown() {
                this.isMouseDown = true;
            },
        }
    }
</script>