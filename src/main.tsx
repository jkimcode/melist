import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Marketing from './pages/marketing/Marketing.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Navigation from './components/Navigation.tsx'
import Profile from './pages/app/Profile.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route index element={<Marketing />} />
        <Route path="/:userId" element={<Profile />} />
        <Route path="/test" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
