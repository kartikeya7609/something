const confirmedSponsors = [
  // {
  //   name: 'TechNova Systems',
  //   tier: 'Title Sponsor',
  //   perks: ['Lead stage visibility', 'Keynote spotlight', 'Campus-wide branding'],
  // },
  // {
  //   name: 'CloudForge Labs',
  //   tier: 'Gold Sponsor',
  //   perks: ['Premium booth', 'Workshop slot', 'VIP night summit access'],
  // },
  // {
  //   name: 'QuantumPeak',
  //   tier: 'Silver Sponsor',
  //   perks: ['Lounge branding', 'Startup showcase co-host', 'Recruitment lounge access'],
  // },
]

function SponsorsPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-rose-50 to-amber-50/40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-60px] top-0 h-80 w-80 rounded-full bg-rose-200/40 blur-[120px] animate-blob" />
        <div className="absolute right-[-60px] bottom-0 h-80 w-80 rounded-full bg-amber-200/40 blur-[120px] animate-blob" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-16 pt-12 md:px-6 md:pt-16">
        <div className="text-center">
          <span className="pill">Confirmed Sponsors</span>
          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Official Partners <span className="gradient-text">for NVISION</span>
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-lg text-slate-600">
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {confirmedSponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-amber-100 to-white opacity-60" />
              <div className="relative space-y-3">
                <p className="pill inline-block">{sponsor.tier}</p>
                <h3 className="text-xl font-semibold text-slate-900">{sponsor.name}</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {sponsor.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-400" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-slate-600">
          Additional confirmed sponsors will be added as they finalize.
        </div>
      </div>
    </section>
  )
}

export default SponsorsPage

