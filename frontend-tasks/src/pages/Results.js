import { t } from "../i18n.js";
import { renderResultCard } from "../components/ResultCard.js";

// Results screen: one card per scheme, filtered by query/category, sourced
// entirely from mock-data.json (via app.js's getSchemes()) — never hard-coded (B3).
export function renderResults(container, { schemes, query, category, onSelect }) {
  const section = document.createElement("section");
  container.appendChild(section);

  const filtered = schemes.filter((s) => {
    const matchesQuery = !query || s.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !category || s.category === category;
    return matchesQuery && matchesCategory;
  });

  if (filtered.length === 0) {
    section.innerHTML = `<p class="empty-state">${t("noResults")}</p>`;
    return;
  }

  const list = document.createElement("ul");
  list.className = "result-list";
  filtered.forEach((scheme) => {
    const li = document.createElement("li");
    li.appendChild(renderResultCard(scheme, onSelect));
    list.appendChild(li);
  });
  section.appendChild(list);
}
