<template>
    <PrimaryCard
        :class="classState"
    >
        <div @click="onClick">
            <NormalText
                display="block"
                :weight="600"
            >
                {{ title }}
            </NormalText>
            <div class="d-flex align-items-center mb-16px">
                <div class="cursor-pointer mr-4px" >
                    <DefaultCircleFrame
                        v-if="!isActive"
                    />

                    <Checked
                        key="2"
                        v-if="isActive"
                    />
                </div>
                
                <ExtraSmallText
                    display="block"
                    dark-theme-color="dark-grey"
                    :weight="500"
                >
                    Atur sebagai backdrop utama
                </ExtraSmallText>
            </div>
            <SquareFrame
                :radius="8"
                :height="180"
                class-name="w-100"
            >
                <ImageDisplay
                    type="url"
                    :src="image"
                    height="auto"
                    class="w-100"
                />
            </SquareFrame>
        </div>
    </PrimaryCard>
</template>

<script>
    import NormalText from "@elements/Text/Normal/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import PrimaryCard from "@elements/Card/Primary/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";
    import DefaultCircleFrame from "@elements/CircleFrame/Default/Index";
    import SquareFrame from "@elements/SquareFrame/Index";
    import Checked from "@elements/Checked/Index";

    export default {
        name: 'IndexPage',
        components: {
            DefaultCircleFrame,
            SquareFrame,
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