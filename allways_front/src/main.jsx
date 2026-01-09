import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PresetCard } from './components/PresetCard'
import { HomePage } from './pages/MainPage/HomePage/index';
import App from './App';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
