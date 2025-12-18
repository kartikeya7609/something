import { useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion' // 1. Import Framer Motion
import RotatableCar from '../components/RotatableCar'
import groupPhoto from '../assets/group_photo.jpg'
import handsOnInnovationLabs from '../assets/last_slide.jpg'
import prototypeToReality from '../assets/last_year_models_created.jpg'
import codeControlCreate from '../assets/code_slide.jpg'
import nvisionSignatureExperience from '../assets/Nvision_1st_slide.jpg'
import ieeeLogo from '../assets/ieee-logo.svg'
import emailjs from '@emailjs/browser'

const targetDate = new Date('2026-01-12T09:00:00')
const registrationLink = 'https://forms.gle/your-registration-form'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'x5ns0x845LwLgna6x'

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

const slides = [
  {
    title: 'The Minds Behind NVISION',
    description:
      'A powerful community of innovators, creators, and problem-solvers coming together to shape the future of technology.',
    tag: 'Community',
    image: groupPhoto,
  },
  {
    title: 'Hands-on Innovation Labs',
    description:
      'From electronics to intelligent systems, participants dive deep into real-world engineering through guided builds and experimentation.',
    tag: 'Workshop',
    image: handsOnInnovationLabs,
  },
  {
    title: 'Prototype to Reality',
    description:
      'Witness ideas transform into working models—where hardware, code, and creativity merge into tangible innovation.',
    tag: 'Build',
    image: prototypeToReality,
  },
  {
    title: 'Code. Control. Create.',
    description:
      'Participants program intelligent systems, write embedded logic, and bring machines to life through clean, efficient code.',
    tag: 'Coding',
    image: codeControlCreate,
  },
  {
    title: 'NVISION Signature Experience',
    description:
      'An electrifying fusion of technology, teamwork, and vision—where innovation meets execution on a grand stage.',
    tag: 'Flagship',
    image: nvisionSignatureExperience,
  },
]

const highlights = [
  {
    title: 'About NVISION',
    copy:
      'NVISION is a hands-on technical festival bringing together innovators, engineers, and creators to design, build, and control intelligent robotic systems.',
  },
  {
    title: 'Theme',
    copy:
      'From manual control to smart automation, the event explores sensor-driven robotics where machines perceive, decide, and react to their environment.',
  },
  {
    title: 'Highlights',
    copy:
      'Live robot builds, sensor integration workshops, real-time testing arenas, coding challenges, and obstacle-navigation demonstrations.',
  },
  {
    title: 'Schedule',
    copy:
      'A focused multi-day experience featuring build sessions, guided labs, testing rounds, competitive challenges, and final live showcases.',
  },
  {
    title: 'Venue',
    copy:
      'National Institute of Technology Durgapur, Mahatma Gandhi Avenue, Durgapur, West Bengal, India.',
  },
]

const timeline = [
  {
    time: '09:00',
    title: 'Registration & Inauguration',
    detail: 'Participant registration followed by event inauguration and instructions.',
  },
  {
    time: '10:00',
    title: 'Workshop Session',
    detail: 'Introduction to components, sensors, and control mechanisms for the robotic car.',
  },
  {
    time: '12:30',
    title: 'Hands-on Build Session',
    detail: 'Participants assemble and wire the remote-controlled car with sensor modules.',
  },
  {
    time: '14:30',
    title: 'Testing & Debugging',
    detail: 'Track testing, obstacle detection tuning, and code optimization.',
  },
  {
    time: '16:30',
    title: 'Final Demonstration',
    detail: 'Live demonstration of sensor-based obstacle detection and navigation.',
  },
  {
    time: '17:30',
    title: 'Results & Valedictory',
    detail: 'Evaluation results, feedback session, and certificate distribution.',
  },
]

const perks = [
  {
    title: 'On-Site Event Support',
    detail: 'Volunteers and coordinators available throughout the event for guidance and assistance.',
  },
  {
    title: 'Faculty & Mentor Guidance',
    detail: 'Support from faculty members and senior students during build and testing sessions.',
  },
  {
    title: 'Live Testing Arena',
    detail: 'Dedicated track for testing sensor-based obstacle detection and vehicle control.',
  },
  {
    title: 'Project Display & Interaction',
    detail: 'Participants showcase their models and explain working principles to peers and judges.',
  },
]

const StatCard = ({ label, value }) => {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    setPulse(true)
    const t = setTimeout(() => setPulse(false), 400)
    return () => clearTimeout(t)
  }, [value])

  return (
    <div className="section-card flex flex-col items-center justify-center text-center bg-white animate-fade-in">
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

function SinglePage() {
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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' })

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [paused])

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_PUBLIC_KEY)
    }
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.fade-in-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSubmitStatus({ type: null, message: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      setSubmitStatus({
        type: 'error',
        message: 'Email service is not configured. Please contact the administrator.',
      })
      setIsSubmitting(false)
      return
    }

    try {
      const result = await emailjs.send(
        'service_mdjy4m6',
        'template_xfhx27s',
        {
          from_name: formData.name,
          user_name: formData.name,
          name: formData.name,
          from_email: formData.email,
          user_email: formData.email,
          email: formData.email,
          message: formData.description,
          message_body: formData.description,
          description: formData.description,
        }
      )

      if (result.status === 200 || result.text === 'OK') {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. We will get back to you soon.',
        })
        setFormData({ name: '', email: '', description: '' })
      } else {
        throw new Error('Unexpected response from email service')
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      let errorMessage = 'Sorry, there was an error sending your message. Please try again later.'
      if (error.text) {
        errorMessage = `Error: ${error.text}`
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`
      }
      setSubmitStatus({
        type: 'error',
        message: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative overflow-x-hidden"> {/* Added overflow-x-hidden to prevent layout shift during slide-in */}
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.12),transparent_28%),radial-gradient(circle_at_10%_80%,rgba(14,165,233,0.12),transparent_32%)]" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-24 md:px-6 md:pt-28">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl space-y-6"
            >
              <span className="pill">An IEEE SB NITD Event</span>
              <h1 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                <span className="gradient-text">NVISION</span>
                <br />
                A New Tech Experience
              </h1>
              <p className="text-lg text-slate-600 md:text-xl">
                Drive into a 3D robotics experience – design, code, and race intelligent rovers in an immersive arena.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
                <span className="rounded-full bg-white px-3 py-1 font-semibold text-blue-600 shadow-sm">
                  12 January 2026 • NIT Durgapur
                </span>
                <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 shadow-sm">
                  Hands-on robotics, coding labs, and live car simulations
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={registrationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_15px_30px_rgba(37,99,235,0.35)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_40px_rgba(37,99,235,0.45)]"
                >
                  Register Now
                </a>
                <a
                  href="#highlights"
                  className="rounded-full border border-blue-200 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-blue-500 transition hover:bg-blue-50"
                >
                  Explore Events
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.1)]"
            >
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
                  <span className="font-semibold text-blue-500">NIT Durgapur</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Launch</span>
                  <span className="font-semibold text-blue-500">2026 Edition</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3D Car Model */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative h-[400px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 shadow-2xl"
          >
            <Canvas>
              <RotatableCar zoom={6} />
            </Canvas>
          </motion.div>
        </div>
      </section>

      {/* Countdown Section */}
      <section
        id="countdown"
        className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 py-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.12),transparent_28%),radial-gradient(circle_at_10%_80%,rgba(14,165,233,0.12),transparent_32%)]" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-card"
          >
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
                <StatCard key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.12),transparent_28%),radial-gradient(circle_at_10%_80%,rgba(14,165,233,0.12),transparent_32%)]" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="pill inline-block">Features</p>
            <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
              What to <span className="gradient-text">Expect</span>
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="section-card"
              >
                <div
                  className={`mb-4 flex flex-col items-center justify-center rounded-l bg-gradient-to-br ${feature.accent} p-4`}
                >
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-600">{feature.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                  Crafted for trailblazers
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Carousel Section */}
      <section
        id="highlights"
        className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 py-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.12),transparent_28%),radial-gradient(circle_at_10%_80%,rgba(14,165,233,0.12),transparent_32%)]" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-3"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Event Highlights
            </p>
            <h2 className="text-4xl font-black text-slate-900 md:text-5xl">NVISION Past Moments</h2>
            <p className="max-w-2xl text-base text-slate-600">
              An Event with Lots of Learning and Fun and you'll get to meet new people.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-blue-100/70"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative h-[520px]">
              {slides.map((slide, index) => {
                const isActive = index === currentSlide
                return (
                  <div
                    key={slide.title}
                    className={`absolute inset-0 flex transition-all duration-700 ease-out ${
                      isActive ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                    }`}
                    aria-hidden={!isActive}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-3xl">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-slate-900 md:p-10">
                        <h3 className="text-3xl font-bold md:text-4xl">{slide.title}</h3>
                        <p className="mt-3 max-w-2xl text-lg text-slate-700">{slide.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-slate-700 shadow-lg shadow-slate-200 transition hover:bg-gradient-to-r hover:from-sky-500 hover:to-indigo-500 hover:text-white md:h-14 md:w-14"
                aria-label="Previous slide"
              >
                {'<'}
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-slate-700 shadow-lg shadow-slate-200 transition hover:bg-gradient-to-r hover:from-indigo-500 hover:to-sky-500 hover:text-white md:h-14 md:w-14"
                aria-label="Next slide"
              >
                {'>'}
              </button>
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition ${
                    currentSlide === index ? 'w-8 bg-sky-500' : 'w-3 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 py-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.12),transparent_28%),radial-gradient(circle_at_10%_80%,rgba(14,165,233,0.12),transparent_32%)]" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3 text-center"
          >
            <span className="pill">Event Details</span>
            <h2 className="text-4xl font-black text-slate-900 md:text-5xl">
              NVISION <span className="gradient-text">Immersion</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-slate-600">
              A focused 1-day event designed for hands-on learning, innovation, and community engagement.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="section-card flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500/80 to-cyan-400/80" />
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                </div>
                <p className="text-sm text-slate-600">{item.copy}</p>
              </motion.div>
            ))}
          </div>

          <div className="divider" />

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Timeline: Slide from left */}
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="section-card"
            >
              <p className="pill mb-4">Experience Path</p>
              <h3 className="text-2xl font-bold text-slate-900">Signature Timeline</h3>
              <div className="mt-6 space-y-6">
                {timeline.map((entry, idx) => (
                  <div key={entry.title} className="relative flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-semibold text-white shadow-[0_15px_30px_rgba(37,99,235,0.35)]">
                        {entry.time}
                      </div>
                      {idx < timeline.length - 1 && (
                        <div className="mt-1 h-16 w-px bg-gradient-to-b from-blue-200 to-transparent" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-500">{entry.title}</p>
                      <p className="text-sm text-slate-600">{entry.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Perks: Slide from right */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="section-card flex flex-col gap-4"
            >
              <p className="pill mb-4">Premium Perks</p>
              <ul className="space-y-4 text-sm text-slate-600 flex flex-row flex-wrap gap-3">
                {perks.map((perk, idx) => (
                  <li
                    key={perk.title}
                    className="flex items-start flex-row gap-3"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                    <p className="text-sm text-slate-600">{perk.detail}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-blue-50/60 p-4 text-sm text-slate-600">
                <p className="font-semibold text-blue-500">Venue</p>
                <p>
                  DM Sen Auditorium, Beside ECE Department, National Institute of Technology Durgapur.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 py-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.12),transparent_28%),radial-gradient(circle_at_10%_80%,rgba(14,165,233,0.12),transparent_32%)]" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Contact Us
            </p>
            <h1 className="text-4xl font-black text-slate-900 md:text-5xl">IEEE SB NIT Durgapur</h1>
            <p className="max-w-2xl text-base text-slate-600">
              Mahatma Gandhi Avenue, Durgapur, West Bengal, India
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span className="font-semibold text-blue-600">Email:</span>
              <a
                className="text-slate-700 underline decoration-blue-400/60 underline-offset-4"
                href="mailto:ieeesb.nitdgp@gmail.com"
              >
                ieeesb.nitdgp@gmail.com
              </a>
            </div>
            <div className="flex flex-col gap-1 text-sm text-slate-600">
              <span className="font-semibold text-blue-600">Phone:</span>
              <span>+91 7439 652 300</span>
              <span>+91 6290 292 166</span>
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Form: Slide from left */}
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="section-card flex flex-col gap-5"
            >
              <h2 className="text-2xl font-semibold text-slate-900">Send a Message</h2>
              {submitStatus.type && (
                <div
                  className={`rounded-xl border p-4 text-sm ${
                    submitStatus.type === 'success'
                      ? 'border-green-200 bg-green-50 text-green-800'
                      : 'border-red-200 bg-red-50 text-red-800'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Tell us how we can help"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_15px_30px_rgba(37,99,235,0.35)] transition hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </motion.div>

            {/* Map: Slide from right */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="section-card flex flex-col gap-4"
            >
              <h2 className="text-2xl font-semibold text-slate-900">Location</h2>
              <p className="text-sm text-slate-600">
                Mahatma Gandhi Avenue, Durgapur, West Bengal, India
              </p>
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-[0_15px_35px_rgba(15,23,42,0.08)]">
                <iframe
                  title="NIT Durgapur Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.4173420727927!2d87.29134897556928!3d23.547061597184575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f77190e7d92e31%3A0x3317bea82552f201!2sNational%20Institute%20of%20Technology%2C%20Durgapur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex flex-col gap-2 text-sm text-slate-600">
                <span className="font-semibold text-blue-600">Visit Us</span>
                <span>IEEE Student Branch, NIT Durgapur</span>
                <span>Mahatma Gandhi Avenue</span>
                <span>Durgapur, West Bengal, India</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SinglePage