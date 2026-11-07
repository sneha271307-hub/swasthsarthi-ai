import { Link } from 'react-router-dom'

export const Icon = ({ name, className = '' }) => (
  <span className={`material-symbols-outlined ${className}`} aria-hidden="true">{name}</span>
)

export const Logo = ({ className = 'h-9 w-9' }) => (
  <svg viewBox="0 0 40 40" className={className} role="img" aria-label="SwasthSarthi AI logo">
    <rect x="1" y="1" width="38" height="38" rx="12" fill="#e8eaf0" />
    <path d="M20 31s-10-6.2-10-13.4A5.6 5.6 0 0 1 20 14.2a5.6 5.6 0 0 1 10 3.4C30 24.8 20 31 20 31z" fill="#6366f1" />
    <path d="M12 21h5l2-4 3 7 2-3h4" fill="none" stroke="#e8eaf0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Eyebrow = ({ icon, children }) => (
  <div className="inline-flex items-center gap-1.5 eyebrow">
    {icon && <Icon name={icon} className="text-[16px]" />}
    <span>{children}</span>
  </div>
)

export const SectionHeader = ({ eyebrow, icon, title, children, className = 'max-w-3xl' }) => (
  <div className={`flex flex-col gap-3 ${className}`}>
    {eyebrow && <Eyebrow icon={icon}>{eyebrow}</Eyebrow>}
    <h2 className="text-headline-md lg:text-headline-lg text-primary tracking-tight">{title}</h2>
    {children && <p className="text-body-md text-on-surface-variant">{children}</p>}
  </div>
)

export const PageHero = ({ eyebrow, icon, title, children }) => (
  <section className="px-6 lg:px-12 pt-20 pb-12">
    <div className="max-w-7xl mx-auto flex flex-col gap-4 max-w-3xl">
      <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
      <h1 className="text-headline-lg lg:text-headline-xl text-primary tracking-tight">{title}</h1>
      {children && <p className="text-body-lg text-on-surface-variant">{children}</p>}
    </div>
  </section>
)

export const Pill = ({ children, icon, className = '' }) => (
  <span className={`neu-raised-sm rounded-full inline-flex items-center gap-1.5 px-3.5 py-1.5 text-label-sm ${className}`}>
    {icon && <Icon name={icon} className="text-[15px]" />}
    {children}
  </span>
)

export const Tag = ({ children, className = '' }) => (
  <span className={`neu-inset rounded-lg px-2.5 py-1 text-caption text-on-surface ${className}`}>{children}</span>
)

export const Field = ({ label, children }) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-label-sm text-on-surface-variant">{label}</span>
    {children}
  </label>
)

export const Select = ({ label, value, onChange, options, placeholder }) => (
  <Field label={label}>
    <div className="relative">
      <select className="neu-input pr-10" value={value} onChange={(e) => onChange(e.target.value)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => {
          const v = typeof o === 'string' ? o : o.value
          const l = typeof o === 'string' ? o : o.label
          return <option key={v} value={v}>{l}</option>
        })}
      </select>
      <Icon name="expand_more" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline" />
    </div>
  </Field>
)

export const CheckList = ({ items }) => (
  <ul className="flex flex-col gap-2 pt-2">
    {items.map((t) => (
      <li key={t} className="flex items-start gap-2.5 text-on-surface text-body-sm">
        <Icon name="check_circle" className="text-primary text-lg shrink-0" />
        <span>{t}</span>
      </li>
    ))}
  </ul>
)

export const LinkButton = ({ to, children, icon, className = '' }) => (
  <Link to={to} className={`neu-btn ${className}`}>
    {children}
    {icon && <Icon name={icon} className="text-lg" />}
  </Link>
)

export const SchemeCard = ({ s, state }) => {
  const badge = {
    primary: 'text-primary',
    soft: 'text-on-surface',
    raised: 'text-primary',
  }[s.badgeStyle]
  const name = s.id === 'STATE-TOPUP-12' && state ? `${s.name}` : s.name
  return (
    <div className="neu-raised p-8 flex flex-col justify-between gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <span className="text-caption text-outline">SCHEME-ID: {s.id}</span>
          <span className={`neu-inset rounded-full px-2.5 py-0.5 text-caption text-right ${badge}`}>{s.badge}</span>
        </div>
        <h3 className="text-title-md text-primary">{name}</h3>
        <p className="text-body-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {s.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 pt-4">
        <span className="text-caption text-outline">
          {s.helpline[0]}{s.helpline[1] && <>: <strong className="text-on-surface">{s.helpline[1]}</strong></>}
        </span>
        <Link to="/eligibility-check" className="neu-btn neu-btn-sm">
          <span>{s.cta}</span>
          <Icon name="chevron_right" className="text-[16px]" />
        </Link>
      </div>
    </div>
  )
}
