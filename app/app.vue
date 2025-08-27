<script setup lang="ts">
import QrCodeStyling from 'qr-code-styling'

const { t, locale } = useI18n()

const logoImageInput = ref<HTMLInputElement | null>(null)

const logoImageFileName = ref('')

const qrData = ref('')

const qrCode = ref<QrCodeStyling | null>(null)

const hasQrCode = computed(() => qrData.value.length > 0)

const exampleData = 'https://example.com'

onMounted(() => {
  qrCode.value = new QrCodeStyling({
    width: 1000,
    height: 1000,
    type: 'svg',
    data: exampleData,
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 10,
    },
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
  } else {
    qrCode.value?.update({
      data: exampleData,
      image: '',
    })

    logoImageFileName.value = ''

    clearLogoImage()
  }
})

function downloadQRCode() {
  qrCode.value?.download({
    name: 'qr-code',
  })
}

function handleLogoImageChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]

  if (!file || !file.type.includes('image/')) {
    return
  }

  logoImageFileName.value = file.name

  qrCode.value?.update({
    image: URL.createObjectURL(file),
  })

  clearLogoImage()
}

function clearLogoImage() {
  if (logoImageInput.value) {
    logoImageInput.value.value = ''
  }
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
    href="https://github.com/runyasak/free-qr-code-generator"
    target="_blank"
    rel="noopener noreferrer"
    absolute
    top-4
    right-4
    text="[#98989f] hover:[#dfdfd6]"
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
    flex="~ col"
    gap="4 md:8"
    justify-center
  >
    <div
      text-center
      flex="~ col"
      gap-2
    >
      <div
        text="white 4xl md:5xl"
      >
        {{ $t('title') }}
      </div>

      <p
        uppercase
        text="main-content xl"
      >
        {{ $t('subtitle') }}
      </p>
    </div>
    <div
      flex="~ col"
      gap-2
    >
      <p
        text="main-content xl center md:left"
      >
        {{ $t('description') }}
      </p>
      <input
        v-model="qrData"
        base-input
        type="text"
        :placeholder="$t('placeholder')"
      >
    </div>
    <div
      flex="~ col md:flex-row"
      gap="4 md:8"
      md="flex-row gap-8"
    >
      <div
        flex="~ col md:1"
        gap="4 md:8"
      >
        <div
          flex="~ col"
          gap-2
        >
          <button
            bg-transparent
            border-solid
            p="x-3 y-2"
            rounded-md
            relative
            flex
            items-center
            gap-2
            md:text-xl
            my-transition
            :disabled="!hasQrCode"
            :class="
              !hasQrCode
                ? 'cursor-not-allowed text-gray-500 border-gray-500/50'
                : 'cursor-pointer hover:border-primary text-white border-white hover:text-primary'"
            @click="logoImageInput?.click()"
          >
            <svg
              min-w="28px"
              xmlns="http://www.w3.org/2000/svg"
              width="28px"
              height="28px"
              viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              d="m9 13l3-4l3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4z"
            /><path
              fill="currentColor"
              d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"
            /></svg>
            <span line-clamp-1>
              {{ logoImageFileName || $t('addLogoImage') }}
            </span>
          </button>
        </div>
      </div>
      <div
        md="flex-1 mt-0"
        rounded-md
        border="1 solid white"
        mx-auto
        aspect-square
        p-1
        overflow-hidden
      >
        <div
          id="qr-code-canvas"
          overflow-y-hidden
          rounded-md
          class="[&_svg]:h-full"
        />
      </div>
    </div>

    <button
      base-button
      :disabled="!qrData"
      @click="downloadQRCode"
    >
      {{ $t('downloadButton') }}
    </button>
  </div>

  <input
    ref="logoImageInput"
    type="file"
    accept="image/*"
    hidden
    @change="handleLogoImageChange"
  >
</template>
