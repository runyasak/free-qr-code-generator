<template>
  <div
    p-12
    mx="auto"
    container
    max-w-3xl
    flex
    flex-col
    gap-8
  >
    <h1
      text-center
      text-white
      text-5xl
    >
      FREE QR Generator
    </h1>

    <p
      text-main-content
      text-center
      uppercase
    >
      Enter Text or URL
    </p>

    <input
      p-2
      bg="#161618"
      border="gray-500/50"
      border-solid
      hover:border-primary
      focus:border-primary
      transition-colors
      transition-duration-300
      transition-ease-in-out
      focus-visible:outline-none
      rounded
      color-white
      type="text"
      placeholder="https://example.com or any text..."
    >
  </div>
</template>
