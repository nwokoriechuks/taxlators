const BASE_URL = "https://gov-taxlator-api.onrender.com";

// -----------------------------
// SIGNIN FUNCTION
// -----------------------------
async function signinUser(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data; // contains token + user info
  } catch (error) {
    throw error;
  }
}

// -----------------------------
// HANDLE FORM SUBMIT
// -----------------------------
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let valid = true;

  // Validate email
  if (!email) {
    document.getElementById("emailError").textContent = "Email is required";
    valid = false;
  } else {
    document.getElementById("emailError").textContent = "";
  }

  // Validate password
  if (!password) {
    document.getElementById("passwordError").textContent = "Password is required";
    valid = false;
  } else {
    document.getElementById("passwordError").textContent = "";
  }

  if (!valid) return;

  // Clear global login error
  document.getElementById("loginError").textContent = "";

  try {
    const result = await signinUser(email, password);

    // Save session globally
    const session = {
      ...result,
      expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
    };

    localStorage.setItem("authUser", JSON.stringify(session));

    // Redirect to homepage
    window.location.href = "index.html";
  } catch (err) {
    document.getElementById("loginError").textContent = err.message;
  }
});

// -----------------------------
// TOGGLE PASSWORD VISIBILITY
// -----------------------------
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePassword.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    passwordField.type = "password";
    togglePassword.classList.replace("fa-eye-slash", "fa-eye");
  }
});

if (!result.isVerified) {
  // User is not verified
  alert("Please verify your email first.");
  window.location.href = `verify.html?token=${result.verificationToken}`;
  return;
}
