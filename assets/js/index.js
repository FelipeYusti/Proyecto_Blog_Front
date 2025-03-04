let contenido = document.querySelector("#contenido");
const api1 = "http://127.0.0.1:4000/api/publicaciones";
//let bntFutbol = document.querySelector("#btnFutbol");

//Listar todos

document.addEventListener("DOMContentLoaded", function () {
  fetch(api1 + "/listarTodo")
    .then((data) => data.json())
    .then((data) => {
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
                  <button class="btn btn-outline-dark" id="toggle-comments-btn-${post.id}">Mostrar comentarios</button>
                  <div class="comment-list mt-3" id="comment-list-${post.id}" style="display: none">
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
              </div>
          `;
      });

      contenido.addEventListener("click", function (event) {
        if (event.target && event.target.id.startsWith("read-more-btn-")) {
          const postId = event.target.id.split("-")[3];
          const fullContent = document.getElementById(`full-content-${postId}`);
          const summary = document.getElementById(`summary-${postId}`);
          console.log("click");
          if (
            fullContent.style.display === "none" ||
            fullContent.style.display === ""
          ) {
            fullContent.style.display = "block";
            summary.style.display = "none";
            event.target.textContent = "Leer menos";
          } else {
            fullContent.style.display = "none";
            summary.style.display = "block";
            event.target.textContent = "Leer más";
          }
        }

        if (
          event.target &&
          event.target.id.startsWith("toggle-comments-btn-")
        ) {
          const postId = event.target.id.split("-")[3];
          const commentList = document.getElementById(`comment-list-${postId}`);
          if (commentList.style.display === "none") {
            commentList.style.display = "block";
            event.target.textContent = "Ocultar comentarios";
          } else {
            commentList.style.display = "none";
            event.target.textContent = "Mostrar comentarios";
          }
        }
      });
    });
});

//Botones categorias

document
  .getElementById("btnFutbol")
  .addEventListener("click", function (event) {
    event.preventDefault();
    contenido.innerHTML = "";
    fetch(api1 + "/listarPorCategoria/Futbol")
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
                  <button class="btn btn-outline-dark" id="toggle-comments-btn-${post.id}">Mostrar comentarios</button>
                  <div class="comment-list mt-3" id="comment-list-${post.id}" style="display: none">
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
                  <button class="btn btn-outline-dark" id="toggle-comments-btn-${post.id}">Mostrar comentarios</button>
                  <div class="comment-list mt-3" id="comment-list-${post.id}" style="display: none">
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
                  <button class="btn btn-outline-dark" id="toggle-comments-btn-${post.id}">Mostrar comentarios</button>
                  <div class="comment-list mt-3" id="comment-list-${post.id}" style="display: none">
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
                  <button class="btn btn-outline-dark" id="toggle-comments-btn-${post.id}">Mostrar comentarios</button>
                  <div class="comment-list mt-3" id="comment-list-${post.id}" style="display: none">
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
