export type modeOpt = [string, boolean?]

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

export type ResolvedOptions = Required<Options> & { dts: string | false; root: string }
