import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { PresetCard } from './components/PresetCard'
// import { HomePage } from './pages/MainPage//HomePage/index';
import OrderPage from './pages/order/OrderPage';
import Login from './pages/AuthPage/LoginPage/Login';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Login /> */}
  </StrictMode>
  
)
