<script setup lang="ts">
import {ref} from 'vue'
import {useAuthStore} from '@/stores/authStore';
import type {Ref} from 'vue'
import type {AxiosResponse} from 'axios';
import type {AuthResParam} from '@/api/responseParams/AuthResParam';
import type {LoginReqParam} from "@/api/requestParams/LoginReqParam";
import type {RouteLocation} from "vue-router";
import { useRoute, useRouter} from "vue-router";
import RunDisabledButton from "@/components/RunDisabledButton.vue";
import axios from "axios";
import {NoAuthApiService} from "@/api/service/NoAuthApiService";
import type {LoginError} from "@/api/errorResponseParams/LoginError";

// const eMail: Ref<string> = ref('suke.shun.kato2@gmail.com')
const eMail: Ref<string> = ref('')
// const password: Ref<string> = ref('password')
const password: Ref<string> = ref('')
const errorRef: Ref<LoginError|undefined> = ref()
const router = useRouter()
const route = useRoute()
const apiService = new NoAuthApiService()

const login = async (): Promise<void> => {
    // ログインAPIを実行
    const loginReqParam: LoginReqParam = {
        email: eMail.value,
        password: password.value
    }
    try {
        const response: AxiosResponse = await apiService.login(loginReqParam)
        console.log(response)

        // Pinia に AuthResParam を保存
        const auth: AuthResParam = response.data
        const authStore = useAuthStore()
        authStore.$state.auth = auth

        // ログイン成功したとみなして、リダイレクト
        const fromRouteLocation: RouteLocation|undefined = route.redirectedFrom // リダイレクト元のロケーションを取得
        await router.push(fromRouteLocation?.fullPath ?? '/')   // リダイレクト元へリダイレクト（fromRouteLocation が undefined のときは '/'）
    } catch (e: any) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 401) {
            // 認証エラー
                errorRef.value = e.response?.data
                console.log(e)
            } else if (e.response?.status === 422) {
            // バリデーションエラー
                errorRef.value = e.response?.data
                console.log(errorRef)
                console.log(errorRef.value)
            } else {
                alert('エラー')
                console.error(e)
            }
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
            <div v-if="errorRef">{{ errorRef.message }}</div>
            <div>
                <label for="e-mail">Email address</label>
                <input type="email" id="e-mail" v-model.trim="eMail" />
                <div v-if="errorRef && errorRef.errors">
                    <div v-for="(emailError, index) in errorRef.errors.email" :key="index" >
                        <p>{{ emailError }}</p>
                    </div>
                </div>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="password" />
                <div v-if="errorRef && errorRef.errors">
                    <div v-for="(passwordError, index) in errorRef.errors.password" :key="index" >
                        <p>{{ passwordError }}</p>
                    </div>
                </div>
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

