<script setup lang="ts">
import {computed, ref} from 'vue'
import {useAuthStore} from '@/stores/authStore';
import {createAxiosInstance} from "@/api/axiosInstance";
import type {AxiosResponse, AxiosInstance} from "axios";
import type {Auth} from "@/api/Auth";

const eMail = ref('suke.shun.kato2@gmail.com')
const password = ref('password')

const axiosInstance = computed<AxiosInstance>(() => {
    return createAxiosInstance()
})


function login() {
    console.log(eMail.value)
    console.log(password.value)

    axiosInstance
        .value
        .post('/users/login', {
            email: eMail.value,
            password: password.value
        })
        .then(function (response: AxiosResponse<Auth>) {
console.log(response);

            const authStore = useAuthStore()
            const data: Auth = response.data
console.log(authStore.auth)
            // Pinia に Auth を保存
            authStore.$state.auth = data

console.log(authStore.auth)
        })
        .catch(function (error) {
            console.log(error);
        });
}

</script>

<template>
    <div>
        <!-- デフォルトで form の submit動作を抑止して、代わりに login() メソッドを実行する -->
        <form @submit.prevent="login">
            <div>
                <label for="e-mail">Email address</label>
                <input type="email" id="e-mail" v-model.trim="eMail" />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="password" />
            </div>
            <div>
                <input type="submit" value="ログイン" />
            </div>
        </form>
    </div>
    <div>
        <router-link to="/">Home</router-link>
    </div>
</template>

