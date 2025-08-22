<script setup lang="ts">
import QRCodeStyling from 'qr-code-styling'

const { t, locale } = useI18n()

const qrData = ref('')

const qrCode = ref<QRCodeStyling | null>(null)

const exampleData = 'https://example.com'

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
  <a
    class="text-[#98989f]"
    href="https://github.com/runyasak/free-qr-code-generator"
    target="_blank"
    rel="noopener noreferrer"
    absolute
    top-4
    right-4
    hover:text="#dfdfd6"
    my-transition
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
      text-white
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
      p-2
      bg="#161618"
      border="gray-500/50"
      border-solid
      hover:border-primary
      focus:border-primary
      my-transition
      focus-visible:outline-none
      rounded
      color-white
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
      bg-primary
      px-6
      py-4
      rounded
      border-0
      uppercase
      font-bold
      my-transition
      :class="qrData ? 'cursor-pointer' : 'cursor-not-allowed !bg-gray-500/50'"
      :disabled="!qrData"
      @click="downloadQRCode"
    >
      {{ $t('downloadButton') }}
    </button>
  </div>
</template>
