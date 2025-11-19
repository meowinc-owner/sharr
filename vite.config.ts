import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { mochaPlugins } from "@getmocha/vite-plugins";
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    ...mochaPlugins(process.env as any),
    react(),
    cloudflare(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/_redirects',
          dest: '.' // copy to the root of dist
        }
      ]
    })
  ],
  server: {
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
    outDir: "dist",
    emptyOutDir: true,
  },
});
