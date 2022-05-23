<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        title="Custom Form"
        :width="40"
        :height="566"
        confirm-button-label="Tambah Pertanyaan"
        confirm-button-variant="dotted-primary"
        :is-show-cancel-button="false"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div class="h-360px px-12px overflow-y-scroll">
                <div
                    v-for="(value, index) in items"
                    :key="value.id"
                    class="mb-12px"
                >
                    <TextInput
                        v-model="items[index].parameter"
                        @change="update"
                    />
                    <div class="d-flex justify-content-end mt-8px">
                        <ToggleInput
                            label="Wajib diisi"
                            v-model="items[index].isRequired"
                            @change="update"
                        />
                        <div
                            @click="remove(value.id)"
                            class="ml-11px cursor-pointer"
                        >
                            <Icon
                                variant="fontawesome"
                                src="trash"
                                color="danger"
                                dark-theme-color="danger"
                                class-name="hover-text-danger"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import Icon from "@elements/Icon/Index";
    import TextInput from "@elements/Input/Text/Index";
    import ToggleInput from "@elements/Input/Toggle/Index";
    import CustomForm from "@endpoints/Event/CustomForm";

    export default {
        name: 'IndexPage',
        components: {
            TextInput,
            ToggleInput,
            Icon,
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
                items: [],
                closeModal: () => {},
                name: ""
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
            },
            onClose() {
            },
            async onOpen() {
                const items = await CustomForm.list();
                this.items = items;
                if(items.length === 0) {
                    this.addItem();
                }
            },
            async addItem() {
                const id = window.Math.round(window.Math.random() * 99999999999);
                const orders = this.items.length + 1;
                const items = {
                    id,
                    orders,
                    parameter: "",
                    isRequired: false
                };
                this.items.push(items);
                await CustomForm.store(items);
                const newData = await CustomForm.list();
                const field = newData[newData.length - 1];
                const currentIndex = this.items.findIndex(value => value.id === id);
                console.log(field.id)
                console.log(currentIndex)
                if(currentIndex > -1) {
                    this.items[currentIndex].id = field.id;
                    this.items[currentIndex].orders = field.orders;
                }
                this.reorder();
            },
            reorder() {
                const items = this.items.map((value, index) => {
                    const response = value;
                    response.orders = index + 1;

                    return response;
                });

                this.items = items;
            },
            async remove(id) {
                let items = this.items.filter(value => value.id !== id);
                items = items.map(value => {
                    const response = value;
                    response.is_required = value.isRequired;

                    return response;
                })
                this.items = items;
                this.reorder();
                await CustomForm.delete(id, items);
            },
            async update() {
                let items = this.items
                items = items.map(value => {
                    const response = value;
                    response.is_required = value.isRequired;
                    response.parameter = response.parameter ? response.parameter : "-";

                    return response;
                })
                await CustomForm.update(items);
            },
            onConfirm(closeModal) {
                this.addItem();
                this.$emit("confirm")
            }
        }
    }
</script>