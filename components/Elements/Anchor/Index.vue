<template>
    <a
        :href="to"
        :class="classState"
        @click="onClicked"
    >
        <slot></slot>
    </a>
</template>

<script>
    export default {
        name: 'IndexPage',
        props: {
            content: {
                type: String,
                default: ""
            },
            className: {
                type: String,
                default: ""
            },
            decoration: {
                type: String,
                default: ""
            },
            to: {
                type: String,
                default: ""
            },
            target: {
                type: String,
                default: ""
            },
            display: {
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
            onClicked(e) {
                e.preventDefault();
                const url = this.to;
                if(url.search("http") > -1) {
                    if(this.target === "_blank") {
                        window.open(url, "_blank");
                    } else {
                        location.href = url;
                    }
                } else {
                    this.$router.push({path: url});
                }
                this.$emit("click");
            },
            setClassState() {
                let classState = "";
                classState += "fs-16px ";
                classState += "font-weight-600 ";
                classState += "text-primary ";
                if(this.display) {
                    classState += "d-" + this.display + " ";
                }
                if(this.decoration) {
                    classState += "text-decoration-" + this.decoration + " ";
                } else {
                    classState += "text-decoration-underline ";
                }
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>