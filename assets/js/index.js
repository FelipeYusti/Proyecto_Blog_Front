let contenido = document.querySelector("#contenido");
const api1 = "http://127.0.0.1:4000/api/publicaciones";
const api2 = "http://127.0.0.1:4000/api/comentarios";
//let bntFutbol = document.querySelector("#btnFutbol");
let botonValue = "";
let idPostForComments = "";
let idUsuario = "";

// Funcionalidad del tema

const button = document.getElementById("theme-toggle");

// Cambiar tema de la pagina
const currentTheme = localStorage.getItem("theme") || "light";

if (currentTheme === "dark") {
  document.body.classList.add("dark-theme");
  button.classList.add("dark-theme");
}

// Esto es para el tema

button.addEventListener("click", () => {
  // Alternar el tema
  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    button.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark-theme");
    button.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  }
});

//Listar todos

document.addEventListener("DOMContentLoaded", function () {
  fetch(api1 + "/listarTodo")
    .then((data) => data.json())
    .then((data) => {
      data.listarPublicaciones.forEach((post) => {
        contenido.innerHTML += `
          <div class="article card mb-4 shadow-sm" id="cardPost-${post._id}">
              <img
                src="https://universidadeuropea.com/resources/media/images/241009-master-alto-rendimiento-dep.2e16d0ba.fill-767x384.jpg"
                class="card-img-top"
                alt="Imagen del post"
                onerror="this.style.display='block'"
              />
              <div class="card-body">
                <h3 class="card-title">${post.titulo}</h3>
                <p class="text-muted">Publicado el ${post.fecha_publicacion} por Messi</p>
                <p id="summary-${post._id}" class="card-text">${post.sub_titulo}</p>
                <p id="full-content-${post._id}" class="hidden-content" style="display: none;">
                   ${post.contenido_publicacion}
                </p>
                <button class="btn btn-primary read-more-btn" data-id="${post._id}">Leer más</button>
              </div>
            
              <div class="card-footer">
                <h5>Comentarios</h5>
                <button class="btn btn-outline-dark toggle-comments-btn" data-id="${post._id}">Mostrar comentarios</button>
                <div class="comment-list mt-3" id="comment-list-${post._id}" style="display: none"></div>
                <div class="comment-input mt-3">
                  <form class="frmComentario" data-id="${post._id}">
                    <textarea class="form-control commentText" rows="3"  placeholder="Escribe tu comentario aquí..."></textarea>
                    <button type="submit" class="btn btn-success mt-2">Enviar Comentario</button>
                  </form>
                </div>
              </div>
          </div>
        `;
      });

      // Asignar eventos

      asignarEventosPublicaciones();
      asignarEventosFormulario();
    });
  function asignarEventosPublicaciones() {
    document.querySelectorAll(".read-more-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const postId = this.getAttribute("data-id");
        const fullContent = document.getElementById(`full-content-${postId}`);
        const summary = document.getElementById(`summary-${postId}`);

        if (
          fullContent.style.display === "none" ||
          fullContent.style.display === ""
        ) {
          fullContent.style.display = "block";
          summary.style.display = "none";
          this.textContent = "Leer menos";
        } else {
          fullContent.style.display = "none";
          summary.style.display = "block";
          this.textContent = "Leer más";
        }
      });
    });

    document.querySelectorAll(".toggle-comments-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const postId = this.getAttribute("data-id");
        const contenidoComentario = document.getElementById(
          `comment-list-${postId}`
        );

        fetch(api1 + `/obtenerComentarios/${postId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);

            contenidoComentario.innerHTML = "";

            if (data.datos && data.datos.length > 0) {
              data.datos.forEach((comentario) => {
                const nombreUsuario = comentario.usuario_id?.userName || "Usuario desconocido";

                let comentarioHTML = `
              <div class="comment-item">
                <div class="row">
                  <div class="col-8">
                    <strong>${nombreUsuario}:</strong>
                    <p>${comentario.contenido_comentario}</p>
                  </div>
                  <div class="col-4">`;

                if (nombreUsuario === "Daniel") {
                  comentarioHTML += `
                    <button class="btnEditar" data-id="${comentario._id}"><i class="bi bi-pen"></i></button>
                    <button class="btnEliminar" data-id="${comentario._id}"><i class="bi bi-trash3-fill"></i></button>
                  </div>
                </div>
              </div>`;
                } else {
                  comentarioHTML += `</div></div></div>`;
                }

                contenidoComentario.innerHTML += comentarioHTML;
              });
            } else {
              contenidoComentario.innerHTML = "<p>No hay comentarios aún.</p>";
            }
          })
          .catch((error) => console.error("Error al procesar los comentarios:", error));


        contenidoComentario.addEventListener("click", (event) => {
          // ELIMINAR COMENTARIO
          if (event.target.closest(".btnEliminar")) {
            const idEliminar = event.target.closest(".btnEliminar").dataset.id;

            console.log("Comentario a eliminar:", idEliminar);

            fetch(`${api2}/borrarPorId/${idEliminar}`, { method: "DELETE" })
              .then((res) => res.json())
              .then((data) => {
                if (data.estado === true) {
                  Swal.fire({
                    position: "top",
                    title: "Se eliminó correctamente el comentario!",
                    icon: "success",
                    text: data.mensaje,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                } else {
                  Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: data.mensaje,
                  });
                }
              })
              .catch((error) => console.error("Error al eliminar el comentario:", error));
          }

          // EDITAR COMENTARIO
          if (event.target.closest(".btnEditar")) {
            const idEditar = event.target.closest(".btnEditar").dataset.id;
            console.log("Editar comentario:", idEditar);

            // Obtener la instancia 
            const modalElement = document.getElementById("editComentario");
            const modalInstance = new bootstrap.Modal(modalElement);

            fetch(`${api2}/listarPorId/${idEditar}`)
              .then((res) => res.json())
              .then((data) => {
                console.log("Datos recibidos de la API:", data);

                if (data.Comentario && data.Comentario.length > 0) {
                  const comentario = data.Comentario[0];

                  const inputComentario = document.getElementById("comentarioUpdate");
                  inputComentario.value = comentario.contenido_comentario;

                  modalInstance.show();


                  const formComentario = document.getElementById("frmComentario");


                  formComentario.removeEventListener("submit", actualizarComentario);


                  formComentario.addEventListener("submit", function actualizarComentario(event) {
                    event.preventDefault();

                    console.log("Enviando actualización...");

                    fetch(api2 + "/actualizarPorId", {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        contenido_comentario: inputComentario.value, // Tomar el valor actualizado
                      }),
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        console.log("Respuesta del servidor:", res);

                        if (res.estado === true) {
                          Swal.fire({
                            position: "top",
                            title: "¡Comentario editado correctamente!",
                            icon: "success",
                            text: res.mensaje,
                            showConfirmButton: false,
                            timer: 1500,
                          });

                          modalInstance.hide(); // Cerrar modal 
                        } else {
                          Swal.fire({
                            title: "Error!",
                            icon: "error",
                            text: res.mensaje,
                          });
                        }
                      })
                      .catch((error) => console.error("Error al actualizar el comentario:", error));

                    formComentario.reset(); // Limpiar f
                  });
                }
              })
              .catch((error) => console.error("Error al obtener el comentario:", error));
          }
        });


        if (contenidoComentario.style.display === "none") {
          contenidoComentario.style.display = "block";
          this.textContent = "Ocultar comentarios";
        } else {
          contenidoComentario.style.display = "none";
          this.textContent = "Mostrar comentarios";
        }
      });
    });
  }

  function asignarEventosFormulario() {
    document.querySelectorAll(".frmComentario").forEach((form) => {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const postId = this.getAttribute("data-id");
        const commentText = this.querySelector(".commentText").value;

        const fecha = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };
        const fechaFormateada = fecha.toLocaleDateString("es-ES", options);

        fetch(api2 + "/nuevoComentario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post_id: postId,
            usuario_id: "67c1b8fd1d677275dc6fa4f7",
            contenido_comentario: commentText,
            fecha_comentario: fechaFormateada,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.estado === true) {
              Swal.fire({
                position: "top",
                title: "Se publicó correctamente el comentario!",
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

            this.reset();
          })
          .catch((err) => console.error("Error al enviar el comentario:", err));
      });
    });
  }
});

//Botones categorias

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btnFutbol")
    .addEventListener("click", function (event) {
      contenido.innerHTML = ""; // Limpiar contenido antes de insertar los nuevos posts

      fetch(api1 + "/listarPorCategoria/Futbol")
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          data.listarPublicaciones.forEach((post) => {
            contenido.innerHTML += `
              <div class="article card mb-4 shadow-sm" id="cardPost-${post._id}">
                  <img
                    src="https://universidadeuropea.com/resources/media/images/241009-master-alto-rendimiento-dep.2e16d0ba.fill-767x384.jpg"
                    class="card-img-top"
                    alt="Imagen del post"
                    onerror="this.style.display='block'"
                  />
                  <div class="card-body">
                    <h3 class="card-title">${post.titulo}</h3>
                    <p class="text-muted">Publicado el ${post.fecha_publicacion} por Messi</p>
                    <p id="summary-${post._id}" class="card-text">${post.sub_titulo}</p>
                    <p id="full-content-${post._id}" class="hidden-content" style="display: none;">
                       ${post.contenido_publicacion}
                    </p>
                    <button class="btn btn-primary read-more-btn" data-id="${post._id}">Leer más</button>
                  </div>
                
                  <div class="card-footer">
                    <h5>Comentarios</h5>
                    <button class="btn btn-outline-dark toggle-comments-btn" data-id="${post._id}">Mostrar comentarios</button>
                    <div class="comment-list mt-3" id="comment-list-${post._id}" style="display: none"></div>
                    <div class="comment-input mt-3">
                      <form class="frmComentario" data-id="${post._id}">
                        <textarea class="form-control commentText" rows="3" placeholder="Escribe tu comentario aquí..."></textarea>
                        <button type="submit" class="btn btn-success mt-2">Enviar Comentario</button>
                      </form>
                    </div>
                  </div>
              </div>
            `;
          });

          // 🔥 Reasignar eventos después de insertar los elementos
          asignarEventosPublicaciones();
          asignarEventosFormulario();
        });
    });

  function asignarEventosPublicaciones() {
    document.querySelectorAll(".read-more-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const postId = this.getAttribute("data-id");
        const fullContent = document.getElementById(`full-content-${postId}`);
        const summary = document.getElementById(`summary-${postId}`);

        if (
          fullContent.style.display === "none" ||
          fullContent.style.display === ""
        ) {
          fullContent.style.display = "block";
          summary.style.display = "none";
          this.textContent = "Leer menos";
        } else {
          fullContent.style.display = "none";
          summary.style.display = "block";
          this.textContent = "Leer más";
        }
      });
    });

    document.querySelectorAll(".toggle-comments-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const postId = this.getAttribute("data-id");
        const contenidoComentario = document.getElementById(
          `comment-list-${postId}`
        );

        fetch(api1 + `/obtenerComentarios/${postId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            contenidoComentario.innerHTML = "";

            data.datos.forEach((comentario) => {
              const nombreUsuario =
                comentario.usuario_id?.userName || "Usuario desconocido";

              contenidoComentario.innerHTML += `
                <div class="comment-item">
                  <strong>${nombreUsuario}:</strong>
                  <p>${comentario.contenido_comentario}</p>
                </div>`;
            });
          })
          .catch((error) =>
            console.error("Error al procesar los comentarios:", error)
          );

        if (contenidoComentario.style.display === "none") {
          contenidoComentario.style.display = "block";
          this.textContent = "Ocultar comentarios";
        } else {
          contenidoComentario.style.display = "none";
          this.textContent = "Mostrar comentarios";
        }
      });
    });
  }

  function asignarEventosFormulario() {
    document.querySelectorAll(".frmComentario").forEach((form) => {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const postId = this.getAttribute("data-id");
        const commentText = this.querySelector(".commentText").value;

        const fecha = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };
        const fechaFormateada = fecha.toLocaleDateString("es-ES", options);

        fetch(api2 + "/nuevoComentario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post_id: postId,
            usuario_id: "67ca06bf422f0ceaa5b33ecc",
            contenido_comentario: commentText,
            fecha_comentario: fechaFormateada,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.estado === true) {
              Swal.fire({
                position: "top",
                title: "Se publicó correctamente el comentario!",
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

            this.reset();
          })
          .catch((err) => console.error("Error al enviar el comentario:", err));
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btnBaloncesto")
    .addEventListener("click", function (event) {
      contenido.innerHTML = ""; // Limpiar contenido antes de insertar los nuevos posts

      fetch(api1 + "/listarPorCategoria/Baloncesto")
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          data.listarPublicaciones.forEach((post) => {
            contenido.innerHTML += `
              <div class="article card mb-4 shadow-sm" id="cardPost-${post._id}">
                  <img
                    src="https://universidadeuropea.com/resources/media/images/241009-master-alto-rendimiento-dep.2e16d0ba.fill-767x384.jpg"
                    class="card-img-top"
                    alt="Imagen del post"
                    onerror="this.style.display='block'"
                  />
                  <div class="card-body">
                    <h3 class="card-title">${post.titulo}</h3>
                    <p class="text-muted">Publicado el ${post.fecha_publicacion} por Messi</p>
                    <p id="summary-${post._id}" class="card-text">${post.sub_titulo}</p>
                    <p id="full-content-${post._id}" class="hidden-content" style="display: none;">
                       ${post.contenido_publicacion}
                    </p>
                    <button class="btn btn-primary read-more-btn" data-id="${post._id}">Leer más</button>
                  </div>
                
                  <div class="card-footer">
                    <h5>Comentarios</h5>
                    <button class="btn btn-outline-dark toggle-comments-btn" data-id="${post._id}">Mostrar comentarios</button>
                    <div class="comment-list mt-3" id="comment-list-${post._id}" style="display: none"></div>
                    <div class="comment-input mt-3">
                      <form class="frmComentario" data-id="${post._id}">
                        <textarea class="form-control commentText" rows="3" placeholder="Escribe tu comentario aquí..."></textarea>
                        <button type="submit" class="btn btn-success mt-2">Enviar Comentario</button>
                      </form>
                    </div>
                  </div>
              </div>
            `;
          });

          // 🔥 Reasignar eventos después de insertar los elementos
          asignarEventosPublicaciones();
          asignarEventosFormulario();
        });
    });

  function asignarEventosPublicaciones() {
    document.querySelectorAll(".read-more-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const postId = this.getAttribute("data-id");
        const fullContent = document.getElementById(`full-content-${postId}`);
        const summary = document.getElementById(`summary-${postId}`);

        if (
          fullContent.style.display === "none" ||
          fullContent.style.display === ""
        ) {
          fullContent.style.display = "block";
          summary.style.display = "none";
          this.textContent = "Leer menos";
        } else {
          fullContent.style.display = "none";
          summary.style.display = "block";
          this.textContent = "Leer más";
        }
      });
    });

    document.querySelectorAll(".toggle-comments-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const postId = this.getAttribute("data-id");
        const contenidoComentario = document.getElementById(
          `comment-list-${postId}`
        );

        fetch(api1 + `/obtenerComentarios/${postId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            contenidoComentario.innerHTML = "";

            data.datos.forEach((comentario) => {
              const nombreUsuario =
                comentario.usuario_id?.userName || "Usuario desconocido";

              contenidoComentario.innerHTML += `
                <div class="comment-item">
                  <strong>${nombreUsuario}:</strong>
                  <p>${comentario.contenido_comentario}</p>
                </div>`;
            });
          })
          .catch((error) =>
            console.error("Error al procesar los comentarios:", error)
          );

        if (contenidoComentario.style.display === "none") {
          contenidoComentario.style.display = "block";
          this.textContent = "Ocultar comentarios";
        } else {
          contenidoComentario.style.display = "none";
          this.textContent = "Mostrar comentarios";
        }
      });
    });
  }

  function asignarEventosFormulario() {
    document.querySelectorAll(".frmComentario").forEach((form) => {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const postId = this.getAttribute("data-id");
        const commentText = this.querySelector(".commentText").value;

        const fecha = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };
        const fechaFormateada = fecha.toLocaleDateString("es-ES", options);

        fetch(api2 + "/nuevoComentario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post_id: postId,
            usuario_id: "67ca06bf422f0ceaa5b33ecc",
            contenido_comentario: commentText,
            fecha_comentario: fechaFormateada,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.estado === true) {
              Swal.fire({
                position: "top",
                title: "Se publicó correctamente el comentario!",
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

            this.reset();
          })
          .catch((err) => console.error("Error al enviar el comentario:", err));
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btnTenis")
    .addEventListener("click", function (event) {
      contenido.innerHTML = ""; // Limpiar contenido antes de insertar los nuevos posts

      fetch(api1 + "/listarPorCategoria/Tenis")
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          data.listarPublicaciones.forEach((post) => {
            contenido.innerHTML += `
              <div class="article card mb-4 shadow-sm" id="cardPost-${post._id}">
                  <img
                    src="https://universidadeuropea.com/resources/media/images/241009-master-alto-rendimiento-dep.2e16d0ba.fill-767x384.jpg"
                    class="card-img-top"
                    alt="Imagen del post"
                    onerror="this.style.display='block'"
                  />
                  <div class="card-body">
                    <h3 class="card-title">${post.titulo}</h3>
                    <p class="text-muted">Publicado el ${post.fecha_publicacion} por Messi</p>
                    <p id="summary-${post._id}" class="card-text">${post.sub_titulo}</p>
                    <p id="full-content-${post._id}" class="hidden-content" style="display: none;">
                       ${post.contenido_publicacion}
                    </p>
                    <button class="btn btn-primary read-more-btn" data-id="${post._id}">Leer más</button>
                  </div>
                
                  <div class="card-footer">
                    <h5>Comentarios</h5>
                    <button class="btn btn-outline-dark toggle-comments-btn" data-id="${post._id}">Mostrar comentarios</button>
                    <div class="comment-list mt-3" id="comment-list-${post._id}" style="display: none"></div>
                    <div class="comment-input mt-3">
                      <form class="frmComentario" data-id="${post._id}">
                        <textarea class="form-control commentText" rows="3" placeholder="Escribe tu comentario aquí..."></textarea>
                        <button type="submit" class="btn btn-success mt-2">Enviar Comentario</button>
                      </form>
                    </div>
                  </div>
              </div>
            `;
          });

          // 🔥 Reasignar eventos después de insertar los elementos
          asignarEventosPublicaciones();
          asignarEventosFormulario();
        });
    });

  function asignarEventosPublicaciones() {
    document.querySelectorAll(".read-more-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const postId = this.getAttribute("data-id");
        const fullContent = document.getElementById(`full-content-${postId}`);
        const summary = document.getElementById(`summary-${postId}`);

        if (
          fullContent.style.display === "none" ||
          fullContent.style.display === ""
        ) {
          fullContent.style.display = "block";
          summary.style.display = "none";
          this.textContent = "Leer menos";
        } else {
          fullContent.style.display = "none";
          summary.style.display = "block";
          this.textContent = "Leer más";
        }
      });
    });

    document.querySelectorAll(".toggle-comments-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const postId = this.getAttribute("data-id");
        const contenidoComentario = document.getElementById(
          `comment-list-${postId}`
        );

        fetch(api1 + `/obtenerComentarios/${postId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            contenidoComentario.innerHTML = "";

            data.datos.forEach((comentario) => {
              const nombreUsuario =
                comentario.usuario_id?.userName || "Usuario desconocido";

              contenidoComentario.innerHTML += `
                <div class="comment-item">
                  <strong>${nombreUsuario}:</strong>
                  <p>${comentario.contenido_comentario}</p>
                </div>`;
            });
          })
          .catch((error) =>
            console.error("Error al procesar los comentarios:", error)
          );

        if (contenidoComentario.style.display === "none") {
          contenidoComentario.style.display = "block";
          this.textContent = "Ocultar comentarios";
        } else {
          contenidoComentario.style.display = "none";
          this.textContent = "Mostrar comentarios";
        }
      });
    });
  }

  function asignarEventosFormulario() {
    document.querySelectorAll(".frmComentario").forEach((form) => {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const postId = this.getAttribute("data-id");
        const commentText = this.querySelector(".commentText").value;

        const fecha = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };
        const fechaFormateada = fecha.toLocaleDateString("es-ES", options);

        fetch(api2 + "/nuevoComentario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post_id: postId,
            usuario_id: "67ca06bf422f0ceaa5b33ecc",
            contenido_comentario: commentText,
            fecha_comentario: fechaFormateada,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.estado === true) {
              Swal.fire({
                position: "top",
                title: "Se publicó correctamente el comentario!",
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

            this.reset();
          })
          .catch((err) => console.error("Error al enviar el comentario:", err));
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btnAtletismo")
    .addEventListener("click", function (event) {
      contenido.innerHTML = ""; // Limpiar contenido antes de insertar los nuevos posts

      fetch(api1 + "/listarPorCategoria/Atletismo")
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          data.listarPublicaciones.forEach((post) => {
            contenido.innerHTML += `
              <div class="article card mb-4 shadow-sm" id="cardPost-${post._id}">
                  <img
                    src="https://universidadeuropea.com/resources/media/images/241009-master-alto-rendimiento-dep.2e16d0ba.fill-767x384.jpg"
                    class="card-img-top"
                    alt="Imagen del post"
                    onerror="this.style.display='block'"
                  />
                  <div class="card-body">
                    <h3 class="card-title">${post.titulo}</h3>
                    <p class="text-muted">Publicado el ${post.fecha_publicacion} por Messi</p>
                    <p id="summary-${post._id}" class="card-text">${post.sub_titulo}</p>
                    <p id="full-content-${post._id}" class="hidden-content" style="display: none;">
                       ${post.contenido_publicacion}
                    </p>
                    <button class="btn btn-primary read-more-btn" data-id="${post._id}">Leer más</button>
                  </div>
                
                  <div class="card-footer">
                    <h5>Comentarios</h5>
                    <button class="btn btn-outline-dark toggle-comments-btn" data-id="${post._id}">Mostrar comentarios</button>
                    <div class="comment-list mt-3" id="comment-list-${post._id}" style="display: none"></div>
                    <div class="comment-input mt-3">

                      <form class="frmComentario" data-id="${post._id}">
                        <textarea class="form-control commentText" rows="3" placeholder="Escribe tu comentario aquí..."></textarea>
                        <button type="submit" class="btn btn-success mt-2">Enviar Comentario</button>
                      </form>
                    </div>
                  </div>
              </div>
            `;
          });

          asignarEventosPublicaciones();
          asignarEventosFormulario();
        });
    });

  function asignarEventosPublicaciones() {
    document.querySelectorAll(".read-more-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const postId = this.getAttribute("data-id");
        const fullContent = document.getElementById(`full-content-${postId}`);
        const summary = document.getElementById(`summary-${postId}`);

        if (
          fullContent.style.display === "none" ||
          fullContent.style.display === ""
        ) {
          fullContent.style.display = "block";
          summary.style.display = "none";
          this.textContent = "Leer menos";
        } else {
          fullContent.style.display = "none";
          summary.style.display = "block";
          this.textContent = "Leer más";
        }
      });
    });

    document.querySelectorAll(".toggle-comments-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const postId = this.getAttribute("data-id");
        const contenidoComentario = document.getElementById(
          `comment-list-${postId}`
        );

        fetch(api1 + `/obtenerComentarios/${postId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            contenidoComentario.innerHTML = "";

            data.datos.forEach((comentario) => {
              const nombreUsuario =
                comentario.usuario_id?.userName || "Usuario desconocido";

              contenidoComentario.innerHTML += `
                <div class="comment-item">
                  <strong>${nombreUsuario}:</strong>
                  <p>${comentario.contenido_comentario}</p>
                </div>`;
            });
          })
          .catch((error) =>
            console.error("Error al procesar los comentarios:", error)
          );

        if (contenidoComentario.style.display === "none") {
          contenidoComentario.style.display = "block";
          this.textContent = "Ocultar comentarios";
        } else {
          contenidoComentario.style.display = "none";
          this.textContent = "Mostrar comentarios";
        }
      });
    });
  }

  function asignarEventosFormulario() {
    document.querySelectorAll(".frmComentario").forEach((form) => {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const postId = this.getAttribute("data-id");
        const commentText = this.querySelector(".commentText").value;

        const fecha = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };
        const fechaFormateada = fecha.toLocaleDateString("es-ES", options);

        fetch(api2 + "/nuevoComentario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post_id: postId,
            usuario_id: "67ca06bf422f0ceaa5b33ecc",
            contenido_comentario: commentText,
            fecha_comentario: fechaFormateada,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.estado === true) {
              Swal.fire({
                position: "top",
                title: "Se publicó correctamente el comentario!",
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

            this.reset();
          })
          .catch((err) => console.error("Error al enviar el comentario:", err));
      });
    });
  }
});
