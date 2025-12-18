import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'

// Initialize EmailJS - Get public key from environment variable or set it directly here
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'x5ns0x845LwLgna6x'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' })

  useEffect(() => {
    // Initialize EmailJS with public key
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_PUBLIC_KEY)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSubmitStatus({ type: null, message: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    // Check if public key is configured
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
    <section className="relative overflow-x-hidden">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-16 pt-12 md:px-6 md:pt-16">
        
        {/* Header Animation - Fades and slides up */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
          
          {/* Left Side: Animation from left to middle */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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

          {/* Right Side: Animation from right to middle */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
  )
}

export default ContactPage