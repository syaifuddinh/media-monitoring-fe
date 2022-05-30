<template>
    <PrimaryCard
        :class="classState"
        :padding-y="8"
    >
        <div class="row">
            <div class="col-md-8 col-xs-12">
                <SemiLeadContentText
                    display="block"
                    :weight="700"
                >
                    {{ title }}
                </SemiLeadContentText>
            </div>
            <div class="w-100 h-16px d-block d-md-none"></div>
        </div>
        
        <NormalText
            display="block"
            :weight="500"
            :margin-top="8"
        >
            Username : {{ username }}
        </NormalText>
        <NormalText
            display="block"
            :weight="500"
            :margin-top="8"
        >
            Hak akses : {{ userRole }}
        </NormalText>
    
        <div class="row mt-16px">
            <div class="col-md-6 col-xs-12">
            </div>
            <div class="col-md-3 col-xs-12">
                <DeleteModal @confirm="onDestroy">
                    <Button
                        label="Hapus"
                        variant="danger"
                    />
                </DeleteModal>
            </div>
            <div class="w-100 d-block d-md-none h-24px"></div>
            <div class="col-md-3 col-xs-12">
                <Button
                    label="Edit"
                    variant="primary"
                    @click="onEdit"
                />
            </div>
        </div>

        <LineRuler class-name="mt-16px" />
    </PrimaryCard>
</template>

<script>
    import PrimaryCard from "@elements/Card/Primary/Index";
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import LineRuler from "@elements/LineRuler/Index";
    import Button from "@elements/Button/Index";
    import DeleteModal from "@elements/Modal/Delete/Index";

    export default {
        name: 'IndexPage',
        components: {
            Button,
            DeleteModal,
            SemiLeadContentText,
            NormalText,
            LineRuler,
            PrimaryCard
        },
        props: {
            title: {
                type: String,
                default: ""
            },
            username: {
                type: String,
                default: ""
            },
            userRole: {
                type: String,
                default: ""
            },
            description: {
                type: String,
                default: ""
            },
            source: {
                type: String,
                default: ""
            },
            date: {
                type: String,
                default: ""
            },
            variant: {
                type: String,
                default: "positif"
            }
        },
        data() {
            return {
                classState: ""
            }
        },
        mounted() {
        },
        methods: {
            onClick() {
                this.$emit("click");
            },
            onEdit() {
                this.$emit("edit");
            },
            onDestroy() {
                this.$emit("destroy");
            }   
        }
    }
</script>