import { defineConfig, presetAttributify, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [presetAttributify(), presetWind3()],
  shortcuts: [
    ['my-transition', 'transition-colors transition-duration-300 transition-ease-in-out'],
    ['base-button', 'not-disabled:bg-primary px-6 py-4 rounded-md border-0 uppercase font-bold my-transition md:text-xl cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500/50'],
    ['base-input', 'text-white text-xl px-3 py-2 bg-[#161618] border-gray-500/50 border-solid hover:border-primary focus:border-primary my-transition focus-visible:outline-none rounded-md']
  ],
  theme: {
    colors: {
      'main-bg': 'var(--main-bg)',
      'main-content': 'var(--main-content)',
      'primary': 'var(--primary)'
    }
  }
})
