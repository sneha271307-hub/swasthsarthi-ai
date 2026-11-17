import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, PageHero, SchemeCard } from '../components/ui'
import { SCHEMES, SCHEME_FILTERS } from '../data/schemes'

export default function SchemeDiscovery() {
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const list = SCHEMES.filter(
    (s) =>
      (filter === 'all' || s.category === filter) &&
      (!term || `${s.name} ${s.desc} ${s.short} ${s.tags.join(' ')}`.toLowerCase().includes(term)),
  )

  return (
    <>
      <PageHero eyebrow="Government Schemes Directory" icon="policy" title="Scheme Discovery (योजनाएं)">
        Browse verified central and state healthcare entitlements. Not sure which apply to you? Run the eligibility check.
      </PageHero>

      <section className="px-6 lg:px-12 pb-28">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="relative w-full lg:max-w-md">
              <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-xl" />
              <input className="neu-input !pl-11" placeholder="Search schemes, e.g. PM-JAY, maternal, senior…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="flex flex-wrap gap-4">
              {SCHEME_FILTERS.map((f) => (
                <button key={f.value} className={`neu-btn neu-btn-sm ${filter === f.value ? 'is-active' : '!text-on-surface-variant'}`} onClick={() => setFilter(f.value)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {list.length === 0 ? (
            <div className="neu-inset p-10 text-center text-on-surface-variant">No schemes match your search. Try a different keyword or filter.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {list.map((s) => <SchemeCard key={s.id} s={s} />)}
            </div>
          )}

          <div className="neu-raised p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-5">
              <div className="neu-inset w-12 h-12 flex items-center justify-center text-primary shrink-0"><Icon name="assignment_turned_in" className="text-2xl" /></div>
              <div>
                <h3 className="text-title-md text-primary">Find out what you qualify for</h3>
                <p className="text-body-sm text-on-surface-variant">Answer four quick questions and get a personalised list with a document checklist.</p>
              </div>
            </div>
            <Link to="/eligibility-check" className="neu-btn shrink-0">Check Eligibility <Icon name="arrow_forward" className="text-lg" /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
