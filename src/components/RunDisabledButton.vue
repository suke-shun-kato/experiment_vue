<script setup lang="ts">
import {ref} from "vue";
import type {Ref} from "vue";

const isProcessing: Ref<boolean> = ref(false)

const props = defineProps<{
    onClick: () => Promise<void>
}>()

async function disabledAndRun(): Promise<void> {
    if (isProcessing.value) {
        return
    }

    isProcessing.value = true

    await props.onClick()

    isProcessing.value = false
}



</script>

<template>
    <button :disabled="isProcessing" @click="disabledAndRun" >
        <!-- 親コンポーネントの値をここに表示する -->
        <slot/>
    </button>
</template>