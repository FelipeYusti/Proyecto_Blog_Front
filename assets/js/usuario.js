const api = "http://127.0.0.1:4000/api/publicaciones/"; // nos conectamos a la API
const sesion = JSON.parse(sessionStorage.getItem("userName"));
let nameUser = document.querySelector("#nameUser");
let btnClaseSesion = document.querySelector("#btnCerrarSesion");

let titulo = document.querySelector("#postTitle");
let sub_titulo = document.querySelector("#postSubTitle");
let categories = document.querySelector("#categories");
let contetenido = document.querySelector("#postContent");
let image = document.querySelector("#postImage");
let idPost = 0;
// cerrar sesion
btnClaseSesion.addEventListener("click", (e) => {
  if (!localStorage.getItem("userName")) {
    sessionStorage.clear();
    window.location.href = "login_registro.html";
    history.replaceState(null, null, window.location.href);
  }
});
// Botones eliminar eliminar
document.addEventListener("click", (e) => {
  try {
    let action = e.target.closest("button").getAttribute("data-action");
    let id = e.target.closest("button").getAttribute("data-id");
    if (action === "delete") {
      Swal.fire({
        title: "¿Estás seguro de esta accion?",
        text: "La Publicacion se eliminara permanentemente. ",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          fetch(api + "borrarPorId/" + id, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.estado === true) {
                Swal.fire({
                  title: "Se Elimino el post correctamente.",
                  icon: "success",
                });
                window.location.reload();
              } else {
                Swal.fire({
                  title: "No se pudo eliminar el post!",
                  icon: "error",
                  text: error,
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
        }
      });
    } else if (action === "edit") {
      idPost = e.target.closest("button").getAttribute("data-id");
      fetch(api + "listarPublicId/" + idPost, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          titulo.value = res.post.titulo;
          sub_titulo.value = res.post.sub_titulo;
          /* image.value = res.post.rutImagen;*/
          categories.value = res.post.categoria;
          contetenido.value = res.post.contenido_publicacion;
        })
        .catch((error) => {
          Swal.fire({
            title: "El servidor no responde!",
            icon: "error",
            text: error,
          });
        });
    }
  } catch (error) {}
});

// FORMULARIO DE LA PUBLICACION O POST
document.getElementById("frmPost").addEventListener("submit", (e) => {
  e.preventDefault();
  let action = document
    .querySelector("#btnGuardar")
    .getAttribute("data-action");

  if (action === "save-changes-post") {
    fetch(api + "actualizarPorId/" + idPost, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: titulo.value,
        sub_titulo: sub_titulo.value,
        /*  rutImagen: image.value, */
        categoria: categories.value,
        contenido_publicacion: contetenido.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.estado === true) {
          Swal.fire({
            position: "top",
            title: "Se Modifico el post!",
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
  }

  // document.getElementById("frmPost").reset();
  bootstrap.Modal.getInstance(document.getElementById("addPostModal")).hide();
});
