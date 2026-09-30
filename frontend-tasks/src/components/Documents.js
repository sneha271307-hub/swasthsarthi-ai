import { t } from "../i18n.js";

// Renders the document checklist. Each checkbox is independently clickable
// (B4 "Done When": all checkboxes work) — state lives in the DOM, which is
// enough for a checklist the user ticks off while gathering documents.
export function renderDocuments(list, schemeId) {
  const items = (list || [])
    .map((doc, i) => {
      const id = `doc-${schemeId}-${i}`;
      return `
      <li class="doc-item">
        <input type="checkbox" id="${id}" />
        <label for="${id}">${doc}</label>
      </li>`;
    })
    .join("");
  return `
    <h3 class="section-title">${t("documentsNeeded")}</h3>
    <ul class="doc-list">${items}</ul>
  `;
}
