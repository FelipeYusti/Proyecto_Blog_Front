// Mostrar/Ocultar comentarios
document.getElementById("toggle-comments-btn").addEventListener("click", function () {
  let commentList = document.getElementById("comment-list");
  if (commentList.style.display === "none") {
    commentList.style.display = "block";
    this.textContent = "Ocultar comentarios";
  } else {
    commentList.style.display = "none";
    this.textContent = "Mostrar comentarios";
  }
});

// Funcionalidad del botón "Leer más"
document.getElementById("read-more-btn").addEventListener("click", function () {
  let fullContent = document.getElementById("full-content");
  let summary = document.getElementById("summary");

  if (fullContent.style.display === "none" || fullContent.style.display === "") {
    fullContent.style.display = "block";
    summary.style.display = "none";
    this.textContent = "Leer menos";
  } else {
    fullContent.style.display = "none";
    summary.style.display = "block";
    this.textContent = "Leer más";
  }
});
