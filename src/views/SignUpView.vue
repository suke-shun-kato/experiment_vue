<script setup lang="ts">
import {ref} from 'vue'
import {useAuthStore} from '@/stores/authStore';
import type {Ref} from 'vue'
import type {AxiosResponse} from 'axios';
import type {AuthResponse} from '@/api/responseParams/AuthResponse';
import { useRouter} from "vue-router";
import RunDisabledButton from "@/components/RunDisabledButton.vue";
import axios from "axios";
import type {SignUpRequest} from "@/api/requestParams/SignUpRequest";
import {NoAuthApiService} from "@/api/service/NoAuthApiService";

const eMail: Ref<string> = ref('')
const password: Ref<string> = ref('')
const name: Ref<string> = ref('')
const router = useRouter()
const apiService = new NoAuthApiService()

const signUp = async (): Promise<void> => {
    // ユーザー登録APIを実行
    const data: SignUpRequest = {
        name: name.value,
        email: eMail.value,
        password: password.value
    }

    try {
        // ユーザー新規登録APIを実行
        const response: AxiosResponse<AuthResponse> = await apiService.signUp(data)
        console.log(response)

        // Pinia に AuthResponse を保存
        const auth: AuthResponse = response.data
        const authStore = useAuthStore()
        authStore.$state.auth = auth

        // ログイン成功したとみなして、リダイレクト
        await router.push('/')   // リダイレクト元へリダイレクト（fromRouteLocation が undefined のときは '/'）
    } catch (e: any) {
        if (axios.isAxiosError(e) && e.response?.status === 401) {
            // ユーザー登録NGのとき
            alert(e.response!.data.message)
            console.log(e)
        } else {
            alert('エラー')
            console.error(e)
        }
    }
}

</script>

<template>
    <div>
        <form>
            <div>
                <label for="name">User name</label>
                <input type="text" id="name" v-model.trim="name" />
            </div>
            <div>
                <label for="e-mail">Email address</label>
                <input type="email" id="e-mail" v-model.trim="eMail" />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="password" />
            </div>
            <div>
                <RunDisabledButton :onClick="signUp">登録</RunDisabledButton>
            </div>
        </form>
    </div>
</template>

