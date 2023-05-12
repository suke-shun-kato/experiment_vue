<script setup lang="ts">
import {computed, ref} from 'vue'
import {useAuthStore} from '@/stores/authStore';
import {createAxiosInstance} from "@/api/axiosInstance";
import type {Ref} from 'vue'
import type {AxiosResponse, AxiosInstance} from 'axios';
import type {Auth} from '@/api/response/Auth';
import type {LoginRequest} from "@/api/request/LoginRequest";
import type { RouteLocation} from "vue-router";
import { useRoute, useRouter} from "vue-router";
import RunDisabledButton from "@/components/RunDisabledButton.vue";

const eMail: Ref<string> = ref('suke.shun.kato2@gmail.com')
const password: Ref<string> = ref('password')
const router = useRouter()
const route = useRoute()

const axiosInstance = computed<AxiosInstance>(() => {
    return createAxiosInstance()
})

const login = async (): Promise<void> => {
    // ログインAPIを実行
    const data: LoginRequest = {
        email: eMail.value,
        password: password.value
    }
    const response = await axiosInstance.value.post<Auth>('/users/login', data)
    console.log(response)

    // Pinia に Auth を保存
    const auth: Auth = response.data
    const authStore = useAuthStore()
    authStore.$state.auth = auth

    // ログイン成功したとみなして、リダイレクト
    const fromRouteLocation: RouteLocation|undefined = route.redirectedFrom // リダイレクト元のロケーションを取得
    await router.push(fromRouteLocation?.fullPath ?? '/')   // リダイレクト元へリダイレクト（fromRouteLocation が undefined のときは '/'）
}

</script>

<template>
    <div>
        <!-- デフォルトで form の submit動作を抑止して、代わりに login() メソッドを実行する -->
        <form>
            <div>
                <label for="e-mail">Email address</label>
                <input type="email" id="e-mail" v-model.trim="eMail" />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="password" />
            </div>
            <div>
                <RunDisabledButton type="submit" :onClick="login">ログイン</RunDisabledButton>
            </div>
        </form>
    </div>
</template>

