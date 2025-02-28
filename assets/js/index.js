let contenido = document.querySelector("#contenido");
const api1 = "http://127.0.0.1:4000/api/publicaciones";

document.addEventListener("DOMContentLoaded", function () {
  fetch(api1 + "/listarTodo")
    .then((data) => data.json())
    .then((data) => {
      console.log("Publicaciones cargadas:", data);

      // Verificar si la estructura de datos es correcta
      if (Array.isArray(data.listarPublicaciones)) {
        data.listarPublicaciones.forEach((post) => {
          console.log("Procesando publicación:", post);

          // Crear el HTML para cada publicación
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
                ${post.contenido_publicacion}
                </p>
                <p id="full-content-${post.id}" class="hidden-content" style="display: none;">
                  Para mejorar tu rendimiento en el fútbol, es fundamental centrarse en el entrenamiento de resistencia y agilidad. Ejercicios como los cambios de dirección, sprints y entrenamiento con balón pueden marcar la diferencia en tu juego. Además, es clave mantener una buena alimentación y descanso adecuado para rendir al máximo.
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

          // Asignar evento para "Leer más"
          const readMoreButton = document.getElementById(
            `read-more-btn-${post.id}`
          );
          console.log("Botón 'Leer más' encontrado:", readMoreButton);

          if (readMoreButton) {
            readMoreButton.addEventListener("click", function () {
              const fullContent = document.getElementById(
                `full-content-${post.id}`
              );
              const summary = document.getElementById(`summary-${post.id}`);

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
          } else {
            console.log(`Botón de 'Leer más' no encontrado para el post `);
          }

          // Asignar evento para "Mostrar/Ocultar comentarios"
          const toggleButton = document.getElementById(
            `toggle-comments-btn-${post.id}`
          );
          console.log("Botón de comentarios encontrado:", toggleButton);

          if (toggleButton) {
            toggleButton.addEventListener("click", function () {
              const commentList = document.getElementById(
                `comment-list-${post.id}`
              );
              if (commentList.style.display === "none") {
                commentList.style.display = "block";
                this.textContent = "Ocultar comentarios";
              } else {
                commentList.style.display = "none";
                this.textContent = "Mostrar comentarios";
              }
            });
          } else {
            console.log(
              `Botón de comentarios no encontrado para el post ${post.id}`
            );
          }
        });
      } else {
        console.log("Error: No se encontró la lista de publicaciones");
      }
    })
    .catch((error) => {
      console.error("Error al obtener las publicaciones:", error);
    });
});
