<template>
    <div>
        <CreateVideoModal v-if="variant === 'primary'" @submit="onSubmit">
            <CreateWidgetCard label="upload video" />
        </CreateVideoModal>
        <PrimaryCard
             v-if="variant === 'secondary'"
            :class="classState"
            background="transparent"
        >
            <div class="position-absolute w-100 h-100 top-0 left-0 bg-primary opacity-1"></div>
            <div>
                <CreateVideoModal @submit="onSubmit">
                    <Button
                        variant="primary"
                        label="Upload Video"
                    />
                </CreateVideoModal>

                <Divider
                    title="ATAU"
                    :width="150"
                />
                
                <VideoLibraryModal @submit="onSubmit">
                    <Button
                        variant="purple"
                        label="Tambah Dari Library"
                    />
                </VideoLibraryModal>
            </div>
        </PrimaryCard>
    </div>
</template>

<script>
    import PrimaryCard from "@elements/Card/Primary/Index";
    import Button from "@elements/Button/Index";
    import CreateVideoModal from "@elements/Modal/CreateVideo/Index";
    import VideoLibraryModal from "@elements/Modal/VideoLibrary/Index";
    import CreateWidgetCard from "@elements/Card/CreateWidget/Index";
    import Divider from "@elements/Label/Divider/Index";

    export default {
        name: 'IndexPage',
        components: {
            Divider,
            PrimaryCard,
            Button,
            VideoLibraryModal,
            CreateWidgetCard,
            CreateVideoModal
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            variant: {
                type: String,
                default: "primary"
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
            onSubmit() {
                this.$emit("submit")
            },
            setClassState() {
                let classState = "";

                classState += "h-300px ";
                classState += "flex-column ";

                classState += "d-flex ";
                classState += "align-items-center ";
                classState += "justify-content-center ";
                classState += "b-1 ";
                classState += "border-primary ";
                classState += "border-dashed ";
                classState += "cursor-pointer ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>