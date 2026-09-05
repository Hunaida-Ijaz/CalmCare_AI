import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'
import FloatingControls from './Components/FloatingControls.jsx'
import { ThemeProvider } from './Context/ThemeContext.jsx'
import { ToastProvider } from './Context/ToastContext.jsx'
import './App.css'


import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import FirstAid from './Pages/FirstAid.jsx'
import Chatbot from './Pages/Chatbot.jsx'
import Tools from './Pages/Tools.jsx'
import Wellness from './Pages/Wellness.jsx'
import Dashboard from './Pages/Dashboard.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="app-shell">
          <ScrollToTop />
          <Navbar />
          <main className="app-shell__main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/first-aid" element={<FirstAid />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
          <FloatingControls />
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}
