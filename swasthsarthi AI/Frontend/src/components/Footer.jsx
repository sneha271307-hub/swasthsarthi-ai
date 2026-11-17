import { Link } from 'react-router-dom'
import { Icon, Logo, Pill } from './ui'

const col = (title, links) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-label-md text-primary uppercase tracking-wider">{title}</h4>
    <ul className="flex flex-col gap-2 text-body-sm text-on-surface-variant">
      {links.map(([to, label]) => (
        <li key={to}><Link to={to} className="hover:text-primary transition-colors">{label}</Link></li>
      ))}
    </ul>
  </div>
)

export default function Footer() {
  return (
    <footer className="w-full mt-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Logo />
              <span className="text-headline-sm text-primary">SwasthSarthi AI</span>
            </div>
            <p className="text-body-sm text-on-surface-variant max-w-lg">
              A trustworthy, public-health-aligned digital navigation infrastructure providing verified health triage,
              bilingual assistance, and government healthcare scheme discovery for citizens across India.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Pill icon="verified" className="text-primary">ABHA / NDHM Interoperable</Pill>
              <Pill icon="security" className="text-on-surface-variant">DISHA & Privacy First</Pill>
              <Pill icon="fact_check" className="text-on-surface-variant">MoHFW Protocol Aligned</Pill>
            </div>
          </div>
          {col('Citizen Portals', [
            ['/scheme-discovery', 'Government Schemes (PM-JAY, RSBY)'],
            ['/symptom-checker', 'Clinical Triage Engine'],
            ['/about-abha', 'Create ABHA Health ID'],
            ['/citizen-support', 'Grievance Redressal'],
          ])}
          {col('Governance & Ethics', [
            ['/clinical-ethics', 'Clinical Accuracy & Ethics'],
            ['/language-accessibility', 'Language Accessibility'],
            ['/privacy-compliance', 'Data Privacy & HIPAA/DISHA'],
            ['/tele-manas', 'Tele-MANAS Mental Health'],
          ])}
        </div>

        <div className="neu-inset p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
          <Icon name="emergency" className="text-secondary text-2xl shrink-0" />
          <p className="text-body-sm text-on-surface-variant">
            <strong className="text-on-surface text-label-md">Emergency Medical Notice:</strong> SwasthSarthi AI provides
            verified health triage and citizen guidance. In case of acute medical emergencies, immediately call{' '}
            <span className="text-primary text-label-md">108</span> (National Ambulance) or{' '}
            <span className="text-primary text-label-md">1075</span> (National Health Helpline), or visit your nearest
            hospital casualty ward.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-on-surface-variant text-caption">
          <p>© {new Date().getFullYear()} SwasthSarthi AI. Built in public interest for Indian healthcare empowerment.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-compliance" className="hover:text-on-surface transition-colors">Privacy Policy</Link>
            <Link to="/clinical-ethics" className="hover:text-on-surface transition-colors">Terms of Guidance</Link>
            <Link to="/citizen-support" className="hover:text-on-surface transition-colors">National Health Portal (NHP)</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
