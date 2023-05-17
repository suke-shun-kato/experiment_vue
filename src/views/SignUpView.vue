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
import {executeFormApi} from "@/api/utils/executeFormApi";
import type {SignUpErrorResponse} from "@/api/errorResponseParams/SignUpErrorResponse";
import ValidationError from "@/components/ValidationError.vue";

const eMail: Ref<string> = ref('')
const password: Ref<string> = ref('')
const name: Ref<string> = ref('')
const errorResponseRef: Ref<SignUpErrorResponse|undefined> = ref()
const router = useRouter()
const apiService = new NoAuthApiService()

const signUp = async (): Promise<void> => {
    // ユーザー登録APIを実行
    const data: SignUpRequest = {
        name: name.value,
        email: eMail.value,
        password: password.value
    }

    await executeFormApi(errorResponseRef, async () => {
        // ユーザー新規登録APIを実行
        const response: AxiosResponse<AuthResponse> = await apiService.signUp(data)
        console.log(response)

        // Pinia に AuthResponse を保存
        const auth: AuthResponse = response.data
        const authStore = useAuthStore()
        authStore.$state.auth = auth

        // ログイン成功したとみなして、リダイレクト
        await router.push('/')   // リダイレクト元へリダイレクト（fromRouteLocation が undefined のときは '/'）
    })
}
</script>

<template>
    <div>
        <form>
            <div>
                <label for="name">User name</label>
                <input type="text" id="name" v-model.trim="name" />
                <ValidationError :error-messages="errorResponseRef?.errors?.name"/>
            </div>
            <div>
                <label for="e-mail">Email address</label>
                <input type="email" id="e-mail" v-model.trim="eMail" />
                <ValidationError :error-messages="errorResponseRef?.errors?.email"/>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="password" />
                <ValidationError :error-messages="errorResponseRef?.errors?.password"/>
            </div>
            <div>
                <RunDisabledButton :onClick="signUp">登録</RunDisabledButton>
            </div>
        </form>
    </div>
</template>

