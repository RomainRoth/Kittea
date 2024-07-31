// plugins/head.ts
import { defineNuxtPlugin } from '#app'
import { useHead } from '@vueuse/head'

export default defineNuxtPlugin(() => {
  useHead({
    title: 'Kittea',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Your default description' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  })
})