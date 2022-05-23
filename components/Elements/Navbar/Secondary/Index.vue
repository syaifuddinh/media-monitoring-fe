<template>
    <div :class="defaultClass + ' ' + className">
        <Logo
            :is-use-dark-theme="false"
        />
    </div>
</template>

<script>
    import Logo from '@elements/Logo/Index';

    export default {
        name: 'IndexPage',
        components: {
            Logo
        },
        props: {
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                defaultClass: ""
            }
        },
        mounted() {
            this.setDefaultClass();
        },
        methods: {
            setDefaultClass() {
                let defaultClass = "";
                defaultClass += "py-18px "
                defaultClass += "px-20px "
                this.defaultClass = defaultClass
            },
            onNavigationClicked() {
                window.history.back();
            }
        }
    }
</script>