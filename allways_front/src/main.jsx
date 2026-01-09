import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/Home/Home'
import { PresetCard } from './components/PresetCard'
import { HomePage } from './pages/MainPage//HomePage/index';
import OrderPage from './pages/order/OrderPage';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrderPage />
  </StrictMode>,
)
