   function toggleMobileNav() {
      const nav = document.getElementById('mobileNav');
      nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    }

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const targetPage = card.dataset.url;
    window.location.href = targetPage;
  });
});
