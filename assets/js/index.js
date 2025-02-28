let contenido = document.querySelector("#contenido");
const api = "http://127.0.0.1:4000/api/publicaciones";

function listFichas() {
  fetch(api + "/listarTodo")
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      data.listarPublicaciones.map((post) => {
        contenido.innerHTML += `
        <div class="article card mb-4 shadow-sm">
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
              <p id="summary" class="card-text">
              ${post.contenido_publicacion}
              </p>
              <p id="full-content" class="hidden-content">
                Para mejorar tu rendimiento en el fútbol, es fundamental centrarse en el entrenamiento de
                resistencia y agilidad. Ejercicios como los cambios de dirección, sprints y entrenamiento con
                balón pueden marcar la diferencia en tu juego. Además, es clave mantener una buena
                alimentación y descanso adecuado para rendir al máximo.
              </p>
              <button class="btn btn-primary" id="read-more-btn">Leer más</button>
            </div>
          
            <!-- Sección de Comentarios -->
            <div class="card-footer">
              <h5>Comentarios</h5>
              <button class="btn btn-outline-dark" id="toggle-comments-btn">Mostrar comentarios</button>
              <div class="comment-list mt-3" id="comment-list" style="display: none">
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
    });
}
listFichas();
