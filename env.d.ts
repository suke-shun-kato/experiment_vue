/// <reference types="vite/client" />

// TypeScript用に環境変数の型をここで定義する
interface ImportMetaEnv {
    readonly VITE_API_ENDPOINT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}