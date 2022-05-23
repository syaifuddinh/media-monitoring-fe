<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        title="Info Event"
        :width="60"
        :height="526"
        confirm-button-label="Simpan"
        confirm-button-variant="primary"
        cancel-button-variant="dark-grey"
        :is-show-cancel-button="false"
        :is-show-times-icon="true"
        :is-confirm-button-disabled="!name"
        :is-confirm-button-loading="isConfirmButtonLoading"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div>
                <TextInput
                    label="Nama Event"
                    placeholder="Nama Event"
                    :margin-auto="true"
                    v-model="name"
                />
                <div class="row">
                    <div
                        v-if="eventSlug === 'schedule' || eventSlug === 'conferences'"
                        class="col-md-6 col-xs-12"
                    >
                        <TextInput
                            label="Jam Mulai"
                            type="time"
                            placeholder="Jam Mulai"
                            :margin-auto="true"
                            v-model="startTime"
                        />                    
                    </div>
                    <div
                        v-if="eventSlug === 'schedule' || eventSlug === 'conferences'"
                        class="col-md-6 col-xs-12"
                    >
                        <TextInput
                            label="Jam Akhir"
                            type="time"
                            placeholder="Jam Akhir"
                            :margin-auto="true"
                            v-model="endTime"
                        />
                    </div>
                </div>

                <div
                    v-if="eventSlug === 'conferences'"
                    class="row"
                >
                    <div
                        class="col-md-6 col-xs-12"
                    >
                        <TextInput
                            label="Tanggal Mulai"
                            type="date"
                            placeholder="Tanggal Mulai"
                            :margin-auto="true"
                            v-model="startDate"
                        />                    
                    </div>
                    <div
                        class="col-md-6 col-xs-12"
                    >
                        <TextInput
                            label="Tanggal Akhir"
                            type="date"
                            placeholder="Tanggal Akhir"
                            :margin-auto="true"
                            v-model="endDate"
                        />
                    </div>
                </div>

                <TextInput
                    v-if="eventSlug === 'schedule'"
                    label="Tanggal Meeting"
                    type="date"
                    placeholder="Tanggal Meeting"
                    :margin-auto="true"
                    v-model="startDate"
                />

                <TimezoneInput
                    v-if="eventSlug === 'schedule' || eventSlug === 'conferences' || eventSlug === 'booking'"
                    v-model="timezone"
                />

            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import TextInput from "@elements/Input/Text/Index";
    import TimezoneInput from "@elements/Input/Timezone/Index";
    import Event from "@endpoints/Event";

    export default {
        name: 'IndexPage',
        components: {
            TextInput,
            TimezoneInput,
            Modal
        },
        computed: {
            eventSlug() {
                return this.$store.state.Event.visited.eventTypeSlug
            }
        },
        props: {
            isShowCancelButton: {
                type: Boolean,
                default: true
            },
            isShowTimesIcon: {
                type: Boolean,
                default: true
            },
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                isConfirmButtonLoading: false,
                classState: "",
                closeModal: () => {},
                name: "",
                startDate: "",
                endDate: "",
                timezone: "",
                startTime: "",
                endTime: "",
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            openComputer() {
                this.isComputerActive = true;
                this.isLinkActive = false;
                this.counter += 1;
            },
            openLink() {
                this.isComputerActive = false;
                this.isLinkActive = true;
                this.counter += 1;
            },
            onModalLoad(close) {
                this.closeModal = close;
            },
            openPanel(key) {
            },
            setClassState() {
                let classState = "";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            },
            onClose() {
                this.$emit("close");
            },
            onOpen() {
                this.name = this.$store.state.Event.visited.name;
                this.startDate = this.$store.state.Event.visited.startDateTime;
                this.endDate = this.$store.state.Event.visited.endDateTime;
                this.startTime = this.$store.state.Event.visited.startTimeLabel;
                this.endTime = this.$store.state.Event.visited.endTimeLabel;
                this.timezone = this.$store.state.Event.visited.tz;
            },
            async onConfirm(closeModal) {
                const name = this.name
                const timezone = this.timezone
                const startDate = this.startDate
                const startTime = this.startTime
                const endDate = this.eventSlug === "schedule" ? this.startDate : this.endDate
                const endTime = this.endTime
                this.isConfirmButtonLoading = true;
                try {
                    if(this.eventSlug === "booking") {
                        await Event.updateInfo(name, timezone)
                    } else {
                        await Event.updateInfo(name, timezone, startDate, startTime, endDate, endTime)
                    }
                    await Event.show(this.$store.state.Event.visited.id);
                    closeModal();
                    this.$emit("confirm")
                } catch {

                }
                this.isConfirmButtonLoading = false;
            }
        }
    }
</script>