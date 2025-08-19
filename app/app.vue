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
