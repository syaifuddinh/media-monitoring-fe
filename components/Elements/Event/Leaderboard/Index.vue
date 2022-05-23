<template>
    <div>
        <div class="row">
            <div class="col-md-6 col-xs-12">
                <ExtraSmallText
                    :weight="500"
                    dark-theme-color="dark-grey"
                >
                    Leaderboard adalah cara terbaik untuk memotivasi para peserta untuk terlibat dalam acara tersebut. Peserta diberikan poin untuk kegiatan yang diselesaikan selama acara. Anda juga dapat memberikan hadiah kepada peserta yang paling aktif.
                </ExtraSmallText>
            </div>
        </div>
        <div class="row mt-24px">
            <div class="col-md-6 col-xs-12">
                <div class="d-flex align-items-center">
                    <NormalText
                        :weight="600"
                        :margin-right="16"
                    >
                        Aktifkan Leaderboard pada event Anda
                    </NormalText>
                    <ToggleInput
                        v-model="isLeaderboardActive"
                        @change="setLeaderboardStatus"
                    />
                </div>
            </div>
        </div>
        <div v-if="isLeaderboardActive === true" class="row mt-24px">
            <div class="col-md-6 col-xs-12">
                <PrimaryCard>
                    <div
                        class="d-flex mb-4px justify-content-between align-items-center"
                    >
                        <NormalText :weight="700">
                            Alokasi Poin
                        </NormalText>
                        <EditLeaderboardPointsModal>
                            <Button
                                label="Ubah"
                                left-icon="edit"
                                left-icon-variant="fontawesome"
                                variant="purple"
                                :width="100"
                            />
                        </EditLeaderboardPointsModal>
                    </div>
                    <div
                        v-for="header in leaderboards"
                        :key="header.id"
                        class="mt-16px"
                    >
                        <SmallText

                            display="block"
                            :weight="600"
                        >
                            {{ header.name }}
                        </SmallText>
                        <div
                            v-for="value in header.children"
                            :key="value.id"
                            class="row mt-12px"
                        >
                            <div class="col-md-6 col-xs-12">
                                <SmallText>
                                    {{ value.name }}
                                </SmallText>
                            </div>
                            <div class="col-md-6 col-xs-12">
                                <div class="d-flex justify-content-end align-items-end">
                                    <ExtraSmallText
                                        color="primary"
                                        dark-theme-color="primary"
                                        :weight="600"
                                        :margin-right="8"
                                        display="block"
                                    >
                                        {{ value.description }}
                                    </ExtraSmallText>

                                    <SmallText
                                        :weight="600"
                                        :margin-right="8"
                                        display="block"
                                    >
                                        {{ value.value }}
                                    </SmallText>

                                    <ExtraSmallText
                                        dark-theme-color="dark-grey"
                                    >
                                        Points
                                    </ExtraSmallText>
                                </div>
                            </div>
                        </div>
                    </div>
                </PrimaryCard>

            </div>

            <div class="w-100 h-24px d-block d-md-none"></div>

            <div class="col-md-6 col-xs-12">
                <PrimaryCard>
                    <div
                        class="d-flex mb-4px justify-content-between align-items-center"
                    >
                        <NormalText :weight="700">
                            Pemenang
                        </NormalText>
                    </div>
                    <ExtraSmallText
                        display="block"
                        dark-theme-color="dark-grey"
                        :margin-top="10"
                    >
                        Peserta dengan poin terbanyak akan menjadi pemenang
                    </ExtraSmallText>
                    <div class="d-flex justify-content-between align-items-center">
                        <NormalText
                            display="block"
                            :weight="700"
                            :margin-top="24"
                        >
                            Berikan hadiah kepada pemenang
                        </NormalText>

                        <ToggleInput v-model="isGiveReward" />
                    </div>
                </PrimaryCard>

                <PrimaryCard class="mt-24px">
                    <div
                        class="d-flex mb-4px justify-content-between align-items-center"
                    >
                        <NormalText :weight="700">
                            Jumlah Pemenang
                        </NormalText>
                        <EditWinnerAmountModal>
                            <Button
                                label="Ubah"
                                left-icon="edit"
                                left-icon-variant="fontawesome"
                                variant="purple"
                                :width="100"
                            />
                        </EditWinnerAmountModal>
                    </div>
                    <ExtraSmallText
                        display="block"
                        dark-theme-color="dark-grey"
                        :margin-top="10"
                    >
                        Pemenang akan ditampilkan di menu leaderboard
                    </ExtraSmallText>
                    <NormalText
                        display="block"
                        :weight="700"
                        :margin-top="24"
                    >
                        {{ $store.state.Event.visited.leaderboard_winner }} Pemenang
                    </NormalText>
                </PrimaryCard>

            </div>
        </div>
    </div>
</template>

<script>
    import Button from "@elements/Button/Index";
    import PrimaryCard from "@elements/Card/Primary/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import SmallText from "@elements/Text/Small/Index";
    import ToggleInput from "@elements/Input/Toggle/Index";
    import EditLeaderboardPointsModal from "@elements/Modal/EditLeaderboardPoints/Index";
    import EditWinnerAmountModal from "@elements/Modal/EditWinnerAmount/Index";
    import Leaderboard from "@endpoints/Event/Leaderboard";
    import Event from "@endpoints/Event";

    export default {
        name: 'IndexPage',
        components: {
            ToggleInput,
            NormalText,
            SmallText,
            ExtraSmallText,
            EditLeaderboardPointsModal,
            EditWinnerAmountModal,
            Button,
            PrimaryCard
        },
        props: {
        },
        data() {
            return {
                leaderboards: [],
                isGiveReward: false,
                isLeaderboardActive: false
            }
        },
        mounted() {
            this.onLoad();
            this.setLeaderboards();
        },
        methods: {
            onLoad() {
                this.isLeaderboardActive = this.$store.state.Event.visited.is_leaderboard_active;
            },
            async setLeaderboards() {
                const items = await Leaderboard.list(this.$store.state.Event.visited.id);
                this.leaderboards = items;
            },
            async setLeaderboardStatus() {
                try {
                    await Leaderboard.setStatus(
                        this.$store.state.Event.visited.id,
                        this.isLeaderboardActive
                    );
                    Event.show(this.$store.state.Event.visited.id);
                } catch {

                }
            }
        }
    }
</script>