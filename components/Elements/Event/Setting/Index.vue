<template>
    <div>
        <div class="row">
            <div class="col-md-8 col-xs-12">
                <PrimaryCard>
                    <div class="d-flex justify-content-between align-items-center">
                        <NormalText :weight="700">
                            Siapa yang bisa mengikuti acara ini?
                        </NormalText>
                        <AllowedAttendeeModal>
                            <Button
                                label="Ubah"
                                left-icon="edit"
                                left-icon-variant="fontawesome"
                                variant="purple"
                                :width="100"
                            />
                        </AllowedAttendeeModal>
                    </div>
                    <div class="d-flex align-items-center mt-16px hover-text-dark-grey">
                        <Icon
                            variant="fontawesome"
                            src="users"
                            dark-theme-color="dark-grey"
                        />
                        <ExtraSmallText
                            :weight="500"
                            :margin-left="11"
                            dark-theme-color="dark-grey"
                        >
                            Siapapun dapat masuk dan mengubah tautan 
                        </ExtraSmallText>
                    </div>
                </PrimaryCard>

                <PrimaryCard :margin-top="24">
                    <div class="d-flex justify-content-between align-items-center">
                        <NormalText :weight="700">
                            Form Pendaftaran
                        </NormalText>
                    </div>
                    <div class="d-flex align-items-center mt-16px">
                        <ExtraSmallText
                            :weight="500"
                            dark-theme-color="dark-grey"
                            :margin-right="25"
                        >
                            Formulir pendafaran terbaru 
                        </ExtraSmallText>

                        <ViewEventFormModal>
                            <div class="d-flex align-items-center cursor-pointer hover-text-purple mr-25px">
                                <Icon
                                    variant="fontawesome"
                                    src="eye"
                                    dark-theme-color="purple"
                                    color="purple"
                                />
                                <ExtraSmallText
                                    :weight="600"
                                    :margin-left="9"
                                    dark-theme-color="purple"
                                    color="purple"
                                >
                                    Lihat Formulir 
                                </ExtraSmallText>
                            </div>
                        </ViewEventFormModal>
                        
                        <CreateCustomFormModal>
                            <div class="d-flex align-items-center cursor-pointer hover-text-primary mr-25px">
                                <Icon
                                    variant="fontawesome"
                                    src="edit"
                                    dark-theme-color="primary"
                                    color="primary"
                                />
                                <ExtraSmallText
                                    :weight="600"
                                    :margin-left="9"
                                    dark-theme-color="primary"
                                    color="primary"
                                >
                                    Buat Custom 
                                </ExtraSmallText>
                            </div>
                        </CreateCustomFormModal>
                    </div>
                </PrimaryCard>

                <TrialCard class="mt-24px">
                    Upgrade Untuk Membuat<br>
                    Custom Formulir Pendaftaran
                </TrialCard>
            </div>

            <div class="w-100 h-24px d-block d-md-none"></div>
            <div class="col-md-4 col-xs-12">
                <TrialLimit />
            </div>
        </div>
    </div>
</template>

<script>
    import TrialLimit from "@elements/Dashboard/TrialLimit/Index";
    import Button from "@elements/Button/Index";
    import Icon from "@elements/Icon/Index";
    import PrimaryCard from "@elements/Card/Primary/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import TrialCard from "@elements/Card/Trial/Index";
    import ViewEventFormModal from "@elements/Modal/ViewEventForm/Index";
    import CreateCustomFormModal from "@elements/Modal/CreateCustomForm/Index";
    import AllowedAttendeeModal from "@elements/Modal/AllowedAttendee/Index";

    export default {
        name: 'IndexPage',
        components: {
            TrialLimit,
            AllowedAttendeeModal,
            ViewEventFormModal,
            CreateCustomFormModal,
            NormalText,
            TrialCard,
            ExtraSmallText,
            Button,
            Icon,
            PrimaryCard
        },
        props: {
        },
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>