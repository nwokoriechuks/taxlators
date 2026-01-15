// Mobile nav toggle
function toggleMobileNav() {
  const nav = document.getElementById("mobileNav");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}
// vat.js

// 1️⃣ Select elements from the VAT page
document.addEventListener("DOMContentLoaded", () => {
const amountInput = document.getElementById("amount"); // Transaction amount input
const proceedBtn = document.getElementById("proceed-btn"); // Proceed button
const toggleBtns = document.querySelectorAll(".toggle-btn"); // +Add/-Remove VAT
const percentBtns = document.querySelectorAll(".percent"); // VAT rate buttons

// 2️⃣ Set default values
let vatMode = "add"; // default mode
let vatRate = 20;    // default rate

// 3️⃣ Handle VAT mode toggle buttons
toggleBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all
    toggleBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Set mode
    vatMode = btn.textContent.includes("Add") ? "add" : "remove";
  });
});

// 4️⃣ Handle VAT rate buttons
percentBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    percentBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Determine rate
    if (btn.textContent.includes("Standard")) vatRate = 20;
    else if (btn.textContent.includes("Reduced")) vatRate = 5;
    else if (btn.textContent.includes("Zero")) vatRate = 0;
    else vatRate = parseFloat(prompt("Enter custom VAT rate (%)"));
  });
});

// 5️⃣ Handle Proceed button click
proceedBtn.addEventListener("click", async () => {
  const amount = parseFloat(amountInput.value);
  if (!amount || amount < 0) {
    alert("Please enter a valid amount");
    return;
  }

  // 6️⃣ Prepare payload for API
  const payload = {
    amount: amount,
    rate: vatRate,
    mode: vatMode
  };

  // 7️⃣ Mock fallback data in case API fails
  const mockVAT = {
    amountExclVAT: amount,
    vatAmount: (vatMode === "add") ? (amount * vatRate / 100) : (amount * vatRate / (100 + vatRate)),
    totalAmount: (vatMode === "add") ? amount * (1 + vatRate / 100) : amount * (100 / (100 + vatRate)),
    rate: vatRate
  };

  try {
    // 8️⃣ Fetch API (replace YOUR_API_KEY_HERE with real key)
    const response = await fetch("https://gov-taxlator-api.onrender.com/api/vat/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer YOUR_API_KEY_HERE" // uncomment when you have API key
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("VAT API request failed");

    const data = await response.json();

    // 9️⃣ Store result in localStorage
    localStorage.setItem("vatResult", JSON.stringify(data));

  } catch (err) {
    console.warn("API request failed, using mock data:", err);
    localStorage.setItem("vatResult", JSON.stringify(mockVAT));
  }

  // 10️⃣ Redirect to VAT result page
  window.location.href = "vat-result.html";
});

})
