const api = "http://127.0.0.1:4000/api/publicaciones/"; // nos conectamos a la API
const sesion = JSON.parse(sessionStorage.getItem("userName"));
let nameUser = document.querySelector("#nameUser");
let btnClaseSesion = document.querySelector("#btnCerrarSesion");
let btnGuardar = document.querySelector("#btnCerrarSesion");

// cerrar sesion
btnClaseSesion.addEventListener("click", (e) => {
  if (!localStorage.getItem("userName")) {
    sessionStorage.clear();
    window.location.href = "login_registro.html";
    history.replaceState(null, null, window.location.href);
  }
});

// FORMULARIO DE LA PUBLICACION O POST
 document.getElementById("frmPost").addEventListener("submit", (event) => {
  event.preventDefault();
  const fecha = new Date();
  const options = {
    year: "numeric", // Año
    month: "long", // Mes
    day: "numeric", // Dia
  };
  const fechaPublicacion = fecha.toLocaleDateString(undefined, options);
  const titulo = document.querySelector("#postTitle");
  const categories = document.querySelector("#categories");
  const contentenido = document.querySelector("#postContent");
  const image = document.querySelector("#postImage");

  fetch(api + "nuevaPublicacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      autor_id: sesion.user_id,
      titulo: titulo.value,
      rutImagen: image.value,
      categoria: categories.value,
      contenido_publicacion: contentenido.value,
      fecha_publicacion: fechaPublicacion,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.estado === true) {
        Swal.fire({
          position: "top",
          title: "Se publico correctamente el post!",
          icon: "success",
          text: res.mensaje,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: res.mensaje,
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        title: "El servidor no responde!",
        icon: "error",
        text: error,
      });
    });

  // document.getElementById("frmPost").reset();
  bootstrap.Modal.getInstance(document.getElementById("addPostModal")).hide();
});
/* function attachEventListeners() {
  document.querySelectorAll(".view-button").forEach((button) => {
    button.addEventListener("click", function () {
      alert(`Ver post ${this.dataset.id}`);
    });
  });

  document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", function () {
      alert(`Editar post ${this.dataset.id}`);
    });
  });

  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", function () {
      if (confirm("¿Seguro que deseas eliminar este post?")) {
        posts = posts.filter((post) => post.id != this.dataset.id);
        displayPosts(posts);
      }
    });
  });
} */


