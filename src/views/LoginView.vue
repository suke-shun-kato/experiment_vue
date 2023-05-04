<script setup lang="ts">
    import { ref } from 'vue'
    import axios from 'axios'
    import {useAuthStore} from '@/stores/auth';

    const eMail = ref('suke.shun.kato2@gmail.com')
    const password = ref('password')

    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8080/api',       // TODO
        timeout: 10000,
        // withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    });

    function login() {
        console.log(eMail.value)
        console.log(password.value)

        axiosInstance
            .post('/users/login', {
                email: eMail.value,
                password: password.value
            })
            .then(function (response) {
                const auth = useAuthStore()
                const data = response.data

                auth.$state.auth = {
                    access_token: data.access_token,
                    token_type: data.token_type
                }

                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function aaaa() {
        const aaa = useAuthStore().auth
        console.log(aaa?.access_token)
        console.log(aaa?.token_type)
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
        <button @click="aaaa">check</button>
    </div>
</template>

