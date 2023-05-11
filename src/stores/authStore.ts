import { ref } from 'vue'
import { defineStore } from "pinia";
import type { Auth } from "@/api/response/Auth";

export const useAuthStore = defineStore(
    'auth',
    () => {
        const auth = ref<Auth|undefined>()
        return { auth }
    },
    // 永続化（リロードしてもデータが消えないようにする）
    {
        persist: true,
    }
)