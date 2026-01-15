function toggleMobileNav() {
  const nav = document.getElementById("mobileNav");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

// 1. Read VAT calculation from localStorage
const vatResult = JSON.parse(localStorage.getItem("vatResult"));

// 2. Guard: if user lands here without calculating
if (!vatResult) {
  alert("No VAT result found. Please calculate VAT first.");
  window.location.href = "vat.html";
}

// 3. Extract values from API response
const baseAmount = Number(vatResult.amount);
const vatAmount = Number(vatResult.vat);
const totalAmount = Number(vatResult.total);
const vatRate = vatResult.rate;

// 4. Utility formatter for Nigerian Naira
const formatCurrency = (value) =>
  `₦${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

// 5. MAIN VAT AMOUNT (center large number)
document.getElementById("vatAmountMain").innerText =
  formatCurrency(vatAmount);

// 6. VAT RATE LABEL (top + summary)
document.getElementById("vatRateLabel").innerText =
  `VAT Amount (${vatRate}%)`;

document.getElementById("vatRateSummary").innerText =
  `VAT Amount (${vatRate}%)`;

// 7. BREAKDOWN VALUES
document.getElementById("baseAmount").innerText =
  formatCurrency(baseAmount);

document.getElementById("totalAmount").innerText =
  formatCurrency(totalAmount);

// 8. SUMMARY VAT VALUE
document.getElementById("vatAmountSummary").innerText =
  formatCurrency(vatAmount);
