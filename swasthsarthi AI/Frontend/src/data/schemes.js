// Scheme data + a simple rule-based matcher.
// NOTE: matching is indicative only (demo rules). Always verify on the official portal.

export const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Gujarat', 'Haryana', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan',
  'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

export const INCOME_OPTIONS = [
  { value: 'low', label: 'Under ₹1,80,000 / year' },
  { value: 'mid', label: '₹1,80,000 – ₹5,00,000 / year' },
  { value: 'high', label: 'Above ₹5,00,000 / year' },
]

export const RATION_OPTIONS = [
  { value: 'AAY', label: 'Antyodaya Anna Yojana (AAY)' },
  { value: 'PHH', label: 'Priority Household (PHH)' },
  { value: 'BPL', label: 'BPL Card' },
  { value: 'APL', label: 'APL Card' },
  { value: 'NONE', label: 'No ration card' },
]

export const CATEGORY_OPTIONS = [
  { value: 'senior', label: 'Senior Citizen (60+)' },
  { value: 'pregnant', label: 'Pregnant Woman / New Mother' },
  { value: 'child', label: 'Child (0–6 years)' },
  { value: 'tb', label: 'Under TB Treatment' },
  { value: 'adult', label: 'Adult (18–59)' },
]

export const SCHEME_FILTERS = [
  { value: 'all', label: 'All Schemes' },
  { value: 'critical', label: 'Critical Care & Surgery' },
  { value: 'maternal', label: 'Maternal & Child' },
  { value: 'senior', label: 'Senior Citizens' },
]

const STATE_SCHEME_NAMES = {
  'Uttar Pradesh': 'UP Mukhyamantri Jan Arogya Yojana',
  Gujarat: 'Mukhyamantri Amrutum',
  'West Bengal': 'Swasthya Sathi',
  'Andhra Pradesh': 'Dr. YSR Aarogyasri',
  Telangana: 'Aarogyasri',
  'Tamil Nadu': 'CM Comprehensive Health Insurance Scheme',
  Maharashtra: 'Mahatma Jyotiba Phule Jan Arogya Yojana',
}

export const stateSchemeName = (state) =>
  STATE_SCHEME_NAMES[state] || `${state || 'Your state'} health insurance scheme`

// rules: empty array = open to all for that field
export const SCHEMES = [
  {
    id: 'NHA-PMJAY-01', short: 'PM-JAY', name: 'Ayushman Bharat — PM-JAY', category: 'critical',
    badge: '₹5,00,000 / Year Cover', badgeStyle: 'primary',
    desc: 'Provides cashless and paperless hospitalization treatment for secondary and tertiary healthcare across over 27,000 empanelled public and private hospitals nationwide.',
    tags: ['SECC Deprivation / Ration Beneficiaries', 'No Cap on Family Size'],
    helpline: ['Toll-Free', '14555'], cta: 'Check Eligibility',
    rules: { income: ['low'], ration: ['AAY', 'PHH', 'BPL'], category: [] },
    docs: ['Aadhaar card (all family members)', 'Ration card', 'Mobile number linked to Aadhaar', 'Income / SECC proof if asked'],
    link: 'https://pmjay.gov.in',
  },
  {
    id: 'MOHFW-PMSMA-04', short: 'PMSMA', name: 'Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)', category: 'maternal',
    badge: 'Free Monthly Antenatal Care', badgeStyle: 'soft',
    desc: 'Guaranteed, comprehensive antenatal care package provided to all pregnant women in their 2nd and 3rd trimesters on the 9th day of every calendar month by specialist doctors.',
    tags: ['Universal Expectant Mothers', 'Free Ultrasound & Blood Profiling'],
    helpline: ['National Health Helpline', '1075'], cta: 'Check Eligibility',
    rules: { income: [], ration: [], category: ['pregnant'] },
    docs: ['MCP card / pregnancy registration', 'Aadhaar card', 'Previous ANC reports (if any)'],
    link: 'https://pmsma.nhp.gov.in',
  },
  {
    id: 'MOSJE-RVY-09', short: 'RVY', name: 'Rashtriya Vayoshri Yojana (RVY)', category: 'senior',
    badge: 'Free Physical Living Aids', badgeStyle: 'raised',
    desc: 'Provides assisted-living devices and age-related physical aids (hearing aids, wheelchairs, spectacles, crutches, dental plates) for senior citizens in low-income brackets.',
    tags: ['Age 60+ Years', 'BPL / Low Income Certificate'],
    helpline: ['Elderline Helpline', '14567'], cta: 'Check Eligibility',
    rules: { income: ['low'], ration: [], category: ['senior'] },
    docs: ['Aadhaar card', 'BPL / low-income certificate', 'Age proof', 'Passport-size photographs'],
    link: 'https://alimco.in',
  },
  {
    id: 'STATE-TOPUP-12', short: 'State Scheme', name: 'State Swasthya Bima & Arogyasri Portals', category: 'critical',
    badge: 'State Health Card Expansion', badgeStyle: 'primary',
    desc: 'Localized state programs that extend hospitalization ceilings beyond national caps, including Mukhyamantri Amrutum, Swasthya Sathi, and Aarogyasri.',
    tags: ['State Domicile Required', 'Covers Critical Illness Surgeries'],
    helpline: ['Direct State Help Desk', null], cta: 'Find My State Scheme',
    rules: { income: ['low', 'mid'], ration: [], category: [] },
    docs: ['Domicile / residence proof', 'Aadhaar card', 'Income certificate', 'Ration card (if available)'],
    link: 'https://nha.gov.in',
  },
  {
    id: 'MOHFW-JSY-02', short: 'JSY', name: 'Janani Suraksha Yojana (JSY)', category: 'maternal',
    badge: 'Cash Support for Delivery', badgeStyle: 'soft',
    desc: 'Cash assistance to encourage delivery in a government or accredited health facility, with ASHA support for registration, transport and follow-up care.',
    tags: ['Institutional Delivery', 'ASHA Support'],
    helpline: ['National Health Helpline', '1075'], cta: 'Check Eligibility',
    rules: { income: ['low'], ration: [], category: ['pregnant'] },
    docs: ['JSY card / MCP card', 'Aadhaar card', 'Bank account passbook', 'BPL / income proof'],
    link: 'https://nhm.gov.in',
  },
  {
    id: 'MOHFW-RBSK-06', short: 'RBSK', name: 'Rashtriya Bal Swasthya Karyakram (RBSK)', category: 'maternal',
    badge: 'Free Child Health Screening', badgeStyle: 'raised',
    desc: 'Free screening of children for defects at birth, diseases, deficiencies and developmental delays, with referral and treatment support at no cost to the family.',
    tags: ['Age 0–18 Years', 'Anganwadi & School Based'],
    helpline: ['National Health Helpline', '1075'], cta: 'Check Eligibility',
    rules: { income: [], ration: [], category: ['child'] },
    docs: ['Child\'s birth certificate / MCP card', 'Parent Aadhaar card'],
    link: 'https://nhm.gov.in',
  },
  {
    id: 'NTEP-NPY-03', short: 'Nikshay Poshan', name: 'Nikshay Poshan Yojana', category: 'critical',
    badge: '₹500 / Month Nutrition Support', badgeStyle: 'soft',
    desc: 'Monthly nutrition support for every person notified with TB, paid directly to the bank account for the duration of treatment.',
    tags: ['All Notified TB Patients', 'Direct Bank Transfer'],
    helpline: ['Nearest PHC', null], cta: 'Check Eligibility',
    rules: { income: [], ration: [], category: ['tb'] },
    docs: ['Nikshay ID', 'Aadhaar card', 'Bank account details'],
    link: 'https://tbcindia.gov.in',
  },
  {
    id: 'PMBJP-GEN-07', short: 'Jan Aushadhi', name: 'Pradhan Mantri Bhartiya Janaushadhi Pariyojana', category: 'all',
    badge: 'Low-Cost Generic Medicines', badgeStyle: 'raised',
    desc: 'Quality generic medicines at significantly lower prices from Jan Aushadhi Kendras, helping families cut out-of-pocket spending on regular prescriptions.',
    tags: ['Open to Everyone', 'No Registration Required'],
    helpline: ['Locate a Kendra', null], cta: 'Check Eligibility',
    rules: { income: [], ration: [], category: [] },
    docs: ['Doctor\'s prescription (generic name preferred)'],
    link: 'https://janaushadhi.gov.in',
  },
]

const ok = (allowed, value) => allowed.length === 0 || allowed.includes(value)

export function matchSchemes({ income, ration, category }) {
  return SCHEMES.filter(
    (s) => ok(s.rules.income, income) && ok(s.rules.ration, ration) && ok(s.rules.category, category),
  )
}
