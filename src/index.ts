import { createUnplugin } from 'unplugin'
import { MODULE_NAME } from './core/constants'
import Context from './core/context'
import type { Options } from './types'

export default createUnplugin<Options>((options) => {
  const ctx = new Context(options)

  return {
    name: MODULE_NAME,
    enforce: 'pre',
    vite: {
      async configResolved(config) {
        ctx.setRoot(config.root)
        await ctx.run()
      },
      configureServer(server) {
        ctx.setupViteServer(server)
      },
    },
  }
})
