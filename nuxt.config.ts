// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@unocss/nuxt', '@nuxt/fonts', '@nuxthub/core'],
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
      title: 'สร้าง QR Code ฟรี - เครื่องมือสร้าง QR Code ออนไลน์',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'สร้าง QR Code ฟรี ออนไลน์ สร้าง QR Code สำหรับเว็บไซต์ ลิงก์ หรือข้อความได้ทันที ไม่ต้องติดตั้งโปรแกรม ใช้งานง่าย รองรับภาษาไทย' },
        { name: 'keywords', content: 'QR Code, สร้าง QR Code, QR Code ฟรี, เครื่องมือสร้าง QR Code, QR Code ออนไลน์, สร้าง QR Code สำหรับเว็บไซต์, QR Code ภาษาไทย' },
        { name: 'author', content: 'Free QR Code Generator' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'th' },
        { name: 'geo.region', content: 'TH' },
        { name: 'geo.placename', content: 'Thailand' },
        
        // Open Graph tags for social media sharing
        { property: 'og:title', content: 'สร้าง QR Code ฟรี - เครื่องมือสร้าง QR Code ออนไลน์' },
        { property: 'og:description', content: 'สร้าง QR Code ฟรี ออนไลน์ สร้าง QR Code สำหรับเว็บไซต์ ลิงก์ หรือข้อความได้ทันที ไม่ต้องติดตั้งโปรแกรม ใช้งานง่าย รองรับภาษาไทย' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://free-qr-code-generator.nuxt.dev' },
        { property: 'og:locale', content: 'th_TH' },
        { property: 'og:site_name', content: 'สร้าง QR Code ฟรี' },
        
        // Twitter Card tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'สร้าง QR Code ฟรี - เครื่องมือสร้าง QR Code ออนไลน์' },
        { name: 'twitter:description', content: 'สร้าง QR Code ฟรี ออนไลน์ สร้าง QR Code สำหรับเว็บไซต์ ลิงก์ หรือข้อความได้ทันที ไม่ต้องติดตั้งโปรแกรม ใช้งานง่าย รองรับภาษาไทย' },
        
        // Additional SEO tags
        { name: 'theme-color', content: '#000000' },
        { name: 'msapplication-TileColor', content: '#000000' },
        { name: 'apple-mobile-web-app-title', content: 'สร้าง QR Code ฟรี' },
        { name: 'application-name', content: 'สร้าง QR Code ฟรี' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://free-qr-code-generator.nuxt.dev' }, // Replace with your actual domain
        { rel: 'alternate', hreflang: 'th', href: 'https://free-qr-code-generator.nuxt.dev' },
      ],
      script: [
        {
          innerHTML: `
            <!-- Google Tag Manager -->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WWSQN9Z3');
<!-- End Google Tag Manager -->
          `,
          type: 'text/javascript'
        }
      ]
    }
  }
})