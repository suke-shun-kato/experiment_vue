<script setup lang="ts">
    import { ref } from 'vue'

    const eMail = ref('')
    const password = ref('')

    function login() {
        console.log(eMail.value)
        console.log(password.value)
    }
</script>

<template>
    <div>
        <!-- デフォルト-->
        <form @submit.prevent="login">
            <div>
                <label for="e-mail">Email address</label>
                <input type="email" id="e-mail" v-model.trim="eMail" />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="password" />
            </div>
            <div>
                <input type="submit" value="ログイン" />
            </div>
        </form>
    </div>
</template>

