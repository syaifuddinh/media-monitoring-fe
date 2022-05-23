<template>
    <Modal
        @confirm="confirm"
        @close="onClose"
        @rollback="onRollback"
        @load="onModalLoad"
        title="Siapa yang bisa mengikuti acara ini ?"
        :is-show-cancel-button="false"
        :width="65"
        :height="580"
        confirm-button-label="Simpan"
        confirm-button-variant="primary"
        :is-confirm-button-loading="isLoading"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div :key="links.length" class="overflow-y-scroll overflow-x-hidden h-400px pr-16px">
                <div
                    v-for="value in links"
                    :key="value.key"
                    @click="openPanel(value.key)"
                    >
                    <Link
                        :title="value.title"
                        :description="value.description"
                        :is-active="value.isActive ? true : false"
                    />
                </div>
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import Access from "@endpoints/Event/Access";
    import Event from "@endpoints/Event";
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
        computed: {
            attendeeType() {
                return this.$store.state.Event.visited.access
            }
        },
        data() {
            return {
                classState: "",
                counter: 0,
                isLoading: false,
                data: "",
                links: []
            }
        },
        mounted() {
            this.setClassState();
            this.setData();
        },
        methods: {
            setData() {
                this.data = this.attendeeType;
                this.links = [
                    {
                        title: "Siapapun dapat mengikuti tautan",
                        key: "public",
                        description: "Semua orang yang memiliki tautan dapat masuk. Sangat direkomendasikan untuk acara umum",
                        isActive: this.attendeeType === "public"
                    },
                    {
                        title: "Hanya orang yang diundang dan telah login yang dapat masuk",
                        key: "invited",
                        description: "Orang-orang di daftar peserta dapat memasuki acara setelah mengklik tautan unik yang dikirim ke alamat email mereka.",
                        isActive: this.attendeeType === "invited"
                    },
                    {
                        title: "Siapapun dapat masuk setelah login",
                        key: "public_authenticated",
                        description: "Peserta dapat memasuki acara setelah login",
                        isActive: this.attendeeType === "public_authenticated"
                    },
                    {
                        title: "Siapapun bisa masuk tanpa harus login",
                        key: "invited_authenticated",
                        description: "Orang dapat masuk acara tanpa autentikasi apa pun. Alamat email peserta tidak akan tercatat",
                        isActive: this.attendeeType === "invited_authenticated"
                    }
                ];
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
            onRollback() {
                this.$emit("rollback");
            },
            openPanel(key) {
                const linkIndex = this.links.findIndex(value => value.key === key);
                this.links = this.links.map(value => {
                    const response = value;
                    response.isActive = false;

                    return response;
                })

                if(linkIndex > -1) {
                    this.links[linkIndex].isActive = true;
                    this.data = this.links[linkIndex].key;
                }
                ++this.counter;
            },
            async confirm(closeModal) {
                this.isLoading = true;
                try {
                    await Access.update(
                        this.$store.state.Event.visited.id,
                        this.data
                    );
                    await Event.show(this.$store.state.Event.visited.id);
                    closeModal();
                } catch {

                }
                this.isLoading = false;
            }
        }
    }
</script>