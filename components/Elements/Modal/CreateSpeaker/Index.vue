<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        :title="title"
        :width="50"
        :height="580"
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
            <div class="h-410px overflow-y-scroll overflow-x-hidden">
                <div class="d-flex justify-content-center mb-8px">
                    <UploadPhoto
                        v-model="image"
                    />
                </div>

                <TextInput
                    label="Nama"
                    placeholder="Nama"
                    :margin-auto="true"
                    v-model="name"
                />

                <BackstageRoleInput
                    v-model="type"
                />

                <div class="row">
                    <div class="col-md-6 col-xs-12">
                        <TextInput
                            label="Email"
                            placeholder="Email"
                            :margin-auto="true"
                            v-model="email"
                        />                    
                    </div>
                    <div class="col-md-6 col-xs-12">
                        <TextInput
                            label="Organisasi"
                            placeholder="Organisasi"
                            :margin-auto="true"
                            v-model="organizationName"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 col-xs-12">
                        <TextInput
                            label="Asal Kota"
                            placeholder="Asal Kota"
                            :margin-auto="true"
                            v-model="city"
                        />                    
                    </div>
                    <div class="col-md-6 col-xs-12">
                        <CountryInput
                            :margin-auto="true"
                            v-model="countryId"
                        />
                    </div>
                </div>

                <TextareaInput
                    label="Biografi"
                    placeholder="Biografi"
                    :margin-auto="true"
                    v-model="description"
                />
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import TextInput from "@elements/Input/Text/Index";
    import CountryInput from "@elements/Input/Country/Index";
    import BackstageRoleInput from "@elements/Input/BackstageRole/Index";
    import TextareaInput from "@elements/Input/Textarea/Index";
    import UploadPhoto from "@elements/Input/UploadPhoto/Secondary/Index";
    import Speaker from "@endpoints/Event/Speaker";

    export default {
        name: 'IndexPage',
        components: {
            CountryInput,
            BackstageRoleInput,
            TextInput,
            UploadPhoto,
            TextareaInput,
            Modal
        },
        props: {
            title: {
                type: String,
                default: "Tambah Speaker/Host"
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
                isConfirmButtonLoading: false,
                classState: "",
                closeModal: () => {},
                image: null,
                email: "",
                type: "",
                name: "",
                organizationName: "",
                city: "",
                countryId: ""
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
            async onConfirm(closeModal) {
                this.isConfirmButtonLoading = true;
                try {
                    await Speaker.store(
                        this.$store.state.Event.visited.id,
                        this.image,
                        this.email,
                        this.name,
                        this.organizationName,
                        this.city,
                        this.countryId,
                        this.description,
                        this.type
                    );
                    closeModal();
                    this.$emit("confirm")
                } catch {

                }
                this.isConfirmButtonLoading = false;
            }
        }
    }
</script>