import { resolve } from 'path';

export default {
    server: {
        port: 3100
    },
    alias: {
        '@elements': resolve(__dirname, './components/Elements'),
        '@models': resolve(__dirname, './components/Models'),
        '@endpoints': resolve(__dirname, './components/Endpoints'),
        '@layouts': resolve(__dirname, './layouts'),
        '@images': resolve(__dirname, './assets/images')
    },
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Media Monitoring',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              { hid: 'description', name: 'description', content: '' },
              { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
            }
        ],
    },
    css: [
        '~/assets/css/fontawesome.min.css',
        '~/assets/css/responsive.css',
        '~/assets/css/style.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        "~plugins/vue-js-toggle-button",
        "~plugins/vue-datepicker",
        "~plugins/vue-upload-component",
        "~plugins/axios",
        "~plugins/vue-schedule"
    ],

    router: {
        middleware: ["auth"]
    },
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
    ],

  // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        'bootstrap-vue/nuxt',
        'portal-vue/nuxt',
        '@nuxtjs/toast',
        '@nuxtjs/axios',
        "vue2-editor/nuxt",
        'cookie-universal-nuxt'
    ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: process.env.BASE_URL
    },
    toast: {
        position: "bottom-right",
        duration: 5000,
        iconPack: "fontawesome",
        icon: "exclamation-triangle",
        className: "px-40px py-20px fs-18px"
    },

  // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        babel: {
            compact: true
        }
    },
    publicRuntimeConfig: {
        nodeEnv: process.env.NODE_ENV,
        maintenance: process.env.MAINTENANCE,
        mode: process.env.MODE,
        baseUrl: process.env.BASE_URL,
        onairUrl: process.env.ONAIR_URL,
        secondBaseUrl: process.env.SECOND_BASE_URL,
        loginUrl: process.env.LOGIN_URL,
        helpdeskUrl: process.env.HELPDESK_URL,
        tutorialUrl: process.env.TUTORIAL_URL,
        contactUsUrl: process.env.CONTACT_US_URL,
        privateKey: process.env.PRIVATE_KEY
    },
}
