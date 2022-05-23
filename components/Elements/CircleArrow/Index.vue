<template>
    <CircleFrame
        :width="20"
        :height="20"
        display="flex"
        :background="isActive === true ? 'primary' : 'dark-grey'"
        class-name="justify-content-center align-items-center hover-lighten-bg-primary"
    >
        <Icon
            :key="dir"
            variant="fontawesome"
            size="14"
            :src="'angle-' + dir"
            dark-theme-color="dark"
        />
    </CircleFrame>
</template>

<script>
    import CircleFrame from '@elements/CircleFrame/Index';
    import Icon from '@elements/Icon/Index';

    export default {
        name: 'IndexPage',
        components: {
            CircleFrame,
            Icon
        },
        props: {
            isActive: {
                type: Boolean,
                default: true
            },
            dir: {
                type: String,
                default: "right"
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
                let classState = "";
                classState += "h-" + this.height + "px ";
                classState += "w-" + this.width + "px ";
                classState += "rounded-100px ";
                classState += "overflow-hidden ";
                if(this.marginRight) {
                    classState += "mr-" + this.marginRight + "px ";
                }
                if(this.marginLeft) {
                    classState += "ml-" + this.marginRight + "px ";
                }
                if(this.background) {
                    classState += "bg-" + this.background + " ";
                }
                if(this.display) {
                    classState += "d-" + this.display + " ";
                }
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>