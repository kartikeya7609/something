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
      detail: 'Participant registration followed by event inauguration and instructions.' 
    },
    { 
      time: '10:00', 
      title: 'Workshop Session', 
      detail: 'Introduction to components, sensors, and control mechanisms for the robotic car.' 
    },
    { 
      time: '12:30', 
      title: 'Hands-on Build Session', 
      detail: 'Participants assemble and wire the remote-controlled car with sensor modules.' 
    },
    { 
      time: '14:30', 
      title: 'Testing & Debugging', 
      detail: 'Track testing, obstacle detection tuning, and code optimization.' 
    },
    { 
      time: '16:30', 
      title: 'Final Demonstration', 
      detail: 'Live demonstration of sensor-based obstacle detection and navigation.' 
    },
    { 
      time: '17:30', 
      title: 'Results & Valedictory', 
      detail: 'Evaluation results, feedback session, and certificate distribution.' 
    }
  
  
]
const perks=[
  {
    title: 'On-Site Event Support',
    detail: 'Volunteers and coordinators available throughout the event for guidance and assistance.'
  },
  {
    title: 'Faculty & Mentor Guidance',
    detail: 'Support from faculty members and senior students during build and testing sessions.'
  },
  {
    title: 'Live Testing Arena',
    detail: 'Dedicated track for testing sensor-based obstacle detection and vehicle control.'
  },
  {
    title: 'Project Display & Interaction',
    detail: 'Participants showcase their models and explain working principles to peers and judges.'
  },
]
function NvisionDetailsPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-0 h-80 w-80 rounded-full bg-blue-200/40 blur-[110px] animate-blob" />
        <div className="absolute right-10 top-16 h-72 w-72 rounded-full bg-sky-200/40 blur-[110px] animate-blob" />
        <div className="absolute bottom-[-80px] left-1/3 h-96 w-96 rounded-full bg-amber-200/40 blur-[120px] animate-blob" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-12 md:px-6 md:pt-16">
        <div className="space-y-3 text-center">
          <span className="pill">Event Details</span>
          <h2 className="text-4xl font-black text-slate-900 md:text-5xl">
            NVISION <span className="gradient-text">Immersion</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-600">
            A focused 1-day event designed for hands-on learning, innovation, and community engagement.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="section-card flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500/80 to-cyan-400/80" />
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              </div>
              <p className="text-sm text-slate-600">{item.copy}</p>
            </div>
          ))}
        </div>

        <div className="divider" />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="section-card">
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
          </div>

          <div className="section-card">
            <p className="pill mb-4">Premium Perks</p>
            <ul className="space-y-4 text-sm text-slate-600 flex flex-row flex-wrap gap-3">
              {perks.map((perk) => (
                <li key={perk.title} className="flex items-start flex-row gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                  <p className="text-sm text-slate-600">{perk.detail}</p>
                </li>
              ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-blue-50/60 p-4 text-sm text-slate-600">
              <p className="font-semibold text-blue-500">Venue</p>
              <p>DM Sen Auditorium,Beside ECE Department, National Institute of Technology Durgapur .</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NvisionDetailsPage

