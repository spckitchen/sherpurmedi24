// SherpurMedi24 — frontend demo only. No live order or medicine sales.
const pharmacies = [
  {
    name: "City Care Pharmacy",
    area: "জিন্দাবাজার",
    description: "এটি শুধু ডিজাইন দেখানোর জন্য তৈরি নমুনা ফার্মেসি।"
  },
  {
    name: "Ambarkhana Pharmacy",
    area: "আম্বরখানা",
    description: "এটি শুধু ডিজাইন দেখানোর জন্য তৈরি নমুনা ফার্মেসি।"
  },
  {
    name: "Subidbazar Health Point",
    area: "সুবিদবাজার",
    description: "এটি শুধু ডিজাইন দেখানোর জন্য তৈরি নমুনা ফার্মেসি।"
  }
];

const pharmacyGrid = document.getElementById("pharmacyGrid");
const searchInput = document.getElementById("searchInput");
const areaSelect = document.getElementById("areaSelect");
const searchForm = document.getElementById("searchForm");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function renderPharmacies() {
  const query = searchInput.value.trim().toLocaleLowerCase("bn");
  const selectedArea = areaSelect.value;

  const filtered = pharmacies.filter((pharmacy) => {
    const matchesText =
      pharmacy.name.toLocaleLowerCase().includes(query) ||
      pharmacy.area.toLocaleLowerCase().includes(query);
    const matchesArea = !selectedArea || pharmacy.area === selectedArea;
    return matchesText && matchesArea;
  });

  pharmacyGrid.innerHTML = filtered.map((pharmacy, index) => {
    const initials = pharmacy.name.split(" ").slice(0, 2).map(word => word[0]).join("").toUpperCase();
    const avatarClass = ["", "avatar-blue", "avatar-gold"][pharmacies.indexOf(pharmacy)] || "";
    return `
      <article class="pharmacy-card">
        <div class="pharmacy-card-head">
          <span class="pharmacy-avatar ${avatarClass}">${escapeHTML(initials)}</span>
          <span class="demo-tag">DEMO</span>
        </div>
        <h3>${escapeHTML(pharmacy.name)}</h3>
        <p class="pharmacy-area">${escapeHTML(pharmacy.area)}</p>
        <p class="pharmacy-description">${escapeHTML(pharmacy.description)}</p>
        <div class="card-footer">
          <span class="open-status">ডেমো তালিকা</span>
          <span class="arrow" aria-hidden="true">→</span>
        </div>
      </article>`;
  }).join("");

  resultCount.textContent = `${filtered.length}টি ডেমো ফার্মেসি`;
  emptyState.hidden = filtered.length !== 0;
  pharmacyGrid.hidden = filtered.length === 0;
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPharmacies();
});

searchInput.addEventListener("input", renderPharmacies);
areaSelect.addEventListener("change", renderPharmacies);

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
renderPharmacies();
