<template>
    <div>
        <Button @click="previousPage">
            <Icon
                variant="fontawesome"
                src="chevron-left"
            />
        </Button>   
        <Button
            v-for="value in page"
            :key="value.key + counter.toString()"
            :is-active="value.isActive"
            @click="selectPage(value.key)"
        >
            {{ value.key }}
        </Button>   
        <Button @click="nextPage">
            <Icon
                variant="fontawesome"
                src="chevron-right"
            />
        </Button>
    </div>
</template>

<script>
    import Icon from "@elements/Icon/Index";    
    import Button from "./Button/Index";    

    export default {
        name: 'PagingElement',
        components: {
            Button,
            Icon
        },
        props: {
            totalData: {
                type: Number,
                default: 10
            },
            length: {
                type: Number,
                default: 5
            }
        },
        data() {
            return {
                counter: 1,
                page: []
            }
        },
        mounted() {
            this.initiatePage();
        },
        methods: {
            onChange() {
                const item = this.page.find(({ isActive }) => isActive === true);
                if(item)
                    this.$emit("change", item.key);
            },
            initiatePage() {
                let i = 0;
                const total = Math.ceil(this.totalData / this.length);
                for(i = 0;i < total;i++) {
                    this.page.push({
                        key: i + 1,
                        isActive: i === 0
                    })
                }
                if(this.page.length === 0) 
                    this.page.push({
                        key: 1,
                        isActive: true
                    })
            },
            nextPage() {
                const existingIndex = this.page.findIndex(({ isActive }) => isActive === true);
                if(existingIndex > -1) {
                    const nextIndex = this.page.findIndex(value => value.key === this.page[existingIndex].key + 1);
                    if(nextIndex > -1) {
                        this.page[existingIndex].isActive = false;
                        this.page[nextIndex].isActive = true;
                        this.counter++;
                    }
                    this.onChange();
                }
            },
            previousPage() {
                const existingIndex = this.page.findIndex(({ isActive }) => isActive === true);
                if(existingIndex > -1) {
                    const previousIndex = this.page.findIndex(value => value.key === this.page[existingIndex].key - 1);
                    if(previousIndex > -1) {
                        this.page[existingIndex].isActive = false;
                        this.page[previousIndex].isActive = true;
                        this.counter++;
                    }
                    this.onChange();
                }
            },
            selectPage(key) {
                const existingIndex = this.page.findIndex(value => value.key === key);
                if(existingIndex > -1) {
                    this.page = this.page.map(value => {
                        const response = value;
                        response.isActive = false;

                        return response;
                    });
                    this.page[existingIndex].isActive = true;
                    this.counter++;
                    this.onChange();
                }
            }
        }
    }
</script>
