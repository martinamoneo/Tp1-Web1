// primer archivo q se ejecuta
// conecta react con html,  y hace q nuestra pagina sea dinamica

import { StrictMode } from 'react' // modo estricto para detectar errores
import { createRoot } from 'react-dom/client' // crea la pagina de react en html
import './main.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render( // toda la app esta dentro de esto
  <StrictMode>
    <App />
  </StrictMode>,
)
