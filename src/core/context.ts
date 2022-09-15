import { resolve } from 'path'
import fs from 'fs-extra'
import { throttle } from '@antfu/utils'
import type { ViteDevServer } from 'vite'
import type { Options, ResolvedOptions } from '../types'
import { resolveOptions, resovleDtsPath } from './options'
import { generateEnvFiles, generateDeclaration as gtDeclaration } from './generate'

export default class Context {
  root = process.cwd()
  options: ResolvedOptions
  cache = new Set<string>()
  modeFiles = new Set<string>()
  private server: ViteDevServer | undefined

  constructor(private rawOptions: Options = {}) {
    this.options = resolveOptions(rawOptions, this.root)
    this.modeFiles = this.resolveModes()
    this.generateDeclaration = throttle(500, false, this.generateDeclaration.bind(this))
  }

  resolveModes() {
    const result = new Set<string>()
    this.options.modes.forEach(([mode, isLocal]) => {
      const basePath = mode ? `.env.${mode}` : '.env'
      result.add(basePath)
      if (isLocal)
        result.add(`${basePath}.local`)
    })

    return result
  }

  async generateDeclaration() {
    if (!this.options.dts)
      return

    await gtDeclaration(this, this.options.dts)
  }

  async generateEnvFiles() {
    await generateEnvFiles(this)
  }

  // Just only read .env files by modes
  async readEnvFiles() {
    this.cache.clear()

    for (const path of this.modeFiles) {
      const filePath = resolve(this.root, path)

      const content = await fs.readFile(filePath, 'utf-8')
      this.parseEnvFile(content)
    }
  }

  async parseEnvFile(content: string) {
    const lines = content.split('\n').filter(i => !/^\s*#/.test(i))
    for (const line of lines) {
      const matched = line.match(/\s*(.+?)\s*=\s*(.+)/)
      if (matched) {
        const [, key] = matched
        this.cache.add(key)
      }
    }
  }

  async run() {
    await this.generateEnvFiles()
    await this.readEnvFiles()
    await this.generateDeclaration()
  }

  setRoot(root: string) {
    this.root = root
    this.options.root = root
    this.options.dts = resovleDtsPath(root, this.options.dts)
  }

  setupViteServer(server: ViteDevServer) {
    if (this.server === server)
      return

    this.server = server
    this.setupWatcher(server.watcher)
  }

  setupWatcher(watcher: fs.FSWatcher) {
    const handler = (path: string) => {
      if (Array.from(this.modeFiles).some(i => path.endsWith(i))) {
        this.readEnvFiles()
        this.generateDeclaration()
      }
    }
    watcher.on('change', handler)
  }
}
