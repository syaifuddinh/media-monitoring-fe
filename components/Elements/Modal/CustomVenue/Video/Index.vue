<template>
    <div
        class="position-absolute cursor-grab bg-dark p-16px"
        draggable="true"
        @drag="dragElement"
    >
        <div class="d-flex justify-content-end">
            <div class="d-flex rounded-100px overflow-hidden cursor-pointer">
                    <div
                        class="bg-primary hover-bg-primary px-19px py-11px"
                        @click="onEdit"
                    >
                        <Icon
                            variant="fontawesome"
                            src="edit"
                        />
                    </div>
                    <div
                        class="bg-primary hover-bg-primary px-19px py-11px"
                        @click="onDelete"
                    >
                        <Icon
                            variant="fontawesome"
                            src="trash"
                        />
                    </div>
            </div>
        </div>

        <SmallText
            display="block"
            align="center"
            :margin-top="16"
        >
            {{ name }}
        </SmallText>
    </div>
</template>

<script>
    import SmallText from "@elements/Text/Small/Index";
    import Icon from "@elements/Icon/Index";

    export default {
        name: 'IndexPage',
        components: {
            Icon,
            SmallText
        },
        props: {
            name: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: {
            onDelete() {
                this.$emit("delete")
            },
            onEdit() {
                this.$emit("edit")
            },
            dragElement(e) {
                this.$emit("drag", e);
            }
        }
    }
</script>