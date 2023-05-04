import {ref} from 'vue'
import {defineStore} from "pinia";

interface Auth {
    access_token: String
    token_type: string
}

export const useAuthStore = defineStore('auth', () => {
    const auth = ref<Auth|undefined>()

    return { auth }
})