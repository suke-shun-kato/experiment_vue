import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import './assets/main.css'

const app = createApp(App)

// Vue Routerを有効化
app.use(router)

// Piniaインスタンスを取得
const pinia = createPinia()
// Pinia永続化ライブラリを使用する設定
pinia.use(piniaPluginPersistedstate)
// Piniaを有効化
app.use(pinia)

app.mount('#app')
