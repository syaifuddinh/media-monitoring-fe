<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        :title="title"
        :width="50"
        :height="580"
        confirm-button-label="Simpan"
        confirm-button-variant="primary"
        :is-show-cancel-button="false"
        :is-show-times-icon="true"
        :is-confirm-button-disabled="!name || !startTime || !endTime"
        :is-confirm-button-loading="isConfirmButtonLoading"
        align="start"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <TextInput
                label="Nama Sesi"
                placeholder="Nama Sesi"
                :margin-auto="true"
                v-model="name"
            />

            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <TextInput
                        label="Jam Mulai"
                        type="time"
                        placeholder="Jam Mulai"
                        :margin-auto="true"
                        v-model="startTime"
                    />                    
                </div>
                <div class="col-md-6 col-xs-12">
                    <TextInput
                        label="Jam Akhir"
                        type="time"
                        placeholder="Jam Akhir"
                        :margin-auto="true"
                        v-model="endTime"
                    />
                </div>
            </div>

            <SpeakersInput
                v-model="speakers"
            />

            <TextareaInput
                label="Deskripsi"
                additional-label="(opsional)"
                placeholder="Deskripsi"
                :margin-auto="true"
                v-model="description"
            />
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import TextInput from "@elements/Input/Text/Index";
    import SpeakersInput from "@elements/Input/Speakers/Index";
    import TextareaInput from "@elements/Input/Textarea/Index";
    import Session from "@endpoints/Session";

    export default {
        name: 'IndexPage',
        components: {
            TextInput,
            SpeakersInput,
            TextareaInput,
            Modal
        },
        props: {
            title: {
                type: String,
                default: "Tambah Sesi"
            },
            date: {
                type: String,
                required: true
            },
            idValue: {
                type: String,
                default: ""
            },
            nameValue: {
                type: String,
                default: ""
            },
            descriptionValue: {
                type: String,
                default: ""
            },
            startTimeValue: {
                type: String,
                default: ""
            },
            endTimeValue: {
                type: String,
                default: ""
            },
            speakersValue: {
                type: Array,
                default: () => []
            },
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
                speakers: [],
                startTime: "",
                endTime: "",
                description: ""
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
                this.name = this.nameValue;
                this.startTime = this.startTimeValue;
                this.endTime = this.endTimeValue;
                this.speakers = this.speakersValue;
                this.description = this.descriptionValue;
                this.$emit("open");
            },
            async onConfirm(closeModal) {
                const date = this.date;
                this.isConfirmButtonLoading = true;
                if(this.idValue) {
                    await Session.update(
                        this.idValue,
                        this.name,
                        date,
                        this.startTime,
                        this.endTime,
                        this.description,
                        this.speakers
                    );
                } else {
                    await Session.store(
                        this.name,
                        date,
                        this.startTime,
                        this.endTime,
                        this.description,
                        this.speakers
                    );
                }
                closeModal();
                this.isConfirmButtonLoading = false;
                this.$emit("confirm");
            }
        }
    }
</script>