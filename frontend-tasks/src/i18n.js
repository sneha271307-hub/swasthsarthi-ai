// English / Hindi text dictionaries (B9)
// Add new keys here in both languages, then use t('key') anywhere in the app.

export const dictionaries = {
  en: {
    appTitle: "Scheme Helper",
    searchPlaceholder: "Search for a scheme...",
    micLabel: "Search by voice",
    categoryEducation: "Education",
    categoryDisability: "Disability",
    categorySeniorCitizens: "Senior Citizens",
    categoryWomen: "Women",
    noResults: "No matching schemes found. Try a different search or category.",
    backToResults: "Back to results",
    eligibility: "Eligibility",
    documentsNeeded: "Documents needed",
    disclaimer: "Guidance, not an official decision.",
    listen: "Listen to explanation",
    stepsTitle: "How to apply",
    openOfficialSource: "Open official source",
    talkToHuman: "Talk to a human helper",
    a11yPanelTitle: "Accessibility settings",
    largeText: "Large text",
    highContrast: "High contrast",
    reducedMotion: "Reduced motion",
    language: "Language",
    purpose: "Purpose",
  },
  hi: {
    appTitle: "योजना सहायक",
    searchPlaceholder: "योजना खोजें...",
    micLabel: "आवाज़ से खोजें",
    categoryEducation: "शिक्षा",
    categoryDisability: "दिव्यांगता",
    categorySeniorCitizens: "वरिष्ठ नागरिक",
    categoryWomen: "महिलाएं",
    noResults: "कोई योजना नहीं मिली। कोई और खोज या श्रेणी आज़माएं।",
    backToResults: "परिणामों पर वापस जाएं",
    eligibility: "पात्रता",
    documentsNeeded: "आवश्यक दस्तावेज़",
    disclaimer: "यह मार्गदर्शन है, आधिकारिक निर्णय नहीं।",
    listen: "व्याख्या सुनें",
    stepsTitle: "आवेदन कैसे करें",
    openOfficialSource: "आधिकारिक स्रोत खोलें",
    talkToHuman: "किसी सहायक व्यक्ति से बात करें",
    a11yPanelTitle: "सुगम्यता सेटिंग्स",
    largeText: "बड़ा टेक्स्ट",
    highContrast: "उच्च कंट्रास्ट",
    reducedMotion: "कम गति (एनिमेशन)",
    language: "भाषा",
    purpose: "उद्देश्य",
  },
};

const LANG_KEY = "scheme-helper-lang";

export function getLang() {
  return localStorage.getItem(LANG_KEY) || "en";
}

export function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

export function t(key) {
  const lang = getLang();
  return (dictionaries[lang] && dictionaries[lang][key]) || dictionaries.en[key] || key;
}
