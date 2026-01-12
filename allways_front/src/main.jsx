import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PresetCard } from './components/PresetCard';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/menu/MenuPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MenuPage />
  </StrictMode>
);
