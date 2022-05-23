<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        @close="onClose"
        title="Atur Ketersediaan"
        button-variant="secondary"
        :width="80"
        :height="640"
        confirm-button-label="Simpan"
        confirm-button-variant="primary"
        cancel-button-variant="dark-grey"
        :is-show-cancel-button="false"
        :use-confirm-button="false"
        :is-confirm-button-loading="isConfirmButtonLoading"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <Availibility
                :interval="interval"
                :key="interval"
                :data-value="data"
                @change="onDataChange"
            />
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import Availibility from "@elements/Availibility/Index";

    export default {
        name: 'IndexPage',
        components: {
            Modal,
            Availibility
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            interval: {
                type: Number,
                default: 3600
            }
        },
        data() {
            return {
                data: [],
                classState: "",
                closeModal: () => {}
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
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
            onOpen() {
                this.name = "";
            },
            onDataChange(data) {
                this.data = data;
            },
            onConfirm(closeModal) {
                const data = this.data;
                closeModal();
                this.data = data;
                this.$emit("confirm", data);
            }
        }
    }
</script>