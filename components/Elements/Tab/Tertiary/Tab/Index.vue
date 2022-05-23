<template>
    <div 
        :class="classState"
        @click="onClick"
    >
        <SmallText
            :weight="600"
            :background="isActive === true ? 'purple' : ''" 
            display="flex"
            align="center"
            transform="capitalize"
            :padding-y="9"
            :rounded="8"
            class-name="w-100 justify-content-center"
        >
            <div v-if="icon" class="mr-10px">
                <Icon
                    variant="fontawesome"
                    :src="icon"
                />
            </div>
            <div>
                {{ title }}
            </div>
        </SmallText>
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
            icon: {
                type: String,
                default: ""
            },
            isActive: {
                type: Boolean,
                default: false
            },
            title: {
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
            onClick() {
                this.$emit("click");
            },
            setClassState() {
                let classState = "";
                classState += "cursor-pointer ";
                classState += "d-flex ";
                classState += "w-100 ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>