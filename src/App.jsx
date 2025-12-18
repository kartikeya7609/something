import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import SinglePage from './pages/SinglePage'
import { useEffect, useState } from 'react'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 text-slate-800">
      {isLoading && <Loader />}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <SinglePage />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
