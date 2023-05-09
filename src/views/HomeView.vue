<script setup lang="ts">
import { onMounted } from "vue";
import { createAxiosInstance } from "@/api/axiosInstance";
import {useAuthStore} from "@/stores/authStore";
import {storeToRefs} from "pinia";

// TODO このタイミングでよいかちゃんとする
onMounted(() => {
    console.log(`コンポーネントがマウントされました。`)

    getRecipeList()
})

function getRecipeList() {
    const authStore = useAuthStore()
    const {auth} = storeToRefs(authStore)
console.log(authStore.auth?.access_token)
    if (auth.value === undefined) {
        throw new Error('ログインしてください')
    }

    return createAxiosInstance(auth.value!)
        .get('/recipes')
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error)
        });
}
</script>

<template>
  <div>aaaaaaa</div>
</template>