<template>
    <Transition>
        <div>
            <div ref="summaryModal">
                <EventSummaryModal
                    :id="eventId"
                    :key="eventId"
                />
            </div>
            <div :class="'calendar v-enter-active ' + (isShow ? '' : 'v-enter')">
                <div :class="classState">
                    <div ref="periodInput">
                        <PeriodInput
                            v-model="period"
                            @change="onPeriodChange"
                        />
                    </div>
                    <FullCalendar
                        ref="calendar"
                        :options="options"
                    />
                    <Schedule
                        v-if="period === 'daily' && currentDate"
                        :key="currentDate"
                        :initial-date="currentDate"
                        @edit="onEditSession"
                    />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>    
    import FullCalendar from '@fullcalendar/vue';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import PeriodInput from '@elements/Input/Period/Index';
    import Schedule from '@elements/Schedule/Index';
    import EventSummaryModal from '@elements/Modal/EventSummary/Index';

    export default {
        name: 'IndexPage',
        components: {
            FullCalendar,
            EventSummaryModal,
            Schedule,
            PeriodInput
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            events: {
                type: Array,
                default: () => []
            },
            initialPeriod: {
                type: String,
                default: "month"
            },
            initialDate: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                eventId: null,
                period: this.initialPeriod,
                options: {
                    displayEventTime: false,
                    events: this.events,
                    initialDate: (this.initialDate ? this.initialDate : new Date()),
                    allDaySlot: false,
                    headerToolbar: {
                        left: "title,prev,next",
                        right: "today,dayGridMonth,timeGridWeek,timeGridDay"
                    },
                    buttonText: {
                        today: "Hari ini"
                    },
                    plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
                    initialView: 'dayGridMonth',
                    eventBackgroundColor: "#5FC790",
                    eventTextColor: "#2D014B",
                    eventDisplay: "block",
                    eventClick: ({ event }) => {
                        const id = event._def.publicId;
                        this.eventId = id;
                        setTimeout(() => {
                            const modal = this.$refs.summaryModal;
                            let trigger = null;
                            if(modal) {
                                trigger = modal.querySelector(".modal-trigger");
                                if(trigger) {
                                    trigger.click();
                                }
                            }
                        }, 400);
                    }
                },
                classState: "",
                currentDate: null,
                isShow: false,
                dayInWeek: []
            }
        },
        mounted() {
            this.setClassState();
            this.setCalendarStyle();
            this.setPeriodStyle();
            this.setEvents();
            this.onLoad();
            setTimeout(() => {
                this.getCalendar();
                this.onPeriodChange();
            }, 300);
        },
        methods: {
            onLoad() {
                setTimeout(() => {
                    this.isShow = true;
                }, 700);
            },
            onEditSession(data) {
                this.$emit("edit", data);
            },
            onPeriodChange() {
                let button = null;
                let table = null;
                table = document.querySelector(".fc-view-harness");
                switch(this.period) {
                    case "month":
                        button = document.querySelector(".fc-dayGridMonth-button");
                        table.classList.remove("d-none");
                        if(button) {
                            button.click();
                        }
                        break;
                    case "week":
                        button = document.querySelector(".fc-timeGridWeek-button");
                        table.classList.remove("d-none");
                        if(button) {
                            button.click();
                        }
                        break;
                    case "daily":
                        button = document.querySelector(".fc-timeGridDay-button");
                        table.classList.add("d-none");
                        if(button) {
                            button.click();
                        }
                        break;
                }

                const monthButton = document.querySelector(".fc-dayGridMonth-button");
                const weekButton = document.querySelector(".fc-timeGridWeek-button");
                const dailyButton = document.querySelector(".fc-timeGridDay-button");
                if(monthButton) {
                    monthButton.classList.add("d-none");
                }
                if(weekButton) {
                    weekButton.classList.add("d-none");
                }
                if(dailyButton) {
                    dailyButton.classList.add("d-none");
                }
            },
            getCalendar() {
                const calendar = this.$refs.calendar;
                const data = calendar ? calendar.getApi() : null;
                if(data) {
                    const currentDate = data.currentData.currentDate;
                    this.currentDate = currentDate;
                    this.$emit("date-change", currentDate);
                }
            },
            setEvents() {
                const prevButton = document.querySelector(".fc-prev-button");
                const nextButton = document.querySelector(".fc-next-button");
                if(prevButton) {
                    prevButton.addEventListener("click", () => {
                        this.getCalendar();
                    });
                }
                if(nextButton) {
                    nextButton.addEventListener("click", () => {
                        this.getCalendar();
                    });
                }
            },
            setPeriodStyle() {
                setTimeout(() => {
                    const input = this.$refs.periodInput;
                    const container = document.querySelector(".fc-toolbar-chunk:nth-child(3)");
                    const monthButton = document.querySelector(".fc-dayGridMonth-button");
                    const weekButton = document.querySelector(".fc-timeGridWeek-button");
                    const dailyButton = document.querySelector(".fc-timeGridDay-button");
                    if(container && input) {
                        container.appendChild(input);
                        container.classList.add("d-flex");
                    }
                    if(monthButton) {
                        monthButton.classList.add("d-none");
                    }
                    if(weekButton) {
                        weekButton.classList.add("d-none");
                    }
                    if(dailyButton) {
                        dailyButton.classList.add("d-none");
                    }
                }, 200);
            },
            setCalendarStyle() {
                setTimeout(() => {
                    const titleLabel = document.querySelector(".fc-toolbar-title");
                    const prevButton = document.querySelector(".fc-prev-button");
                    const nextButton = document.querySelector(".fc-next-button");
                    const leftIcon = document.querySelector(".fc-icon-chevron-left");
                    const rightIcon = document.querySelector(".fc-icon-chevron-right");
                    const parent = prevButton ? prevButton.parentElement : null;
                    if(titleLabel) {
                        titleLabel.classList.add("mr-3");
                    }
                    if(parent) {
                        parent.className = "d-flex align-items-center";
                    }
                    if(prevButton) {
                        prevButton.classList.add("mr-2");
                        prevButton.classList.add("bg-dark-grey");
                        prevButton.classList.add("hover-bg-dark-grey");
                        prevButton.classList.add("text-dark");
                    }
                    if(nextButton) {
                        nextButton.classList.add("bg-dark-grey");
                        nextButton.classList.add("hover-bg-dark-grey");
                        nextButton.classList.add("text-dark");
                    }
                    if(leftIcon) {
                        leftIcon.className = "fa fa-arrow-left";
                    }
                    if(rightIcon) {
                        rightIcon.className = "fa fa-arrow-right";
                    }
                }, 200);
            },
            setClassState() {
                let classState = "";
                classState += (this.$store.state.Base.isUseDarkTheme ? "dark-theme" : "") + " ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>