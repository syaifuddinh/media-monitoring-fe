<template>
    <div :class="classState">
        <div class="d-flex">
            <div
                :key="counter"
                class="d-flex bg-dark px-4px py-5px rounded-8px mb-32px pt-23px w-100"
            >
                <Tab
                    v-for="value in leftItems"
                    :key="value.id"
                    :title="value.title"
                    :icon="value.icon"
                    class-name="mr-2px"
                    :is-active="value.isActive"
                    @click="switchItems(value.id)"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import Tab from "./Tab/Index";

    export default {
        name: 'IndexPage',
        components: {
            Tab
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
                counter: 0,
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
                    response.id = Math.round(Math.random() * 999999999);
                    response.isActive = false;

                    return response;
                });
                if(items.length > 0) {
                    items[0].isActive = true;
                }

                this.leftItems = items;
            },
            switchItems(id) {
                const leftItems = this.leftItems;
                let index = -1;
                this.leftItems = leftItems.map(value => {
                    const response = value;
                    response.isActive = false;

                    return response;
                });
                index = leftItems.findIndex(value => value.id === id);
                if(index > -1) {
                    this.leftItems[index].isActive = true;
                    this.$emit("click", index);
                }
                ++this.counter;
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