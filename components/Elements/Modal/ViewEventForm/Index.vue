<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        title="Custom Form"
        :width="40"
        :height="566"
        confirm-button-label="Sesuaikan Pendaftaran"
        confirm-button-variant="primary"
        :is-show-cancel-button="false"
        :is-show-times-icon="true"
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
                    v-for="value in items"
                    :key="value.parameter"
                    :readonly="true"
                    :placeholder="value.parameter + (value.isRequired ? '*' : '')"
                    :margin-auto="true"
                />
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import TextInput from "@elements/Input/Text/Index";
    import Organization from "@endpoints/Organization";
    import CustomForm from "@endpoints/Event/CustomForm";

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
                items: [],
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
            async setItems() {
                const items = await CustomForm.list();
                this.items = items;
            },
            onOpen() {
                this.setItems();
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