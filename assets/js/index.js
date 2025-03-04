document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("user")) {
    window.location.href = "login.html";
  } else {
      alert("Bienvenido a mi mi blog")
  }
});
