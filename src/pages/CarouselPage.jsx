import { useEffect, useState } from 'react'
import groupPhoto from '../assets/group_photo.jpg'
import handsOnInnovationLabs from '../assets/last_slide.jpg'
import prototypeToReality from '../assets/last_year_models_created.jpg'
import codeControlCreate from '../assets/code_slide.jpg'
import nvisionSignatureExperience from '../assets/Nvision_1st_slide.jpg'
const slides = [
  {
    title: 'The Minds Behind NVISION',
    description:
      'A powerful community of innovators, creators, and problem-solvers coming together to shape the future of technology.',
    tag: 'Community',
    image:
      groupPhoto,
  },
  {
    title: 'Hands-on Innovation Labs',
    description:
      'From electronics to intelligent systems, participants dive deep into real-world engineering through guided builds and experimentation.',
    tag: 'Workshop',
    image:
        handsOnInnovationLabs,
  },
  {
    title: 'Prototype to Reality',
    description:
      'Witness ideas transform into working models—where hardware, code, and creativity merge into tangible innovation.',
    tag: 'Build',
    image:
      prototypeToReality,
  },
  {
    title: 'Code. Control. Create.',
    description:
      'Participants program intelligent systems, write embedded logic, and bring machines to life through clean, efficient code.',
    tag: 'Coding',
    image:
      codeControlCreate,
  },
  {
    title: 'NVISION Signature Experience',
    description:
      'An electrifying fusion of technology, teamwork, and vision—where innovation meets execution on a grand stage.',
    tag: 'Flagship',
    image:
      nvisionSignatureExperience,
  },
]

function CarouselPage() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [paused])

  const handlePrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  const handleNext = () => setCurrent((prev) => (prev + 1) % slides.length)

  return (
    <section className="bg-gradient-to-br from-white via-slate-50 to-blue-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-12 md:px-6 md:pt-16">
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Event Highlights
          </p>
          <h2 className="text-4xl font-black text-slate-900 md:text-5xl">NVISION past Moments</h2>
          <p className="max-w-2xl text-base text-slate-600">
            An Event with Lots of Learning and Fun and you'll get to meet new people.
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-blue-100/70"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative h-[520px]">
            {slides.map((slide, index) => {
              const isActive = index === current
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
                      <p className="mt-3 max-w-2xl text-lg text-slate-700">
                        {slide.description}
                      </p>
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
                onClick={() => setCurrent(index)}
                className={`h-2.5 rounded-full transition ${
                  current === index ? 'w-8 bg-sky-500' : 'w-3 bg-slate-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarouselPage

