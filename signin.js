
const BASE_URL = "https://gov-taxlator-api.onrender.com";

async function signinUser(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            document.getElementById("loginError").textContent =
                data.message || "Login failed";
            return null;
        }

        document.getElementById("loginError").textContent = "";
        return data;

    } catch (error) {
        document.getElementById("loginError").textContent =
            "Network error. Please try again.";
        console.error("Signin Error:", error);
        return null;
    }
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    let valid = true;

    if (!email) {
        document.getElementById("emailError").textContent = "Email is required";
        valid = false;
    } else {
        document.getElementById("emailError").textContent = "";
    }

    if (!password) {
        document.getElementById("passwordError").textContent = "Password is required";
        valid = false;
    } else {
        document.getElementById("passwordError").textContent = "";
    }

    if (!valid) return;

    const result = await signinUser(email, password);

    if (result) {
        // Save user session
        localStorage.setItem("authUser", JSON.stringify(result));

        // Redirect to index page
        window.location.href = "index.html";
    }
});
