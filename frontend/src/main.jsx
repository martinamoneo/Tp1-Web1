import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/main.css'
import './assets/css/partials.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
