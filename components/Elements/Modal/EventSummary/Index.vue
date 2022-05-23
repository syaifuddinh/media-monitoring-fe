<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        title=""
        :width="50"
        :height="400"
        :use-confirm-button="false"
        align="start"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div class="d-flex flex-column justify-content-between h-100">
                <div>
                    
                    <SemiLeadContentText
                        display="block"
                        :weight="700"
                    >
                        {{ title }}
                    </SemiLeadContentText>
                    <SmallText
                        display="block"
                        :weight="700"
                        :margin-top="4"
                    >
                        {{ organizationName }}
                    </SmallText>

                    <SmallText
                        display="block"
                        :weight="700"
                        :margin-top="16"
                        dark-theme-color="primary"
                    >
                        {{ startDate }}
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
                </div>

                <Button
                    label="Gabung Meeting"
                    :width="222"
                    left-icon="logo-brand-white.png"
                />
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import Button from "@elements/Button/Index";
    import SmallText from "@elements/Text/Small/Index";
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import Event from "@endpoints/Event";

    export default {
        name: 'IndexPage',
        components: {
            SmallText,
            SemiLeadContentText,
            Button,
            Modal
        },
        props: {
            id: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                isConfirmButtonLoading: false,
                classState: "",
                closeModal: () => {},
                title: "",
                startDate: "",
                endDate: "",
                startTime: "",
                endTime: "",
                description: "",
                organizationName: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            async setData() {
                this.title = "";
                this.description = "";
                this.organizationName = "";
                this.startDate = "";
                this.endDate = "";
                if(this.id) {
                    const data = await Event.show(this.id);
                    this.title = data.name;
                    this.description = data.description;
                    this.organizationName = data.organizationName;
                    this.startDate = data.startDateLabel;
                    this.endDate = data.endDateLabel;
                }
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
            }
        }
    }
</script>