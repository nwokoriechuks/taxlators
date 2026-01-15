const BASE_URL = "https://gov-taxlator-api.onrender.com";

/* ======================
   SESSION HELPERS
====================== */
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

/* ======================
   SECURE API FETCH
====================== */
async function apiFetch(endpoint, options = {}) {
  const session = getSession();

  if (!session || isExpired(session)) {
    clearSession();
    throw new Error("Session expired");
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${session.token}`
    }
  });

  if (response.status === 401) {
    clearSession();
    throw new Error("Unauthorized");
  }

  return response.json();
}

/* ======================
   PAGE PROTECTION
====================== */
(function () {
  const protectedPages = ["index.html", "calculate.html", "result.html"];
  const page = location.pathname.split("/").pop();

  if (protectedPages.includes(page)) {
    const session = getSession();
    if (!session || isExpired(session)) {
      clearSession();
    }
  }
})();

/* ======================
   NAVBAR INIT
====================== */
document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(r => r.text())
    .then(html => {
      document.getElementById("navbar").innerHTML = html;
      initNavbar();
    });
});

function initNavbar() {
  const session = getSession();

  const loginBtn = document.getElementById("loginBtn");
  const profileMenu = document.getElementById("profileMenu");
  const profileImg = document.getElementById("profileImg");
  const dropdown = document.getElementById("profileDropdown");
  const logoutBtn = document.getElementById("logoutBtn");

  if (session) {
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

/* ======================
   MOBILE NAV
====================== */
function toggleMobileNav() {
  document.getElementById("mobileNav").classList.toggle("hidden");
}
