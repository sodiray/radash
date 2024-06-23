import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      thresholds: { 100: true }
    }
  }
})
