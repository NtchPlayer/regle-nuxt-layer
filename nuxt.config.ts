// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@regle/nuxt'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['./assets/style/styles.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "./assets/style/_mixins.scss" as *;',
        },
      },
    },
  },
});
