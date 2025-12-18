import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import CarouselPage from './pages/CarouselPage'
import CountdownPage from './pages/CountdownPage'
import HomePage from './pages/HomePage'
import NvisionDetailsPage from './pages/NvisionDetailsPage'
import SponsorsPage from './pages/SponsorsPage'
import ContactPage from './pages/ContactPage'
import { useEffect, useState } from 'react'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-red-500 via-purple-500 to-blue-600 text-slate-50">
      {isLoading && <Loader />}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/countdown" element={<CountdownPage />} />
            <Route path="/events" element={<CarouselPage />} />
            <Route path="/nvision" element={<NvisionDetailsPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
