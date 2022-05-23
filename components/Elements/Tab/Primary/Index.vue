<template>
    <div :class="classState">
        <div class="d-flex">
            <div
                v-for="value in leftItems"
                :key="value.id"
                class="cursor-pointer"
                @click="switchItems(value.id)"
            >
                <SmallText
                    transform="capitalize"
                    :weight="600"
                    :color="value.color"
                    :dark-theme-color="value.color"
                >
                    {{ value.title }}
                </SmallText>
                <div class="d-inline-block w-24px"></div>
            </div>
        </div>
        <div class="d-flex">
            <div
                v-for="value in rightItems"
                :key="value.id"
                class="cursor-pointer"
                @click="switchItems(value.id, 'right')"
            >
                <div class="d-inline-block w-24px"></div>
                <Icon
                    v-if="value.icon"
                    :src="value.icon"
                    variant="fontawesome"
                    :color="value.color"
                />
                <div class="d-inline-block w-10px"></div>
                <SmallText
                    transform="capitalize"
                    :weight="600"
                    :color="value.color"
                >
                    {{ value.title }}
                </SmallText>
            </div>
        </div>
    </div>
</template>

<script>
    import SmallText from "@elements/Text/Small/Index";
    import Icon from "@elements/Icon/Index";

    export default {
        name: 'IndexPage',
        components: {
            SmallText,
            Icon
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            activedColor: {
                type: String,
                default: "primary"
            },
            defaultIndex: {
                type: Number,
                default: 0
            },
            items: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                classState: "",
                leftItems: [],
                rightItems: []
            }
        },
        mounted() {
            this.setClassState();
            this.setItems();
        },
        methods: {
            setItems() {
                const items = this.items.map((param, index) => {
                    const response = param;
                    const normalColor = this.$store.state.Base.isUseDarkTheme ? "white" : "";
                    response.id = Math.round(Math.random() * 999999999);
                    response.color = this.defaultIndex === index ? this.activedColor : normalColor;
                    return response;
                });
                const leftItems = items.filter(param => {
                    return !param.align || param.align === "left"; 
                });

                const rightItems = items.filter(param => {
                    return param.align === "right"; 
                });

                this.leftItems = leftItems;
                this.rightItems = rightItems;
            },
            switchItems(id, align = "left") {
                let leftItems = this.leftItems;
                let rightItems = this.rightItems;
                let index = -1;
                let itemSelected;
                if(align === "left") {
                    index = leftItems.findIndex(param => param.id === id);
                } else if(align === "right") {
                    index = rightItems.findIndex(param => param.id === id);
                }
                if(index > -1) {
                    leftItems = leftItems.map(param => {
                        const response = param;
                        response.color = "";

                        return response;
                    });
                    rightItems = rightItems.map(param => {
                        const response = param;
                        response.color = "";

                        return response;
                    });
                    if(align === "left") {
                         itemSelected = leftItems;
                    } else if(align === "right") {
                         itemSelected = rightItems;
                    }
                    itemSelected[index].color = this.activedColor;
                    const itemTitle = itemSelected[index].title;
                    leftItems = leftItems.map(param => {
                        const response = param;
                        response.id = Math.round(Math.random() * 999999999);

                        return response;
                    });
                    rightItems = rightItems.map(param => {
                        const response = param;
                        response.id = Math.round(Math.random() * 999999999);

                        return response;
                    });
                    this.leftItems = leftItems;
                    this.rightItems = rightItems;
                    const itemSelectedIndex = this.items.findIndex(param => param.title === itemTitle);
                    if(itemSelectedIndex > -1) {
                        this.$emit("click", itemSelectedIndex);
                    }
                }
            },
            setClassState() {
                let classState = "";

                classState += "d-flex ";
                classState += "justify-content-between ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>