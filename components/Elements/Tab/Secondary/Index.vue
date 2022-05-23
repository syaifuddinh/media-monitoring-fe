<template>
    <div :class="classState">
        <div class="d-flex">
            <div
                v-for="value in leftItems"
                :key="value.id"
                class="cursor-pointer"
                @click="switchItems(value.id)"
            >
                <div :ref="value.id" class="mr-24px">
                    <SmallText
                        transform="capitalize"
                        :weight="600"
                        :color="value.color"
                        :dark-theme-color="value.color"
                    >
                        {{ value.title }}
                    </SmallText>
                </div>
            </div>
        </div>
        <div class="mt-8px w-100 position-relative">
            <div
                :class="'position-absolute h-2px bg-purple ' + ('left-' + offsetLeft) + ' '  + ('w-' + offsetWidth + 'px')">        
            </div>
        </div>
    </div>
</template>

<script>
    import SmallText from "@elements/Text/Small/Index";

    export default {
        name: 'IndexPage',
        components: {
            SmallText
        },
        props: {
            className: {
                type: String,
                default: ""
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
                offsetLeft: 0,
                offsetWidth: 0,
                leftItems: []
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
                    response.color = normalColor;
                    return response;
                });
                const leftItems = items.filter(param => {
                    return !param.align || param.align === "left"; 
                });

                this.leftItems = leftItems;
                this.initOffsetWidth();
            },
            initOffsetWidth() {
                setTimeout(() => {
                    if(this.leftItems.length > 0) {
                        const firstItem = this.leftItems[0];
                        const element = this.$refs[firstItem.id][0];
                        this.offsetWidth = element.offsetWidth.toFixed(0);
                    }
                }, 100);
            },
            switchItems(id, align = "left") {
                let leftItems = this.leftItems;
                let index = -1;
                let itemSelected;
                const activedTab = this.$refs[id][0];
                this.offsetLeft = activedTab.offsetLeft - 24;
                this.offsetWidth = activedTab.offsetWidth.toFixed(0);
                if(align === "left") {
                    index = leftItems.findIndex(param => param.id === id);
                }
                if(index > -1) {
                    leftItems = leftItems.map(param => {
                        const response = param;
                        response.color = "white";

                        return response;
                    });
                    
                    if(align === "left") {
                         itemSelected = leftItems;
                    } 
                    itemSelected[index].color = this.activedColor;
                    const itemTitle = itemSelected[index].title;
                    leftItems = leftItems.map(param => {
                        const response = param;
                        response.id = Math.round(Math.random() * 999999999);

                        return response;
                    });
                    
                    this.leftItems = leftItems;
                    const itemSelectedIndex = this.items.findIndex(param => param.title === itemTitle);
                    if(itemSelectedIndex > -1) {
                        this.$emit("click", itemSelectedIndex);
                    }
                }
            },
            setClassState() {
                let classState = "";

                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>