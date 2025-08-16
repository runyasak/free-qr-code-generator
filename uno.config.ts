import { defineConfig, presetAttributify, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [presetAttributify(), presetWind3()],
  theme: {
    colors: {
      'main-bg': 'var(--main-bg)',
      'main-content': 'var(--main-content)'
    }
  }
})
