import { resolve } from 'path'
import { isPackageExists } from 'local-pkg'

import type { Options, ResolvedOptions } from '../types'

export const defaultOptions: Required<Options> = {
  dts: isPackageExists('typescript'),
  modes: [['']], // just generate `.env` file
}

export function resovleDtsPath(root: string, dts: string | boolean) {
  return !dts
    ? false
    : resolve(
      root,
      typeof dts === 'string'
        ? dts
        : 'env.d.ts',
    )
}

export function resolveOptions(options: Options, root: string): ResolvedOptions {
  const resolved = Object.assign({}, defaultOptions, options) as ResolvedOptions

  resolved.root = root
  resolved.dts = resovleDtsPath(root, resolved.dts!)

  return resolved
}
