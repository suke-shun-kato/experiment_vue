<script setup lang="ts">
import {ref} from 'vue'
import {useAuthStore} from '@/stores/authStore';
import type {Ref} from 'vue'
import type {AxiosResponse} from 'axios';
import type {AuthResponse} from '@/api/responseParams/AuthResponse';
import type {LoginReqest} from "@/api/requestParams/LoginReqest";
import type {RouteLocation} from "vue-router";
import { useRoute, useRouter} from "vue-router";
import RunDisabledButton from "@/components/RunDisabledButton.vue";
import {NoAuthApiService} from "@/api/service/NoAuthApiService";
import type {LoginErrorResponse} from "@/api/errorResponseParams/LoginErrorResponse";
import ValidationError from "@/components/ValidationError.vue";
import {executeFormApi} from "@/api/utils/executeFormApi";

// const eMail: Ref<string> = ref('suke.shun.kato2@gmail.com')
const eMail: Ref<string> = ref('')
// const password: Ref<string> = ref('password')
const password: Ref<string> = ref('')
const errorResponseRef: Ref<LoginErrorResponse|undefined> = ref()
const router = useRouter()
const route = useRoute()
const apiService = new NoAuthApiService()

const login = async (): Promise<void> => {
    // ログインAPIを実行
    const loginReqParam: LoginReqest = {
        email: eMail.value,
        password: password.value
    }

    await executeFormApi<LoginErrorResponse>(errorResponseRef, async (): Promise<void> => {
        const response: AxiosResponse = await apiService.login(loginReqParam)
        console.log(response)

        // Pinia に AuthResponse を保存
        const auth: AuthResponse = response.data
        const authStore = useAuthStore()
        authStore.$state.auth = auth

        // ログイン成功したとみなして、リダイレクト
        const fromRouteLocation: RouteLocation|undefined = route.redirectedFrom // リダイレクト元のロケーションを取得
        await router.push(fromRouteLocation?.fullPath ?? '/')   // リダイレクト元へリダイレクト（fromRouteLocation が undefined のときは '/'）

    })
}
</script>

<template>
    <div>
        <form>
            <div v-if="errorResponseRef">{{ errorResponseRef.message }}</div>
            <div>
                <label for="e-mail">Email address</label>
                <input type="email" id="e-mail" v-model.trim="eMail" />
                <ValidationError :error-messages="errorResponseRef?.errors?.email"/>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="password" />
                <ValidationError :error-messages="errorResponseRef?.errors?.password" />
            </div>
            <div>
                <RunDisabledButton :onClick="login">ログイン</RunDisabledButton>
            </div>
        </form>
    </div>
    <div>
        <RouterLink to="/signup">新規登録ページへ</RouterLink>
    </div>
</template>

