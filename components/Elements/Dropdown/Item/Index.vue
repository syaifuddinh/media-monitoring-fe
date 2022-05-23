<template>
    <li
        :class="'list-group-item py-6px cursor-pointer ' + ($store.state.Base.isUseDarkTheme === true ? 'bg-light-dark' : '')"
        @click="onClick"
    >
        <div class="d-flex align-items-center py-4px">
            <Icon
                v-if="icon"
                variant="fontawesome"
                :src="icon"
                :color="color ? color : 'primary'"
                :dark-theme-color="color ? color : 'primary'"
                class-name="mr-20px d-inline-block"
            />
            <SmallText 
                weight="500"
                :color="color ? color : null"
                :dark-theme-color="color ? color : 'white'"
            >
                <slot></slot>
            </SmallText> 
        </div>
    </li>
</template>

<script>
    import Icon from '@elements/Icon/Index';
    import SmallText from '@elements/Text/Small/Index';

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
            color: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: {
            onClick() {
                this.$emit("click");
            }
        }
    }
</script>