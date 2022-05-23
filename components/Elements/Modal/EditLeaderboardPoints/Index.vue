<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        title="Ubah Alokasi Poin"
        :width="60"
        :height="550"
        confirm-button-label="Simpan"
        confirm-button-variant="primary"
        :is-confirm-button-loading="isConfirmButtonLoading"
        :is-show-cancel-button="false"
        :is-show-times-icon="true"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div class="overflow-y-scroll overflow-x-hidden h-400px pr-16px mb-16px">
                <div
                        v-for="(header, headerIndex) in leaderboards"
                        :key="header.id"
                        class="mt-16px"
                    >
                        <div class="d-flex">
                            <CheckboxInput
                                v-model="leaderboards[headerIndex].isActive"
                                class-name="mr-8px"
                                @change="onHeaderChange(header.id)"
                            />
                            <SmallText

                                display="block"
                                :weight="600"
                            >
                                {{ header.name }}
                            </SmallText>
                        </div>
                        <div
                            v-for="(value, valueIndex) in header.children"
                            :key="value.id"
                            class="row mt-12px"
                        >
                            <div class="col-md-6 col-xs-12 d-flex">
                                <CheckboxInput
                                    v-model="leaderboards[headerIndex].children[valueIndex].isActive"
                                    class-name="mr-8px"
                                    @change="onDetailChange(header.id)"
                                />
                                <SmallText>
                                    {{ value.name }}
                                </SmallText>
                            </div>
                            <div class="col-md-6 col-xs-12">
                                <div class="d-flex justify-content-end align-items-end">
                                    <ExtraSmallText
                                        color="primary"
                                        dark-theme-color="primary"
                                        :weight="600"
                                        :margin-right="8"
                                        display="block"
                                    >
                                        {{ value.description }}
                                    </ExtraSmallText>

                                    <SmallText
                                        :weight="600"
                                        :margin-right="8"
                                        display="block"
                                        class-name="bg-dark px-5px py-2px rounded-4px"
                                    >
                                        {{ value.value }}
                                    </SmallText>

                                    <ExtraSmallText
                                        dark-theme-color="dark-grey"
                                    >
                                        Points
                                    </ExtraSmallText>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import CheckboxInput from "@elements/Input/Checkbox/Index";
    import SmallText from "@elements/Text/Small/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import Leaderboard from "@endpoints/Event/Leaderboard";
    import Event from "@endpoints/Event";

    export default {
        name: 'IndexPage',
        components: {
            CheckboxInput,
            SmallText,
            ExtraSmallText,
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
                leaderboards: [],
                closeModal: () => {}
            }
        },
        mounted() {
            this.setClassState();
            this.setLeaderboards();
        },
        methods: {
            onHeaderChange(id) {
                const index = this.leaderboards.findIndex(value => value.id === id);
                if(index > -1) {
                    this.leaderboards[index].children = this.leaderboards[index].children.map(value => {
                        const response = value;
                        value.isActive = this.leaderboards[index].isActive;

                        return response;
                    })
                }
            },
            onDetailChange(headerId) {
                const index = this.leaderboards.findIndex(value => value.id === headerId);
                if(index > -1) {
                    const anyActivedIndex = this.leaderboards[index].children.findIndex(value => value.isActive === true); 
                    this.leaderboards[index].isActive = anyActivedIndex > -1;
                }
            },
            async setLeaderboards() {
                let items = await Leaderboard.list(this.$store.state.Event.visited.id);
                items = items.map(value => {
                    const response = value;
                    const anyActivedIndex = response.children.findIndex(value => value.isActive === true); 
                    response.isActive = anyActivedIndex > -1;

                    return response;
                });
                this.leaderboards = items;
            },
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
                this.email = this.$store.state.Event.visited.contactPersonEmail;
                this.phone = this.$store.state.Event.visited.contactPersonPhone;
            },
            async onConfirm(closeModal) {
                let data = [];
                this.leaderboards.forEach(header => {
                    header.children.forEach(child => {
                        data.push(child);
                    })
                });
                data = data.map(value => {
                    const response = value;
                    response.is_active = value.isActive;

                    return response;
                })
                this.isConfirmButtonLoading = true;
                try {
                    await Leaderboard.setPoints(
                        this.$store.state.Event.visited.id,
                        data
                    );
                    Event.show(
                        this.$store.state.Event.visited.id
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