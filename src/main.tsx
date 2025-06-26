import { createRoot } from 'react-dom/client'
import App from './app/App'
import './app/styles/index.scss'

import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(<App />)
