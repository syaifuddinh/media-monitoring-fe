<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        :title="title"
        :width="60"
        :height="556"
        confirm-button-label="Simpan"
        confirm-button-variant="primary"
        :is-show-cancel-button="false"
        :is-show-times-icon="true"
        :is-confirm-button-disabled="!name"
        :is-confirm-button-loading="isConfirmButtonLoading"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div class="h-400px p-8px overflow-y-scroll">
                <BoothLogoInput
                    v-model="image"
                />
                <TextInput
                    label="Nama Booth"
                    placeholder="Nama Booth"
                    :margin-auto="true"
                    v-model="name"
                />
                <MultipleTextInput
                    label="Tag Booth"
                    placeholder="Tag Booth"
                    :margin-auto="true"
                    v-model="tags"
                />
                <TextInput
                    label="Pemilik"
                    placeholder="Masukkan Email Pemilik"
                    :margin-auto="true"
                    v-model="email"
                />

                <Divider
                    title="PENGATURAN FITUR"
                    class="mb-19px"
                />

                <div class="d-flex align-items-center mt-16px">
                    <div class="mr-16px">
                        <NormalText
                            :weight="600"
                            display="block"
                        >
                            Chat
                        </NormalText>
                        <ExtraSmallText
                            :weight="500"
                            :margin-top="4"
                            display="block"
                            dark-theme-color="dark-grey"
                        >
                            Pilih apakah Anda ingin mengizinkan pengunjung dan peserta pameran untuk saling mengirim pesan.
                        </ExtraSmallText>
                    </div>
                    <ToggleInput
                        v-model="isChatActive"
                    />
                </div>

                <div class="d-flex align-items-center mt-16px">
                    <div class="mr-16px">
                        <NormalText
                            :weight="600"
                            display="block"
                        >
                            Meja
                        </NormalText>
                        <ExtraSmallText
                            :weight="500"
                            :margin-top="4"
                            display="block"
                            dark-theme-color="dark-grey"
                        >
                            Pilih apakah Anda ingin mengizinkan pengunjung untuk duduk di berbagai meja yang ditentukan dan bercakap-cakap dengan peserta pameran.
                        </ExtraSmallText>
                    </div>
                    <ToggleInput
                        v-model="isTableActive"
                    />
                </div>

                <div class="d-flex justify-content-end align-items-center mt-16px">
                    <ExtraSmallText
                        :weight="600"
                        display="block"
                        :margin-right="16"
                    >
                        Jumlah Meja
                    </ExtraSmallText>
                    <NumberInput
                        v-model="tableCount"
                    />
                </div>

                <div class="d-flex align-items-center mt-16px">
                    <div class="mr-16px">
                        <NormalText
                            :weight="600"
                            display="block"
                        >
                            Siaran Langsung
                        </NormalText>
                        <ExtraSmallText
                            :weight="500"
                            :margin-top="4"
                            display="block"
                            dark-theme-color="dark-grey"
                        >
                            Pilih apakah Anda ingin mengizinkan peserta pameran untuk menampilkan konten video langsung kepada pengunjung stan mereka.
                        </ExtraSmallText>
                    </div>
                    <ToggleInput
                        v-model="isStream"
                    />
                </div>
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import TextInput from "@elements/Input/Text/Index";
    import NumberInput from "@elements/Input/Number/Index";
    import ToggleInput from "@elements/Input/Toggle/Index";
    import BoothLogoInput from "@elements/Input/BoothLogo/Index";
    import MultipleTextInput from "@elements/Input/MultipleText/Index";
    import Divider from "@elements/Label/Divider/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import Booth from "@endpoints/Event/Booth";

    export default {
        name: 'IndexPage',
        components: {
            NumberInput,
            NormalText,
            ExtraSmallText,
            Divider,
            BoothLogoInput,
            ToggleInput,
            TextInput,
            MultipleTextInput,
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
            title: {
                type: String,
                default: "Tambah Booth"
            },
            id: {
                type: String,
                default: ""
            },
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                image: null,
                name: "",
                email: "",
                tags: "",
                tableCount: 0,
                isConfirmButtonLoading: false,
                isChatActive: false,
                isTableActive: false,
                isStream: false,
                classState: "",
                closeModal: () => {}
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
            },
            onClose() {
                this.$emit("close");
            },
            onOpen() {
                this.setData();
                this.$emit("open");
            },
            async setData() {
                if(this.id) {
                    const {
                        name,
                        email,
                        tags,
                        tableCount,
                        isChatActive,
                        isTableActive,
                        isStream
                    } = await Booth.show(this.id);
                    this.name = name;
                    this.email = email;
                    this.tags = tags;
                    this.tableCount = tableCount;
                    this.isChatActive = isChatActive;
                    this.isTableActive = isTableActive;
                    this.isStream = isStream;
                } else {
                    this.name = "";
                    this.email = "";
                    this.tags = [];
                    this.tableCount = 0;
                    this.isChatActive = false;
                    this.isTableActive = false;
                    this.isStream = false;
                }
            },
            async onConfirm(closeModal) {
                this.isConfirmButtonLoading = true;
                if(this.id) {
                    await Booth.update(
                        this.id,
                        this.name,
                        this.tags,
                        this.email,
                        this.isChatActive,
                        this.isTableActive,
                        this.tableCount,
                        this.isStream,
                        this.image
                    );

                } else {
                    await Booth.store(
                        this.name,
                        this.tags,
                        this.email,
                        this.isChatActive,
                        this.isTableActive,
                        this.tableCount,
                        this.isStream,
                        this.image
                    );
                }
                this.isConfirmButtonLoading = false;
                closeModal();
                this.$emit("confirm")
            }
        }
    }
</script>