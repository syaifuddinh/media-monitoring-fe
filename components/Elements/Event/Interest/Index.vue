<template>
    <div>
        <div class="row">
            <div class="col-md-6 col-xs-12">
                <ExtraSmallText
                    :weight="500"
                    dark-theme-color="dark-grey"
                >
                    Menambahkan minat ke profil membantu peserta dalam membentuk koneksi yang lebih baik. Konect memiliki minat yang telah ditentukan sebelumnya yang dapat Anda gunakan atau tambahkan minat baru. Minat yang baru ditambahkan akan disimpan dalam daftar utama dan dapat digunakan di acara Anda berikutnya juga.
                </ExtraSmallText>
            </div>
        </div>
        
        <div class="row mt-24px">
            <div class="col-md-8 col-xs-12">
                <PrimaryCard>
                    <div class="d-flex justify-content-between align-items-center">
                        <NormalText :weight="700">
                            List Minat
                        </NormalText>
                        <EditEventInterestModal
                            @confirm="setData"
                        >
                            <Button
                                label="Ubah"
                                left-icon="edit"
                                left-icon-variant="fontawesome"
                                variant="purple"
                                :width="100"
                            />
                        </EditEventInterestModal>
                    </div>
                    <div class="d-flex align-items-center mt-16px hover-text-dark-grey">
                        <Chip
                            :key="items.length"
                            :items="items"
                            :is-highlighted="false"
                        />
                        
                    </div>
                </PrimaryCard>

            </div>

            <div class="w-100 h-24px d-block d-md-none">

            </div>
        </div>
    </div>
</template>

<script>
    import Button from "@elements/Button/Index";
    import PrimaryCard from "@elements/Card/Primary/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import EditEventInterestModal from "@elements/Modal/EditEventInterest/Index";
    import Chip from "@elements/Chip/Primary/Index";
    import Interest from "@endpoints/Event/Interest";

    export default {
        name: 'IndexPage',
        components: {
            EditEventInterestModal,
            ExtraSmallText,
            NormalText,
            Button,
            Chip,
            PrimaryCard
        },
        props: {
        },
        data() {
            return {
                items: []
            }
        },
        mounted() {
            this.setData();
        },
        methods: {
            async setData() {
                let items = await Interest.list(this.$store.state.Event.visited.id);
                items = items.map(({ name }) =>  ({ label: name }))
                this.items = items;
            }
        }
    }
</script>