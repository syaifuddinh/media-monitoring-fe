<template>
    <label
        :class="classState"
        @mouseover="showCamera"
        @mouseleave="hideCamera"
        for="file"
    >
        <LeadParagraphText
            v-if="!imageUrl"
            :weight="600"
            dark-theme-color="dark-grey"
        >
            No Image
        </LeadParagraphText>
        <ImageDisplay
            v-if="imageUrl"
            type="url"
            :src="imageUrl"
            height="auto"
            width="385"
        />
        <div ref="upload">
            <FileInput
                id-value="file"
                :max-size="2000000"
                accept="image/*"
                class="d-none"
                @change="onChange"
            />
        </div>
        <div
            v-if="isShowCamera === true"
            class="position-absolute bg-black w-100 h-100 top-0 left-0 opacity-7 d-flex justify-content-center align-items-center"
        >
            <Icon
                variant="fontawesome"
                src="camera"
                :size="52"
            />
        </div>
    </label>
</template>

<script>
    import ImageDisplay from "@elements/ImageDisplay/Index";
    import LeadParagraphText from "@elements/Text/LeadParagraph/Index";
    import Icon from "@elements/Icon/Index";
    import FileInput from "@elements/Input/File/Index";

    export default {
        name: 'IndexPage',
        components: {
            FileInput,
            LeadParagraphText,
            Icon,
            ImageDisplay
        },
        props: {
            imageUrl: {
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
                isShowCamera: false,
                classState: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            showCamera() {
                this.isShowCamera = true;
            },
            hideCamera() {
                this.isShowCamera = false;
            },
            setClassState() {
                let classState = "w-100 h-280px ";
                classState += "overflow-hidden ";
                classState += "rounded-24px ";
                classState += "bg-light-dark ";
                classState += "position-relative ";
                classState += "d-flex justify-content-center align-items-center ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            },
            onClick() {
                this.$emit("onClick");
            },
            onChange(e) {
                this.$emit("input", e);
                this.$emit("change", e);
            } 
        }
    }
</script>