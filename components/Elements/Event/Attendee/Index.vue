<template>
    <div>
        <div class="d-flex align-items-center justify-content-between mb-26px">
            <div class="d-flex align-items-center">
                <ExtraSmallText
                    dark-theme-color="dark-grey"
                    :weight="700"
                    :margin-right="16"
                >
                    Tampilkan :
                </ExtraSmallText>

                <div>
                    <Chip
                        :items="roles"
                    />
                </div>
            </div>
            <div class="d-flex">
                <Button
                    variant="link-primary"
                    label="Download List"
                    :margin-right="8"
                    :width="170"
                />
                <CreateAttendeeModal @submit="setItems">
                    <Button
                        variant="primary"
                        label="Tambah Peserta"
                        :width="200"
                        left-icon="plus-circle"
                        left-icon-variant="fontawesome"
                    />
                </CreateAttendeeModal>
            </div>
        </div>

        <Table :is-empty="items.length === 0">
            <thead>
                <tr>
                    <Th>
                        <CheckboxInput />
                    </Th>
                    <Th>
                        Nama
                    </Th>
                    <Th>
                        email
                    </Th>
                    <Th>
                        role
                    </Th>
                    <Th>
                        undangan
                    </Th>
                    <Th>
                        status pendaftaran
                    </Th>
                    <Th>
                        aksi
                    </Th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="value in items"
                    :key="value.id"
                >
                    <Td>
                        <CheckboxInput />
                    </Td>
                    <Td>
                        {{ value.name }}
                    </Td>
                    <Td>
                        {{ value.email }}
                    </Td>
                    <Td>
                        {{ value.roleName }}
                    </Td>
                    <Td
                        :is-show-circle-indicator="true"
                    >
                        {{ value.invitationStatus }}
                    </Td>
                    <Td
                        :color="value.registrationStatusVariant"
                        :dark-theme-color="value.registrationStatusVariant"
                    >
                        {{ value.registrationStatus }}
                    </Td>
                    <Td>
                        <Button
                            label="Salin Link"
                            variant="link-dark-grey"
                            left-icon="link"
                            left-icon-variant="fontawesome"
                        />
                    </Td>
                </tr>
            </tbody>
        </Table>
    </div>
</template>

<script>
    import CreateAttendeeModal from "@elements/Modal/CreateAttendee/Index";
    import Button from "@elements/Button/Index";
    import Chip from "@elements/Chip/Primary/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import CheckboxInput from "@elements/Input/Checkbox/Index";
    import Table from "@elements/Table/Index";
    import Th from "@elements/Table/Th/Index";
    import Td from "@elements/Table/Td/Index";
    import Attendee from "@endpoints/Event/Attendee";

    export default {
        name: 'IndexPage',
        components: {
            CreateAttendeeModal,
            Table,
            Th,
            Td,
            Chip,
            CheckboxInput,
            ExtraSmallText,
            Button
        },
        props: {
        },
        data() {
            return {
                items: [],
                roles: [
                    {
                        label: "Semua"
                    },
                    {
                        label: "Peserta"
                    },
                    {
                        label: "Speaker"
                    },
                    {
                        label: "Host"
                    }
                ]
            }
        },
        mounted() {
            this.setItems();
        },
        methods: {
            async setItems() {
                const items = await Attendee.list();
                this.items = items;
            }
        }
    }
</script>