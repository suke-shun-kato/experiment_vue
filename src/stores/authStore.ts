import {ref} from 'vue'
import { defineStore } from "pinia";
import type { AuthResponse } from "@/api/responseParams/AuthResponse";
import type {Ref} from 'vue'

export const useAuthStore = defineStore(
    'auth',
    () => {
        const auth: Ref<AuthResponse|undefined> = ref()
        function $reset() {
            auth.value = undefined
        }

        return { auth, $reset }
    },
    // 永続化（リロードしてもデータが消えないようにする）
    {
        persist: true,
    }
)