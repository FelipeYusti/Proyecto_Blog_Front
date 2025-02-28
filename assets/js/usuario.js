let nameUser = document.querySelector("#NOSES");
const api = "http://127.0.0.1:4000/api/publicaciones/"; // nos conectamos a la API
// FORMULARIO DE LA PUBLICACION O POST
document.getElementById("frmPost").addEventListener("submit", function (event) {
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
  // traemos el id del usuario que esta almacenado en el sesionStorage.
  const sesion = JSON.parse(sessionStorage.getItem("userName"));
});
// FORMULARIO DE LA PUBLICACION O POST

document.getElementById("frmPost").addEventListener("submit", function (event) {
  event.preventDefault();

  const fecha = new Date();
  const options = {
    year: "numeric", // Año
    month: "long", // Mes
    day: "numeric", // Dia
  };
  const fechaPublicacion = fecha.toLocaleDateString(undefined, options);
  const titulo = document.querySelector("#postTitle").value;
  const contentenido = document.querySelector("#postContent").value;
  const image = document.querySelector("#postImage").value;

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
    });
  // document.getElementById("frmPost").reset();
  bootstrap.Modal.getInstance(document.getElementById("addPostModal")).hide();
});
// Mostrar/Ocultar comentarios

// Funcionalidad del botón "Leer más"
