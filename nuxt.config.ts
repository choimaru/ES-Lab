// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  css: ['~/assets/styles/destyle.css', '~/assets/styles/style.scss'],

  app: {
    baseURL: '/',
    head: {
      title: 'EC-Lab',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/round_flask_black.svg' }],
      htmlAttrs: {
        lang: 'ja',
      },
    },
  },

  runtimeConfig: {
    public: {
      url: process.env.NUXT_APP_URL,
      apiUrl: process.env.NUXT_APP_API_URL,
    },
  },

  vite: {
    build: {
      target: ['esnext', 'es2022'],
    },
    esbuild: {
      target: 'es2022',
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022',
      },
    },
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  compatibilityDate: '2024-07-23',
});