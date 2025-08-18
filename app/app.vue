<script setup lang="ts">
import QRCodeStyling from 'qr-code-styling'

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
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'สร้าง QR Code ฟรี',
        'description': 'สร้าง QR Code ฟรี ออนไลน์ สร้าง QR Code สำหรับเว็บไซต์ ลิงก์ หรือข้อความได้ทันที',
        'url': 'https://yourdomain.com',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Web Browser',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'THB',
        },
        'inLanguage': 'th',
        'author': {
          '@type': 'Organization',
          'name': 'Free QR Code Generator',
        },
      }),
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
      สร้าง QR Code ฟรี
    </div>

    <p
      text-main-content
      text-center
      uppercase
    >
      ใส่ URL หรือข้อความที่ต้องการ
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
      :placeholder="exampleData"
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
      ดาวน์โหลด QR Code
    </button>
  </div>
</template>
