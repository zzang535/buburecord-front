export default {
  ssr: false,
  head: {
    titleTemplate: '%s - marijuni2',
    title: 'marijuni2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // global css
  css: [
    '~assets/scss/reset.scss',
    '~assets/scss/common.scss'
  ],

  // style variable
  styleResources: {
    scss: [
      '@/assets/scss/variable.scss',
      '@/assets/scss/mixin.scss',
    ],
  },

  // nuxt plugin
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/vuex-persist' },
  ],

  // component auto import
  components: true,

  // nuxt build module
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  // nuxt modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv', // 클라이언트 사이드에서 env 접근,
  ],

  // axios setting
  axios: {
    baseURL: '/api',
  },

  serverMiddleware: [
    '~/api'
  ],

  server: {
    port: process.env.APP_PORT, // default: 3000
    host: process.env.APP_HOST, // default: localhost,
    timing: false
  },

  build: {
  }
}
