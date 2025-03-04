document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("userName")) {
    window.location.href = "login.html";
  } else {
    const sesion = JSON.parse(sessionStorage.getItem("userName"));
    nameUser.innerHTML = sesion.user;
    const searchInput = document.getElementById("search-posts");
    const postsList = document.querySelector(".posts-list");

    // Datos de posts simulados
    let posts = [
      {
        _id: "1",
        autor_id: "1",
        titulo: "El futuro del fútbol tras la Copa del Mundo",
        sub_titulo:
          "Análisis de las nuevas generaciones y su impacto en el fútbol mundial",
        contenido_publicacion:
          "El fútbol continúa evolucionando a medida que nuevas generaciones de jugadores irrumpen en la escena internacional. Equipos de todo el mundo buscan adaptarse a las nuevas tácticas y formas de juego...",
        categoria: "Fútbol",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-04",
      },
      {
        _id: "2",
        autor_id: "2",
        titulo: "Grand Slam: El dominio de los grandes tenistas",
        sub_titulo:
          "Roger Federer, Rafael Nadal y Novak Djokovic siguen liderando el tenis mundial",
        contenido_publicacion:
          "A pesar de los años, los tres grandes del tenis continúan dominando los torneos más importantes del circuito. Sus enfrentamientos en los Grand Slams se han convertido en un espectáculo imperdible...",
        categoria: "Tenis",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-04",
      },
      {
        _id: "5",
        autor_id: "3",
        titulo: "La NBA se prepara para los playoffs",
        sub_titulo:
          "Equipos como los Lakers y los Bucks están listos para la fase decisiva de la temporada",
        contenido_publicacion:
          "Con la temporada regular de la NBA llegando a su fin, los equipos de élite están afinando sus estrategias para los playoffs. Los Lakers, liderados por LeBron James, se perfilan como favoritos para el título...",
        categoria: "Baloncesto",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-04",
      },
      {
        _id: "7",
        autor_id: "4",
        titulo: "Atletismo: El nuevo récord mundial de 100 metros",
        sub_titulo:
          "Un joven velocista logra una marca histórica en la disciplina",
        contenido_publicacion:
          "El joven corredor ha sorprendido al mundo con su tiempo récord en los 100 metros. Con una impresionante marca de 9.56 segundos, ha dejado atrás a algunos de los mejores atletas de todos los tiempos...",
        categoria: "Atletismo",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-04",
      },
      {
        _id: "8",
        autor_id: "5",
        titulo: "Los secretos de la selección nacional de fútbol",
        sub_titulo:
          "Una mirada detrás de los entrenamientos y la mentalidad ganadora",
        contenido_publicacion:
          "El equipo nacional ha dado un paso más en su camino hacia la gloria. A través de entrenamientos rigurosos y estrategias innovadoras, están preparados para enfrentarse a los equipos más poderosos del mundo...",
        categoria: "Fútbol",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-05",
      },
      {
        _id: "9",
        autor_id: "6",
        titulo: "El auge de los tenistas jóvenes en el circuito ATP",
        sub_titulo: "Nuevas estrellas emergen y desafían a los veteranos",
        contenido_publicacion:
          "La juventud está dominando el circuito ATP, con nuevos jugadores que están haciendo historia con su rapidez y habilidad. Conozca a los tenistas que están remodelando el tenis...",
        categoria: "Tenis",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-06",
      },
      {
        _id: "11",
        autor_id: "7",
        titulo: "La evolución de los uniformes en la NBA",
        sub_titulo:
          "Desde los años 80 hasta la actualidad, el diseño ha cambiado radicalmente",
        contenido_publicacion:
          "La vestimenta de los jugadores de baloncesto no solo ha sido una cuestión de estilo, sino también de funcionalidad. El uso de materiales avanzados ha ayudado a mejorar el rendimiento en la cancha...",
        categoria: "Baloncesto",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-07",
      },
      {
        _id: "10",
        autor_id: "8",
        titulo: "Atletismo: La carrera por los Juegos Olímpicos de París 2024",
        sub_titulo:
          "Los mejores atletas luchan por un puesto en la competencia mundial",
        contenido_publicacion:
          "Con los Juegos Olímpicos de París a la vuelta de la esquina, los atletas de todo el mundo están intensificando su preparación para asegurar un lugar en la competencia más grande del planeta...",
        categoria: "Atletismo",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-08",
      },
      {
        _id: "14",
        autor_id: "9",
        titulo: "El impacto del VAR en el fútbol moderno",
        sub_titulo:
          "Un análisis del uso del video arbitraje en las competiciones internacionales",
        contenido_publicacion:
          "El VAR ha cambiado la forma en que se toman las decisiones en el fútbol. Con su implementación, los árbitros tienen la capacidad de revisar jugadas polémicas, lo que ha generado debate entre jugadores, entrenadores y fanáticos...",
        categoria: "Fútbol",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-09",
      },
      {
        _id: "14",
        autor_id: "10",
        titulo: "Los grandes duelos del tenis femenino",
        sub_titulo:
          "Grandes rivalidades como Serena Williams vs. Venus Williams",
        contenido_publicacion:
          "El tenis femenino ha visto algunas de las rivalidades más intensas de todos los tiempos. La competencia entre jugadoras ha llevado el tenis a nuevos niveles de emoción y drama...",
        categoria: "Tenis",

        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-10",
      },
      {
        _id: "14",
        autor_id: "11",
        titulo: "La historia de los Chicago Bulls en los 90",
        sub_titulo:
          "Un recorrido por la dinastía más dominante en la historia de la NBA",
        contenido_publicacion:
          "Los Chicago Bulls, bajo la dirección de Michael Jordan, dominaron la NBA durante los años 90. Con seis campeonatos en ocho años, su legado sigue vivo en los corazones de los fanáticos...",
        categoria: "Baloncesto",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-11",
      },
      {
        _id: "14",
        autor_id: "12",
        titulo: "El atletismo y la tecnología: un futuro prometedor",
        sub_titulo:
          "Cómo la tecnología está transformando el entrenamiento y rendimiento de los atletas",
        contenido_publicacion:
          "La innovación tecnológica está cambiando la manera en que los atletas entrenan, desde el uso de sensores en las zapatillas hasta los avances en el análisis de datos para mejorar el rendimiento...",
        categoria: "Atletismo",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-12",
      },
      {
        _id: "14",
        autor_id: "13",
        titulo: "Fútbol femenino: un deporte en crecimiento",
        sub_titulo:
          "El aumento de la visibilidad y popularidad del fútbol femenino en todo el mundo",
        contenido_publicacion:
          "El fútbol femenino ha experimentado un auge en popularidad en los últimos años. Cada vez son más las ligas y equipos que invierten en el desarrollo de este deporte a nivel mundial...",
        categoria: "Fútbol",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-13",
      },
      {
        _id: "14",
        autor_id: "14",
        titulo: "El regreso de los grandes tenistas tras las lesiones",
        sub_titulo:
          "Nadal, Federer y Djokovic vuelven a las canchas después de sus lesiones más graves",
        contenido_publicacion:
          "Los tres grandes del tenis han superado lesiones que amenazaron con poner fin a sus carreras. Hoy en día, siguen siendo figuras importantes en el circuito ATP...",
        categoria: "Tenis",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-14",
      },
      {
        _id: "14",
        autor_id: "15",
        titulo: "La magia de Stephen Curry: El mejor tirador de la historia",
        sub_titulo:
          "Stephen Curry sigue rompiendo récords en la NBA con su increíble capacidad de tiro",
        contenido_publicacion:
          "Stephen Curry ha revolucionado el baloncesto con su habilidad para lanzar triples desde cualquier punto del campo. Con cada temporada, su leyenda crece y sigue dejando su huella en la NBA...",
        categoria: "Baloncesto",
        rutImagen:
          "https://static.futbolfantasy.com/uploads/images/fotos_noticias1920/20231001-realmadrid.jpg",
        fecha_publicacion: "2025-03-15",
      },
    ];

    console.log(posts);
    // Renderiza los posts en la interfaz
    function displayPosts(filteredPosts) {
      postsList.innerHTML = "";
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
                      data-id="${post._id}"
                    >
                      <i
                        class="bi bi-pencil-square text-dark"
                        style="font-size: larger"
                      ></i>
                    </button>
                    <button
                      class="btn btn-danger btn-actions rounded-pill delete-button"
                      data-id="${post._id}"
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
    searchInput.addEventListener("input", function () {
      const query = searchInput.value.toLowerCase();
      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(query)
      );
      displayPosts(filteredPosts);
    });

    // Eventos para los botones de acción
    // Ordenar por título
    document
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

    // Inicializar la visualización
    displayPosts(posts);
  }
  // DESPLIEGA LOS COMENTARIOS
  document
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
    });
});
