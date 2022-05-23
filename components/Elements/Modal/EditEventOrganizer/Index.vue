<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        title="Event Organizer"
        :width="40"
        :height="266"
        confirm-button-label="Simpan"
        confirm-button-variant="primary"
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
                    label="Nama Organizer"
                    placeholder="Nama Organizer"
                    :margin-auto="true"
                    v-model="name"
                />
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import TextInput from "@elements/Input/Text/Index";
    import Organizer from "@endpoints/Event/Organizer";
    import Event from "@endpoints/Event";


    export default {
        name: 'IndexPage',
        components: {
            TextInput,
            Modal
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
                name: ""
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
                this.name = this.$store.state.Event.visited.organizerName;
            },
            async onConfirm(closeModal) {
                this.isConfirmButtonLoading = true;
                try {
                    await Organizer.store(this.name)
                    Event.show(this.$store.state.Event.visited.id);
                    closeModal();
                    this.$emit("confirm")
                } catch {

                }
                this.isConfirmButtonLoading = false;
            }
        }
    }
</script>