import { t } from "../i18n.js";

// Steps + handoff screen: numbered steps, official-source button, human-helper link (B5).
export function renderSteps(container, { scheme, onBack }) {
  const section = document.createElement("section");
  const steps = (scheme.steps || []).map((s) => `<li>${s}</li>`).join("");

  section.innerHTML = `
    <button class="back-link" id="back-btn">&larr; ${t("backToResults")}</button>
    <h2>${scheme.name}</h2>
    <h3 class="section-title">${t("stepsTitle")}</h3>
    <ol class="steps-list">${steps}</ol>

    <a class="official-btn" id="official-link" href="${scheme.officialSource}" target="_blank" rel="noopener noreferrer">
      ${t("openOfficialSource")}
    </a>
    <!-- Placeholder number — replace with the real helpline once known -->
    <a class="helper-link" href="tel:+911234567890">${t("talkToHuman")}</a>
  `;
  container.appendChild(section);

  section.querySelector("#back-btn").addEventListener("click", onBack);
}
