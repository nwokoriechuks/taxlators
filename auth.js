const user = JSON.parse(localStorage.getItem("authUser"));

if (!user) {
  window.location.href = "login.html";
}
