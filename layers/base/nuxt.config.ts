import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@unocss/nuxt', '@nuxt/fonts', '@nuxthub/core', 'nuxt-gtag', '@nuxtjs/i18n'],
  css: [resolve('app/assets/css/reset.css'), resolve('app/assets/css/main.css')],
  eslint: {
    config: {
      stylistic: {
        semi: false,
        quotes: 'single',
        indent: 2,
        braceStyle: '1tbs'
      }
    }
  },
  fonts: {
    families: [
      { name: 'Kanit', provider: 'google' }
    ]
  }
})