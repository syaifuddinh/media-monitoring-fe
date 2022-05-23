<template>
    <PrimaryCard :class="classState">
        <div class="d-flex justify-content-between">
            <div>
                <CircleFrame
                    v-if="false"
                    :width="40"
                    :height="40"
                >
                    <ImageDisplay
                        type="url"
                        src="https://static.republika.co.id/uploads/images/inpicture_slide/g-dragon-_130120083427-108.jpg"
                        height="40"
                        width="40"
                    />
                </CircleFrame>
            </div>

            <Dropdown />
        </div>
        <div>
            <ExtraSmallText
                :margin-top="24"
                :weight="500"
                :padding-y="4"
                :padding-x="8"
                display="block"
                color="white"
                background="primary"
                :radius="16"
            >
                {{ position }}
            </ExtraSmallText>
            <NormalText
                display="block"
                :weight="700"
                :margin-top="12"
            >
                {{ name }}
            </NormalText>
            <ExtraSmallText
                :margin-top="12"
                :weight="500"
                display="block"
                color="dark-grey"
                dark-theme-color="dark-grey"
            >
                {{ email }}
            </ExtraSmallText>
        </div>
    </PrimaryCard>
</template>

<script>
    import PrimaryCard from "@elements/Card/Primary/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";
    import CircleFrame from "@elements/CircleFrame/Index";
    import Dropdown from "./Dropdown/Index";

    export default {
        name: 'IndexPage',
        components: {
            Dropdown,
            ExtraSmallText,
            NormalText,
            PrimaryCard,
            CircleFrame,
            ImageDisplay
        },
        props: {
            name: {
                type: String,
                default: ""
            },
            position: {
                type: String,
                default: ""
            },
            email: {
                type: String,
                default: ""
            },
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                classState: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            setClassState() {
                let classState = "";
                classState += "h-300px ";
                classState += "d-flex flex-column justify-content-between ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>