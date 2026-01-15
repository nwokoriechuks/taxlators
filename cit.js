function toggleMobileNav() {
    const nav = document.getElementById('mobileNav');
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

const toggle = document.getElementById("dropdownToggle");
const menu = document.getElementById("dropdownMenu");
const arrow = document.getElementById("arrow");
const selectedSize = document.getElementById("selectedSize");
const proceedBtn = document.getElementById(".proceed-btn");

let selectedRate = 0;

toggle.addEventListener("click", () => {
    const isOpen = menu.style.display === "block";
    menu.style.display = isOpen ? "none" : "block";
    arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
});

document.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", () => {
        selectedSize.textContent = option.textContent;
        selectedRate = Number(option.dataset.value);
        menu.style.display = "none";
        arrow.style.transform = "rotate(odeg)";
    });
});

proceedBtn.addEventListener("click", async() => {
    const revenue = Number(document.querySelectorAll("input")[0].value);
    const expenses = Number(document.querySelectorAll("input")[1].value || 0);

    if (!revenue || selectedRate === null) {
        alert("please enter revenue and select company size");
        return;
    }

    const taxableProfit = Math.max(revenue - expenses, 0);
    const taxPayable = (taxableProfit * selectedRate) / 100;

    const payload = {
        revenue,
        expenses,
        taxableProfit,
        taxRate: selectedRate,
        taxPayable
    };

    try {
        await fetch("https://gov-taxlator-api.onrender.com/api/tax/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    } catch (e) {
        console.warn("API call failed, proceeding logically");
    }

    localStorage.setItem("citResult", JSON.stringify(payload));
    window.location.href = "result.html";
});