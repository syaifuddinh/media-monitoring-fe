<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        title="Contact Person"
        :width="40"
        :height="346"
        confirm-button-label="Simpan"
        confirm-button-variant="primary"
        :is-show-cancel-button="false"
        :is-show-times-icon="true"
        :is-confirm-button-disabled="!email || !phone"
        :is-confirm-button-loading="isConfirmButtonLoading"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <TextInput
                label="Email"
                placeholder="Email"
                :margin-auto="true"
                v-model="email"
            />
            <TextInput
                label="No. Handphone"
                placeholder="No. Handphone"
                :margin-auto="true"
                v-model="phone"
            />
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import TextInput from "@elements/Input/Text/Index";
    import ContactPerson from "@endpoints/Event/ContactPerson";
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
                email: "",
                phone: ""
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
                this.email = this.$store.state.Event.visited.contactPersonEmail;
                this.phone = this.$store.state.Event.visited.contactPersonPhone;
            },
            async onConfirm(closeModal) {
                this.isConfirmButtonLoading = true;
                await ContactPerson.store(this.email, this.phone)
                this.isConfirmButtonLoading = false;
                Event.show(this.$store.state.Event.visited.id);
                closeModal();
                this.$emit("confirm")
            }
        }
    }
</script>