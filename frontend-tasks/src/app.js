import { t, getLang, setLang, dictionaries } from "./i18n.js";
import { loadA11ySettings, applyA11ySettings } from "./utils/storage.js";
import { renderAccessibilityPanel } from "./components/AccessibilityPanel.js";
import { renderHome } from "./pages/Home.js";
import { renderResults } from "./pages/Results.js";
import { renderDetails } from "./pages/Details.js";
import { renderSteps } from "./pages/Steps.js";

// --- API abstraction (B6, B12) ---------------------------------------
// While the backend isn't live, this reads mock-data.json. Once the
// backend is ready (B12's "replace mock data with fetch() calls"),
// change ONLY this function to call the real endpoint — everything else
// in the app reads through getSchemes()/getScheme(), so nothing else changes.

const API_BASE = window.__API_BASE__ || null; // set via env/config when deploying (B12)
let schemesCache = null;

async function getSchemes() {
  if (schemesCache) return schemesCache;
  if (API_BASE) {
    const res = await fetch(`${API_BASE}/schemes?language=${getLang()}`);
    const data = await res.json();
    schemesCache = data.schemes.map(normalizeScheme);
  } else {
    const res = await fetch("./mock-data.json");
    const data = await res.json();
    schemesCache = data.schemes.map(normalizeScheme);
  }
  return schemesCache;
}

async function getScheme(id) {
  const schemes = await getSchemes();
  return schemes.find((s) => s.id === id);
}

// ASSUMPTION (see mock-data.json _note): this is the one place field names
// from the API are read. If the real API.md uses different keys, remap them
// here and the rest of the app keeps working unchanged.
function normalizeScheme(raw) {
  return {
    id: raw.id,
    name: raw.name,
    category: raw.category,
    purpose: raw.purpose,
    explanation: raw.explanation,
    eligibility: raw.eligibility || [],
    documents: raw.documents || [],
    steps: raw.steps || [],
    officialSource: raw.officialSource,
  };
}

// --- Simple state + router --------------------------------------------

const state = {
  view: "home", // home | results | details | steps
  query: "",
  category: null,
  selectedId: null,
};

const main = document.getElementById("main");

async function render() {
  main.innerHTML = "";
  main.setAttribute("aria-busy", "false");

  if (state.view === "home") {
    const wrapper = document.createElement("div");
    const a11yWrapper = document.createElement("div");
    renderAccessibilityPanel(a11yWrapper);
    wrapper.appendChild(a11yWrapper);
    main.appendChild(wrapper);

    renderHome(main, {
      initialQuery: state.query,
      initialCategory: state.category,
      onSearch: (query, category) => {
        state.query = query;
        state.category = category;
        state.view = "results";
        render();
      },
    });
  }

  if (state.view === "results") {
    const schemes = await getSchemes();
    renderResults(main, {
      schemes,
      query: state.query,
      category: state.category,
      onSelect: (id) => {
        state.selectedId = id;
        state.view = "details";
        render();
      },
    });
    // Keep the search screen reachable from Results (a real router would
    // give Results its own URL; this SPA keeps Home's inputs in state).
    prependBack(() => {
      state.view = "home";
      render();
    });
  }

  if (state.view === "details") {
    const scheme = await getScheme(state.selectedId);
    renderDetails(main, {
      scheme,
      onBack: () => {
        state.view = "results";
        render();
      },
      onNext: () => {
        state.view = "steps";
        render();
      },
    });
  }

  if (state.view === "steps") {
    const scheme = await getScheme(state.selectedId);
    renderSteps(main, {
      scheme,
      onBack: () => {
        state.view = "details";
        render();
      },
    });
  }
}

function prependBack(onBack) {
  const back = document.createElement("button");
  back.className = "back-link";
  back.textContent = `\u2190 ${t("appTitle")}`;
  back.addEventListener("click", onBack);
  main.prepend(back);
}

// --- Header: title + language switcher (B9) ----------------------------

function renderHeader() {
  const header = document.getElementById("app-header");
  header.innerHTML = `
    <h1>${t("appTitle")}</h1>
    <div class="header-actions">
      <label class="visually-hidden" for="lang-select">${t("language")}</label>
      <select class="lang-select" id="lang-select" aria-label="${t("language")}">
        <option value="en" ${getLang() === "en" ? "selected" : ""}>EN</option>
        <option value="hi" ${getLang() === "hi" ? "selected" : ""}>हि</option>
      </select>
    </div>
  `;
  header.querySelector("#lang-select").addEventListener("change", (e) => {
    setLang(e.target.value);
    schemesCache = null; // force re-fetch so the API call's language param updates too
    renderHeader();
    render();
  });
}

// --- Boot ---------------------------------------------------------------

applyA11ySettings(loadA11ySettings());
renderHeader();
render();
