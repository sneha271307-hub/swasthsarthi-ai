import { t } from "../i18n.js";
import { attachMicButton } from "../components/Voice.js";

const CATEGORY_KEYS = [
  { key: "categoryEducation", value: "Education" },
  { key: "categoryDisability", value: "Disability" },
  { key: "categorySeniorCitizens", value: "Senior Citizens" },
  { key: "categoryWomen", value: "Women" },
];

// Home screen: search input, mic button, category chips only (B2).
// Results render on their own screen (B3) — onSearch(query, category) navigates there.
export function renderHome(container, { onSearch, initialQuery = "", initialCategory = null }) {
  const section = document.createElement("section");
  section.innerHTML = `
    <div class="search-row">
      <input
        type="search"
        id="search-input"
        placeholder="${t("searchPlaceholder")}"
        aria-label="${t("searchPlaceholder")}"
        value="${initialQuery}"
      />
      <button class="mic-btn" id="mic-btn" aria-label="${t("micLabel")}" aria-pressed="false">🎤</button>
    </div>
    <div class="chip-row" role="group" aria-label="Categories">
      ${CATEGORY_KEYS.map(
        (c) => `<button class="chip" type="button" data-category="${c.value}"
          aria-pressed="${initialCategory === c.value}">${t(c.key)}</button>`
      ).join("")}
    </div>
  `;
  container.appendChild(section);

  const input = section.querySelector("#search-input");
  const micBtn = section.querySelector("#mic-btn");
  const chips = [...section.querySelectorAll(".chip")];

  let activeCategory = initialCategory;
  const emit = () => onSearch(input.value.trim(), activeCategory);

  // Typing goes straight to Results (kept snappy with a short debounce).
  let timer = null;
  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(emit, 150);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") emit();
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const value = chip.dataset.category;
      const wasActive = chip.getAttribute("aria-pressed") === "true";
      chips.forEach((c) => c.setAttribute("aria-pressed", "false"));
      activeCategory = wasActive ? null : value;
      if (!wasActive) chip.setAttribute("aria-pressed", "true");
      emit();
    });
  });

  attachMicButton(micBtn, (transcript) => {
    input.value = transcript;
    emit();
  });
}
