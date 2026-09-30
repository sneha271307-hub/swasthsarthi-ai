import { t } from "../i18n.js";
import { renderEligibility } from "../components/Eligibility.js";
import { renderDocuments } from "../components/Documents.js";
import { speak, isVoiceOutputSupported } from "../components/Voice.js";

// Details screen: explanation, eligibility, documents, disclaimer (B4).
export function renderDetails(container, { scheme, onBack, onNext }) {
  const section = document.createElement("section");
  section.className = "details-card";
  section.innerHTML = `
    <button class="back-link" id="back-btn">&larr; ${t("backToResults")}</button>
    <span class="category-tag">${scheme.category}</span>
    <h2>${scheme.name}</h2>
    <p>${scheme.explanation}</p>

    ${renderEligibility(scheme.eligibility)}
    ${renderDocuments(scheme.documents, scheme.id)}

    <!-- Exact required wording — do not reword (B4 "Done When") -->
    <p class="disclaimer">Guidance, not an official decision.</p>

    ${
      isVoiceOutputSupported()
        ? `<button class="listen-btn" id="listen-btn">${t("listen")}</button>`
        : ""
    }

    <div style="margin-top:20px;">
      <button class="official-btn" id="next-btn" type="button">${t("stepsTitle")} &rarr;</button>
    </div>
  `;
  container.appendChild(section);

  section.querySelector("#back-btn").addEventListener("click", onBack);
  section.querySelector("#next-btn").addEventListener("click", () => onNext(scheme.id));

  const listenBtn = section.querySelector("#listen-btn");
  if (listenBtn) {
    listenBtn.addEventListener("click", () => speak(scheme.explanation));
  }
}
