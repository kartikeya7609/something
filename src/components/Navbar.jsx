import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Highlights' },
  { to: '/nvision', label: 'ABOUT' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/contact', label: 'Contact' },
]

const linkClasses = ({ isActive }) =>
  `text-sm md:text-base font-medium transition ${
    isActive ? 'text-rose-600' : 'text-slate-500 hover:text-slate-900'
  }`

function Navbar() {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((prev) => !prev)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={close}>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-red-500 to-amber-400 shadow-[0_10px_30px_rgba(244,63,94,0.35)]">
            <span className="text-lg font-extrabold text-white">N</span>
          </div>
          <div>
            <p className="text-lg font-extrabold leading-none text-slate-900">NVISION</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Tech Experience
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClasses} onClick={close}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={toggle}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_10px_25px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:text-rose-600 md:hidden"
            aria-label="Toggle navigation"
          >
            <span className="flex flex-col items-center justify-center gap-1">
              <span
                className={`block h-0.5 w-6 rounded-full bg-current transition ${open ? 'translate-y-1.5 rotate-45' : ''}`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full bg-current transition ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full bg-current transition ${open ? '-translate-y-1.5 -rotate-45' : ''}`}
              />
            </span>
          </button>
          <Link
            to="/countdown"
            onClick={close}
            className="hidden rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_15px_30px_rgba(244,63,94,0.35)] transition hover:translate-y-[-1px] md:inline-block"
          >
            View Event
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`mx-auto flex max-w-6xl flex-col gap-3 px-4 pb-4 md:hidden transition-all ${
          open ? 'max-h-96 opacity-100 pt-2' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_15px_35px_rgba(15,23,42,0.08)]">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClasses}
              onClick={close}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/countdown"
            onClick={close}
            className="mt-1 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_15px_30px_rgba(244,63,94,0.35)] transition hover:translate-y-[-1px]"
          >
            View Event
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

