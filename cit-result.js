const data = JSON.parse(localStorage.getItem("citResult"));

const format = n => `₦${n.toLocaleString()}`;

document.getElementById("revenue").textContent = format(data.revenue);
document.getElementById("expenses").textContent = format(data.expenses);
document.getElementById("profit").textContent = format(data.taxableProfit);
document.getElementById("rate").textContent = `${data.taxRate}%`;
document.getElementById("tax").textContent = format(data.taxPayable);