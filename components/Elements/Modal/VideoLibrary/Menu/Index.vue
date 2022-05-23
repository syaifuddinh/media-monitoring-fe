<template>
    <PrimaryCard
        height="260"
        background="dark"
        dark-theme-background="dark"
        class-name="d-flex flex-column justify-content-between"
        @click="onClick"
    >
        <div>
            <Checked
                v-if="isActive"
                class-name="float-right"
            />            
        </div>
        <SemiLeadContentText
            :weight="700"
        >
            {{ title }}
        </SemiLeadContentText>
    </PrimaryCard>
</template>

<script>
    import PrimaryCard from "@elements/Card/Primary/Index";
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import Checked from "@elements/Checked/Index";

    export default {
        name: 'IndexPage',
        components: {
            SemiLeadContentText,
            Checked,
            PrimaryCard
        },
        props: {
            title: {
                type: String,
                required: true
            },
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                isActive: false,
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
                let classState = "";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
                this.name = "";
            },
            onClick() {
                this.isActive = !this.isActive;
                this.$emit("click", this.isActive);
            }
        }
    }
</script>