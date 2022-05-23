<template>
    <div :class="classState" style="height:1mm" ></div>
</template>

<script>
    export default {
        name: 'IndexPage',
        props: {
            height: {
                type: String,
                default: "1"
            },
            color: {
                type: String,
                default: "grey"
            },
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                classState: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            setClassState() {
                let classState = "w-100 ";
                classState += "bt-" + this.height + " ";

                classState += "border-" + this.color + " ";

                classState += this.className;
                this.classState = classState;
            }
        }
    }
</script>