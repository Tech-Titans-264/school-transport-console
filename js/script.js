/* ============================================
   SHARED SCRIPT — runs on every page
   1. Injects the navbar (so we don't repeat HTML)
   2. Holds seed/demo data used across pages
   ============================================ */

// ---- Demo data (in real project ye backend/API se aayega) ----
const BUSES = [
  { id: "UP32-AB-1234", route: "Route 1 — Gomti Nagar", driver: "Ramesh Yadav", status: "running", students: 32 },
  { id: "UP32-CD-5678", route: "Route 2 — Hazratganj", driver: "Suresh Kumar", status: "running", students: 28 },
  { id: "UP32-EF-9012", route: "Route 3 — Alambagh", driver: "Vinod Singh", status: "idle", students: 25 },
  { id: "UP32-GH-3456", route: "Route 4 — Indira Nagar", driver: "Mahesh Gupta", status: "emergency", students: 30 },
];

const STUDENTS = [
  { name: "Aarav Sharma", stop: "Stop 1 - Sector 12", boarded: true },
  { name: "Isha Verma", stop: "Stop 1 - Sector 12", boarded: true },
  { name: "Kabir Mehta", stop: "Stop 2 - Sector 14", boarded: false },
  { name: "Diya Patel", stop: "Stop 2 - Sector 14", boarded: false },
  { name: "Arjun Rao", stop: "Stop 3 - Sector 18", boarded: false },
];

// ---- Navbar injection ----
function renderNavbar(activePage) {
  const user = JSON.parse(localStorage.getItem("stsc_user") || '{"name":"Guest","role":"admin"}');

  const links = [
    { href: "dashboard.html", label: "Dashboard" },
    { href: "map.html", label: "Live Map" },
    { href: "routes.html", label: "Routes" },
    { href: "boarding.html", label: "Boarding" },
    { href: "emergency.html", label: "Emergency" },
    { href: "notifications.html", label: "Notifications" },
  ];

  const linksHtml = links.map(l =>
    `<a href="${l.href}" class="${activePage === l.href ? 'active' : ''}">${l.label}</a>`
  ).join("");

  const navHtml = `
    <div class="navbar">
      <div class="brand"><span class="bus-dot"></span> School Transport Safety Console</div>
      <button class="nav-toggle" id="navToggle">☰</button>
      <nav id="navLinks">
        ${linksHtml}
        <a href="index.html" style="margin-left:22px; color:#FFC93C;">${user.name} (${user.role}) · Logout</a>
      </nav>
    </div>
    <div class="route-divider"></div>
  `;

  document.getElementById("navbar-container").outerHTML = navHtml;

  // Hamburger toggle for mobile
  document.getElementById("navToggle").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("open");
  });
}

// ---- Small helper: "Updated Ns ago" live ticker ----
function startLiveClock(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let seconds = 0;
  setInterval(() => {
    seconds += 2;
    el.textContent = `Updated ${seconds}s ago`;
  }, 2000);
}
