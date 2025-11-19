import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { mochaPlugins } from "@getmocha/vite-plugins";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    ...mochaPlugins(process.env as any),
    react(),
    cloudflare(),
    viteStaticCopy({
      targets: [
        { src: "public/_redirects", dest: "." } // copy redirects to dist root
      ]
    })
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: { allowedHosts: true },
  build: {
    outDir: "dist",           // root output folder
    emptyOutDir: true,
    rollupOptions: {
  input: {
    main: path.resolve(__dirname, "index.html")
  },
  output: {
    entryFileNames: `assets/[name]-[hash].js`,
    chunkFileNames: `assets/[name]-[hash].js`,
    assetFileNames: `assets/[name]-[hash].[ext]`
  }
},

    chunkSizeWarningLimit: 5000,
  },
});
