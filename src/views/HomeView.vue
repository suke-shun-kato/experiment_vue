<script setup lang="ts">
import {ref} from "vue";
import {createAxiosInstance} from "@/api/axiosInstance";
import {useAuthStore} from "@/stores/authStore";
import {storeToRefs} from "pinia";
import type {Ref} from "vue";
import type {AxiosResponse} from 'axios';
import type {Recipe, Recipes} from "@/api/response/Recipes";
import type {Auth} from "@/api/response/Auth";

// 変数の定義
const errorRef: Ref<string|undefined> = ref()
const recipesRef: Ref<Recipe[]|undefined> = ref()
const isLoadingRef: Ref<boolean> = ref(false)

const authStore = useAuthStore()
const authRef = storeToRefs(authStore).auth

// 例外処理
if (authRef.value === undefined) {
    throw new Error('ログインしてください')
}

// OptionsAPI の beforeCreate, created のタイミングと同じ
getRecipeList(authRef.value!)

function getRecipeList(auth: Auth) {


    // 値を初期化
    errorRef.value = undefined
    isLoadingRef.value = true


    // 値を読み込み
    return createAxiosInstance(auth)
        .get<Recipes>('/recipes')
        .then(function (response :AxiosResponse<Recipes>) {
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
</script>

<template>
    <div>
        <div v-if="isLoadingRef">Loading...</div>
        <div v-if="errorRef">{{ errorRef }}</div>
        <div v-if="!recipesRef">データがありません</div>
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
</template>