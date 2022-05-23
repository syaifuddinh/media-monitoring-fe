<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        @load="onModalLoad"
        title=""
        :width="70"
        :height="500"
        :use-confirm-button="false"
        :is-show-cancel-button="false"
        :is-show-times-icon="true"
        :is-confirm-button-disabled="!name"
        align="start"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
                <div class="d-flex justify-content-between mt-12px">
                    <SemiLeadContentText
                        :weight="700"
                    >
                        {{ name }}
                    </SemiLeadContentText>

                    <Button
                        left-icon="edit"
                        left-icon-variant="fontawesome"
                        label="Ubah"
                        variant="purple"
                        :width="110"
                        @click="onChangeButtonClicked"
                    />
                </div>
                <SmallText
                    display="block"
                    :weight="700"
                    :margin-top="4"
                >
                    {{ $store.state.Event.visited.name }}
                </SmallText>
                <SmallText
                    display="block"
                    :weight="700"
                    :margin-top="4"
                    dark-theme-color="primary"
                    color="primary"
                >
                    {{ readableDate }}
                </SmallText>
                <SmallText
                    display="block"
                    :weight="500"
                    :margin-top="4"
                >
                    {{ startTime }} - {{ endTime }}
                </SmallText>
                <SmallText
                    display="block"
                    :weight="500"
                    :margin-top="16"
                >
                    {{ description }}
                </SmallText>
                
                <SmallText
                    display="block"
                    :weight="600"
                    :margin-top="16"
                    color="dark-grey"
                    dark-theme-color="dark-grey"
                >
                    SPEAKER
                </SmallText>
                <div class="mt-16px">
                    <ExtraSmallText
                        v-if="speakers.length === 0"
                        :weight="500"
                    >
                        -
                    </ExtraSmallText>
                    <SquareFrame
                        v-for="value in speakers"
                        :key="value"
                        :radius="1000"
                        :width="-1"
                        overflow="none"
                        background="secondary-dark"
                        :padding-x="8"
                        :padding-y="3"
                        :margin-right="4"
                    >
                        <ExtraSmallText
                            :weight="500"
                        >
                            {{ value }}
                        </ExtraSmallText>
                    </SquareFrame>
                </div>
        </template>
    </Modal>
</template>

<script>
    import SquareFrame from "@elements/SquareFrame/Index";
    import Modal from "@elements/Modal/Index";
    import Button from "@elements/Button/Index";
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import SmallText from "@elements/Text/Small/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import Session from "@endpoints/Session";

    export default {
        name: 'IndexPage',
        components: {
            SquareFrame,
            SmallText,
            ExtraSmallText,
            SemiLeadContentText,
            Button,
            Modal
        },
        props: {
            id: {
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
                description: "",
                startTime: "",
                endTime: "",
                speakers: [],
                speakersWithId: [],
                hosts: [],
                isConfirmButtonLoading: false,
                classState: "",
                closeModal: () => {}
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            async setData() {
                const { name, description, startTime, endTime, speakerData, speakersWithId, readableDate } = await Session.show(this.id);
                this.name = name;
                this.description = description;
                this.readableDate = readableDate;
                this.startTime = startTime;
                this.endTime = endTime;
                this.speakersWithId = speakersWithId;
                this.speakers = speakerData;
            },
            onModalLoad(close) {
                this.closeModal = close;
            },
            onChangeButtonClicked() {
                const data = {};
                data.id = this.id;
                data.name = this.name;
                data.description = this.description;
                data.startTime = this.startTime;
                data.endTime = this.endTime;
                data.speakers = this.speakersWithId;
                this.closeModal();
                this.$emit("change-button-clicked", data);
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
            }
        }
    }
</script>