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
document.getElementById("frmPost").addEventListener("submit", function (event) {
  event.preventDefault();
  const fecha = new Date();
  const options = {
    year: "numeric", // Año
    month: "long", // Mes
    day: "numeric" // Dia
  };
  const fechaPublicacion = fecha.toLocaleDateString(undefined, options);
  const titulo = document.querySelector("#postTitle").value;
  const contentenido = document.querySelector("#postContent").value;
  const image = document.querySelector("#postImage").value;

  fetch(api + "nuevaPublicacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      autor_id: autor_id.value,
      titulo: titulo.value.trim(),
      rutImagen: image.value,
      contenido_publicacion: contentenido.value,
      fecha_publicacion: fechaPublicacion
    })
  })
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        Swal.fire({
          position: "top",
          title: "Se publico correctamente!",
          icon: "success",
          text: res.mensaje,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: res.mensaje
        });
      }
    });
  document.getElementById("frmPost").reset();
  bootstrap.Modal.getInstance(document.getElementById("addPostModal")).hide();
});
