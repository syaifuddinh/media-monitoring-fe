<template>
    <Modal
        @open="onOpen"
        @load="onModalLoad"
        title="Atur Minat"
        :width="40"
        :height="566"
        :use-confirm-button="false"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div>
                <div class="h-390px px-12px overflow-y-scroll">
                    <div
                        v-for="(value, index) in items"
                        :key="value.id"
                        class="mb-12px"
                    >
                        <div class="d-flex align-items-center mt-8px">
                            <div
                                @click="remove(value.id)"
                                class="mr-11px cursor-pointer"
                            >
                                <Icon
                                    variant="fontawesome"
                                    src="bars"
                                    color="dark-grey"
                                    dark-theme-color="dark-grey"
                                    class-name="hover-text-dark-grey"
                                />
                            </div>

                            <NormalText
                                display="block"
                                :margin-right="8"
                            >
                                {{ value.orders }}
                            </NormalText>

                            <TextInput
                                v-model="items[index].name"
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

                <div class="d-flex mt-16px">
                    <Button
                        variant="dotted-primary"
                        label="Tambah Minat"
                        :margin-right="8"
                        @click="addItem"
                    />
                    <Button
                        variant="primary"
                        label="Simpan"
                        :is-loading="isLoading"
                        @click="onSubmit"
                    />
                </div>
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import Button from "@elements/Button/Index";
    import Icon from "@elements/Icon/Index";
    import TextInput from "@elements/Input/Text/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import Interest from "@endpoints/Event/Interest";

    export default {
        name: 'IndexPage',
        components: {
            TextInput,
            NormalText,
            Button,
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
                isLoading: false,
                isEditMode: false,
                isConfirmButtonLoading: false,
                classState: "",
                items: [],
                deleted: [],
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
                const items = await Interest.list(this.$store.state.Event.visited.id);
                if(items.length > 0) {
                    this.items = items;
                    this.reorder();
                    this.isEditMode = true;
                } else {
                    this.isEditMode = false;
                }
            },
            addItem() {
                const id = window.Math.round(window.Math.random() * 99999999999);
                const orders = this.items.length + 1;
                const isNew = true;
                const items = {
                    id,
                    isNew,
                    orders,
                    name: ""
                };
                this.items.push(items);
            },
            reorder() {
                const items = this.items.map((value, index) => {
                    const response = value;
                    response.orders = index + 1;

                    return response;
                });

                this.items = items;
            },
            remove(id) {
                if(this.isEditMode === true) {
                    const selected = this.items.find(value => value.id === id);
                    if(selected) {
                        if(!selected.isNew) {
                            this.deleted.push(id);
                        }
                    } 
                }
                const items = this.items.filter(value => value.id !== id);
                this.items = items;
                this.reorder();
            },
            async onSubmit() {
                const data = this.items.map(value => {
                    const response = value;
                    if(response.isNew === true) {
                        delete response.id;
                    }

                    return response;
                });
                this.isLoading = true;
                try {
                    await Interest.store(
                        this.$store.state.Event.visited.id,
                        data
                    );
                    this.$emit("confirm");
                    this.closeModal();
                } catch(e) {
                    throw new Error(e);
                }
                this.isLoading = false;
            }
        }
    }
</script>