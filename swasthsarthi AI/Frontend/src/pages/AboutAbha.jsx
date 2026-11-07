import { Icon, PageHero, CheckList } from '../components/ui'

const STEPS = [
  ['Visit the ABHA portal', 'Open the official ABHA website or the ABHA app and choose "Create ABHA number".', 'language'],
  ['Verify with Aadhaar or mobile', 'Use your Aadhaar (OTP) or your mobile number and driving licence to verify your identity.', 'verified_user'],
  ['Choose your ABHA address', 'Pick an easy-to-remember address like yourname@abdm for sharing records.', 'alternate_email'],
  ['Link your health records', 'Link records from hospitals and labs so you can share them with doctors when you choose.', 'folder_shared'],
]

const BENEFITS = [
  ['health_and_safety', 'One digital health ID', 'A 14-digit ABHA number that follows you across hospitals, labs and pharmacies.'],
  ['lock', 'You control your data', 'Records are shared only with your consent, and you can revoke access anytime.'],
  ['description', 'Records in one place', 'Prescriptions, lab reports and discharge summaries, available when you need them.'],
  ['sync_alt', 'Interoperable', 'Built on the Ayushman Bharat Digital Mission (ABDM) so systems can talk to each other.'],
]

export default function AboutAbha() {
  return (
    <>
      <PageHero eyebrow="Digital Health Ecosystem" icon="badge" title="About ABHA & NDHM">
        The Ayushman Bharat Health Account (ABHA) is a voluntary digital health ID under the National Digital Health
        Mission, now part of the Ayushman Bharat Digital Mission (ABDM).
      </PageHero>

      <section className="px-6 lg:px-12 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map(([icon, t, d]) => (
            <div key={t} className="neu-raised p-8 flex flex-col gap-2.5">
              <div className="neu-inset w-10 h-10 flex items-center justify-center text-primary"><Icon name={icon} /></div>
              <h3 className="text-label-md text-on-surface">{t}</h3>
              <p className="text-body-sm text-on-surface-variant">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <h2 className="text-headline-md lg:text-headline-lg text-primary">How to create your ABHA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {STEPS.map(([t, d, icon], i) => (
              <div key={t} className="neu-raised p-8 flex gap-5">
                <div className="neu-inset w-12 h-12 flex items-center justify-center text-primary shrink-0"><Icon name={icon} className="text-2xl" /></div>
                <div className="flex flex-col gap-1">
                  <span className="text-caption text-outline">STEP 0{i + 1}</span>
                  <h3 className="text-title-md text-primary">{t}</h3>
                  <p className="text-body-sm text-on-surface-variant">{d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="neu-raised p-8 lg:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-title-md text-primary">Is ABHA compulsory?</h3>
              <CheckList items={[
                'No. ABHA is voluntary and you can use SwasthSarthi without one.',
                'Creating one makes sharing records with doctors faster.',
                'Always use the official portal — never pay an agent to create it.',
              ]} />
            </div>
            <a href="https://abha.abdm.gov.in" target="_blank" rel="noreferrer" className="neu-btn shrink-0">Official ABHA Portal <Icon name="open_in_new" className="text-lg" /></a>
          </div>
        </div>
      </section>
    </>
  )
}
