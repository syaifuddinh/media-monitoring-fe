<template>
    <Modal
        @open="onOpen"
        @load="onModalLoad"
        title="Atur Kategori"
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
                    <DraggableInput
                        v-for="(value, index) in items"
                        :key="value.id"
                        :orders="value.orders"
                        v-model="items[index].name"
                        @delete="remove(value.id)"
                        @drag="dragElement($event, value.id)"
                        @dragover="dragoverElement($event)"
                        @drop="dropElement($event, value.id)"
                    />
                </div>

                <div class="d-flex mt-16px">
                    <Button
                        variant="dotted-primary"
                        label="Tambah Kategori"
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
    import DraggableInput from "@elements/Input/Draggable/Index";
    import SponsorCategory from "@endpoints/Event/SponsorCategory";

    export default {
        name: 'IndexPage',
        components: {
            DraggableInput,
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
                sourceId: null,
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
                const items = await SponsorCategory.list();
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
            dragElement(e, sourceId) {
                this.sourceId = sourceId;
            },
            dragoverElement(e) {
                e.preventDefault();
            },
            dropElement(e, destinationId) {
                const selected = this.items.find(value => value.id === this.sourceId);
                const border = Math.round(e.target.clientHeight / 2);
                const layerY = e.layerY;
                let destinationIndex = 0;
                console.log({border, layerY});
                if(selected) {
                    this.items = this.items.filter(value => value.id !== this.sourceId)
                    destinationIndex = this.items.findIndex(value => value.id === destinationId);
                    if(layerY < border) {
                        this.items.splice(destinationIndex, 0, selected);
                    } else if(layerY >= border) {
                        if(destinationIndex === this.items.length - 1) {
                            this.items.push(selected);
                        } else {
                            this.items.splice(destinationIndex + 1, 0, selected);
                        }
                    }
                    this.reorder();
                }
                this.sourceId = null;
            },
            async onSubmit() {
                const data = this.items.map(value => {
                    const response = value;
                    if(response.isNew === true) {
                        delete response.id;
                    }

                    return response;
                });
                const deleted = this.deleted;
                this.isLoading = true;
                if(this.isEditMode === true) {
                    await SponsorCategory.update(data, deleted);
                } else {
                    await SponsorCategory.store(data);
                }
                this.isLoading = false;
                this.$emit("confirm");
                this.closeModal();
            }
        }
    }
</script>