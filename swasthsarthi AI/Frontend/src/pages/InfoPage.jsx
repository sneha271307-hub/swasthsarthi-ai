import { Link } from 'react-router-dom'
import { Icon, PageHero } from '../components/ui'

const PAGES = {
  'clinical-ethics': {
    eyebrow: 'Governance & Ethics', icon: 'fact_check', title: 'Clinical Accuracy & Ethics',
    intro: 'How SwasthSarthi AI keeps its guidance safe, honest and respectful.',
    sections: [
      ['Guidance, not diagnosis', 'SwasthSarthi AI offers triage guidance and information. It never replaces a qualified doctor, and it does not prescribe medicines.'],
      ['Protocol alignment', 'Triage rules are designed to follow publicly available national programme guidance (such as ICMR and MoHFW protocols) and are reviewed by medical practitioners.'],
      ['Err on the side of safety', 'When symptoms include red-flag signs, the tool always recommends emergency care first.'],
      ['Dignity and respect', 'Language is compassionate, plain and free of judgement, whatever a person\'s background, gender or income.'],
      ['Terms of guidance', 'By using this service you agree that information is general in nature. In an emergency call 108 or 1075 immediately.'],
    ],
  },
  'language-accessibility': {
    eyebrow: 'Governance & Ethics', icon: 'translate', title: 'Language Accessibility',
    intro: 'Healthcare information should be understood by everyone, in their own language.',
    sections: [
      ['Multilingual by design', 'The platform is built to support 14 Indian languages in text and voice, including Hindi, Bengali, Tamil and Telugu.'],
      ['Voice first', 'Audio explanations help people with low literacy, low vision, or who simply prefer listening.'],
      ['Readable typography', 'Large, clear type and high-contrast text keep information readable for elders and on small phones.'],
      ['Low-bandwidth friendly', 'Pages are kept light so they work on slow 2G/3G connections.'],
    ],
  },
  'privacy-compliance': {
    eyebrow: 'Governance & Ethics', icon: 'security', title: 'Data Privacy & HIPAA/DISHA',
    intro: 'Your health information is personal. Here is how it is protected.',
    sections: [
      ['No monetisation', 'We do not sell or share personal data with advertisers or commercial third parties.'],
      ['Minimal collection', 'You can search symptoms and schemes without logging in or sharing Aadhaar.'],
      ['Consent first', 'Any record linking (for example with ABHA) happens only with your explicit consent, which you can withdraw.'],
      ['Aligned with Indian law', 'The platform aims to follow the Digital Personal Data Protection (DPDP) Act principles and DISHA-style health data safeguards.'],
      ['Demo note', 'This front-end prototype stores nothing on a server. Connect a backend only after a proper privacy review.'],
    ],
  },
  'tele-manas': {
    eyebrow: 'Governance & Ethics', icon: 'psychology', title: 'Tele-MANAS Mental Health',
    intro: 'You are not alone. Free, confidential mental health support is available any time.',
    sections: [
      ['Call 14416', 'Tele-MANAS is the national tele-mental-health service. It is free and available 24x7 in multiple languages.'],
      ['When to reach out', 'Persistent sadness, anxiety, sleep problems, stress, or thoughts of self-harm — all are valid reasons to call.'],
      ['In immediate danger', 'If you or someone else is in immediate danger, call 112 or 108 right away.'],
      ['Talk to someone you trust', 'Sharing how you feel with a family member, friend or health worker can also help.'],
    ],
    cta: ['tel:14416', 'Call Tele-MANAS 14416'],
  },
}

export default function InfoPage({ page }) {
  const d = PAGES[page]
  return (
    <>
      <PageHero eyebrow={d.eyebrow} icon={d.icon} title={d.title}>{d.intro}</PageHero>
      <section className="px-6 lg:px-12 pb-28">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {d.sections.map(([t, body]) => (
            <article key={t} className="neu-raised p-8 lg:p-12 flex flex-col gap-2">
              <h2 className="text-title-md text-primary">{t}</h2>
              <p className="text-body-md text-on-surface-variant">{body}</p>
            </article>
          ))}
          <div className="flex flex-wrap gap-4 pt-2">
            {d.cta && <a href={d.cta[0]} className="neu-btn"><Icon name="call" className="text-lg" /> {d.cta[1]}</a>}
            <Link to="/citizen-support" className="neu-btn !text-on-surface-variant">Citizen Support</Link>
          </div>
        </div>
      </section>
    </>
  )
}
