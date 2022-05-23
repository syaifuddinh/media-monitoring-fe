<template>
    <div>
        <div class=" overflow-y-scroll overflow-x-hidden">
            
            <div class="row">
                <div class="col-md-1 d-flex justify-content-center align-items-center">
                    <Icon
                        variant="fontawesome"
                        src="arrow-down"
                        dark-theme-color="dark-grey"
                        color="dark-grey"
                        :size="32"
                    />
                </div>
                <div class="col-md-11 col-xs-12">
                    <div class="d-flex justify-content-center align-items-center h-88px bg-light-dark b-1 border-white">
                        <div class="d-flex flex-column align-items-center">
                            <SmallText
                                color="white"
                                display="block"
                                :margin-bottom="1"
                            >
                                {{ day }}
                            </SmallText>
                            <CircleFrame
                                background="primary"
                                :width="24"
                                :height="24"
                            >
                                {{ date }}
                            </CircleFrame>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="overflow-y-scroll overflow-x-hidden h-800px">
            <div
                v-for="value in hours"
                :key="value.value"
                class="row"
            >
                <div class="col-md-1 d-flex justify-content-center align-items-center">
                    <ExtraSmallText
                        dark-theme-color="dark-grey"
                    >
                        {{ value.value }}
                    </ExtraSmallText>
                </div>
                <div class="col-md-11 col-xs-12">
                    <div class="h-88px b-1 border-white">
                        <div
                            v-for="event in value.schedules"
                            :key="event.id"
                            @click="openSessionModal($event)"
                            class="bg-success bb-1 border-dark cursor-pointer"
                        >
                            <EditSessionModal
                                :id="event.id"
                                @change-button-clicked="onEditSession"
                            >
                                    <ExtraSmallText
                                        :padding="8"
                                        display="block"
                                        color="cherry"
                                        dark-theme-color="cherry"
                                    >
                                        {{ event.name }}
                                    </ExtraSmallText>
                            </EditSessionModal>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment-timezone";
    import Icon from "@elements/Icon/Index";
    import CircleFrame from "@elements/CircleFrame/Index";
    import SmallText from "@elements/Text/Small/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import EditSessionModal from "@elements/Modal/EditSession/Index";
    import Session from "@endpoints/Session";

    export default {
        name: 'IndexPage',
        components: {
            Icon,
            EditSessionModal,
            SmallText,
            ExtraSmallText,
            CircleFrame
        },
        props: {
            initialDate: {
                type: String,
                required: true
            },
            readableDate: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                day: "",
                date: "",
                classState: "",
                iconSrc: "",
                hours: [],
                items: [],
                formData: {},
                secondaryClassState: ""
            }
        },
        async mounted() {
            this.setInitialDate();
            if(this.$store.state.Event.visited.id) {
                await this.setSchedule();
                this.setHours();
            }
        },
        methods: {
            onEditSession(data) {
                this.formData = data;
                this.$emit("edit", data);
            },
            openSessionModal(e) {
                const trigger = e.target.querySelector(".modal-trigger");
                if(trigger) {
                    trigger.click();
                }
            },
            async setSchedule() {
                try {
                    const items = await Session.list(
                        this.$store.state.Event.visited.id,
                        this.$store.state.Event.visited.tz
                    );
                    this.items = items; 
                } catch {

                }
            },
            setInitialDate() {
                this.day = moment(this.initialDate).format("dddd");
                this.date = moment(this.initialDate).format("DD");
            },
            setHours() {
                const initialDate = moment(this.initialDate)
                .tz(this.$store.state.Event.visited.tz)
                .format("YYYY-MM-DD");
                const items = this.items;
                const hours = [];
                const limit = 3600 * 24;
                const interval = 3600;
                let buffer = 0;
                let hour = "";
                let currentTime = 0;
                let schedules = [];
                while(buffer < limit) {
                    currentTime = 1000 * buffer;
                    schedules = [];
                    items.forEach(value => {
                        let startHour = parseInt(
                            moment(value.sessionStart)
                            .tz(this.$store.state.Event.visited.tz)
                            .format("HH")
                        );
                        let endHour = parseInt(
                            moment(value.sessionEnd)
                            .tz(this.$store.state.Event.visited.tz)
                            .format("HH")
                        );
                        const currentDate = moment(value.sessionStart)
                        .tz(this.$store.state.Event.visited.tz)
                        .format("YYYY-MM-DD");
                        if(currentDate === initialDate) {
                            startHour *= 3600 * 1000;
                            endHour *= 3600 * 1000;
                            if(currentTime >= startHour && currentTime <= endHour) {
                                schedules.push({
                                    id: value.id,
                                    name: value.name,
                                    startTime: value.startTime,
                                    endTime: value.endTime,
                                    description: value.description
                                });
                            }
                        }
                    });
                    hour = moment
                    .utc(currentTime)
                    .format("HH:mm");
                    hours.push({
                        value: hour,
                        schedules
                    });
                    console.log(schedules);
                    buffer += interval
                }
                this.hours = hours;
            }
        }
    }
</script>