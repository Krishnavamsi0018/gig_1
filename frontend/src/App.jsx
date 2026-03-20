import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import BottomNav from './components/BottomNav'
import AppHeader from './components/AppHeader'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import GigPassport from './pages/GigPassport'
import SlumpShield from './pages/SlumpShield'
import Claims from './pages/Claims'
import Benefits from './pages/Benefits'
import NFTBadges from './pages/NFTBadges'
import ZKProof from './pages/ZKProof'
import Profile from './pages/Profile'
import { WalletProvider } from './context/WalletContext'

function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    const onMove = (e) => {
      if (dot.current)  { dot.current.style.left = e.clientX + 'px'; dot.current.style.top = e.clientY + 'px' }
      if (ring.current) { ring.current.style.left = e.clientX + 'px'; ring.current.style.top = e.clientY + 'px' }
    }
    const onDown = () => {
      if (dot.current)  dot.current.style.transform = 'translate(-50%,-50%) scale(0.6)'
      if (ring.current) { ring.current.style.width = '18px'; ring.current.style.height = '18px'; ring.current.style.borderColor = 'rgba(245,158,11,0.8)' }
    }
    const onUp = () => {
      if (dot.current)  dot.current.style.transform = 'translate(-50%,-50%) scale(1)'
      if (ring.current) { ring.current.style.width = '28px'; ring.current.style.height = '28px'; ring.current.style.borderColor = 'rgba(13,148,136,0.5)' }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])
  return (
    <>
      <div id="cursor-dot" ref={dot} />
      <div id="cursor-ring" ref={ring} />
    </>
  )
}

export default function App() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <WalletProvider>
      <div className="grain min-h-screen" style={{ background: 'var(--bg-base)' }}>
        <CustomCursor />
        {!isLanding && <AppHeader />}
        <Routes>
          <Route path="/"              element={<Landing />} />
          <Route path="/dashboard"     element={<Dashboard />} />
          <Route path="/passport"      element={<GigPassport />} />
          <Route path="/slump-shield"  element={<SlumpShield />} />
          <Route path="/claims"        element={<Claims />} />
          <Route path="/benefits"      element={<Benefits />} />
          <Route path="/nft-badges"    element={<NFTBadges />} />
          <Route path="/zk-proof"      element={<ZKProof />} />
          <Route path="/profile"       element={<Profile />} />
        </Routes>
        {!isLanding && <BottomNav />}
        <Toaster
          position="bottom-center"
          gutter={8}
          containerStyle={{ bottom: 80 }}
          toastOptions={{
            duration: 3500,
            style: {
              background: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
              borderRadius: '12px',
              fontSize: '13px',
              fontFamily: "'JetBrains Mono', monospace",
              maxWidth: '90vw',
              padding: '12px 16px',
            },
            success: { iconTheme: { primary: '#14B8A6', secondary: 'var(--bg-base)' } },
            error:   { iconTheme: { primary: '#F87171', secondary: 'var(--bg-base)' } },
          }}
        />
      </div>
    </WalletProvider>
  )
}
