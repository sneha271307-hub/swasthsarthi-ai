import { useState } from 'react'
import { Icon, PageHero, Field } from '../components/ui'

const HELPLINES = [
  ['108', 'National Ambulance', 'Free, 24x7 emergency medical transport', 'emergency'],
  ['1075', 'National Health Helpline', 'Health guidance and scheme information', 'support_agent'],
  ['14555', 'Ayushman Bharat (PM-JAY)', 'Eligibility, Golden Card and hospital queries', 'badge'],
  ['14567', 'Elderline', 'Support and guidance for senior citizens', 'elderly'],
  ['14416', 'Tele-MANAS', 'Free, 24x7 mental health support', 'psychology'],
  ['112', 'Emergency Response', 'Police, fire and medical emergencies', 'sos'],
]

const FAQ = [
  ['Is SwasthSarthi AI really free?', 'Yes. It is a free public tool. There are no citizen fees and we never ask for payment to check a scheme.'],
  ['Do I need Aadhaar to search?', 'No. You can use symptom guidance and scheme search without Aadhaar. Aadhaar is only needed when you apply for a scheme on its official portal.'],
  ['Can this replace a doctor?', 'No. It provides triage guidance and information. Always consult a qualified doctor for diagnosis and treatment.'],
  ['How do I find an empanelled hospital?', 'Use the PM-JAY hospital locator on the official portal, or call 14555. Carry your Aadhaar and ration card.'],
]

export default function CitizenSupport() {
  const [form, setForm] = useState({ name: '', phone: '', topic: 'Scheme enquiry', message: '' })
  const [ref, setRef] = useState(null)
  const [open, setOpen] = useState(0)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    setRef(`SS-${Date.now().toString().slice(-8)}`)
    setForm({ name: '', phone: '', topic: 'Scheme enquiry', message: '' })
  }

  return (
    <>
      <PageHero eyebrow="Grievance Redressal" icon="support_agent" title="Citizen Support">
        Help is a call away. Reach official helplines, raise a grievance, or read answers to common questions.
      </PageHero>

      <section className="px-6 lg:px-12 pb-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {HELPLINES.map(([num, title, desc, icon]) => (
            <a key={num} href={`tel:${num}`} className="neu-raised p-8 flex items-start gap-4 hover:text-primary transition-colors">
              <div className="neu-inset w-12 h-12 flex items-center justify-center text-primary shrink-0"><Icon name={icon} className="text-2xl" /></div>
              <div className="flex flex-col">
                <span className="text-headline-sm text-primary">{num}</span>
                <span className="text-label-md text-on-surface">{title}</span>
                <span className="text-caption text-on-surface-variant">{desc}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={submit} className="neu-raised p-8 lg:p-12 flex flex-col gap-5">
            <h2 className="text-headline-md text-primary">Raise a grievance</h2>
            {ref && (
              <div className="neu-inset p-5 text-primary text-body-sm flex gap-2">
                <Icon name="check_circle" /> Thank you. Your reference number is <strong>{ref}</strong>. Please note it down.
              </div>
            )}
            <Field label="Full name"><input required className="neu-input" value={form.name} onChange={set('name')} /></Field>
            <Field label="Mobile number"><input required pattern="[0-9]{10}" title="10-digit mobile number" className="neu-input" value={form.phone} onChange={set('phone')} inputMode="numeric" /></Field>
            <Field label="Topic">
              <select className="neu-input" value={form.topic} onChange={set('topic')}>
                {['Scheme enquiry', 'Hospital / treatment refusal', 'Golden Card issue', 'Incorrect information', 'Other'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Describe your issue"><textarea required rows={4} className="neu-input resize-none" value={form.message} onChange={set('message')} /></Field>
            <button type="submit" className="neu-btn self-start">Submit <Icon name="send" className="text-lg" /></button>
            <p className="text-caption text-outline">Demo form: submissions are not sent anywhere until you connect a backend.</p>
          </form>

          <div className="flex flex-col gap-5">
            <h2 className="text-headline-md text-primary">Frequently asked questions</h2>
            {FAQ.map(([q, a], i) => (
              <div key={q} className={open === i ? 'neu-inset' : 'neu-raised-sm'}>
                <button className="w-full flex items-center justify-between gap-3 text-left p-4 text-label-md text-on-surface" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {q}<Icon name={open === i ? 'remove' : 'add'} className="text-primary" />
                </button>
                {open === i && <p className="px-4 pb-4 text-body-sm text-on-surface-variant">{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
