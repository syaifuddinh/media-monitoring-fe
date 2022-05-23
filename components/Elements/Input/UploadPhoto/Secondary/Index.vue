<template>
    <div class="position-relative">
        <CircleFrame
            :width="150"
            :height="150"
            background="dark-grey"
            display="flex"
            class-name="align-items-center justify-content-center"
        >
            <ImageDisplay
                v-if="imageUrl"
                type="url"
                :src="imageUrl"
                height="150"
                width="auto"
            />
            <Icon
                v-if="!image"
                variant="fontawesome"
                src="user"
                :size="48"
            />
        </CircleFrame>
        <label
            for="file"
            class="position-absolute bottom-0 right-0 mb-0px"
        >
            <CircleFrame
                :width="56"
                :height="56"
                background="primary"
                display="flex"
                class-name="align-items-center justify-content-center hover-bg-primary"
            >
                <Icon
                    variant="fontawesome"
                    src="camera"
                    :size="22"
                />
            </CircleFrame>
            <div ref="upload">
                <FileInput
                    id-value="file"
                    :max-size="2000000"
                    accept="image/*"
                    class="d-none"
                    @change="onChange"
                />
            </div>
        </label>
    </div>
</template>

<script>
    import Icon from "@elements/Icon/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";
    import CircleFrame from "@elements/CircleFrame/Index";
    import FileInput from "@elements/Input/File/Index";

    export default {
        name: 'IndexPage',
        components: {
            FileInput,
            ImageDisplay,
            Icon,
            CircleFrame
        },
        props: {
            image: {
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
                imageUrl: "",
                isShowCamera: false,
                classState: ""
            }
        },
        mounted() {
            this.onLoad();
        },
        methods: {
            onLoad() {
                this.imageUrl = this.image ? this.image : "";
            },
            setImagePreview(file) {
                this.imageUrl = window.URL.createObjectURL(file);
            },
            onChange(e) {
                this.setImagePreview(e);
                this.$emit("input", e);
                this.$emit("change", e);
            }
        }
    }
</script>