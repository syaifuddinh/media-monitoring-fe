<template>
    <Modal
        @confirm="confirm"
        @close="onClose"
        @open="onOpen"
        title="Bagikan dengan"
        :use-confirm-button="false"
        :width="50"
    >
        <template #trigger>
            <slot></slot>
        </template>
        <template #main>
            <div>
                <div class="d-flex">
                    <Link
                        v-for="value in links"
                        :key="value.iconSrc"
                        :icon-src="value.iconSrc"
                    />
                </div>
                <SmallText
                    :weight="700"
                    display="block"
                    :margin-top="16"
                >
                    Atau salin link berikut
                </SmallText>
                
                <SharingEventLinkInput
                    class="mt-8px"
                    :key="eventId"
                    :event-id="eventId"
                />     
            </div>
        </template>
    </Modal>
</template>

<script>
    import SmallText from "@elements/Text/Small/Index";
    import Modal from "@elements/Modal/Index";
    import SharingEventLinkInput from "@elements/Input/SharingEventLink/Index";
    import Link from "./Link/Index";

    export default {
        name: 'IndexPage',
        components: {
            Modal,
            SharingEventLinkInput,
            SmallText,
            Link
        },
        props: {
            eventId: {
                type: String,
                required: true
            },
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                classState: "",
                data: "",
                links: [
                    {
                        iconSrc: "WhatsApp.png"
                    },
                    {
                        iconSrc: "Facebook.png"
                    },
                    {
                        iconSrc: "Instagram.png"
                    },
                    {
                        iconSrc: "Linkedin-Secondary.png"
                    },
                    {
                        iconSrc: "Twitter.png"
                    },
                    {
                        iconSrc: "Gmail.png"
                    }
                ]
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
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
            confirm(closeModal) {
                closeModal();
            }
        }
    }
</script>