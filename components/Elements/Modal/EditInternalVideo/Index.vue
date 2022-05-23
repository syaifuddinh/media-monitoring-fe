<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        title="Ubah Nama"
        :width="40"
        :height="256"
        confirm-button-label="Ubah"
        confirm-button-variant="primary"
        cancel-button-variant="dark-grey"
        :is-confirm-button-loading="isConfirmButtonLoading"
        :is-confirm-button-disabled="!name"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div>
                <TextInput
                    label="Nama Video"
                    placeholder="Nama Video"
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
    import Organization from "@endpoints/Organization";

    export default {
        name: 'IndexPage',
        components: {
            TextInput,
            Modal
        },
        props: {
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
                this.name = "";
            },
            onClose() {
                this.closeModal();
                this.$emit("close");
            },
            onOpen() {
                this.name = "";
                this.$emit("open");
            },
            onLoad(closeModal) {
                this.closeModal = closeModal
            },
            async onConfirm(closeModal) {
                this.isConfirmButtonLoading = true;
                await Organization.store(this.name)
                this.isConfirmButtonLoading = false;
                closeModal();
                this.$emit("confirm")
            }
        }
    }
</script>