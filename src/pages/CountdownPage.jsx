import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const targetDate = new Date('2026-01-12T09:00:00')

const units = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
]

const StatCard = ({ label, value }) => {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    setPulse(true)
    const t = setTimeout(() => setPulse(false), 400)
    return () => clearTimeout(t)
  }, [value])

  return (
    <div className="section-card flex flex-col items-center justify-center text-center bg-white">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
        {label}
      </span>
      <p
        className={`mt-3 text-4xl font-black text-slate-900 transition duration-300 md:text-5xl ${
          pulse ? 'scale-110 text-blue-500' : ''
        }`}
      >
        {value.toString().padStart(2, '0')}
      </p>
      <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
    </div>
  )
}

function CountdownPage() {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 pb-16 pt-14 text-center md:px-6 md:pt-16">
        <div className="space-y-4">
          <span className="pill">Launching Soon</span>
          <h2 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl">
            Countdown to <span className="gradient-text">NVISION</span>
          </h2>
          <p className="max-w-2xl text-lg text-slate-600">
            A multi-sensory tech festival built for builders, dreamers, and the daring. Get ready
            for the next chapter.
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
          {units.map((unit) => (
            <StatCard key={unit.key} label={unit.label} value={timeLeft[unit.key]} />
          ))}
        </div>

        <div className="glass flex flex-col items-center gap-4 rounded-3xl px-6 py-8 md:flex-row md:justify-between md:gap-8 md:px-10">
          <div className="text-left">
            <p className="pill">Featured</p>
            <p className="mt-3 text-xl font-semibold text-slate-900">Immersive labs + global talent</p>
            <p className="text-sm text-slate-600">
              From sunrise prototyping to a midnight summit—prepare for 72 hours of velocity.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/events"
              className="rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_15px_30px_rgba(37,99,235,0.35)] transition hover:translate-y-[-1px]"
            >
              Explore Events
            </Link>
            <Link
              to="/nvision"
              className="rounded-full border border-blue-200 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-blue-500 transition hover:bg-blue-50"
            >
              See Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CountdownPage

