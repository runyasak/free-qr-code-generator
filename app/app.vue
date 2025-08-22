<script setup lang="ts">
import QRCodeStyling from 'qr-code-styling'
const { t, locale } = useI18n()
const qrData = ref('')
const qrCode = ref<QRCodeStyling | null>(null)
const exampleData = 'https://example.com'


// Light/Dark mode state
const isDark = ref(false)
if (process.client) {
  // On mount, check system preference or localStorage
  isDark.value = localStorage.getItem('theme') === 'dark' || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  updateHtmlClass()
}

function toggleDark() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  updateHtmlClass()
}
function updateHtmlClass() {
  if (isDark.value)
    document.documentElement.classList.add('dark')
  else
    document.documentElement.classList.remove('dark')
}

onMounted(() => {
  qrCode.value = new QRCodeStyling({
    width: 1000,
    height: 1000,
    type: 'svg',
    data: exampleData,
    dotsOptions: {
      type: 'extra-rounded',
    },
    cornersSquareOptions: {
      type: 'extra-rounded',
    },
  })
  qrCode.value?.append(document.getElementById('qr-code-canvas')!)
})

watch(qrData, (newVal) => {
  if (newVal) {
    qrCode.value?.update({
      data: newVal,
    })
  }
  else {
    qrCode.value?.update({
      data: exampleData,
    })
  }
})

function downloadQRCode() {
  qrCode.value?.download({
    name: 'qr-code',
  })
}

useHead({
  title: computed(() => t('seo.title')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('seo.description')),
    },
  ],
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': t('title'),
        'description': t('seo.description'),
        'url': 'https://free-qr-code-generator.nuxt.dev',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Web Browser',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': locale.value === 'th' ? 'THB' : 'USD',
        },
        'inLanguage': locale.value,
        'author': {
          '@type': 'Organization',
          'name': 'Free QR Code Generator',
        },
      })),
    },
  ],
})
</script>

<template>
  <!-- Background gradient overlay -->
  <div class="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
  
  <!-- Compact Header -->
  <header class="relative z-20 w-full border-b border-slate-200/40 dark:border-slate-700/40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-14">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="px-2 py-1 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
            <span class="text-white font-bold text-sm tracking-tight">QR</span>
          </div>
          <span class="font-semibold text-slate-900 dark:text-slate-100 text-sm tracking-tight">QR Studio</span>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center space-x-2">
          <a
            class="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            href="https://github.com/runyasak/free-qr-code-generator"
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/>
            </svg>
          </a>
          
          <button
            class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all duration-200"
            @click="toggleDark"
            aria-label="Toggle dark mode"
            title="Toggle theme"
          >
            <svg v-if="!isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Main content -->
    <!-- Main content -->
  <main class="relative z-10 min-h-screen pt-20 pb-8">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <!-- Compact Hero section -->
      <div class="text-center mb-8">
        <h1 class="title-font text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 leading-tight tracking-tight">
          {{ $t('title') }}
        </h1>
        
        <p class="text-xs text-slate-600 dark:text-slate-400 mb-1 font-medium tracking-wider uppercase opacity-75">
          {{ $t('subtitle') }}
        </p>
        
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          {{ $t('description') }}
        </p>
      </div>

      <!-- Left-Right Layout QR Generator -->
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50 p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <!-- Left side - Form -->
          <div class="space-y-6">
            <div class="space-y-2">
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
                Enter your text or URL
              </label>
              <input
                v-model="qrData"
                class="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-3 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                type="text"
                :placeholder="$t('placeholder')"
              >
            </div>

            <!-- Download section -->
            <div class="space-y-4">
              <button
                class="group relative w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-md transition-all duration-200 disabled:cursor-not-allowed uppercase tracking-wide text-xs"
                :disabled="!qrData"
                @click="downloadQRCode"
              >
                <span class="relative z-10">{{ $t('downloadButton') }}</span>
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>
              
              <!-- Quick stats -->
              <div class="text-center">
                <p class="text-xs text-slate-500 dark:text-slate-400">High Quality • SVG Format</p>
                <p class="text-xs text-slate-400 dark:text-slate-500">Ready for print & web</p>
              </div>

              <!-- Feature highlights -->
              <div class="grid grid-cols-3 gap-4 pt-2">
                <div class="text-center">
                  <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <p class="text-xs font-medium text-slate-700 dark:text-slate-300">Fast</p>
                </div>
                
                <div class="text-center">
                  <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <p class="text-xs font-medium text-slate-700 dark:text-slate-300">Secure</p>
                </div>
                
                <div class="text-center">
                  <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <p class="text-xs font-medium text-slate-700 dark:text-slate-300">Free</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right side - QR Code Preview -->
          <div class="flex justify-center lg:justify-end">
            <div class="relative">
              <div
                id="qr-code-canvas"
                class="bg-white rounded-xl shadow-md p-4 [&_svg]:w-full [&_svg]:h-full [&_svg]:max-w-72 [&_svg]:max-h-72"
              />
              <div class="absolute inset-0 rounded-xl ring-1 ring-slate-900/5 dark:ring-white/5 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Features (Optional) -->
      <div class="mt-8 text-center">
        <p class="text-xs text-slate-400 dark:text-slate-500">
          Generate unlimited QR codes • No registration required • Works offline
        </p>
      </div>
    </div>
  </main>
</template>
