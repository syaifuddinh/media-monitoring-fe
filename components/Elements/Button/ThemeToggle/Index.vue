<template>
    <span :class="className">
        <toggle-button
            v-model="isUseDarkTheme"
            @input="onChanged"
            :sync="true"
            :value="false"
            :width="100"
            :labels="{checked: 'Dark Theme', unchecked: 'Light Theme'}"
            :switch-color="{checked: '#02001f', unchecked: 'white'}"
            color="#6f6ab9"
        />
    </span>
</template>

<script>
    import { mapMutations } from 'vuex';

    export default {
        name: 'IndexPage',
        props: {
            className: {
                type: String,
                default: ""
            }
        },
        computed: {
            isUseDarkTheme () {
                return this.$store.state.Base.isUseDarkTheme;
            }
        },
        data() {
            return {
                classState: ""
            }
        },
        mounted() {
            this.setClassName();
        },
        methods: {
            ...mapMutations({
                switchDarkTheme: 'Base/switchDarkTheme',
                incrementGlobalKey: 'Index/increment'
            }),
            setClassName() {
                let classState = "";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            },
            onChanged() {
                this.switchDarkTheme(!this.isUseDarkTheme);
                this.incrementGlobalKey();
            }
        }
    }
</script>