import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
export default defineConfig({ plugins: [svelte()], server: { host: '127.0.0.1', port: 4173, strictPort: true }, build: { rollupOptions: { input: { playground: 'playground.html', v6: 'v6.html' } }, outDir: 'dist-playground', emptyOutDir: true } });
