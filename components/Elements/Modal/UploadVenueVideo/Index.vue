<template>
    <Modal
        @open="onOpen"
        @load="onModalLoad"
        @close="onClose"
        title="Upload Video"
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
                    :margin-auto="true"
                    accept="video/mp4"
                    variant="tus"
                    extension="mp4"
                    upload-description="Jatuhkan file video di sini atau klik untuk mengunggah"
                    v-model="data"
                    :file-value="fileValue"
                />
                <div class="d-flex">
                    <Button
                        variant="dark-grey"
                        label="Batal"
                        :margin-right="16"
                        @click="onClose"
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
            fileValue: {
                type: Object,
                default: null
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
            },
            onClose() {
                
                this.$emit("close")
                // this.closeModal();
            }
        }
    }
</script>