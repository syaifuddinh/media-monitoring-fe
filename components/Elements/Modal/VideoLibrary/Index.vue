<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        @load="onModalLoad"
        title="Tambah Video Library"
        :width="60"
        :height="570"
        :use-confirm-button="false"
        align="start"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div class="pt-16px">
                <TextInput
                    placeholder="Cari"
                    right-icon-variant="fontawesome"
                    right-icon="search"
                    v-model="name"
                />
                <div class="overflow-y-scroll overflow-x-hidden h-350px pr-16px mt-8px">
                    <div class="row">
                        <div
                            v-for="value in items"
                            :key="value.id"
                            class="col-md-4 col-xs-12"
                        >
                            <div class="w-100 h-24px"></div>
                            <Menu
                                :title="value.title"  
                                @click="switchData($event, value.id)"
                            />
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-32px">
                    <Button
                        label="Tambah"
                        :width="116"
                        :disabled="data.length === 0"
                        :is-loading="isConfirmButtonLoading"
                        @click="onConfirm"
                    />
                </div>
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import Button from "@elements/Button/Index";
    import TextInput from "@elements/Input/Text/Index";
    import Video from "@endpoints/Video";
    import EventVideo from "@endpoints/Event/Video";
    import Menu from "./Menu/Index";

    export default {
        name: 'IndexPage',
        components: {
            Menu,
            TextInput,
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
                isConfirmButtonLoading: false,
                classState: "",
                closeModal: () => {},
                items: [],
                data: [],
                name: ""
            }
        },
        mounted() {
            this.setClassState();
            this.setItems();
        },
        methods: {
            async setItems() {
                const items = await Video.list();
                this.items = items;
            },
            switchData(isActive, id) {
                if(isActive === true) {
                    this.data.push(id);
                } else {
                    this.data = this.data.filter(value => value !== id);
                }
            },
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
                this.$emit("close");
            },
            onOpen() {
                this.name = "";
            },
            async onConfirm() {
                this.isConfirmButtonLoading = true;
                await EventVideo.storeExistingVideo(
                    this.$store.state.Event.visited.id,
                    this.data
                );
                this.isConfirmButtonLoading = false;
                this.$emit("submit")
                this.closeModal();
            }
        }
    }
</script>