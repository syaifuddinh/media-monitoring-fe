<template>
    <Modal
        @confirm="confirm"
        title=""
        :width="40"
        :height="518"
        confirm-button-label="Simpan"
        confirm-button-variant="primary"
        :is-show-cancel-button="false"
        :is-show-confirm-button="isShowConfirmButton"
        :is-confirm-button-disabled="isLoading"
        align="start"
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
                <LinkSourceForm
                    v-if="isLinkActive === true"
                    @change="onExternalVideoChange"
                />
                <ComputerSourceForm
                    v-if="isComputerActive === true"
                    @change="onInternalVideoChange"
                    @progress="onProgress"
                />
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import TertiaryTab from "@elements/Tab/Tertiary/Index";
    import Video from "@endpoints/Video";
    import EventVideo from "@endpoints/Event/Video";
    import LinkSourceForm from "./LinkSourceForm/Index";
    import ComputerSourceForm from "./ComputerSourceForm/Index";

    export default {
        name: 'IndexPage',
        components: {
            Modal,
            TertiaryTab,
            LinkSourceForm,
            ComputerSourceForm
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
                        title: "Link Video"
                    },
                    {
                        title: "Video Dari Komputer"
                    }
                ],
                indexTab: 0,
                isShowConfirmButton: true,
                classState: "",
                isLoading: false,
                counter: 1,
                isLinkActive: true,
                isComputerActive: false,
                closeModal: () => {},
                isShowMeetType: false,
                name: "",
                external: {}, 
                internal: {}, 
                links: [
                    {
                        title: "Konect Meet",
                        key: "meet",
                        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
                        image: "meet.png"
                    },
                    {
                        title: "Konect Conferences",
                        key: "conference",
                        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
                        image: "conference.png"
                    }
                ]
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            setIndexTab(index) {
                this.indexTab = index;
                if(index === 0) {
                    this.openLink();
                } else if(index === 1) {
                    this.openComputer();
                }
            },
            openComputer() {
                this.isComputerActive = true;
                this.isLinkActive = false;
                this.counter += 1;
                this.onProgress(0);
            },
            openLink() {
                this.isComputerActive = false;
                this.isLinkActive = true;
                this.counter += 1;
                this.onProgress(100);
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
                let endpoint = null;
                if(this.$store.state.Event.visited.id) {
                    endpoint = EventVideo;
                } else {
                    endpoint = Video;
                }
                this.isLoading = true;
                console.log(this.external);
                if(this.isLinkActive === true) {
                    const { name, url } = this.external;
                    await endpoint.storeExternalVideo(name, url);
                } else if(this.isComputerActive === true) {
                    const { name, fileName, fileSize } = this.internal;
                    await endpoint.storeInternalVideo(name, fileName, fileSize);
                }       
                this.isLoading = false;
                this.$emit("submit");
                closeModal();
            }
        }
    }
</script>