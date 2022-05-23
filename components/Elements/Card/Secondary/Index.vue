<template>
    <PrimaryCard :class="classState">
        <div class="position-absolute w-100 top-0 left-0 z-index-1 overflow-hidden h-158px">
            <ImageDisplay
                type="url"
                :src="imageUrl"
                height="auto"
                class-name="w-110"
            />
        </div>
        <div class="position-relative z-index-2">
            <div class="d-flex justify-content-between align-items-center">
                <div class="w-100 mr-10px">
                    <Status
                        :variant="statusVariant"
                        :image-url="imageUrl"
                    />
                </div>
                <DropdownPrimary
                    v-if="dropdownVariant === 'primary'"
                    :event-id="eventId"
                    @archive="onArchive"
                />
                <DropdownSecondary
                    v-if="dropdownVariant === 'secondary'"
                    :event-id="eventId"
                    @unarchive="onUnarchive"
                />
            </div>
            <ExtraSmallText
                color="light-black"
                dark-theme-color="dark-grey"
                :weight="500"
                display="block"
                :margin-top="123"
            >
                {{ date }}
            </ExtraSmallText>
            <div @click="openDetail" class="cursor-pointer">
                <SemiLeadContentText
                    color="black"
                    :weight="700"
                    display="block"
                    :margin-top="4"
                    class-name="h-60px overflow-hidden"
                >
                    {{ title }}
                </SemiLeadContentText>
            </div>

            <Label :title="eventType" />

            <div class="d-flex mt-19px" v-if="false">
                <div class="position-relative">
                    <CircleFrame
                        v-for="(value, index) in images"
                        :key="value"
                        :width="24"
                        :height="24"
                        :class-name="index > 0 ? 'ml-minus-10px' : ''"

                    >
                        <ImageDisplay
                            type="url"
                            :src="value"
                            width="28"
                            height="auto"
                        />
                    </CircleFrame>
                </div>
                <ExtraSmallText
                    color="little-light-black"
                    :weight="500"
                    display="block"
                    :margin-left="8"
                >
                    dan 99 lainnya
                </ExtraSmallText>
            </div>
        </div>
    </PrimaryCard>
</template>

<script>
    import PrimaryCard from "@elements/Card/Primary/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import CircleFrame from "@elements/CircleFrame/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";
    import Label from "@elements/Label/Index";
    import Status from "./Status/Index";
    import DropdownPrimary from "./DropdownPrimary/Index";
    import DropdownSecondary from "./DropdownSecondary/Index";

    export default {
        name: 'IndexPage',
        components: {
            ExtraSmallText,
            SemiLeadContentText,
            PrimaryCard,
            DropdownPrimary,
            DropdownSecondary,
            CircleFrame,
            ImageDisplay,
            Label,
            Status
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            eventType: {
                type: String,
                default: ""
            },
            eventId: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            imageUrl: {
                type: String,
                default: ""
            },
            date: {
                type: String,
                required: true
            },
            dropdownVariant: {
                type: String,
                default: "primary"
            },
            statusVariant: {
                type: String,
                default: "scheduled"
            }
        },
        data() {
            return {
                classState: "",
                images: []
            }
        },
        mounted() {
            this.setClassState();
            this.setImages();
        },
        methods: {
            openDetail() {
                this.$router.push({path: "/event/show/" + this.eventId + "/detail"});
            },
            setImages() {
                const images = [];
                images.push("https://i.pinimg.com/564x/7b/ae/78/7bae784d379d337d666e8aacb3d3bbb3.jpg");
                images.push("https://i.pinimg.com/originals/f2/52/03/f2520335868e2215eb44ce3cf817532b.jpg");
                images.push("https://i.pinimg.com/originals/9b/09/05/9b0905061220d12c470b53f834facf2d.jpg");
                images.push("https://i.pinimg.com/originals/b2/0e/c6/b20ec61850d8e11df1d9a7a363b672b3.jpg");
                this.images = images;
            },
            onArchive() {
                this.$emit("archive");
            },
            onUnarchive() {
                this.$emit("unarchive");
            },
            setClassState() {
                let classState = "";
                classState += "h-300px ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>