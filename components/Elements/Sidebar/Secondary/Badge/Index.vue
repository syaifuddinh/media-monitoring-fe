<template>
    <div class="position-relative w-100">
        <div class="d-flex w-100 align-items-center">
            <div @click="openEvents" class="mr-16px cursor-pointer hover-text-white">
                <Icon
                    variant="fontawesome"
                    src="arrow-left"
                    class-name="hover-text-white"
                />
            </div>
            <SquareFrame
                :width="40"
                :height="40"
                :radius="8"
                class-name="min-w-40px"
            >
                <ImageDisplay
                    type="url"
                    :src="$store.state.Event.visited.thumbnailUrl"
                    height="40"
                    width="auto"
                />
            </SquareFrame>
            <SmallText
                display="block"
                transform="capitalize"
                color="light-black"
                :weight="600"
                :margin-left="8"
                class-name="h-60px overflow-hidden"
            >
                {{ $store.state.Event.visited.name }}
            </SmallText>
        </div>
    </div>
</template>

<script>
    import Icon from '@elements/Icon/Index';
    import SquareFrame from '@elements/SquareFrame/Index';
    import ImageDisplay from '@elements/ImageDisplay/Index';
    import SmallText from '@elements/Text/Small/Index';

    export default {
        name: 'IndexPage',
        components: {
            SquareFrame,
            ImageDisplay,
            SmallText,
            Icon
        },
        data() {
            return {
                isShowTeamPanel: false,
                items: []
            }
        },
        mounted() {
        },
        methods: {
            openEvents() {
                setTimeout(() => {
                    this.$store.commit("Base/switchPrimarySidebar", true);
                    this.$store.commit("Base/switchSecondarySidebar", false);
                    this.$store.commit("Event/changeVisited", {});
                }, 300);
                this.$router.push({path: "/event"});
            }
        }
    }
</script>