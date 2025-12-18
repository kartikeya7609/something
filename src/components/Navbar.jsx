import { useState, useEffect } from 'react'
import ieeeLogo from '../assets/ieee-logo.svg'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#highlights', label: 'Highlights' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const registrationLink = 'https://forms.gle/your-registration-form'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  const toggle = () => setOpen((prev) => !prev)
  const close = () => setOpen(false)

  // Smooth Scroll logic
  const handleScroll = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      close()
    }
  }

  useEffect(() => {
    const handleScrollEffects = () => {
      // 1. Navbar shrink effect
      setScrolled(window.scrollY > 50)

      // 2. Scroll Spy logic
      const sections = ['home', 'highlights', 'about', 'contact']
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScrollEffects)
    return () => window.removeEventListener('scroll', handleScrollEffects)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      scrolled ? 'py-3' : 'py-6'
    }`}>
      <div className={`mx-auto flex items-center justify-between transition-all duration-500 ease-in-out border border-white/20 bg-white/70 backdrop-blur-md shadow-2xl px-3 ${
        scrolled 
          ? 'max-w-[90%] md:max-w-5xl rounded-full py-2 shadow-blue-500/10' 
          : 'max-w-[95%] md:max-w-7xl rounded-2xl py-3'
      }`}>
        
        {/* Logo Section */}
        <a
          href="#home"
          onClick={(e) => handleScroll(e, '#home')}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-lg bg-blue-50 p-1 transition-transform group-hover:scale-110">
            <img src={ieeeLogo} alt="Logo" className="h-8 w-auto md:h-10" />
          </div>
          <div className={scrolled ? 'hidden md:block' : 'block'}>
            <p className="text-lg font-black tracking-tight text-slate-900 leading-none">NVISION</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600">NIT Durgapur</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full ${
                  isActive ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600" />
                )}
              </a>
            )
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href={registrationLink}
            target="_blank"
            rel="noreferrer"
            className={`hidden md:inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-600 hover:shadow-lg active:scale-95 ${
              scrolled ? 'scale-90' : 'scale-100'
            }`}
          >
            Register
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-900 md:hidden"
          >
            <div className="relative w-5 h-4">
              <span className={`absolute h-0.5 w-full bg-current transition-all duration-300 ${open ? 'top-2 rotate-45' : 'top-0'}`} />
              <span className={`absolute top-2 h-0.5 w-full bg-current transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute h-0.5 w-full bg-current transition-all duration-300 ${open ? 'top-2 -rotate-45' : 'top-4'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`absolute top-full left-0 right-0 mt-2 px-4 transition-all duration-500 md:hidden ${
        open ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
      }`}>
        <div className="rounded-3xl border border-white/20 bg-white/90 backdrop-blur-xl p-6 shadow-2xl">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={`text-xl font-bold ${activeSection === item.href.replace('#', '') ? 'text-blue-600' : 'text-slate-500'}`}
              >
                {item.label}
              </a>
            ))}
            <hr className="border-slate-100" />
            <a href={registrationLink} className="w-full rounded-2xl bg-blue-600 py-4 text-center font-bold text-white">
              REGISTER NOW
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar