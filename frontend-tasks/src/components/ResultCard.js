// One card per scheme. Reads purely from the (already-fetched) scheme object,
// so changing mock-data.json changes what renders here without touching this file (B3).
export function renderResultCard(scheme, onSelect) {
  const card = document.createElement("button");
  card.className = "result-card";
  card.type = "button";
  card.innerHTML = `
    <span class="category-tag">${scheme.category}</span>
    <h3>${scheme.name}</h3>
    <p>${scheme.purpose}</p>
  `;
  card.addEventListener("click", () => onSelect(scheme.id));
  return card;
}
