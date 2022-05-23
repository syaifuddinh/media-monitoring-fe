<template>
    <Modal
        @open="onOpen"
        @load="onModalLoad"
        title="Upload Background"
        :width="40"
        :height="300"
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
                <div class="d-flex">
                    <Button
                        variant="dark-grey"
                        label="Batal"
                        :margin-right="16"
                        @click="closeModal"
                    />
                    <Button
                        variant="primary"
                        label="Upload"
                        :disabled="!data"
                        @click="onConfirm"
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
            onOpen() {
                this.name = "";
            },
            onConfirm() {
                this.$emit("confirm", this.data)
                this.closeModal();
            }
        }
    }
</script>