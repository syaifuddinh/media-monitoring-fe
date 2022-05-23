<template>
    <div class="d-flex">
            <ImageDisplay
                v-if="true"
                src="user-profile.png"
                height="25"
                width="auto"
                class-name="mr-1px ml-17px"
            />
            <CircleFrame
                :width="25"
                :height="25"
                v-if="false"
            >
                <ImageDisplay
                    type="url"
                    :src="image"
                    :key="image"
                    height="25"
                    width="auto"
                />
            </CircleFrame>
            <SmallText 
                :class-name="'px-15px py-2px text-capitalize d-none d-md-block'"
                weight="600"
                :color="$store.state.Base.isUseDarkTheme ? 'white' : ''"
            >
                {{ userName }}
            </SmallText>
            <Dropdown />
    </div>
</template>

<script>
    import ImageDisplay from '@elements/ImageDisplay/Index';
    import SmallText from '@elements/Text/Small/Index';
    import CircleFrame from '@elements/CircleFrame/Index';
    import User from '@models/User';
    import Dropdown from './Dropdown';

    export default {
        name: 'IndexPage',
        props: ["className"],
        components: {
            SmallText,
            ImageDisplay,
            CircleFrame,
            Dropdown
        },
        data() {
            return {
                defaultClass: "",
                userName: "",
                isAuthed: false,
                image: "",
                menuItems: []
            }
        },
        mounted() {
            this.getUser();
        },
        methods: {
            getUser() {
                const data = User.getData();
                this.userName = data.name
            }
        }
    }
</script>