<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        title="Edit Sentimen"
        :width="50"
        :height="168"
        :is-show-cancel-button="false"
        :is-show-confirm-button="false"
        :is-show-times-icon="true"
        align="start"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div class="pt-16px">
                <SentimentInput
                    v-model="sentiment"
                    @change="onConfirm"
                />
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import SentimentInput from "@elements/Input/Sentiment/Index";
    import Sentiment from "@endpoints/News/Sentiment";

    export default {
        name: 'IndexPage',
        components: {
            SentimentInput,
            Modal
        },
        props: {
            sentimentValue: {
                type: String,
                default: ""
            },
            newsId: {
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
                isConfirmButtonLoading: false,
                classState: "",
                closeModal: () => {},
                description: ""
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
                this.$emit("close");
            },
            onOpen() {
                this.sentiment = this.sentimentValue;
            },
            async onConfirm(closeModal) {
                this.isConfirmButtonLoading = true;
                try {
                    await Sentiment.update(this.newsId, this.sentiment);
                    this.$emit("confirm")
                } catch {

                }
                this.isConfirmButtonLoading = false;
            }
        }
    }
</script>