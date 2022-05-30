<template>
    <div>
        <div class="d-flex align-items-center">
            <div class="mr-16px cursor-pointer" @click="backward">
                <Icon
                    variant="fontawesome"
                    src="arrow-left"
                    class-name="fs-24px"
                />
            </div>
            <SectionText>
                Daftar User    
            </SectionText>
        </div>
        <PrimaryCard
            class-name="mt-24px"
        >
            <TextInput
                label="Nama"
                :margin-auto="true"
                v-model="name"
            />

            <TextInput
                label="Username"
                :margin-auto="true"
                v-model="username"
            />

            <RoleInput
                v-model="userRole"
            />

            <PasswordInput
                label="Password"
                :margin-auto="true"
                v-model="password"
            />

            <PasswordInput
                label="Password Konfirmasi"
                :margin-auto="true"
                v-model="confirmPassword"
            />
            
            <div class="mt-16px">
                <Button
                    label="Simpan"
                    variant="primary"
                    :width="150"
                    :disabled="!name || !username || !userRole"
                    :is-loading="isLoading"
                    @click="submit"
                />
            </div>
        </PrimaryCard>
    </div>
</template>

<script>

import TextInput from "@elements/Input/Text/Index";
import RoleInput from "@elements/Input/Role/Index";
import PasswordInput from "@elements/Input/Password/Index";
import PrimaryCard from "@elements/Card/Primary/Index";
import Icon from "@elements/Icon/Index";
import Button from "@elements/Button/Index";
import SectionText from "@elements/Text/Section/Index";
import User from "@endpoints/User";

export default {
    name: 'IndexPage',
    components: {
        TextInput,
        RoleInput,
        PasswordInput,
        PrimaryCard,
        SectionText,
        Button,
        Icon
    },
    props: {
        id: {
            type: String,
            default: ""
        },
        nameValue: {
            type: String,
            default: ""
        },
        usernameValue: {
            type: String,
            default: ""
        },
        userRoleValue: {
            type: String,
            default: ""
        }
    },
    layout: 'PrimaryLayout',
    data() {
        return {
            isLoading: false,
            name: "",
            username: "",
            password: "",
            userRole: "",
            confirmPassword: ""
        }
    },
    mounted() {
        this.$store.commit("Base/setPageTitle", "");
        this.name = this.nameValue;
        this.username = this.usernameValue;
        this.userRole = this.userRoleValue;
    },
    methods: {
        backward() {
            this.$router.push({path: "/user-management"});
        },
        async submit() {
            const name = this.name;
            const username = this.username;
            const userRole = this.userRole;
            const password = this.password;
            const confirmPassword = this.confirmPassword;
            this.isLoading = true;
            try {
                if(this.id)
                    await User.update({name, username, userRole, password, confirmPassword}, this.id);
                else
                    await User.store({name, username, userRole, password, confirmPassword});
                this.backward();
            } catch {

            }
            this.isLoading = false;
        }
    }
}
</script>
