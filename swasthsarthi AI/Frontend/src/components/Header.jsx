import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Icon, Logo } from './ui'

const NAV = [
  { to: '/', label: 'Health Guidance', end: true },
  { to: '/scheme-discovery', label: 'Scheme Discovery (योजनाएं)' },
  { to: '/symptom-checker', label: 'Symptom Checker' },
  { to: '/citizen-support', label: 'Citizen Support' },
  { to: '/about-abha', label: 'About ABHA & NDHM' },
]

const linkClass = ({ isActive }) =>
  `px-2.5 py-2 rounded-lg text-[14px] font-semibold whitespace-nowrap transition-shadow ${
    isActive ? 'neu-inset text-primary' : 'text-on-surface-variant hover:text-on-surface'
  }`

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_6px_14px_rgba(0,0,0,0.05)]">
      <div className="h-20 max-w-7xl min-[1850px]:max-w-[1800px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-5">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-4" onClick={() => setOpen(false)}>
            <Logo />
            <div className="flex flex-col">
              <span className="text-headline-sm text-primary leading-none whitespace-nowrap">SwasthSarthi AI</span>
              <span className="text-caption text-on-surface-variant leading-tight hidden min-[1700px]:block whitespace-nowrap">National Citizen Health Guidance</span>
            </div>
          </Link>
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main">
            {NAV.map((n) => <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>{n.label}</NavLink>)}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden min-[1850px]:flex whitespace-nowrap neu-raised-sm rounded-full items-center px-3 py-1 text-on-surface-variant text-label-sm">
            <Icon name="translate" className="text-[16px] mr-1 text-primary" />
            <span>English / हिन्दी / தமிழ் / বাংলা</span>
          </div>
          <div className="hidden min-[1850px]:flex whitespace-nowrap neu-inset rounded-full items-center px-3 py-1 text-on-surface text-label-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse" />
            <span>Helpline: 108 / 1075</span>
          </div>
          <Link to="/eligibility-check" className="neu-btn neu-btn-sm whitespace-nowrap hidden sm:inline-flex">Check Eligibility</Link>
          <button
            className="xl:hidden neu-btn !px-3 !py-3"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="xl:hidden px-6 pb-6 pt-2 flex flex-col gap-2" aria-label="Mobile">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} onClick={() => setOpen(false)} className={linkClass}>{n.label}</NavLink>
          ))}
          <NavLink to="/eligibility-check" onClick={() => setOpen(false)} className={linkClass}>Check Eligibility</NavLink>
        </nav>
      )}
    </header>
  )
}
