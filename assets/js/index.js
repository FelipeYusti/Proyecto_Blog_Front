document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("userName")) {
    window.location.href = "login.html";
  } else {
    const api = "http://127.0.0.1:4000/api/publicaciones/"; // nos conectamos a la API
    const sesion = JSON.parse(sessionStorage.getItem("userName"));
    nameUser.innerHTML = sesion.user;
    const searchInput = document.getElementById("search-posts");
    const postsList = document.querySelector(".posts-list");
    let post = [];
    // Datos de posts simulados
    fetch(api + "listarPorIdPublicacion/" + sesion.user_id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.exito === true) {
          displayPosts(res.post);
        } else {
          console.log("no hay post");
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "El servidor no responde!",
          icon: "error",
          text: error,
        });
      });
    // Renderiza los posts en la interfaz
    function displayPosts(filteredPosts) {
      postsList.innerHTML = "";
      let indice = 0;

      filteredPosts.forEach((post) => {
        const postCard = document.createElement("div");
        const col = document.createElement("div");
        col.setAttribute("class", "col-md-10");
        postCard.classList.add("post-card");
        postCard.setAttribute("class", "article card mb-4 shadow-sm");
        postCard.innerHTML = `
         <!-- Imagen del post -->
              <img
                src="${post.rutImagen}"
                class="card-img-top"
                alt="Imagen del post"
                id="imagenPost"
                onerror="this.style.display='block'"
              />
  
              <div class="card-body">
                <h3 class="card-title">
                ${post.titulo}
                </h3>
                <p class="text-muted">
                  ${post.fecha_publicacion} por 
                </p>
                <p id="summary" class="card-text">
                ${post.sub_titulo}
                  
                </p>
                <p id="full-content" class="hidden-content">
                  ${post.contenido_publicacion}
                </p>
                <button class="btn btn-primary" id="read-more-btn">
                  Leer más
                </button>
              </div>
  
              <!-- Sección de Comentarios -->
              <div class="card-footer">
                <h5>Comentarios</h5>
                <button
                  class="btn btn-outline-dark"
                  id="toggle-comments-btn"
                >
                  Mostrar comentarios
                </button>
                <div
                  class="comment-list mt-3"
                  id="comment-list"
                  style="display: none"
                >
                  <div class="comment-item">
                    <strong>María Gómez:</strong>
                    <p>
                      ¡Gran artículo! Los consejos son muy útiles,
                      especialmente para mejorar la agilidad.
                    </p>
                  </div>
                  <div class="comment-item">
                    <strong>Carlos Martínez:</strong>
                    <p>
                      ¡Interesante enfoque! Definitivamente probaré estos
                      ejercicios.
                    </p>
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
                    <button type="submit" class="btn btn-success mt-2">
                      Enviar Comentario
                    </button>
                  </form>
                </div>
                <div
                    class="post-actions position-absolute rounded-pill top-0 end-0 m-1"
                  >
                    <button
                      class="btn btn-light btn-actions rounded-pill edit-button me-1" data-bs-toggle="modal" data-bs-target="#addPostModal"
                      data-id="${post._id}" data-action="edit"
                    >
                      <i
                        class="bi bi-pencil-square text-dark"
                        style="font-size: larger"
                      ></i>
                    </button>
                    <button
                      class="btn btn-danger btn-actions rounded-pill delete-button" id="delete-button" 
                      data-id="${post._id}"
                      data-action="delete"
                    >
                      <i
                        class="bi bi-trash3 text-dark"
                        style="font-size: larger"
                      ></i>
                    </button>
                  </div>
          </div>
      `;

        col.appendChild(postCard);
        postsList.appendChild(col);
      });
    }
    // Filtros de búsqueda
    /*  searchInput.addEventListener("input", function () {
      const query = searchInput.value.toLowerCase();
      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(query)
      );
      displayPosts(filteredPosts);
    }); */

    // Eventos para los botones de acción
    // Ordenar por título
    /*  document
      .getElementById("filter-title")
      .addEventListener("click", function () {
        posts.sort((a, b) => a.title.localeCompare(b.title));
        displayPosts(posts);
      });

    // Ordenar por fecha (simulado, en este caso sin cambios)
    document
      .getElementById("filter-date")
      .addEventListener("click", function () {
        alert("Ordenar por fecha aún no implementado.");
      });
 */
    // Inicializar la visualización
    displayPosts(post);
  }
  // DESPLIEGA LOS COMENTARIOS
  /* document
    .getElementById("toggle-comments-btn")
    .addEventListener("click", (e) => {
      e.preventDefault();
      let commentList = document.getElementById("comment-list");
      if (commentList.style.display === "none") {
        commentList.style.display = "block";
        this.textContent = "Ocultar comentarios";
      } else {
        commentList.style.display = "none";
        this.textContent = "Mostrar comentarios";
      }
    });
  //  "Leer más" : Despliega el resto del contenido
  document
    .getElementById("read-more-btn")
    .addEventListener("click", function () {
      let fullContent = document.getElementById("full-content");
      let summary = document.getElementById("summary");

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
    }); */
});
