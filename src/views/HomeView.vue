<script setup lang="ts">
import {ref} from "vue";
import {useAuthStore} from "@/stores/authStore";
import type {Ref} from "vue";
import type {AxiosResponse} from 'axios';
import type {Recipe, RecipesResponse} from "@/api/responseParams/RecipesResponse";
import {useRouter} from "vue-router";
import {AuthApiService} from "@/api/service/AuthApiService";

// 変数の定義
const errorRef: Ref<string|undefined> = ref()
const recipesRef: Ref<Recipe[]|undefined> = ref()
const isLoadingRef: Ref<boolean> = ref(false)

const authStore = useAuthStore()
const router = useRouter()

const apiService = new AuthApiService(authStore.auth!)

// OptionsAPI の beforeCreate, created のタイミングと同じ
getRecipeList()

function getRecipeList() {
    // 値を初期化
    errorRef.value = undefined
    isLoadingRef.value = true

    // レシピ一覧をAPIで取得
    return apiService.getRecipes()
        .then(function (response :AxiosResponse<RecipesResponse>) {
            console.log(response)

            recipesRef.value = response.data.recipes
        })
        .catch(function (err: any) {
            console.log(err)
            recipesRef.value = []
            errorRef.value = 'エラーです'
        })
        .finally(function () {
            isLoadingRef.value = false
        });
}

function logout(): void {
    authStore.$reset()

    // ログインページへリダイレクト
    router.push({name: 'login'})
}
</script>

<template>
    <div>
        <button @click="logout">ログアウト</button>
        <div>
            <div v-if="isLoadingRef">Loading...</div>
            <div v-if="errorRef">{{ errorRef }}</div>
            <div v-if="!recipesRef || recipesRef.length === 0">データがありません</div>
            <div v-for="recipe in recipesRef" :key="recipe.id">
                <div>
                    <div>{{ recipe.title }}</div>
                    <div>{{ recipe.description }}</div>
                    <div v-for="image in recipe.images" :key="image.id">
                        <div>{{ image.id }}</div>
                        <div>{{ image.created_at }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>