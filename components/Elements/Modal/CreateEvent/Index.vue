<template>
    <div>
        <Modal
            @confirm="confirm"
            @close="onClose"
            @load="onModalLoad"
            title="Buat Event Baru"
            :use-confirm-button="false"
            :width="50"
            :height="442"
        >
            <template #trigger>
                <div ref="eventForm">
                    <slot></slot>
                </div>
            </template>
            <template #main>
                <div class="row">
                    <div
                        v-for="value in links"
                        class="col-xs-12 col-md-6"
                        :key="value.title"
                    >
                        <Link
                            :title="value.title"
                            :description="value.description"
                            :image="value.image"
                            @click="openPanel(value.key)"
                        />
                    </div>
                </div>
            </template>
        </Modal>

        <CreateMeetTypeModal
            :is-display="isShowMeetType"
            @close="meetTypeOnClose"
            @rollback="meetTypeOnRollback"
        />
    </div>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import CreateMeetTypeModal from "@elements/Modal/CreateMeetType/Index";
    import Link from "./Link/Index";

    export default {
        name: 'IndexPage',
        components: {
            Modal,
            CreateMeetTypeModal,
            Link
        },
        props: {
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                classState: "",
                closeModal: () => {},
                isShowMeetType: false,
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
            onModalLoad(close) {
                this.closeModal = close;
            },
            openPanel(key) {
                this.closeModal();
                switch (key) {
                    case "meet":
                        this.isShowMeetType = true;
                        break;
                    case "conference":
                        this.closeModal();
                        this.$router.push({path: "/event/create/conference"});
                        break;
                }
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
            meetTypeOnClose() {
                this.isShowMeetType = false;
            },
            meetTypeOnRollback() {
                this.isShowMeetType = false;
                this.$refs.eventForm.click();
            },
            confirm(closeModal) {
                closeModal();
            }
        }
    }
</script>