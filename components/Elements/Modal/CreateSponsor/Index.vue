<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        :title="idValue ? 'Ubah Sponsor' : 'Tambah Sponsor'"
        :width="50"
        :height="610"
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
            <div class="overflow-y-scroll overflow-x-hidden h-480px my-16px pr-16px">
                <TextInput
                    label="Nama Sponsor"
                    placeholder="Nama Sponsor"
                    :margin-auto="true"
                    v-model="name"
                />
                <TextInput
                    label="URL Website"
                    placeholder="https://"
                    :margin-auto="true"
                    v-model="url"
                />

                <SponsorCategoryInput
                    v-model="categoryId"
                />

                <SponsorLogoInput
                    v-model="image"
                />
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import TextInput from "@elements/Input/Text/Index";
    import SponsorLogoInput from "@elements/Input/SponsorLogo/Index";
    import SponsorCategoryInput from "@elements/Input/SponsorCategory/Index";
    import Sponsor from "@endpoints/Event/Sponsor";


    export default {
        name: 'IndexPage',
        components: {
            TextInput,
            SponsorCategoryInput,
            SponsorLogoInput,
            Modal
        },
        props: {
            idValue: {
                type: String,
                default: ""
            },
            nameValue: {
                type: String,
                default: ""
            },
            categoryIdValue: {
                type: String,
                default: ""
            },
            urlValue: {
                type: String,
                default: ""
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
                name: "",
                url: "",
                image: null,
                categoryId: null,
                isConfirmButtonLoading: false,
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
            onOpen() {
                this.name = this.nameValue;
                this.url = this.urlValue;
                this.categoryId = this.categoryIdValue;
                this.image = null;
                this.$emit("open");
            },
            async onConfirm(closeModal) {
                this.isConfirmButtonLoading = true;
                if(this.idValue) {
                    await Sponsor.update(
                        this.idValue,
                        this.name,
                        this.categoryId,
                        this.url,
                        this.image
                    );
                } else {
                    await Sponsor.store(
                        this.name,
                        this.categoryId,
                        this.url,
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