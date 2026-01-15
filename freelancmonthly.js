 function toggleMobileNav() {
      const nav = document.getElementById('mobileNav');
      nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    }

document.querySelector(".proceed-btn").addEventListener("click", async (e) => {
  e.preventDefault();

  const payload = {
    taxType: "freelancer",
    grossIncome: Number(document.getElementById("grossIncome").value) || 0,
    pension: Number(document.getElementById("pension").value) || 0,
    businessExpenses: Number(document.getElementById("businessExpenses").value) || 0,
    includeExpenses: document.getElementById("includeExpenses").checked
  };

  toggleLoading(true);

  try {
    const response = await fetch(
      "https://gov-taxlator-api.onrender.com/api/tax/calculate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    renderResults(data);

  } catch (err) {
    alert("Unable to calculate tax.");
    console.error(err);
  } finally {
    toggleLoading(false);
  }
});

function renderResults(data) {
  document.getElementById("taxableIncome").textContent =
    formatCurrency(data.taxableIncome);

  document.getElementById("totalTax").textContent =
    formatCurrency(data.totalTax);

  document.getElementById("netIncome").textContent =
    formatCurrency(data.netIncome);

  const list = document.getElementById("taxBreakdown");
  list.innerHTML = "";

  if (Array.isArray(data.breakdown)) {
    data.breakdown.forEach(item => {
      const li = document.createElement("li");
      li.textContent =
        `₦${formatCurrency(item.amount)} @ ${item.rate * 100}% = ₦${formatCurrency(item.tax)}`;
      list.appendChild(li);
    });
  }
}

function formatCurrency(value) {
  return Number(value).toLocaleString("en-NG", {
    minimumFractionDigits: 2
  });
}

function toggleLoading(state) {
  const btn = document.querySelector(".proceed");
  btn.disabled = state;
  btn.textContent = state ? "Calculating..." : "Proceed";
}
