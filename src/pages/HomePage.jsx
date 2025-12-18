import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import ieeeLogo from '../assets/ieee-logo.svg'
import RotatableCar from '../components/RotatableCar'

const targetDate = new Date('2026-01-12T09:00:00')
const registrationLink = 'https://forms.gle/your-registration-form'

const features = [
  {
    title: 'Autonomous Rover Build',
    desc: 'Design and assemble remote-controlled cars equipped with sensors to detect and avoid real-world obstacles.',
    accent: 'from-yellow-300/70 to-orange-100/80',
  },
  {
    title: 'Smart Sensor Integration',
    desc: 'Work with ultrasonic and IR sensors to enable precise obstacle detection and intelligent navigation.',
    accent: 'from-emerald-200/70 to-teal-300/80',
  },
  {
    title: 'Control, Code, Compete',
    desc: 'Program movement logic, test responsiveness, and compete in real-time challenges on dynamic tracks.',
    accent: 'from-indigo-100/70 to-purple-200/80',
  },
  
]

const moments = [
  // 'Immersive AR arenas',
  // '24/7 innovation lounge',
  // 'Global dev challenges',
  // 'Signature night summit',
]

function HomePage() {
  const calculateTimeLeft = useMemo(
    () => () => {
      const now = new Date().getTime()
      const distance = Math.max(targetDate.getTime() - now, 0)
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((distance / (1000 * 60)) % 60)
      const seconds = Math.floor((distance / 1000) % 60)
      return { days, hours, minutes, seconds }
    },
    [],
  )

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)
  const [carZoom, setCarZoom] = useState(6)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-500 via-purple-500 to-blue-600">
      {/* Car background across full page (interactive on hover) */}
      <div className="absolute inset-0 z-0">
        <Canvas
          style={{ width: '100%', height: '100%' }}
          gl={{ alpha: true, antialias: true }}
        >
          <RotatableCar zoom={carZoom} />
        </Canvas>
      </div>

      {/* Soft overlay to keep text readable on top of car */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-red-500/60 via-purple-500/60 to-blue-600/60" />

      {/* Hero area at TOP of page, above background */}
      <div className="relative min-h-[70vh]">
        {/* pointer-events-none lets drag pass through to Canvas; we'll re-enable only on buttons */}
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-12 md:px-6 md:pt-16 pointer-events-none">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <span className="pill">An IEEE SB NITD Event </span>
            <h1 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              <span className="gradient-text">NVISION</span>
              <br />
              A New Tech Experience
            </h1>
            <p className="text-lg text-slate-600 md:text-xl">
                Drive into a 3D robotics experience – design, code, and race intelligent rovers in an immersive arena.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
              <span className="rounded-full bg-white px-3 py-1 font-semibold text-blue-600">
                  12 January 2026 • NIT Durgapur
              </span>
              <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700">
                  Hands-on robotics, coding labs, and live car simulations
              </span>
            </div>
              <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
              <a
                href={registrationLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_15px_30px_rgba(37,99,235,0.35)] transition hover:translate-y-[-1px]"
              >
                Register Now
              </a>
                <Link
                  to="/events"
                className="rounded-full border border-blue-200 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-blue-500 transition hover:bg-blue-50"
              >
                Explore Events
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 md:max-w-xl">
              {moments.map((item) => (
                <div key={item} className="glass flex items-center gap-3 rounded-2xl px-3 py-3">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.1)]">
            <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-200/60 to-blue-200/40 blur-[70px]" />
            <div className="absolute -right-12 -bottom-10 h-28 w-28 rounded-full bg-gradient-to-br from-sky-200/60 to-amber-200/40 blur-[70px]" />
            <div className="relative space-y-4">
              <p className="pill inline-block">Premium Pass</p>
              <h3 className="text-2xl font-bold text-slate-900">Experience the future, live.</h3>
              <p className="text-sm text-slate-600">
                Unlock curated labs, private lounges, and the NVISION night summit. The event built
                for creators who move faster than light.
              </p>
              <div className="divider" />
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Access</span>
                <span className="font-semibold text-blue-500">1 Day Event</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Location</span>
                <span className="font-semibold text-blue-500">National Institute of Technology Durgapur</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Launch</span>
                <span className="font-semibold text-blue-500">2026 Edition</span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple zoom controls on the side (only affect background car) */}
      <div className="fixed right-4 top-1/2 z-20 -translate-y-1/2">
        <div className="flex flex-col rounded-2xl bg-black/40 p-2 backdrop-blur-sm shadow-lg space-y-2">
          <button
            type="button"
            className="rounded-lg bg-white/95 px-3 py-1 text-xs font-semibold text-slate-900 hover:bg-white"
            onClick={() => setCarZoom((z) => Math.max(4, z - 0.5))}
          >
            Zoom In
          </button>
          <button
            type="button"
            className="rounded-lg bg-white/95 px-3 py-1 text-xs font-semibold text-slate-900 hover:bg-white"
            onClick={() => setCarZoom((z) => Math.min(12, z + 0.5))}
          >
            Zoom Out
          </button>
          </div>
        </div>

      {/* Rest of the page content below hero (allows drag to pass through to car) */}
      <div className="relative z-10 mx-auto mt-10 flex max-w-6xl flex-col gap-12 px-4 pb-16 md:px-6 pointer-events-none">
        <div className="section-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-500">
                Countdown
              </p>
              <h3 className="text-2xl font-bold text-slate-900">NVISION Starts Soon</h3>
            </div>
            <img src={ieeeLogo} alt="IEEE" className="h-10 w-auto" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 text-center shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-2 text-3xl font-black text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="section-card">
              <div
                className={`mb-4 flex flex-col items-center justify-center rounded-l bg-gradient-to-br ${feature.accent}`}
              >
                <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">{feature.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-500">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                Crafted for trailblazers
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomePage

