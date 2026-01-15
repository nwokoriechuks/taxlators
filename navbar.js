const BASE_URL = "https://gov-taxlator-api.onrender.com";

/* ----------------------------
   SESSION MANAGEMENT
----------------------------- */
function getSession() {
  return JSON.parse(localStorage.getItem("authUser"));
}

function clearSession() {
  localStorage.removeItem("authUser");
  window.location.href = "signin.html";
}

function isExpired(session) {
  return session && Date.now() > session.expiresAt;
}

/* ----------------------------
   SECURE API FETCH
----------------------------- */
async function apiFetch(endpoint, options = {}) {
  const session = getSession();
  if (!session || isExpired(session)) clearSession();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Authorization: `Bearer ${session.token}`,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) clearSession();
  return response.json();
}

/* ----------------------------
   LOAD NAVBAR ON ALL PAGES
----------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar").innerHTML = html;
      initNavbar();
    });
});

/* ----------------------------
   NAVBAR LOGIC
----------------------------- */
function initNavbar() {
  const session = getSession();

  const loginBtn = document.getElementById("loginBtn");
  const profileMenu = document.getElementById("profileMenu");
  const profileImg = document.getElementById("profileImg");
  const dropdown = document.getElementById("profileDropdown");
  const logoutBtn = document.getElementById("logoutBtn");

  // Show profile if logged in
  if (session && !isExpired(session)) {
    loginBtn.classList.add("hidden");
    profileMenu.classList.remove("hidden");
  }

  profileImg?.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  logoutBtn?.addEventListener("click", async () => {
    try {
      await apiFetch("/api/auth/signout", { method: "POST" });
    } catch {}
    clearSession();
  });
}

/* ----------------------------
   MOBILE NAV TOGGLE
----------------------------- */
function toggleMobileNav() {
  document.getElementById("mobileNav").classList.toggle("hidden");
}

const session = getSession();
if (session && !isExpired(session) && session.isVerified) {
  loginBtn.classList.add("hidden");
  profileMenu.classList.remove("hidden");
} else {
  loginBtn.classList.remove("hidden");
  profileMenu.classList.add("hidden");
}

