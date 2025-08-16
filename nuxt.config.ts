// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@unocss/nuxt', '@nuxt/fonts'],
  css: ['~/assets/css/reset.css', '~/assets/css/main.css'],
  eslint: {
    config: {
      stylistic: {
        semi: false,
        quotes: 'single',
        indent: 2
      }
    }
  },
  fonts: {
    families: [
      { name: 'Kanit', provider: 'google' }
    ]
  },
  app: {
    head: {
      title: 'FREE QR Code Generator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Generate QR codes instantly with a clean, brutalistic interface' }
      ]
    }
  }
})
