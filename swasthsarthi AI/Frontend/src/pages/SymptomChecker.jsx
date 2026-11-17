import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Icon, PageHero, Select } from '../components/ui'

// red: true = emergency red-flag symptom
const SYMPTOMS = [
  { id: 'chest', label: 'Chest pain / pressure', red: true, dept: 'Cardiology', words: ['chest'] },
  { id: 'breath', label: 'Severe breathlessness', red: true, dept: 'Emergency / Pulmonology', words: ['breath', 'saans'] },
  { id: 'faint', label: 'Fainting / confusion', red: true, dept: 'Emergency Medicine', words: ['faint', 'confus', 'unconscious'] },
  { id: 'stroke', label: 'Face drooping / slurred speech / weakness on one side', red: true, dept: 'Neurology', words: ['stroke', 'slurred', 'drooping'] },
  { id: 'bleed', label: 'Heavy bleeding', red: true, dept: 'Emergency Medicine', words: ['bleed'] },
  { id: 'seizure', label: 'Seizure / fits', red: true, dept: 'Neurology', words: ['seizure', 'fits'] },
  { id: 'cough', label: 'Cough', dept: 'General Medicine / Pulmonology', words: ['cough', 'khansi'] },
  { id: 'fever', label: 'Fever / chills', dept: 'General Medicine', words: ['fever', 'bukhar', 'chills'] },
  { id: 'headache', label: 'Headache', dept: 'General Medicine / Neurology', words: ['headache', 'head'] },
  { id: 'stomach', label: 'Stomach pain / vomiting / loose motions', dept: 'Gastroenterology', words: ['stomach', 'vomit', 'loose', 'diarr'] },
  { id: 'joint', label: 'Joint / knee pain or stiffness', dept: 'Orthopaedics / Geriatric Medicine', words: ['knee', 'joint', 'stiff'] },
  { id: 'sugar', label: 'High blood sugar / excess thirst', dept: 'Endocrinology / General Medicine', words: ['sugar', 'diabet', 'thirst', 'hba1c'] },
  { id: 'throat', label: 'Sore throat / ear pain', dept: 'ENT', words: ['throat', 'ear', 'nose'] },
  { id: 'rash', label: 'Skin rash / itching', dept: 'Dermatology', words: ['rash', 'itch', 'skin'] },
]

const AGE = [
  { value: 'infant', label: 'Infant (under 1 year)' },
  { value: 'child', label: 'Child (1–12 years)' },
  { value: 'adult', label: 'Adult (13–59 years)' },
  { value: 'senior', label: 'Senior (60+ years)' },
]
const DURATION = [
  { value: 'lt2', label: 'Less than 2 days' },
  { value: '2to7', label: '2 to 7 days' },
  { value: '7to14', label: '1 to 2 weeks' },
  { value: 'gt14', label: 'More than 2 weeks' },
]
const SEVERITY = [
  { value: '1', label: 'Mild — can do daily activities' },
  { value: '2', label: 'Moderate — affecting daily activities' },
  { value: '3', label: 'Severe — very difficult to manage' },
]

function assess({ picked, age, duration, severity }) {
  const chosen = SYMPTOMS.filter((s) => picked.includes(s.id))
  const depts = [...new Set(chosen.map((s) => s.dept))]
  const hasRed = chosen.some((s) => s.red)
  const notes = []
  if (picked.includes('cough') && duration === 'gt14') notes.push('A cough lasting over 2 weeks should be tested for TB — free sputum/CBNAAT testing is available at your nearest PHC under Nikshay.')
  if (picked.includes('fever') && ['2to7', '7to14', 'gt14'].includes(duration)) notes.push('Fever for more than 2 days: ask for free malaria and dengue rapid tests at a government facility.')
  if (picked.includes('sugar')) notes.push('Ask for fasting blood sugar and HbA1c tests. Free screening is available at PHCs / Ayushman Arogya Mandirs.')
  if (age === 'infant' && picked.includes('fever')) notes.push('Fever in a baby under 1 year needs a doctor the same day.')

  if (hasRed || (age === 'infant' && picked.includes('fever')) || severity === '3') {
    return {
      level: 'emergency', title: 'Seek emergency care now', icon: 'emergency',
      body: 'Your answers include warning signs. Call 108 (free ambulance) or go to the nearest hospital casualty ward immediately. Do not wait or travel alone if you feel faint.',
      depts, notes,
    }
  }
  if (severity === '2' || duration === 'gt14' || duration === '7to14' || age === 'senior') {
    return {
      level: 'opd', title: 'Visit a doctor within 24–48 hours', icon: 'stethoscope',
      body: 'A standard OPD consultation at your nearest PHC, CHC or district hospital is recommended. This does not look like an emergency right now, but it should not be ignored.',
      depts, notes,
    }
  }
  return {
    level: 'home', title: 'Home care and watchful waiting', icon: 'home_health',
    body: 'Rest, drink plenty of fluids and eat light, nutritious food. If symptoms worsen, last beyond 2–3 days, or new symptoms appear, visit your nearest PHC.',
    depts, notes,
  }
}

const LEVEL_STYLE = {
  emergency: 'text-error',
  opd: 'text-primary',
  home: 'text-on-surface',
}

export default function SymptomChecker() {
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const initial = useMemo(() => {
    const t = q.toLowerCase()
    return t ? SYMPTOMS.filter((s) => s.words.some((w) => t.includes(w))).map((s) => s.id) : []
  }, [q])

  const [text, setText] = useState(q)
  const [picked, setPicked] = useState(initial)
  const [age, setAge] = useState('adult')
  const [duration, setDuration] = useState('lt2')
  const [severity, setSeverity] = useState('1')
  const [result, setResult] = useState(null)

  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const autoDetect = () => {
    const t = text.toLowerCase()
    const found = SYMPTOMS.filter((s) => s.words.some((w) => t.includes(w))).map((s) => s.id)
    setPicked((p) => [...new Set([...p, ...found])])
  }
  const run = (e) => { e.preventDefault(); setResult(assess({ picked, age, duration, severity })); setTimeout(() => document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' }), 50) }
  const reset = () => { setPicked([]); setText(''); setResult(null) }

  return (
    <>
      <PageHero eyebrow="Clinical Triage Engine" icon="stethoscope" title="Symptom Checker">
        Tell us what you are feeling and get a calm, plain-language next step. This is guidance, not a diagnosis.
      </PageHero>

      <section className="px-6 lg:px-12 pb-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form onSubmit={run} className="lg:col-span-7 neu-raised p-8 lg:p-12 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-on-surface" htmlFor="desc">Describe it in your own words (optional)</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input id="desc" className="neu-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. knee stiffness and high sugar since a week" />
                <button type="button" className="neu-btn neu-btn-sm shrink-0" onClick={autoDetect}><Icon name="auto_awesome" className="text-[16px]" /> Detect</button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-label-md text-on-surface">Select all that apply</span>
              <div className="flex flex-wrap gap-4">
                {SYMPTOMS.map((s) => (
                  <button type="button" key={s.id} onClick={() => toggle(s.id)} className={`neu-chip ${picked.includes(s.id) ? 'is-active' : ''}`}>
                    {s.red && <Icon name="warning" className="text-[14px] text-error" />}
                    <span>{s.label}</span>
                    {picked.includes(s.id) && <Icon name="done" className="text-[14px]" />}
                  </button>
                ))}
              </div>
              <span className="text-caption text-outline flex items-center gap-1"><Icon name="warning" className="text-[14px] text-error" /> marks emergency warning signs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Select label="Age group" value={age} onChange={setAge} options={AGE} />
              <Select label="Since when?" value={duration} onChange={setDuration} options={DURATION} />
              <Select label="How severe?" value={severity} onChange={setSeverity} options={SEVERITY} />
            </div>

            <div className="flex flex-wrap gap-4">
              <button type="submit" disabled={picked.length === 0} className="neu-btn disabled:opacity-50 disabled:cursor-not-allowed">
                Get Guidance <Icon name="arrow_forward" className="text-lg" />
              </button>
              <button type="button" onClick={reset} className="neu-btn !text-on-surface-variant">Reset</button>
            </div>
          </form>

          <aside className="lg:col-span-5 flex flex-col gap-8">
            <div id="result" className="neu-raised p-8 lg:p-12 flex flex-col gap-4 min-h-[16rem]">
              {!result ? (
                <div className="flex flex-col items-center justify-center text-center gap-3 flex-1 text-on-surface-variant">
                  <div className="neu-inset rounded-full w-14 h-14 flex items-center justify-center text-primary"><Icon name="clinical_notes" className="text-3xl" /></div>
                  <p className="text-body-sm">Select your symptoms and tap <strong>Get Guidance</strong>. Your result will appear here.</p>
                </div>
              ) : (
                <>
                  <div className={`flex items-center gap-3 ${LEVEL_STYLE[result.level]}`}>
                    <div className="neu-inset w-11 h-11 flex items-center justify-center"><Icon name={result.icon} className="text-2xl" /></div>
                    <h2 className="text-headline-sm">{result.title}</h2>
                  </div>
                  <p className="text-body-sm text-on-surface">{result.body}</p>
                  {result.level === 'emergency' && (
                    <a href="tel:108" className="neu-btn !text-error self-start"><Icon name="call" className="text-lg" /> Call 108 now</a>
                  )}
                  {result.depts.length > 0 && (
                    <div className="neu-inset p-5 flex flex-col gap-1.5">
                      <span className="text-label-sm text-on-surface-variant">Suggested department</span>
                      <ul className="text-body-sm text-on-surface list-disc pl-5">{result.depts.map((d) => <li key={d}>{d}</li>)}</ul>
                    </div>
                  )}
                  {result.notes.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {result.notes.map((n) => (
                        <p key={n} className="text-body-sm text-on-surface-variant flex gap-2"><Icon name="info" className="text-primary text-[18px] shrink-0" />{n}</p>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3 pt-2 no-print">
                    <button className="neu-btn neu-btn-sm" onClick={() => window.print()}><Icon name="print" className="text-[16px]" /> Save Triage Slip</button>
                    <Link to="/eligibility-check" className="neu-btn neu-btn-sm">Check Free Schemes</Link>
                  </div>
                </>
              )}
            </div>
            <div className="neu-inset p-5 flex gap-3 text-on-surface-variant text-caption">
              <Icon name="gpp_maybe" className="text-primary shrink-0" />
              <p>This tool uses simple rule-based guidance for demonstration and does not replace a doctor. In an emergency call <strong>108</strong> or <strong>1075</strong>.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
