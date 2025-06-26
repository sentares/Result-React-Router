import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.svg', 'robots.txt', 'offline.html'],
			srcDir: '.',
			filename: 'sw.js',
			strategies: 'injectManifest',
			workbox: {
				globPatterns: ['**/*.{html,css,scss,js,ico,png,svg}'],
			},
			devOptions: {
				enabled: true,
				type: 'module',
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
})
