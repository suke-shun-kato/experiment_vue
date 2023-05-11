import {ref} from 'vue'
import { defineStore } from "pinia";
import type { Auth } from "@/api/response/Auth";
import type {Ref} from 'vue'

export const useAuthStore = defineStore(
    'auth',
    () => {
        const auth: Ref<Auth|undefined> = ref()
        return { auth }
    },
    // 永続化（リロードしてもデータが消えないようにする）
    {
        persist: true,
    }
)