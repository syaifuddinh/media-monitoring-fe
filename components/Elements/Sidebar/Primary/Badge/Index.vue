<template>
    <div class="position-relative w-100">
        <div id="create-organization">
            <CreateOrganizationModal
                @confirm="getData"
                :is-show-cancel-button="false"
                :is-show-times-icon="false"
            />
        </div>
        <div class="d-flex w-100 align-items-center justify-content-between">
            <CompanyName
                :alias="$store.state.Organization.default.slug"
                :name="$store.state.Organization.default.name"
            />
            <div @click="showTeamPanel" class="float-right">
                <CircleArrow
                    :key="isShowTeamPanel"
                    :is-active="!isShowTeamPanel"
                />
            </div>
        </div>
        <div
            v-if="isShowTeamPanel === true"
            class="bg-light-dark p-24px w-100 position-absolute top-minus-40-percent left-100-percent z-index-3 h-831px rounded-top-right-16px"
        >
            <div class="d-flex align-items-center justify-content-between">
                <NormalText
                    :weight="700"
                >
                    Team Anda
                </NormalText>

                <div @click="hideTeamPanel">
                    <CircleArrow
                        dir="left"
                    />
                </div>
            </div>
            <CreateOrganizationCard
                class="mt-26px"
                @confirm="getData"
            />
            <CompanyName
                v-for="value in items"
                :key="value.id"
                class="mt-24px"
                :is-show-chevron-right="true"
                :alias="value.slugEdited"
                :name="value.name"
                @click="selectOrganization(value.id)"
            />
        </div>
    </div>
</template>

<script>
    import CircleArrow from '@elements/CircleArrow/Index';
    import NormalText from '@elements/Text/Normal/Index';
    import CompanyName from '@elements/CompanyName/Index';
    import CreateOrganizationCard from '@elements/Card/CreateOrganization/Index';
    import CreateOrganizationModal from '@elements/Modal/CreateOrganization/Index';
    import Organization from '@endpoints/Organization';

    export default {
        name: 'IndexPage',
        components: {
            CompanyName,
            CircleArrow,
            NormalText,
            CreateOrganizationModal,
            CreateOrganizationCard
        },
        data() {
            return {
                isShowTeamPanel: false,
                items: []
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            async getData() {
                this.items = [];
                const items = await Organization.list();
                if(items.length === 0) {
                    const container = window.document.getElementById("create-organization");
                    if(container) {
                        const trigger = container.querySelector(".modal-trigger");
                        if(trigger) {
                            trigger.click();
                        }
                    }
                }
                this.items = items;
            },
            showTeamPanel() {
                this.isShowTeamPanel = true;
                this.$store.commit("Base/switchBlackLayer", true);
            },
            selectOrganization(id) {
                const item = this.items.find(value => value.id === id);
                const data = {};
                data.id = item.id;
                data.name = item.name;
                data.slug = item.slugEdited;
                if(item) {
                    this.$store.commit("Organization/changeDefault", data);
                    this.$store.commit("Index/pageIncrement");

                    this.hideTeamPanel();
                }
            },
            hideTeamPanel() {
                this.isShowTeamPanel = false;
                this.$store.commit("Base/switchBlackLayer", false);
            }
        }
    }
</script>