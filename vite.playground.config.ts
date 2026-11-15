import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
export default defineConfig({ configFile: false, plugins: [svelte()], server: { host: '0.0.0.0', port: 4173, strictPort: true }, build: { rollupOptions: { input: 'playground.html' }, outDir: 'dist-playground', emptyOutDir: true } });
