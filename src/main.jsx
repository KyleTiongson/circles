import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CircleApp from './CircleApp.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CircleApp />
  </StrictMode>,
)
