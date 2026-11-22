export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/ui'
  ],
  compatibilityDate: '2026-11-22',
  colorMode: {
    preference: 'dark', // default value of 'system' can be changed to 'dark'
    fallback: 'dark',   // fallback value if system preference is not known
    classSuffix: ''     // optional, keeps the class as 'dark' instead of 'dark-mode'
  }
})