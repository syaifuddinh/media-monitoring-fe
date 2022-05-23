<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        title="Deskripsi Event"
        :width="50"
        :height="510"
        confirm-button-label="Simpan"
        confirm-button-variant="primary"
        :is-show-cancel-button="false"
        :is-show-times-icon="true"
        :is-confirm-button-disabled="!description"
        :is-confirm-button-loading="isConfirmButtonLoading"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div>
                <TextareaInput
                    label="Deskripsi"
                    placeholder="Deskripsi"
                    :margin-auto="true"
                    :height="300"
                    v-model="description"
                />
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import TextareaInput from "@elements/Input/Textarea/Index";
    import Event from "@endpoints/Event";

    export default {
        name: 'IndexPage',
        components: {
            TextareaInput,
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
                this.description = this.$store.state.Event.visited.description;
            },
            async onConfirm(closeModal) {
                this.isConfirmButtonLoading = true;
                try {
                    await Event.updateDescription(this.description)
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