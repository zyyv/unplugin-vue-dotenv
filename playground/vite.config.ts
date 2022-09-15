import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      modes: [['test', true]],
      dts: 'src/env.d.ts',
    }),
  ],
})
