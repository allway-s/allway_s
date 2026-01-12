import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// [해결] App 컴포넌트 임포트를 유지합니다.
import App from './App'

// [유지] 필요한 컴포넌트들
import { PresetCard } from './components/PresetCard'
import OrderPage from './pages/order/OrderPage';
import Login from './pages/AuthPage/LoginPage/Login';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* [해결] 전체 서비스의 중심인 App을 렌더링합니다 */}
    <App />
    {/* <Login /> - App 내부 Route에서 관리하므로 여기선 주석 유지 */}
  </StrictMode>
)