<template>
    <Modal
        @open="onOpen"
        @load="onModalLoad"
        title="Tambah Link"
        :width="40"
        :height="330"
        :use-confirm-button="false"
        :use-portal="false"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div class="pt-16px">
                <TertiaryTab
                    :items="tabs"
                    @click="setIndexTab"
                />
                <div class="mb-16px">
                    <div v-if="indexTab === 0">
                        <EventDestinationInput />
                    </div>
                    <div v-if="indexTab === 1">
                        <TextInput
                            label="Link"
                            placeholder="https://"
                            v-model="url"
                        />
                    </div>
                </div>
                <Button
                    label="Simpan"
                    variant="primary"
                    :disabled="!url"
                    @click="onConfirm"
                />
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import Button from "@elements/Button/Index";
    import TertiaryTab from "@elements/Tab/Tertiary/Index";
    import TextInput from "@elements/Input/Text/Index";
    import EventDestinationInput from "@elements/Input/EventDestination/Index";

    export default {
        name: 'IndexPage',
        components: {
            TertiaryTab,
            TextInput,
            EventDestinationInput,
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
                tabs: [
                    {
                        title: "Link Event"
                    },
                    {
                        title: "Eksternal Link"
                    }
                ],
                indexTab: 0,
                data: null,
                isConfirmButtonLoading: false,
                classState: "",
                closeModal: () => {},
                url: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            setIndexTab(index) {
                this.indexTab = index;
                if(index === 0) {
                    this.url = "";
                }
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
                this.$emit("confirm", this.url)
                this.closeModal();
            }
        }
    }
</script>