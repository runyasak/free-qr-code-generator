import { defineConfig, presetAttributify, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [presetAttributify(), presetWind3()],
  shortcuts: [
    ['my-transition', 'transition-colors transition-duration-300 transition-ease-in-out'],
  ],
  theme: {
    colors: {
      'main-bg': 'var(--main-bg)',
      'main-content': 'var(--main-content)',
      'primary': 'var(--primary)'
    }
  }
})
