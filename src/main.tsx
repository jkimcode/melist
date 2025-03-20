import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Marketing from './pages/marketing/Marketing.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Navigation from './components/Navigation.tsx'
import Profile from './pages/app/Profile.tsx'
import Search from './pages/app/Search.tsx'
import Home from './pages/app/Home.tsx'
import MyProfile from './pages/app/MyProfile.tsx'
import Edit from './pages/app/Edit.tsx'
import Saved from './pages/app/Saved.tsx'
import Following from './pages/app/Following.tsx'
import AppLayout from './layouts/AppLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/:userId" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/my" element={<MyProfile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/following" element={<Following />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/test" element={<App />} />
          <Route path="/edit" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
