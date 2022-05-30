<template>
    <PrimaryCard
        :class="classState"
        :padding-y="8"
    >
        
        <div class="cursor-pointer" @click="onClick">
            <SmallText
                display="block"
                :weight="600"
                :margin-top="8"
                class-name="darken-text-primary"
                color=""
            >
                {{ date }}            
            </SmallText>
            <NormalText
                display="block"
                :weight="500"
                :margin-top="8"
            >
                <div ref="description"></div>
            </NormalText>
        </div>
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
    import NormalText from "@elements/Text/Normal/Index";
    import SmallText from "@elements/Text/Small/Index";
    import LineRuler from "@elements/LineRuler/Index";
    import Button from "@elements/Button/Index";
    import DeleteModal from "@elements/Modal/Delete/Index";

    export default {
        name: 'IndexPage',
        components: {
            Button,
            DeleteModal,
            NormalText,
            LineRuler,
            SmallText,
            PrimaryCard
        },
        props: {
            title: {
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
                classState: " "
            }
        },
        mounted() {
            this.$refs.description.innerHTML = this.description;
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