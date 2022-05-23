<template>
    <Modal
        @confirm="confirm"
        title=""
        :width="40"
        :height="500"
        confirm-button-label="Tambah & Kirim Undangan"
        confirm-button-variant="primary"
        :is-show-cancel-button="false"
        :is-show-confirm-button="isShowConfirmButton"
        :is-confirm-button-disabled="(indexTab === 1 && (!role || emails.length === 0))"
        :is-confirm-button-loading="isLoading"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div>
                <TertiaryTab
                    :items="tabs"
                    :defaultIndex="indexTab"
                    @click="setIndexTab"
                />
                <div v-if="indexTab === 0">
                    <Button
                        variant="link-primary"
                        label="Download Template Disini"
                        :margin-bottom="16"
                        :width="225"
                    />
                    <FileInput
                        v-model="file"
                    />
                </div>
                <div v-if="indexTab === 1">
                    <MultipleTextInput
                        label="Email"
                        placeholder="Email Peserta"
                        v-model="emails"
                        :margin-auto="true"
                    />
                    <AttendeeRoleInput
                        v-model="role"
                    />
                </div>
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import TertiaryTab from "@elements/Tab/Tertiary/Index";
    import FileInput from "@elements/Input/File/Index";
    import MultipleTextInput from "@elements/Input/MultipleText/Index";
    import AttendeeRoleInput from "@elements/Input/AttendeeRole/Index";
    import Button from "@elements/Button/Index";
    import Attendee from "@endpoints/Event/Attendee";

    export default {
        name: 'IndexPage',
        components: {
            AttendeeRoleInput,
            MultipleTextInput,
            FileInput,
            Modal,
            Button,
            TertiaryTab
        },
        props: {
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                tabs: [
                    {
                        title: "Import Data",
                    },
                    {
                        title: "Tambah Manual",
                    }
                ],
                file: null,
                indexTab: 0,
                isShowConfirmButton: true,
                classState: "",
                isLoading: false,
                counter: 1,
                isLinkActive: true,
                isComputerActive: false,
                closeModal: () => {},
                isShowMeetType: false,
                role: null,
                emails: [],
                name: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            setIndexTab(index) {
                this.indexTab = index;
            },
            onModalLoad(close) {
                this.closeModal = close;
            },
            openPanel(key) {
            },
            onExternalVideoChange(e) {
                this.external = e;
            },
            onInternalVideoChange(e) {
                this.internal = e;
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
            onProgress(percent = 0) {
                const percentage = parseInt(window.Math.round(percent));
                this.isShowConfirmButton = percentage === 100;
            },
            async confirm(closeModal) {
                if(this.indexTab === 1) {
                    this.isLoading = true;
                    await Attendee.store(this.emails, this.role);
                    this.isLoading = false;
                    this.$emit("submit");
                    closeModal();
                }
            }
        }
    }
</script>