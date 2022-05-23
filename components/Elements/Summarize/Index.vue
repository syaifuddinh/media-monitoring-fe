<template>
    <span>
        {{ titleSummarized }}
    </span>
</template>

<script>
    export default {
        name: 'IndexPage',
        props: {
            title: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                titleSummarized: ""
            }
        },
        mounted() {
            this.summarize();
        },
        methods: {
            summarize() {
                const limit = 15;
                const length = this.title.length
                let result = this.title;
                if(length > limit) {
                    result = result.substr(0, limit);
                    result += " ...";
                }

                this.titleSummarized = result;
            }
        }
    }
</script>