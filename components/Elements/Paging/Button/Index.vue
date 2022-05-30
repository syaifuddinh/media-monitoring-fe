<template>
    <div :class="className" @click="onClick">
        <SmallText
            :weight="600"
            :color="isActive ? 'white' : 'black'"
        >
            <slot>
                
            </slot>
        </SmallText>
    </div>   
</template>

<script>
    import SmallText from "@elements/Text/Small/Index";    

    export default {
        name: 'PagingElement',
        components: {
            SmallText
        },
        props: {
            isActive: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                className: ""
            }
        },
        mounted() {
            this.setClass();
        },
        methods: {
            onClick() {
                this.$emit("click");
            },
            setClass() {
                let className = "d-inline-flex align-items-center justify-content-center min-w-32px min-h-32px b-1 border-dark-grey cursor-pointer hover-dark-grey ";
                className += this.isActive ? "bg-black " : "";
                this.className = className;
            }
        }
    }
</script>
