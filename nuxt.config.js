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

  // 글로벌 CSS
  css: [
    '~assets/scss/reset.scss',
    '~assets/scss/common.scss'
  ],

  // 스타일 변수
  styleResources: {
    scss: [
      '@/assets/scss/variable.scss',
      '@/assets/scss/mixin.scss',
    ],
  },

  // 넉스트 플러그인
  plugins: [
  ],

  // 컴포넌트 자동 임포트
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/api',
  },


  serverMiddleware: [
    '~/api'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
