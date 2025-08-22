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
  <div class="absolute top-4 right-4 flex items-center gap-2 z-10">
    <a
      class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 my-transition"
      href="https://github.com/runyasak/free-qr-code-generator"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
        />
      </svg>
    </a>
    <button
      class="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      @click="toggleDark"
      aria-label="Toggle dark mode"
    >
      <span v-if="isDark">🌙</span>
      <span v-else>☀️</span>
    </button>
  </div>
  <div
    h-screen
    p-12
    mx="auto"
    container
    max-w-3xl
    flex
    flex-col
    gap-8
    justify-center
  >
    <div
      text-center
      class="text-main-content"
      text-5xl
    >
      {{ $t('title') }}
    </div>

    <p
      text-main-content
      text-center
      uppercase
    >
      {{ $t('subtitle') }}
    </p>

    <p
      text-main-content
      text-center
    >
      {{ $t('description') }}
    </p>

    <input
      v-model="qrData"
      class="p-2 border border-solid rounded focus-visible:outline-none my-transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-primary focus:border-primary placeholder-gray-500 dark:placeholder-gray-400"
      type="text"
      :placeholder="$t('placeholder')"
    >
    <div
      id="qr-code-canvas"
      m-auto
      flex-1
      overflow-y-hidden
      class="[&_svg]:h-full"
    />

    <button
      class="bg-primary hover:bg-primary/90 px-6 py-4 rounded border-0 uppercase font-bold my-transition text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50"
      :disabled="!qrData"
      @click="downloadQRCode"
    >
      {{ $t('downloadButton') }}
    </button>
  </div>
</template>
