# unplugin-vue-dotenv

[![NPM version](https://img.shields.io/npm/v/unplugin-vue-dotenv?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-vue-dotenv)

Auto generate the corresponding `.env` file.

## Install

```bash
npm i unplugin-vue-dotenv
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Dotenv from 'unplugin-vue-dotenv/vite'

export default defineConfig({
  plugins: [
    Dotenv({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Starter from 'unplugin-vue-dotenv/rollup'

export default {
  plugins: [
    Starter({ /* options */ }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-dotenv/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-vue-dotenv/nuxt', { /* options */ }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-dotenv/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Starter from 'unplugin-vue-dotenv/esbuild'

build({
  plugins: [Starter()],
})
```

<br></details>

## Options
```ts
export interface Options {
  /**
   * Generate the corresponding `.env` file according to the mode
   * @default [['']] // Only generate `.env` file
   * @example [['test', true]] // Generate `.env.test` and `.env.test.local` files
   */
  modes?: modeOpt[]
  /**
   * Filepath to generate corresponding .d.ts file.
   * Default enabled when `typescript` is installed locally.
   * Set `false` to disable.
   *
   * @default './auto-import-image.d.ts'
   */
  dts?: string | boolean
}
```
