import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Import Bulma CSS - through index.html
// Import custom CSS
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
