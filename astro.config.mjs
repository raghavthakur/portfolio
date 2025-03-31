// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://raghavthakur.dev",
  // single page, no prefetch needed
  prefetch: false,
  integrations: [mdx(), sitemap(), tailwind(), compress({
    CSS: true,
    SVG: false,
    Image: false,
    HTML: {
        "html-minifier-terser": {
            collapseWhitespace: true,
            // collapseInlineTagWhitespace: true, // It breaks display-inline / flex-inline text
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            removeEmptyAttributes: true,
            // removeEmptyElements: true, // It removes sometimes SVGs
            removeRedundantAttributes: true
        },
    },
    JavaScript: {
        'terser': {
            compress: {
                drop_console: true,
                drop_debugger: true,
            }
        }
    }
})],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
