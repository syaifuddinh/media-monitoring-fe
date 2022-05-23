<template>
    <Modal
        @confirm="confirm"
        @close="onClose"
        @rollback="onRollback"
        @load="onModalLoad"
        title="Konect Meet"
        :use-confirm-button="false"
        :is-display="isDisplay"
        :is-show-rollback="true"
        :height="480"
    >
        <template #main>
            <div
                v-for="value in links"
                :key="value.key"
                @click="openPanel(value.key)"
                >
                <Link
                    :title="value.title"
                    :description="value.description"
                    :image="value.image"
                />
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import Link from "./Link/Index";

    export default {
        name: 'IndexPage',
        components: {
            Modal,
            Link
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            isDisplay: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                classState: "",
                links: [
                    {
                        title: "Jadwal Meeting",
                        key: "schedule",
                        image: "create-meeting-schedule.png",
                        description: "Buat rapat, yang dijadwalkan oleh Anda dan bagikan tautan rapat dengan pesertanya."
                    },
                    {
                        title: "Ruang Meeting",
                        key: "meet",
                        image: "create-meeting-room.png",
                        description: "Buat ruang rapat permanen dan gunakan tanpa batas."
                    },
                    {
                        title: "Booking Pertemuan",
                        key: "book",
                        image: "book-meeting.png",
                        description: "Buat pertemuan yang bisa dibooking oleh klien Anda di halaman pemesanan Anda."
                    }
                ]
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
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
            onRollback() {
                this.$emit("rollback");
            },
            openPanel(key) {
                switch(key) {
                    case "schedule":
                        this.$router.push({path: "/event/create/meeting-schedule"});
                        break;
                    case "meet":
                        this.$router.push({path: "/event/create/meeting-room"});
                        break;
                    case "book":
                        this.$router.push({path: "/event/create/meeting-book"});
                        break;
                }
                this.onClose(false);
            },
            confirm(closeModal) {
                closeModal();
            }
        }
    }
</script>