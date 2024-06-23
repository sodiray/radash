import { defineConfig } from 'tsup'
import glob from 'fast-glob'

export default defineConfig({
  entry: glob.sync(['src/**/*.ts', '!**/*.test.ts']),
  format: ['cjs', 'esm'],
  dts: true,
  esbuildOptions(options) {
    options.chunkNames = 'chunks/[name]-[hash]'
    options.minifyIdentifiers = true
    options.minifySyntax = true
  }
})
