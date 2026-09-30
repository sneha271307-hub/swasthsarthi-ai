import { t } from "../i18n.js";
import { loadA11ySettings, saveA11ySettings, applyA11ySettings } from "../utils/storage.js";

// Renders the 3 toggles (large text / high contrast / reduced motion),
// applies them to <body> classes immediately, and persists to localStorage.
// B7 "Done When": settings survive a page refresh.
export function renderAccessibilityPanel(container) {
  const settings = loadA11ySettings();
  applyA11ySettings(settings); // apply on load, in case this runs after a refresh

  const panel = document.createElement("section");
  panel.className = "a11y-panel";
  panel.setAttribute("aria-label", t("a11yPanelTitle"));
  panel.innerHTML = `
    <h2>${t("a11yPanelTitle")}</h2>
    ${toggleRow("largeText", t("largeText"), settings.largeText)}
    ${toggleRow("highContrast", t("highContrast"), settings.highContrast)}
    ${toggleRow("reducedMotion", t("reducedMotion"), settings.reducedMotion)}
  `;

  panel.querySelectorAll("input[type=checkbox]").forEach((input) => {
    input.addEventListener("change", () => {
      settings[input.dataset.key] = input.checked;
      saveA11ySettings(settings);
      applyA11ySettings(settings);
    });
  });

  container.appendChild(panel);
}

function toggleRow(key, label, checked) {
  const id = `a11y-${key}`;
  return `
    <div class="toggle-row">
      <label for="${id}">${label}</label>
      <span class="switch">
        <input type="checkbox" id="${id}" data-key="${key}" ${checked ? "checked" : ""} />
        <span class="track" aria-hidden="true"></span>
      </span>
    </div>
  `;
}
