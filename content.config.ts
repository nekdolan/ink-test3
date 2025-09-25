import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    videos: defineCollection({
      // Load every file inside the `content` directory
      source: 'videos/**/*.mdx',
      // Specify the type of content in this collection
      type: 'page',
      schema: z.object({
        title: z.string(),
        short: z.string(),
        category: z.string(),
        public: z.boolean(),
        vid: z.string(),
        date: z.date(),
      })
    })
  }
})
