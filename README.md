# はじめに

このリポジトリはVue.jsの実験用のリポジトリです。

[Laravelで作成した「レシピAPI」](https://github.com/suke-shun-kato/experiment_laravel)のクライアントサイド

# 技術概要
- Vue.js 3の CompositionAPI & TypeScript でコードを記載
- Vue Router でページ遷移
- Vite でビルドやサーバーを起動
- Pinia でデータストアを管理

# 初期設定（ローカル）

```shell
git clone git@github.com:suke-shun-kato/experiment_vue.git

npm install
```

# コマンドメモ

## 開発用にビルド＆サーバー起動（ブラウザで確認）

```shell
npm run dev
```

## 本番用に、型チェック＆ビルド（コンパイル、ソース圧縮）

```shell
npm run build
```

## 本番用コンパイル済みソースに対してサーバー起動（ブラウザで確認）

```shell
npm run preview
```

## Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# 参考リンク

- [Vue.js 公式](https://ja.vuejs.org/)
- [Vite 公式（英語）](https://ja.vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia 公式（英語）](https://pinia.vuejs.org/)