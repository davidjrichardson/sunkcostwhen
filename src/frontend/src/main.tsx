import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { WebsocketProvider } from './contexts';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebsocketProvider>
        <App />
    </WebsocketProvider>
  </StrictMode>,
)
