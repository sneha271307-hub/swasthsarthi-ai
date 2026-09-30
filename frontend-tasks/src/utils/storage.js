// Small wrapper around localStorage for accessibility settings (B7).
// Keeping this in one place means B7's "remember on refresh" requirement
// is satisfied everywhere the settings are read/written.

const KEY = "scheme-helper-a11y";

const DEFAULTS = {
  largeText: false,
  highContrast: false,
  reducedMotion: false,
};

export function loadA11ySettings() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch (e) {
    return { ...DEFAULTS };
  }
}

export function saveA11ySettings(settings) {
  localStorage.setItem(KEY, JSON.stringify(settings));
}

export function applyA11ySettings(settings) {
  document.body.classList.toggle("large-text", !!settings.largeText);
  document.body.classList.toggle("high-contrast", !!settings.highContrast);
  document.body.classList.toggle("reduced-motion", !!settings.reducedMotion);
}
