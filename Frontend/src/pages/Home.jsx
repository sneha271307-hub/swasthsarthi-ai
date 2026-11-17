import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon, SectionHeader, Eyebrow, CheckList, Select, SchemeCard, Tag } from '../components/ui'
import {
  SCHEMES, SCHEME_FILTERS, STATES, INCOME_OPTIONS, RATION_OPTIONS, CATEGORY_OPTIONS, matchSchemes,
} from '../data/schemes'

const DEMOS = [
  {
    chip: 'Persistent Cough > 2 Weeks',
    priority: 'National TB Elimination Protocol (NTEP)',
    text: 'A cough persisting longer than 14 days requires free sputum microscopy or CBNAAT testing under Nikshay at your nearest Primary Health Centre (PHC).',
    note: 'Free nutrition grant eligible: ₹500/month under Nikshay Poshan Yojana',
  },
  {
    chip: 'High Fever + Chills',
    priority: 'Fever & Vector-borne Illness Screening',
    text: 'Fever with chills lasting more than 2–3 days should be tested for malaria and dengue. Free rapid tests are available at government PHCs. Seek urgent care for confusion, bleeding or persistent vomiting.',
    note: 'Free diagnostic tests at government health facilities',
  },
  {
    chip: 'Childhood Vaccination Schedule',
    priority: 'Universal Immunisation Programme (UIP)',
    text: 'Children receive free vaccines against 12 vaccine-preventable diseases at Anganwadi centres and government facilities. Carry the Mother and Child Protection (MCP) card to every visit.',
    note: 'Missed a dose? Ask your ANM about catch-up vaccination drives',
  },
  {
    chip: 'Maternal Nutrition Deficit',
    priority: 'Poshan Abhiyaan & Maternal Health',
    text: 'Pregnant women with low weight or anaemia should receive free iron-folic acid supplements and nutrition counselling at the nearest Anganwadi or ANM, and attend monthly antenatal check-ups.',
    note: 'Free specialist antenatal care on the 9th of every month (PMSMA)',
  },
]

const TRUST = [
  ['clinical_notes', 'Simple Guidance', 'Plain-language clinical breakdowns calibrated by certified medical practitioners and ICMR guidelines.'],
  ['shield_person', 'Privacy Focused', 'Zero commercial data monetization. Fully compliant with Digital Personal Data Protection (DPDP) standards.'],
  ['public', 'Built for India', 'Engineered for low-bandwidth 2G/3G networks, multi-dialect voice audio, and over 1,200+ central & state schemes.'],
  ['record_voice_over', 'Accessible Information', 'Instant audio voice synthesis, clear readable typography, and one-tap WhatsApp summaries for family elders.'],
]

const STEPS = [
  ['01', 'Tell Us What You Need', 'Speak in your local dialect, type your symptoms, or select your family\'s economic background. No complex medical jargon is required.', 'mic', 'Voice or text supported'],
  ['02', 'Get Personalized Guidance', 'Our engine cross-checks clinical severity models alongside 1,200+ welfare databases to formulate verified recommendations.', 'rule', 'Real-time scheme match'],
  ['03', 'Take The Right Next Step', 'Receive a downloadable checklist, directions to the nearest empanelled hospital, and official enrollment links.', 'download', 'Verified action slip'],
]

const STATS = [
  ['1,200+', 'Catalogued Schemes', 'Central & State Level'],
  ['28 / 8', 'States & UTs', 'Pan-India Coverage'],
  ['14', 'Indian Languages', 'Voice & Text Enabled'],
  ['₹0', 'Free Forever', 'No Citizen Fees'],
]

function Hero() {
  return (
    <section className="w-full px-6 lg:px-12 py-16 lg:py-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-start">
        <div className="lg:col-span-6 flex flex-col gap-8">
          <div className="neu-raised-sm rounded-full inline-flex flex-wrap items-center gap-2 self-start px-3.5 py-1.5 text-primary text-label-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            <span>Ayushman Bharat Digital Mission (ABDM) Compatible</span>
            <span className="text-outline">/</span>
            <span className="text-on-surface-variant">ICMR-Aligned Clinical Triage</span>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-[38px] leading-[46px] sm:text-headline-xl text-primary tracking-tight">
              Your Health Journey, Made Simpler.
            </h1>
            <p className="text-body-lg text-on-surface-variant">
              Understand your health, discover verified clinical pathways, and find central and state healthcare
              schemes you qualify for — all in one accessible, multilingual public resource.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link to="/symptom-checker" className="neu-btn">
              <span>Get Started</span><Icon name="arrow_forward" className="text-lg" />
            </Link>
            <Link to="/#schemes-directory" className="neu-btn !text-on-surface-variant">
              <Icon name="policy" className="text-lg text-primary" />
              <span>Explore Health Schemes (योजनाएं)</span>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-on-surface-variant text-caption">
            <span className="flex items-center gap-1.5 text-primary"><Icon name="verified_user" className="text-[15px]" /> 100% Free Public Tool</span>
            <span className="flex items-center gap-1.5"><Icon name="no_encryption" className="text-[15px]" /> No Aadhaar Required to Search</span>
            <span className="flex items-center gap-1.5"><Icon name="translate" className="text-[15px]" /> 14 Indian Languages Supported</span>
          </div>
        </div>

        <div className="lg:col-span-6 min-w-0">
          <div className="neu-raised p-8 lg:p-10 flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-label-md text-primary">Assistance Session #DL-4029</span>
                <span className="neu-inset rounded-full inline-flex items-center px-2 py-0.5 text-primary text-caption">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1 animate-ping" /> Live Triage
                </span>
              </div>
              <div className="neu-raised-sm rounded-lg flex items-center gap-1.5 px-2.5 py-1 text-on-surface-variant text-caption">
                <Icon name="volume_up" className="text-[16px] text-primary" />
                <span>सुनिए हिंदी में (2 min)</span>
              </div>
            </div>

            <div className="neu-inset p-5 flex flex-col gap-1.5">
              <span className="text-caption uppercase tracking-wider text-outline">Citizen Query (Voice Transcribed)</span>
              <p className="text-body-sm text-on-surface italic">
                “My 62-year-old mother has severe knee stiffness and fasting blood sugar of 184 mg/dL. Which hospital
                should we visit, and can we claim tests under PM-JAY?”
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="neu-raised-sm p-5 flex items-start gap-4">
                <Icon name="stethoscope" className="text-primary text-xl shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-label-sm text-on-surface">Triage Assessment:</span>
                    <span className="neu-inset rounded px-2 py-0.5 text-caption text-on-surface">Standard OPD Consultation (Non-Emergency)</span>
                  </div>
                  <p className="text-caption text-on-surface-variant">
                    Elevated glycemic index without acute ketoacidosis indicators. Geriatric physiotherapy recommended
                    alongside HbA1c screening.
                  </p>
                </div>
              </div>

              <div className="neu-inset p-5 flex items-start gap-4">
                <Icon name="account_balance_wallet" className="text-primary text-xl shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-label-sm text-primary break-words">Scheme Match: Ayushman Bharat (PM-JAY)</span>
                    <span className="neu-raised-sm rounded px-2 py-0.5 text-caption text-primary">Golden Card Eligible</span>
                  </div>
                  <p className="text-caption text-on-surface-variant">
                    Covers secondary & tertiary hospitalization diagnostics up to ₹5,00,000/yr per household across
                    27,000+ empanelled institutions.
                  </p>
                </div>
              </div>

              <div className="neu-raised-sm p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Icon name="local_hospital" className="text-primary text-xl shrink-0" />
                  <div className="flex flex-col truncate">
                    <span className="text-label-md text-on-surface truncate">Safdarjung Hospital, New Delhi</span>
                    <span className="text-caption text-on-surface-variant truncate">Geriatric Medicine & Endocrinology OPD • Gate 4</span>
                  </div>
                </div>
                <span className="neu-inset rounded px-2.5 py-1 text-primary text-caption shrink-0">3.8 km away</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-caption text-outline">Reference: ICMR Clinical Guidelines 2024</span>
              <button className="neu-btn neu-btn-sm no-print" onClick={() => window.print()}>
                <Icon name="print" className="text-[16px]" />
                <span>Save Clinical Triage Slip</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="w-full py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {TRUST.map(([icon, title, text]) => (
          <div key={title} className="neu-raised p-8 flex flex-col gap-2.5">
            <div className="neu-inset w-10 h-10 flex items-center justify-center text-primary"><Icon name={icon} /></div>
            <h3 className="text-label-md text-on-surface">{title}</h3>
            <p className="text-body-sm text-on-surface-variant">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function FeatureTag({ n, label }) {
  return (
    <div className="neu-inset rounded-lg inline-flex items-center gap-1 px-2.5 py-1 text-primary text-label-sm self-start">
      <span>Feature {n}</span> • <span>{label}</span>
    </div>
  )
}

function SymptomDemo() {
  const [i, setI] = useState(0)
  const d = DEMOS[i]
  return (
    <div className="neu-raised p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-5 flex flex-col gap-5">
        <FeatureTag n="01" label="Clinical Direction" />
        <h3 className="text-headline-md text-primary">Health Guidance Without Confusion</h3>
        <p className="text-body-md text-on-surface-variant">
          Avoid panicked online searches. Describe your discomfort to receive calibrated next-step recommendations
          based on evidence-based triage protocols.
        </p>
        <CheckList items={[
          'Flags critical "red-flag" indicators versus safe home care',
          'Recommends appropriate department (e.g. ENT, Cardiology, Pediatrics)',
          'Prevents unnecessary and expensive casualty visits',
        ]} />
        <Link to="/symptom-checker" className="neu-btn neu-btn-sm self-start mt-2">Try the Symptom Checker <Icon name="arrow_forward" className="text-[16px]" /></Link>
      </div>
      <div className="lg:col-span-7 neu-inset p-8 flex flex-col gap-5">
        <span className="text-label-sm text-on-surface-variant">Interactive Symptom Filter Demonstration:</span>
        <div className="flex flex-wrap gap-4">
          {DEMOS.map((x, idx) => (
            <button key={x.chip} className={`neu-chip ${idx === i ? 'is-active' : ''}`} onClick={() => setI(idx)}>
              <span>{x.chip}</span>
              {idx === i && <Icon name="done" className="text-[14px]" />}
            </button>
          ))}
        </div>
        <div className="neu-raised p-5 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="neu-inset rounded px-2.5 py-0.5 text-label-sm text-primary">Priority: {d.priority}</span>
            <span className="text-caption text-outline">Protocol Rev. 2024</span>
          </div>
          <p className="text-body-sm text-on-surface">{d.text}</p>
          <div className="neu-inset rounded-lg p-3 flex flex-wrap items-center justify-between gap-2 text-on-surface-variant text-caption">
            <span>{d.note}</span>
            <Link to="/citizen-support" className="text-primary text-label-sm hover:underline">Locate PHC →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function SchemeSimulator() {
  const [p, setP] = useState({ state: 'Uttar Pradesh', income: 'low', ration: 'AAY', category: 'senior' })
  const set = (k) => (v) => setP((o) => ({ ...o, [k]: v }))
  const matches = matchSchemes(p)
  const names = matches.slice(0, 3).map((s) => s.short).join(' + ')
  return (
    <div className="neu-raised p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-7 neu-inset p-8 flex flex-col gap-4 order-2 lg:order-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-label-sm text-primary">Real-time Scheme Eligibility Simulator</span>
          <span className="neu-raised-sm rounded px-2 py-0.5 text-primary text-caption">{SCHEMES.length} Sample Schemes Active</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select label="State / Union Territory" value={p.state} onChange={set('state')} options={STATES} />
          <Select label="Annual Household Income" value={p.income} onChange={set('income')} options={INCOME_OPTIONS} />
          <Select label="Ration Card Type" value={p.ration} onChange={set('ration')} options={RATION_OPTIONS} />
          <Select label="Beneficiary Category" value={p.category} onChange={set('category')} options={CATEGORY_OPTIONS} />
        </div>
        <div className="neu-raised p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="neu-inset w-9 h-9 flex items-center justify-center text-primary shrink-0">
              <Icon name="assignment_turned_in" className="text-[20px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-label-sm text-on-surface">
                You qualify for {matches.length} major benefit program{matches.length === 1 ? '' : 's'}
              </span>
              <span className="text-caption text-on-surface-variant">Includes {names || 'no matches yet'}</span>
            </div>
          </div>
          <Link to="/eligibility-check" className="neu-btn neu-btn-sm">View List</Link>
        </div>
      </div>
      <div className="lg:col-span-5 flex flex-col gap-4 order-1 lg:order-2">
        <FeatureTag n="02" label="Entitlement Discovery" />
        <h3 className="text-headline-md text-primary">Find Healthcare Schemes Built For You</h3>
        <p className="text-body-md text-on-surface-variant">
          Billions of rupees in public health welfare go unclaimed every year because citizens are unaware of their
          rights. We map your family demographics against every applicable central and state health program.
        </p>
        <CheckList items={[
          '100% verified government criteria — no brokers or third parties',
          'Step-by-step documentation checklists (Ration card, Aadhaar, Caste)',
          'Direct integration with official Jan Seva Kendra / CSC pipelines',
        ]} />
      </div>
    </div>
  )
}

function ReportExplainer() {
  return (
    <div className="neu-raised p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-5 flex flex-col gap-5">
        <FeatureTag n="03" label="Language & Report Intelligence" />
        <h3 className="text-headline-md text-primary">Clear Explanations for Complex Medical Reports</h3>
        <p className="text-body-md text-on-surface-variant">
          Diagnostic lab slips can be intimidating. SwasthSarthi translates clinical numbers (like HbA1c, Platelets,
          TSH) into clear contextual guidance in your mother tongue.
        </p>
        <CheckList items={[
          'Bilingual previews in Hindi, Bengali, Tamil, Telugu, and 10 others',
          'Explains what questions to ask your physician during your next visit',
          'Preserves patient dignity with compassionate, respectful framing',
        ]} />
      </div>
      <div className="lg:col-span-7 neu-inset p-8 flex flex-col gap-5">
        <div className="self-end max-w-md neu-raised-sm !rounded-tr-none p-3.5 text-on-surface text-body-sm">
          <span className="text-caption text-primary block mb-1">Citizen (English)</span>
          “My blood report says HbA1c is 8.4%. Does this mean I have severe diabetes? What should I do?”
        </div>
        <div className="self-start max-w-lg neu-raised !rounded-tl-none p-4 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
            <span className="text-label-sm text-primary flex items-center gap-1.5">
              <Icon name="verified" className="text-[18px]" /> SwasthSarthi Clinical Explainer
            </span>
            <span className="text-caption text-secondary">Audio Guide Available</span>
          </div>
          <p className="text-body-sm text-on-surface">
            <strong>English:</strong> An HbA1c of 8.4% indicates your average blood sugar over the last 3 months is
            higher than standard targets (under 7%). It is manageable with dietary modification and
            physician-directed medication.
          </p>
          <div className="neu-inset rounded-lg p-3 text-on-surface-variant text-body-sm">
            <strong>हिन्दी (Hindi):</strong> आपका HbA1c स्तर 8.4% यह दर्शाता है कि पिछले 3 महीनों में आपका औसत शुगर स्तर
            सामान्य (7% से कम) से अधिक रहा है। घबराएं नहीं; सरकारी प्राथमिक स्वास्थ्य केंद्र (PHC) में मुफ्त परामर्श लें।
          </div>
        </div>
      </div>
    </div>
  )
}

function Pillars() {
  return (
    <section className="w-full section-pad">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        <SectionHeader eyebrow="Core Public Infrastructure" icon="health_and_safety" title="Three Pillars of Citizen Healthcare Navigation">
          We bridge the chasm between medical anxiety and verified public relief through targeted guidance, scheme
          discovery, and intuitive report translation.
        </SectionHeader>
        <SymptomDemo />
        <SchemeSimulator />
        <ReportExplainer />
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="w-full section-pad">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        <SectionHeader eyebrow="Clear Protocol" title="How SwasthSarthi Works" className="max-w-2xl">
          Three deliberate steps designed to convert clinical uncertainty into actionable civic empowerment.
        </SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map(([n, title, text, icon, foot]) => (
            <div key={n} className="neu-raised p-8 flex flex-col gap-5">
              <span className="text-headline-xl text-primary opacity-40">{n}</span>
              <h3 className="text-title-md text-primary">{title}</h3>
              <p className="text-body-sm text-on-surface-variant">{text}</p>
              <div className="mt-auto pt-4 flex items-center gap-2 text-primary text-label-sm">
                <Icon name={icon} className="text-[18px]" /> {foot}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SchemesDirectory() {
  const [filter, setFilter] = useState('all')
  const list = SCHEMES.filter((s) => filter === 'all' || s.category === filter).slice(0, 4)
  return (
    <section className="w-full section-pad" id="schemes-directory">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <SectionHeader eyebrow="Government Schemes Directory" title="Verified Healthcare Entitlements" className="max-w-xl">
            Accurate criteria sourced directly from National Health Authority (NHA) & State Portals.
          </SectionHeader>
          <div className="flex flex-wrap gap-4">
            {SCHEME_FILTERS.map((f) => (
              <button key={f.value} className={`neu-btn neu-btn-sm ${filter === f.value ? 'is-active' : '!text-on-surface-variant'}`} onClick={() => setFilter(f.value)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((s) => <SchemeCard key={s.id} s={s} />)}
        </div>
        <Link to="/scheme-discovery" className="neu-btn self-center">
          Browse All Schemes <Icon name="arrow_forward" className="text-lg" />
        </Link>
      </div>
    </section>
  )
}

function Mission() {
  return (
    <section className="w-full section-pad">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
        <div className="lg:col-span-7 flex flex-col gap-8">
          <Eyebrow>Public Health Mission</Eyebrow>
          <h2 className="text-headline-md lg:text-headline-lg text-primary tracking-tight">Solving the Healthcare Navigation Crisis in India</h2>
          <div className="space-y-4 text-on-surface-variant text-body-md">
            <p>In India, quality medical infrastructure exists, but families frequently experience devastating out-of-pocket expenditure because health systems are fragmented across complex documentation, obscure vernaculars, and information silos.</p>
            <p>When a family member falls ill, panic sets in. Citizens often turn to unverified online searches or predatory middlemen simply to understand what hospital accepts their ration card or why a lab number looks abnormal.</p>
            <p className="text-on-surface">SwasthSarthi AI operates as an institutional public utility. We synthesize clinical protocols, verified welfare data, and regional language models into a calm, empathetic interface that restores agency and dignity to every patient.</p>
          </div>
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-5">
          {STATS.map(([big, label, sub]) => (
            <div key={label} className="neu-raised p-8 flex flex-col gap-1">
              <span className="text-headline-lg text-primary">{big}</span>
              <span className="text-label-sm text-on-surface">{label}</span>
              <span className="text-caption text-outline">{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const go = (e) => {
    e.preventDefault()
    nav(q.trim() ? `/symptom-checker?q=${encodeURIComponent(q.trim())}` : '/symptom-checker')
  }
  return (
    <section className="w-full px-6 lg:px-12 py-20 lg:py-28">
      <div className="max-w-4xl mx-auto neu-raised p-8 lg:p-12 flex flex-col items-center text-center gap-8">
        <div className="neu-inset rounded-full w-12 h-12 flex items-center justify-center text-primary"><Icon name="medical_services" className="text-2xl" /></div>
        <div className="flex flex-col gap-4">
          <h2 className="text-headline-md lg:text-headline-lg text-primary tracking-tight">Better health decisions start with the right information.</h2>
          <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">
            Join over 450,000 citizens across India who use SwasthSarthi to understand their healthcare rights, triage medical concerns, and find government relief.
          </p>
        </div>
        <form onSubmit={go} className="w-full max-w-2xl flex flex-col sm:flex-row items-stretch gap-3 pt-2">
          <div className="relative flex-1">
            <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-xl" />
            <input value={q} onChange={(e) => setQ(e.target.value)} className="neu-input !pl-11 !py-3.5" placeholder="Enter symptom, health scheme name, or district..." type="text" />
          </div>
          <button type="submit" className="neu-btn shrink-0">
            <span>Start Your Journey</span><Icon name="arrow_forward" className="text-lg" />
          </button>
        </form>
        <div className="flex items-center gap-2 pt-2 text-on-surface-variant text-caption">
          <Icon name="phone_in_talk" className="text-primary text-[18px]" />
          <span>Need emergency telephone assistance? Call National Health Helpline <strong>1075</strong> or Ambulance <strong>108</strong> (24x7 Free).</span>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Pillars />
      <HowItWorks />
      <SchemesDirectory />
      <Mission />
      <FinalCta />
    </>
  )
}
