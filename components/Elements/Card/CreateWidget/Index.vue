<template>
    <PrimaryCard
        :class="classState"
        background="transparent"
        :padding-x="variant === 'secondary' ? 8 : 24"
        :padding-y="variant === 'secondary' ? 8 : 24"
        :radius="variant === 'secondary' ? 8 : 24"
    >
        <div class="position-absolute w-100 h-100 top-0 left-0 bg-primary opacity-1"></div>
        <div class="w-100 h-90px" v-if="variant === 'primary'"></div>
        <CircleFrame
            v-if="variant === 'primary'"
            :width="48"
            :height="48"
            background="primary"
            display="flex"
            class-name="justify-content-center align-items-center position-relative"
        >
            <Icon
                variant="fontawesome"
                src="plus"
                :size="25"
                dark-theme-color="black"
            />            
        </CircleFrame>
        <CircleFrame
            v-if="variant === 'secondary'"
            :width="24"
            :height="24"
            :margin-right="8"
            background="primary"
            display="flex"
            class-name="justify-content-center align-items-center position-relative"
        >
            <Icon
                variant="fontawesome"
                src="plus"
                :size="14"
                dark-theme-color="black"
            />            
        </CircleFrame>
        <div class="w-100 h-16px" v-if="variant === 'primary'"></div>
        <SmallText
            :weight="600"
            display="block"
            align="center"
            color="primary"
            class-name="position-relative"
            transform="capitalize"
        >
            {{ label }}
        </SmallText>
    </PrimaryCard>
</template>

<script>
    import PrimaryCard from "@elements/Card/Primary/Index";
    import SmallText from "@elements/Text/Small/Index";
    import CircleFrame from "@elements/CircleFrame/Index";
    import Icon from "@elements/Icon/Index";

    export default {
        name: 'IndexPage',
        components: {
            SmallText,
            CircleFrame,
            Icon,
            PrimaryCard
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            variant: {
                type: String,
                default: "primary"
            },
            label: {
                type: String,
                required: true
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
                if(this.variant === 'primary') {
                    classState += "h-300px ";
                    classState += "flex-column ";
                }

                classState += "d-flex ";
                classState += "align-items-center ";
                classState += "b-1 ";
                classState += "border-primary ";
                classState += "border-dashed ";
                classState += "cursor-pointer ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>