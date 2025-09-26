// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs'
import path from 'path'

export default defineNuxtConfig({
    app: {
        baseURL: '/ink-test3/',
    },
    modules: [
        '@inkline/plugin/nuxt',
        '@nuxt/content',
        '@nuxt/image'
    ],
    compatibilityDate: '2024-08-29',

    devServer: {
        port: 3004
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    logger: {
                        warn(message, options) {
                            // Mute "Mixed Declarations" warning
                            if (options.deprecation && message.includes('mixed-decls')) {
                                return;
                            }
                            // List all other warnings
                            console.warn(`▲ [WARNING]: ${message}`);
                        }
                    }
                }
            }
        }
    },

    inkline: {
        globals: {
            color: 'light',
            colorMode: 'light',
            colorModeStrategy: null
        }
    },

    experimental: {
        inlineSSRStyles: false
    },

    devtools: { enabled: false },

});