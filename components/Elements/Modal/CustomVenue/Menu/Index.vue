<template>
    <div :class="classState">
        <Icon
            variant="fontawesome"
            dark-theme-color="dark-grey"
            src="bars"
        />
        <Icon
            variant="fontawesome"
            dark-theme-color="dark-grey"
            :src="icon"
            class-name="ml-25px"
        />

        <div class="ml-22px">
            <NormalText
                display="block"
                :weight="700"
            >
                {{ title }}
            </NormalText>
            <ExtraSmallText
                :weight="500"
                display="block"
                dark-theme-color="dark-grey"
                :margin-top="4"
            >
                {{ description }}
            </ExtraSmallText>
        </div>
    </div>
</template>

<script>
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import Icon from "@elements/Icon/Index";

    export default {
        name: 'IndexPage',
        components: {
            ExtraSmallText,
            Icon,
            NormalText
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                isConfirmButtonLoading: false,
                classState: "",
                closeModal: () => {},
                name: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            setClassState() {
                let classState = "d-flex align-items-center justify-content-between ";
                classState += "b-1 border-dotted border-dark-grey ";
                classState += "rounded-8px ";
                classState += "cursor-pointer ";
                classState += "px-19px py-15px ";
                classState += this.className;
                this.classState = classState;
            }
        }
    }
</script>