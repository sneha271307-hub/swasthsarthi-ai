import { t } from "../i18n.js";

export function renderEligibility(list) {
  const items = (list || []).map((item) => `<li>${item}</li>`).join("");
  return `
    <h3 class="section-title">${t("eligibility")}</h3>
    <ul class="eligibility-list">${items}</ul>
  `;
}
