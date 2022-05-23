<template>
    <PrimaryCard
        background="primary"
        :is-disable-dark-theme="true"
        :class="classState"
    >
        <SemiLeadContentText
            weight="700"
            transform="capitalize"
            display="block"
            color="white"
        >
            <slot></slot>
        </SemiLeadContentText>
        <Button
            label="upgrade sekarang"
            variant="white-primary"
            :margin-top="24"
            :width="179"
        />
        <div class="position-absolute right-0 bottom-0">
            <ImageDisplay
                src="writing-note.png"
                height="120"
                width="auto"
            />
        </div>
    </PrimaryCard>
</template>

<script>
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import PrimaryCard from "@elements/Card/Primary/Index";
    import Button from "@elements/Button/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";

    export default {
        name: 'IndexPage',
        components: {
            SemiLeadContentText,
            PrimaryCard,
            ImageDisplay,
            Button
        },
        props: {
            src: {
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