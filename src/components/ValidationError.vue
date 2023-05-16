<script setup lang="ts">

const props = defineProps<{
    errorMessages?: string[]
}>()

</script>

<template>
    <div v-if="props.errorMessages && props.errorMessages.length !== 0">
        <div v-for="(errorMessage, index) in props.errorMessages" :key="index" >
            <p>{{ errorMessage }}</p>
        </div>
    </div>
</template>