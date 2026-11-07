import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SymptomChecker from './pages/SymptomChecker'
import SchemeDiscovery from './pages/SchemeDiscovery'
import EligibilityCheck from './pages/EligibilityCheck'
import CitizenSupport from './pages/CitizenSupport'
import AboutAbha from './pages/AboutAbha'
import InfoPage from './pages/InfoPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="health-guidance" element={<Navigate to="/" replace />} />
        <Route path="symptom-checker" element={<SymptomChecker />} />
        <Route path="scheme-discovery" element={<SchemeDiscovery />} />
        <Route path="eligibility-check" element={<EligibilityCheck />} />
        <Route path="citizen-support" element={<CitizenSupport />} />
        <Route path="about-abha" element={<AboutAbha />} />
        <Route path="clinical-ethics" element={<InfoPage page="clinical-ethics" />} />
        <Route path="language-accessibility" element={<InfoPage page="language-accessibility" />} />
        <Route path="privacy-compliance" element={<InfoPage page="privacy-compliance" />} />
        <Route path="tele-manas" element={<InfoPage page="tele-manas" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
