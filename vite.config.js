// vite.config.js
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

const version = "v1"

export default defineConfig({
  	base: `/app-whatsapp/${version}/`,
  	plugins: [vue()],
  	build: {
    	outDir: `dist/${version}`,
    	rollupOptions: {
      		output: {
  				entryFileNames: "assets/[name].js",
  				chunkFileNames: "assets/chunk-[name].js",
  				assetFileNames: "assets/[name][extname]"
			}
    	}
  	}
})

