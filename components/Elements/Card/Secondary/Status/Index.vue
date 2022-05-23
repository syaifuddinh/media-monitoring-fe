<template>
    <div class="d-flex justify-content-end align-items-center">
        <Label
            :key="labelColor"
            :title="label"
            :background="labelColor"
        />
    </div>
</template>

<script>
    import Label from "@elements/Label/Index";

    export default {
        name: 'IndexPage',
        components: {
            Label
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            imageUrl: {
                type: String,
                default: ""
            },
            variant: {
                type: String,
                default: "scheduled"
            }
        },
        data() {
            return {
                classState: "",
                label: "",
                labelColor: "",
                picture: "",
                pictureClass: ""
            }
        },
        mounted() {
            this.setClassState();
            this.setPictureStyle();
            this.setLabelStyle();
        },
        methods: {
            setPictureStyle() {
                const variant = this.variant.toLowerCase();
                let pictureClass = "w-40px h-40px d-flex justify-content-center align-items-center rounded-8px ";
                switch(variant) {
                    case "scheduled":
                        pictureClass += "bg-warning ";
                        break;
                    case "pause":
                        pictureClass += "bg-purple ";
                        break;
                    case "ongoing":
                        pictureClass += "bg-primary ";
                        break;
                    case "finished":
                        pictureClass += "bg-success ";
                        break;
                    case "archived":
                        pictureClass += "bg-success ";
                        break;
                }
                this.pictureClass = pictureClass;
            },
            setLabelStyle() {
                const variant = this.variant.toLowerCase();
                let labelColor = "";
                let label = "";
                switch(variant) {
                    case "scheduled":
                        labelColor = "primary";
                        label = "akan datang";
                        break;
                    case "pause":
                        labelColor = "warning";
                        label = "pause";
                        break;
                    case "ongoing":
                        labelColor = "danger";
                        label = "berlangsung";
                        break;
                    case "finished":
                        labelColor = "success";
                        label = "selesai";
                        break;
                    case "archived":
                        labelColor = "light-black";
                        label = "arsip";
                        break;
                }
                this.labelColor = labelColor;
                this.label = label;
            },
            setClassState() {
                let classState = "";
                const background = this.background;

                classState += "p-24px ";
                classState += "rounded-24px ";
                classState += "position-relative ";
                classState += "overflow-hidden ";
                classState += "bg-" + background + " ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>