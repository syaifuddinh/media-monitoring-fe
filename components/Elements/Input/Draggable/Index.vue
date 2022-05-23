<template>
    <div
        class="mb-12px position-relative"
        draggable="true"
        @drag="dragElement($event)"
        @dragover="dragoverElement($event)"
        @drop="dropElement($event)"
    >
        <div class="d-flex align-items-center mt-8px">
            <div
                class="mr-11px cursor-grab"
            >
                <Icon
                    variant="fontawesome"
                    src="bars"
                    color="dark-grey"
                    dark-theme-color="dark-grey"
                    class-name="hover-text-dark-grey"
                />
            </div>

            <NormalText
                display="block"
                :margin-right="8"
            >
                {{ orders }}
            </NormalText>

            <TextInput
                v-model="data"
            />
            <div
                v-if="isShowDelete"
                class="ml-11px cursor-pointer"
                @click="remove"
            >
                <Icon
                    variant="fontawesome"
                    src="trash"
                    color="danger"
                    dark-theme-color="danger"
                    class-name="hover-text-danger"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from "@elements/Icon/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import TextInput from "@elements/Input/Text/Index";

    export default {
        name: 'IndexPage',
        components: {
            TextInput,
            Icon,
            NormalText
        },
        props: {
            isShowDelete: {
                type: Boolean,
                default: true
            },
            value: {
                type: String,
                default: ""
            },
            orders: {
                type: Number,
                default: null
            }
        },
        computed: {
            data: {
                get() {
                    return this.value;
                },
                set(modifiedValue) {
                    this.$emit('input', modifiedValue);
                }
            }
        },
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: {
            dragElement(e) {
                this.$emit("drag", e);
            },
            dragoverElement(e) {
                this.$emit("dragover", e);
            },
            dropElement(e) {
                this.$emit("drop", e);
            },
            remove() {
                this.$emit("delete");
            }
        }
    }
</script>