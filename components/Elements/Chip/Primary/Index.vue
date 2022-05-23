<template>
    <div :class="classState" :key="counter">
        <div
            v-for="value in chips"
            :key="value.id"
            @click="switchItem(value.id)"
            class="mr-8px"
        >
            <ExtraSmallText
                :weight="500"
                :padding="8"
                :border="1"
                :radius="4"
                border-color="dark-grey"
                class-name="cursor-pointer d-flex align-items-center"
                :background="value.isSelected === true ? 'purple' : ''"
                :color="value.isSelected === true ? 'white' : ''"
            >
                {{ value.label }}
                <div
                    v-if="isShowCloseButton === true"
                    @click="onRemoved(value.id)"
                    class="ml-8px"
                >
                    <Icon
                        variant="fontawesome"
                        src="times"
                    />
                </div>
            </ExtraSmallText>
        </div>
    </div>
</template>

<script>
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index"
    import Icon from "@elements/Icon/Index"

    export default {
        name: 'IndexPage',
        components: {
            ExtraSmallText,
            Icon
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            isShowCloseButton: {
                type: Boolean,
                default: false
            },
            isHighlighted: {
                type: Boolean,
                default: true
            },
            items: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                counter: 1,
                classState: "",
                chips: [],
            }
        },
        mounted() {
            this.setClassState();
            this.setItems();
        },
        methods: {
            switchItem(id) {
                if(this.isHighlighted === true) {
                    const clickedItemIndex = this.chips.findIndex(param => param.id === id);
                    if(clickedItemIndex > -1) {
                        this.chips[clickedItemIndex].isSelected = !this.chips[clickedItemIndex].isSelected;
                        ++this.counter;
                    }
                }
            },
            setItems() {
                const chips = this.items.map(param => {
                    const response = param;
                    response.id = Math.round(Math.random() * 99999999999);
                    response.isSelected = false;

                    return response;
                });

                this.chips = chips;
            },
            onRemoved(id) {
                const data = this.chips.find(value => value.id === id);
                this.$emit("remove", data);
            },
            setClassState() {
                let classState = "";
                classState += "d-inline-flex ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>