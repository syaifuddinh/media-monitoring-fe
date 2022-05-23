<template>
    <PrimaryCard
        :class="classState"
        :height="410"
    >
        <div class="d-flex" @click="onClick">
            <div class="cursor-pointer" >
                <DefaultCircleFrame
                    v-if="!isActive"
                    :size="26"
                    key="1"
                />
                    
                <Checked
                    key="2"
                    v-if="isActive"
                />
            </div>
            <div class="ml-11px">
                <NormalText
                    display="block"
                    :weight="600"
                >
                    {{ title }}
                </NormalText>
                <ExtraSmallText
                    display="block"
                    dark-theme-color="dark-grey"
                    :weight="500"
                    :margin-top="4"
                    :margin-bottom="16"
                >
                    {{ description }}
                </ExtraSmallText>
                <ImageDisplay
                    :src="image"
                    height="auto"
                    class="w-100"
                />
            </div>
        </div>
    </PrimaryCard>
</template>

<script>
    import NormalText from "@elements/Text/Normal/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import PrimaryCard from "@elements/Card/Primary/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";
    import DefaultCircleFrame from "@elements/CircleFrame/Default/Index";
    import Checked from "@elements/Checked/Index";

    export default {
        name: 'IndexPage',
        components: {
            DefaultCircleFrame,
            Checked,
            NormalText,
            ExtraSmallText,
            PrimaryCard,
            ImageDisplay
        },
        props: {
            isActive: {
                type: Boolean,
                default: false
            },
            image: {
                type: String,
                default: ""
            },
            title: {
                type: String,
                default: ""
            },
            description: {
                type: String,
                default: ""
            },
            width: {
                type: String,
                default: ""
            },
            height: {
                type: String,
                default: ""
            },
            className: {
                type: String,
                default: ""
            },
            type: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                classState: "",
                imageSource: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            onClick() {
                this.$emit("click");
            },
            setClassState() {
                let classState = "";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            },
        }
    }
</script>