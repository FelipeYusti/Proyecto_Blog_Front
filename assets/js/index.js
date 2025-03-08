let contenido = document.querySelector("#contenido");
const api1 = "http://127.0.0.1:4000/api/publicaciones";
const api2 = "http://127.0.0.1:4000/api/comentarios";
//let bntFutbol = document.querySelector("#btnFutbol");
let botonValue = "";
let idPostForComments = "";
let idUsuario = '';

// Funcionalidad del tema

const button = document.getElementById("theme-toggle");

// Cambiar tema de la pagina
// Comprobar el tema actual y aplicarlo
const currentTheme = localStorage.getItem("theme") || "light";

if (currentTheme === "dark") {
  document.body.classList.add("dark-theme");
  button.classList.add("dark-theme");
}

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
                    <textarea class="form-control commentText" rows="3" placeholder="Escribe tu comentario aquí..."></textarea>
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
    });

    document.querySelectorAll(".toggle-comments-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const postId = this.getAttribute("data-id");
        const contenidoComentario = document.getElementById(`comment-list-${postId}`);

        fetch(api1 + `/obtenerComentarios/${postId}`)
          .then((data) => data.json())
          .then((data) => {
            contenidoComentario.innerHTML = "";
            data.datos.forEach((comentarios) => {
              const nombreUsuario = comentarios.usuario_id ? comentarios.usuario_id.userName : "Usuario desconocido";

              contenidoComentario.innerHTML += `
                <div class="comment-item">
                  <strong>${nombreUsuario}:</strong>
                  <p>${comentarios.contenido_comentario}</p>
                </div>`;
            });
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

        fetch(api1 + "nuevoComentario", {
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





document
  .getElementById("btnBaloncesto")
  .addEventListener("click", function (event) {
    event.preventDefault();
    contenido.innerHTML = "";
    fetch(api1 + "/listarPorCategoria/Baloncesto")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        data.listarPublicaciones.forEach((post) => {
          contenido.innerHTML += `
       <div class="article card mb-4 shadow-sm" id="cardPost-${post.id}">
                <!-- Imagen del post -->
                <img
                  src="https://universidadeuropea.com/resources/media/images/241009-master-alto-rendimiento-dep.2e16d0ba.fill-767x384.jpg"
                  class="card-img-top"
                  alt="Imagen del post"
                  onerror="this.style.display='block'"
                />
              
                <div class="card-body">
                  <h3 class="card-title">${post.titulo}</h3>
                  <p class="text-muted">Publicado el ${post.fecha_publicacion} por Messi</p>
                  <p id="summary-${post.id}" class="card-text">
                  ${post.sub_titulo}
                  </p>
                  <p id="full-content-${post.id}" class="hidden-content" style="display: none;">
                     ${post.contenido_publicacion}
                  </p>
                  <button class="btn btn-primary" id="read-more-btn-${post.id}">Leer más</button>
                </div>
              
                <!-- Sección de Comentarios -->

                <div class="card-footer">
                  <h5>Comentarios</h5>
              <button class="btn btn-outline-dark" name="comentario${post._id}" data-id="${post._id}" value="${post._id}" id="toggle-comments-btn-${post._id}">Mostrar comentarios</button>
                  <div class="comment-list mt-3" id="comment-list-${post._id}" style="display: none">
                    <div class="comment-item">
                      <strong>María Gómez:</strong>
                      <p>¡Gran artículo! Los consejos son muy útiles, especialmente para mejorar la agilidad.</p>
                    </div>
                    <div class="comment-item">
                      <strong>Carlos Martínez:</strong>
                      <p>¡Interesante enfoque! Definitivamente probaré estos ejercicios.</p>
                    </div>
                  </div>
                  <div class="comment-input mt-3">
                    <form>
                      <textarea
                        class="form-control"
                        id="commentText"
                        rows="3"
                        placeholder="Escribe tu comentario aquí..."
                      ></textarea>
                      <button type="submit" class="btn btn-success mt-2">Enviar Comentario</button>
                    </form>
                  </div>
                </div>
              </div>`;
        });
      });
  });

document.getElementById("btnTenis").addEventListener("click", function (event) {
  event.preventDefault();
  contenido.innerHTML = "";
  fetch(api1 + "/listarPorCategoria/Tenis")
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      data.listarPublicaciones.forEach((post) => {
        contenido.innerHTML += `
         <div class="article card mb-4 shadow-sm" id="cardPost-${post.id}">
                <!-- Imagen del post -->
                <img
                  src="https://universidadeuropea.com/resources/media/images/241009-master-alto-rendimiento-dep.2e16d0ba.fill-767x384.jpg"
                  class="card-img-top"
                  alt="Imagen del post"
                  onerror="this.style.display='block'"
                />
              
                <div class="card-body">
                  <h3 class="card-title">${post.titulo}</h3>
                  <p class="text-muted">Publicado el ${post.fecha_publicacion} por Messi</p>
                  <p id="summary-${post.id}" class="card-text">
                  ${post.sub_titulo}
                  </p>
                  <p id="full-content-${post.id}" class="hidden-content" style="display: none;">
                     ${post.contenido_publicacion}
                  </p>
                  <button class="btn btn-primary" id="read-more-btn-${post.id}">Leer más</button>
                </div>
              
                <!-- Sección de Comentarios -->

                <div class="card-footer">
                  <h5>Comentarios</h5>
              <button class="btn btn-outline-dark" name="comentario${post._id}" data-id="${post._id}" value="${post._id}" id="toggle-comments-btn-${post._id}">Mostrar comentarios</button>
                  <div class="comment-list mt-3" id="comment-list-${post._id}" style="display: none">
                    <div class="comment-item">
                      <strong>María Gómez:</strong>
                      <p>¡Gran artículo! Los consejos son muy útiles, especialmente para mejorar la agilidad.</p>
                    </div>
                    <div class="comment-item">
                      <strong>Carlos Martínez:</strong>
                      <p>¡Interesante enfoque! Definitivamente probaré estos ejercicios.</p>
                    </div>
                  </div>
                  <div class="comment-input mt-3">
                    <form>
                      <textarea
                        class="form-control"
                        id="commentText"
                        rows="3"
                        placeholder="Escribe tu comentario aquí..."
                      ></textarea>
                      <button type="submit" class="btn btn-success mt-2">Enviar Comentario</button>
                    </form>
                  </div>
                </div>
              </div>`;
      });
    });
});

document
  .getElementById("btnAtletismo")
  .addEventListener("click", function (event) {
    event.preventDefault();
    contenido.innerHTML = "";
    fetch(api1 + "/listarPorCategoria/Atletismo")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        data.listarPublicaciones.forEach((post) => {
          contenido.innerHTML += `
         <div class="article card mb-4 shadow-sm" id="cardPost-${post.id}">
                <!-- Imagen del post -->
                <img
                  src="https://universidadeuropea.com/resources/media/images/241009-master-alto-rendimiento-dep.2e16d0ba.fill-767x384.jpg"
                  class="card-img-top"
                  alt="Imagen del post"
                  onerror="this.style.display='block'"
                />
              
                <div class="card-body">
                  <h3 class="card-title">${post.titulo}</h3>
                  <p class="text-muted">Publicado el ${post.fecha_publicacion} por Messi</p>
                  <p id="summary-${post.id}" class="card-text">
                  ${post.sub_titulo}
                  </p>
                  <p id="full-content-${post.id}" class="hidden-content" style="display: none;">
                     ${post.contenido_publicacion}
                  </p>
                  <button class="btn btn-primary" id="read-more-btn-${post.id}">Leer más</button>
                </div>
              
                <!-- Sección de Comentarios -->

                <div class="card-footer">
                  <h5>Comentarios</h5>
              <button class="btn btn-outline-dark" name="comentario${post._id}" data-id="${post._id}" value="${post._id}" id="toggle-comments-btn-${post._id}">Mostrar comentarios</button>
                  <div class="comment-list mt-3" id="comment-list-${post._id}" style="display: none">
                    <div class="comment-item">
                      <strong>María Gómez:</strong>
                      <p>¡Gran artículo! Los consejos son muy útiles, especialmente para mejorar la agilidad.</p>
                    </div>
                    <div class="comment-item">
                      <strong>Carlos Martínez:</strong>
                      <p>¡Interesante enfoque! Definitivamente probaré estos ejercicios.</p>
                    </div>
                  </div>
                  <div class="comment-input mt-3">
                    <form>
                      <textarea
                        class="form-control"
                        id="commentText"
                        rows="3"
                        placeholder="Escribe tu comentario aquí..."
                      ></textarea>
                      <button type="submit" class="btn btn-success mt-2">Enviar Comentario</button>
                    </form>
                  </div>
                </div>
              </div>`;
        });
      });
  });


// ============================ EVENTOS PUBLICACIONES Y TAMBIEN HACE LA FUNCION DE VER COMENTARIOS Y LEER MAS=========================

function asignarEventosPublicaciones() {
  contenido.addEventListener("click", function (event) {
    // Leer más
    if (event.target.classList.contains("read-more-btn")) {
      const postId = event.target.getAttribute("data-id");
      const fullContent = document.getElementById(`full-content-${postId}`);
      const summary = document.getElementById(`summary-${postId}`);

      if (fullContent.style.display === "none" || fullContent.style.display === "") {
        fullContent.style.display = "block";
        summary.style.display = "none";
        event.target.textContent = "Leer menos";
      } else {
        fullContent.style.display = "none";
        summary.style.display = "block";
        event.target.textContent = "Leer más";
      }
    }

    // Mostrar comentarios

    if (event.target.classList.contains("toggle-comments-btn")) {
      const postId = event.target.getAttribute("data-id");
      const contenidoComentario = document.getElementById(`comment-list-${postId}`);


      fetch(api1 + `/obtenerComentarios/${postId}`)
        .then((data) => data.json())
        .then((data) => {
          contenidoComentario.innerHTML = "";

          data.datos.forEach((comentarios) => {
            const nombreUsuario = comentarios.usuario_id ? comentarios.usuario_id.userName : "Usuario desconocido";

            contenidoComentario.innerHTML += `
            <div class="comment-item">
              <strong>${nombreUsuario}:</strong>
              <p>${comentarios.contenido_comentario}</p>
            </div>`;
          });
        })
        .catch((err) => console.error("Error al cargar comentarios:", err));


      if (contenidoComentario.style.display === "none") {
        contenidoComentario.style.display = "block";
        event.target.textContent = "Ocultar comentarios";
      } else {
        contenidoComentario.style.display = "none";
        event.target.textContent = "Mostrar comentarios";
      }
    }
  });
}


// Con esto asigno cada formulario 

function asignarEventosFormulario() {
  const formularios = document.querySelectorAll(".frmComentario");

  formularios.forEach((form) => {
    form.addEventListener("submit", enviarComentario);
  });
}


function enviarComentario(event) {
  event.preventDefault();

  const frmComentario = event.target;
  const idPostForComments = frmComentario.getAttribute("data-id");
  const contenidoComentario = frmComentario.querySelector(".commentText").value;

  console.log(`ID del post: ${idPostForComments}`);
  console.log(`Comentario: ${contenidoComentario}`);

  const fecha = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  fetch(api2 + "/nuevoComentario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: idPostForComments,
      usuario_id: "67ca06bf422f0ceaa5b33ecc",
      contenido_comentario: contenidoComentario,
      fecha_comentario: fecha,
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
        frmComentario.reset();
      } else {
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: res.mensaje,
        });
      }
    })
    .catch((err) => console.error("Error al enviar el comentario:", err));
}