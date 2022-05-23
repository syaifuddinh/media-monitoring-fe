<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        title="Ubah jumlah pemenang"
        :width="40"
        :height="266"
        confirm-button-label="Simpan"
        confirm-button-variant="primary"
        :is-show-cancel-button="false"
        :is-show-times-icon="true"
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
                    label="Jumlah Pemenang"
                    placeholder="Jumlah Pemenang"
                    type="number"
                    :margin-auto="true"
                    v-model="qty"
                />
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import TextInput from "@elements/Input/Text/Index";
    import Leaderboard from "@endpoints/Event/Leaderboard";
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
                qty: 0
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
                this.qty = this.$store.state.Event.visited.leaderboard_winner;
            },
            async onConfirm(closeModal) {
                this.isConfirmButtonLoading = true;
                try {
                    await Leaderboard.setWinnerTotal(
                        this.$store.state.Event.visited.id,
                        this.qty
                    );
                    Event.show(
                        this.$store.state.Event.visited.id
                    );
                    closeModal();
                    this.$emit("confirm")

                } catch {

                }
                this.isConfirmButtonLoading = false;
            }
        }
    }
</script>