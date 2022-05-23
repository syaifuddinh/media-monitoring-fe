<template>
    <PrimaryCard :class="classState">
        <SemiLeadContentText
            weight="700"
            transform="capitalize"
            display="block"
        >
            batas uji coba gratis
        </SemiLeadContentText>
        <div class="mt-24px">
            <NormalText
                color="primary"
                :weight="600"
                display="block"
                :is-disable-dark-theme="true"
            >
                Kuota terpakai
            </NormalText>
            <NormalText>
                75 dari 100 peserta
            </NormalText>
        </div>
    </PrimaryCard>
</template>

<script>
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import PrimaryCard from "@elements/Card/Primary/Index";

    export default {
        name: 'IndexPage',
        components: {
            SemiLeadContentText,
            NormalText,
            PrimaryCard
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