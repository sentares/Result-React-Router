import { createRoot } from 'react-dom/client'
import App from './app/App'
import './app/styles/index.scss'

import { registerSW } from 'virtual:pwa-register'

if ('serviceWorker' in navigator) {
	registerSW()
}
createRoot(document.getElementById('root')!).render(<App />)
