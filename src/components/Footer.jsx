import { Link } from 'react-router-dom'

const socials = [
  {
    name: 'X',
    href: 'https://x.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M3 3h5.1l4.2 6.1 4.5-6.1H21l-6.3 8.2L21 21h-5.1l-4.5-6.6L6 21H3l6.6-8.7z"
        />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ieeesbnitdgp/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 21.5h4.6V7.8H.2zM8.9 7.8h4.4v1.9h.1c.6-1.1 2.1-2.2 4.2-2.2 4.5 0 5.3 3 5.3 6.8v7.2h-4.6v-6.4c0-1.5 0-3.5-2.1-3.5-2.1 0-2.4 1.6-2.4 3.4v6.5H8.9z"
        />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/ieeesb_nitdgp?igsh=MW9lY2lpZGRnazF0Mg==',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.51 4.51 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zm5.75-3.75a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z"
        />
      </svg>
    ),
  },
]

const links = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Highlights' },
  { to: '/nvision', label: 'ABOUT' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/contact', label: 'Contact' },  { label: 'IEEE SB NIT Durgapur', href: 'https://www.ieee-nitdgp.in/' },
]

function Footer() {
  return (
    <footer className="border-t border-blue-900/40 bg-gradient-to-tr from-slate-950 via-blue-950 to-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 shadow-[0_20px_40px_rgba(37,99,235,0.5)]">
            <span className="text-xl font-extrabold text-white">N</span>
          </div>
          <div>
            <p className="text-lg font-extrabold text-white">NVISION</p>
            <p className="text-sm text-blue-200/90">Best in the world tech experience.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300/80">
          {links.map((link) => (
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-blue-200 hover:underline"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="transition hover:text-blue-200 hover:underline"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-blue-50 transition hover:-translate-y-0.5 hover:text-blue-200"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="divider" />
      <div className="py-4 text-center text-xs text-blue-200/80">
        © {new Date().getFullYear()} NVISION. Crafted for the bold.
      </div>
    </footer>
  )
}

export default Footer

