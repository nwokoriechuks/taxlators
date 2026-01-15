const BASE_URL = "https://gov-taxlator-api.onrender.com";

// -----------------------------
// SIGNUP FUNCTION
// -----------------------------
async function signupUser(firstName, lastName, email, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return data; // Should return token + user info
  } catch (error) {
    throw error;
  }
}

// -----------------------------
// HANDLE FORM SUBMIT
// -----------------------------
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const termsChecked = document.getElementById("terms").checked;

  // Global error element
  const errorEl = document.getElementById("signupError");
  errorEl.textContent = "";

  // VALIDATION
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    errorEl.textContent = "Please fill in all required fields.";
    return;
  }

  if (password !== confirmPassword) {
    errorEl.textContent = "Passwords do not match.";
    return;
  }

  if (!termsChecked) {
    errorEl.textContent = "You must agree to the terms and privacy policy.";
    return;
  }

  // CALL SIGNUP API
  try {
    const result = await signupUser(firstName, lastName, email, password);

    // STORE SESSION
    const session = {
      ...result,
      expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
    };
    localStorage.setItem("authUser", JSON.stringify(session));

    // REDIRECT TO HOME
    window.location.href = "index.html";
  } catch (err) {
    errorEl.textContent = err.message;
  }
});

// After successful signup
const session = {
  ...result,
  expiresAt: Date.now() + 60 * 60 * 1000,
};

localStorage.setItem("authUser", JSON.stringify(session));

// Check if email is verified
if (!result.isVerified) {
  // Redirect to a "verify your email" page
  window.location.href = "verify.html";
} else {
  // Email already verified (optional)
  window.location.href = "index.html";
}
