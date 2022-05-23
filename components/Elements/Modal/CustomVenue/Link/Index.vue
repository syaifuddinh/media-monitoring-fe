<template>
    <div
        class="position-absolute w-300px cursor-grab tranparent p-8px b-1 border-white border-dashed py-48px"
        draggable="true"
        @drag="dragElement"
        @mouseover="onMouseover"
        @mouseleave="onMouseleave"
    >
        <div class="d-flex flex-column justify-content-end align-items-center">
            <div v-if="isShowButton" class="position-relative w-100">
                <div class="position-absolute w-100 top-minus-40 right-0  d-flex justify-content-end w-100">
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
            </div>

            <Icon
                variant="fontawesome"
                src="link"
                :size="32"
            />
        </div>

        <ExtraSmallText
            v-if="isShowButton"
            display="block"
            align="center"
            :margin-top="16"
            background="black"
            :padding-y="4"
            class-name="position-absolute top-minus-46 right-0 w-200px rounded-4px overflow-hidden"
        >
            {{ url }}
        </ExtraSmallText>
    </div>
</template>

<script>
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import Icon from "@elements/Icon/Index";

    export default {
        name: 'IndexPage',
        components: {
            Icon,
            ExtraSmallText
        },
        props: {
            url: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                isShowButton: false
            }
        },
        mounted() {
        },
        methods: {
            onMouseover() {
                this.isShowButton = true;
            },
            onMouseleave() {
                this.isShowButton = false;
            },
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