<template>
    <Modal
        @open="onOpen"
        @load="onModalLoad"
        title="Tambah Backdrop"
        :width="40"
        :height="400"
        :use-confirm-button="false"
        :use-portal="false"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div>
                <FileInput
                    key="fi"
                    :max-size="2000000"
                    :margin-auto="true"
                    accept="image/*"
                    v-model="data"
                />
                <div>
                    <Button
                        variant="primary"
                        label="Simpan"
                        :disabled="!data"
                        :is-loading="isConfirmButtonLoading"
                        @click="onConfirm"
                    />
                    <Button
                        variant="outline-dark-grey"
                        label="Batal"
                        :margin-top="16"
                        @click="closeModal"
                    />
                </div>
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import FileInput from "@elements/Input/File/Index";
    import Button from "@elements/Button/Index";
    import StageBackdrop from "@endpoints/Event/StageBackdrop";

    export default {
        name: 'IndexPage',
        components: {
            FileInput,
            Button,
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
                data: null,
                isConfirmButtonLoading: false,
                classState: "",
                closeModal: () => {},
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
            onOpen() {
            },
            async onConfirm() {
                let listData = [];
                this.isConfirmButtonLoading = true;
                try {
                    await StageBackdrop.store(
                        this.$store.state.Event.visited.id,
                        this.data
                    );
                    listData = await StageBackdrop.list(this.$store.state.Event.visited.id);
                    if(listData.length === 1) {
                        await StageBackdrop.switchActived(
                            this.$store.state.Event.visited.id,
                            listData[0].id,
                            false
                        );
                    }
                    this.$emit("confirm", this.data)
                    this.closeModal();
                } catch {

                }
                this.isConfirmButtonLoading = false;
            }
        }
    }
</script>