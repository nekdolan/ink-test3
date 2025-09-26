// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs'
import path from 'path'

export default defineNuxtConfig({
    app: {
        baseURL: '/ink-test/',
    },
    modules: [
        '@inkline/plugin/nuxt',
        '@nuxt/content',
        '@nuxt/image'
    ],
    compatibilityDate: '2025-07-15',

    devServer: {
        port: 3004
    },

    nitro: {
        preset: 'github_pages' // makes output compatible with GitHub Pages
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
        // plugins: [
        //     {
        //         name: 'inkline-template-fix',
        //         enforce: 'pre',
        //         transform(code, id) {
        //             // Adjust if your path looks slightly different in the error
        //             if (id.includes('virtual:nuxt:') && id.includes('inkline.mjs')) {
        //                 // Replace the EJS placeholder with static JSON
        //                 const options = {
        //                     color: 'light',
        //                     colorMode: 'light',
        //                     colorModeStrategy: null,
        //                     renderMode: 'universal'
        //                 }
        //                 return {
        //                     code: code.replace(
        //                       /<%= JSON\.stringify\(options, 4\) %>/g,
        //                       JSON.stringify(options, null, 4)
        //                     ),
        //                     map: null
        //                 }
        //             }
        //             return null
        //         }
        //     }
        // ]
    },

    hooks: {
        // 'content:file:afterParse'(ctx) {
        //     console.log('hook');
        //     console.log(ctx);
        // },
        'build:done': () => {
            const inklinePath = path.resolve('.nuxt', 'inkline.mjs');
            if (fs.existsSync(inklinePath)) {
                let content = fs.readFileSync(inklinePath, 'utf-8');
                const options = {
                    color: 'light',
                    colorMode: 'light',
                    colorModeStrategy: null,
                    renderMode: 'universal'
                };
                content = content.replace(
                  /<%= JSON\.stringify\(options, 4\) %>/g,
                  JSON.stringify(options, null, 4)
                );
                fs.writeFileSync(inklinePath, content);
                console.log('✅ Patched inkline.mjs with static config');
            }
        }
    },

    inkline: {
        globals: {
            color: 'light',
            colorMode: 'light',
            colorModeStrategy: null,
            renderMode: 'universal'
        }
    },

    experimental: {
        inlineSSRStyles: false
    },

    devtools: { enabled: false },

});