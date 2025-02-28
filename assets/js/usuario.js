const api = "http://127.0.0.1:4000/api/publicaciones/"; // nos conectamos a la API
const sesion = JSON.parse(sessionStorage.getItem("userName"));
let nameUser = document.querySelector("#nameUser");
let btnClaseSesion = document.querySelector("#btnCerrarSesion");
// cerrar sesion
btnClaseSesion.addEventListener("click", (e) => {
  if (!localStorage.getItem("userName")) {
    sessionStorage.clear();
    window.location.href = "login_registro.html";
  }
});
nameUser.innerHTML = sesion.user;
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
document
  .getElementById("toggle-comments-btn")
  .addEventListener("click", function () {
    let commentList = document.getElementById("comment-list");
    if (commentList.style.display === "none") {
      commentList.style.display = "block";
      this.textContent = "Ocultar comentarios";
    } else {
      commentList.style.display = "none";
      this.textContent = "Mostrar comentarios";
    }
  });

// Funcionalidad del botón "Leer más"
document.getElementById("read-more-btn").addEventListener("click", function () {
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
/**
 Tenis: "Las Nuevas Estrellas del Tenis: ¿Quién Tomará el Mando Después de Federer, Nadal y Djokovic?"
El tenis ha vivido una era dorada con grandes leyendas como Roger Federer, Rafael Nadal y Novak Djokovic dominando los Grand Slams durante más de una década. Sin embargo, la pregunta que muchos se hacen es: ¿quién tomará el control del circuito una vez que estos gigantes se retiren?

Jóvenes promesas como Carlos Alcaraz y Jannik Sinner ya están demostrando su talento en las pistas, mientras otros como Daniil Medvedev y Alexander Zverev siguen buscando consolidarse. Analizamos el panorama actual del tenis, las características de estos nuevos jugadores y las perspectivas para el futuro del deporte.

Atletismo: "Las Grandes Promesas del Atletismo: ¿Quién Será el Próximo Usain Bolt?"
El atletismo es un deporte que ha tenido momentos épicos, como la carrera de Usain Bolt en los 100 metros, pero, ¿quién tomará su lugar como la próxima gran figura? Los velocistas jóvenes de todo el mundo están empujando los límites y desafiando los récords.

Exploramos a las nuevas estrellas que podrían reinar en las pistas, como el canadiense Andre De Grasse, el estadounidense Noah Lyles o el jamaiquino Oblique Seville. Además, abordamos la importancia de la tecnología en el atletismo moderno, cómo el entrenamiento se ha optimizado para obtener resultados y cómo se están cambiando los estándares de velocidad.

Baloncesto: "NBA: La Rivalidad de Hoy, ¿Quién Dominará la Liga en la Próxima Década?"
El baloncesto es un deporte lleno de rivalidades intensas, y la NBA no es la excepción. Con leyendas como LeBron James, Stephen Curry y Kevin Durant aún siendo figuras centrales, los ojos del mundo están puestos en quién será el próximo gran ícono que llevará la liga a nuevas alturas.

Jugadores como Luka Dončić, Giannis Antetokounmpo y Zion Williamson ya están demostrando su potencial para ser los futuros pilares del baloncesto. Este artículo analiza las nuevas estrellas que se están levantando y cómo el juego está evolucionando, desde la importancia de la versatilidad en los jugadores hasta el impacto de la revolución de los triples en la NBA.

Fútbol: "La Influencia de los Entrenadores Modernos: Cómo Han Cambiado la Filosofía del Fútbol"
El fútbol no solo se juega en el campo, sino también en las mentes de los entrenadores. Entrenadores como Pep Guardiola, Jürgen Klopp y Diego Simeone han cambiado la forma en que entendemos el fútbol. Analizamos cómo sus filosofías han transformado el juego, desde el estilo de posesión de Guardiola hasta el contragolpe letal de Simeone.

También abordamos la influencia de los entrenadores en la mentalidad de los jugadores y cómo un buen técnico puede llevar a un equipo a niveles de rendimiento que antes parecían imposibles.

Tenis: "Cómo Prepararse Mentalmente para un Gran Torneo de Tenis"
El tenis no solo es físico; también es un juego mental. La capacidad de mantener la calma, la concentración y la resiliencia bajo presión puede ser la diferencia entre ganar y perder en los momentos más importantes. En este post, exploramos estrategias psicológicas que los tenistas profesionales usan para mantenerse a la vanguardia durante los partidos cruciales.

Hablamos sobre la importancia de la visualización, cómo lidiar con los nervios y qué técnicas los jugadores utilizan para mantener la concentración cuando más lo necesitan, basándonos en los métodos de algunos de los mejores tenistas de la historia.

Atletismo: "Los Mejores Consejos para Mejorar tu Rendimiento en los 400 Metros"
Correr los 400 metros es un desafío que combina velocidad y resistencia. Muchos corredores lo consideran una de las pruebas más difíciles del atletismo, ya que requiere un equilibrio entre explosividad y resistencia. En este post, te daremos algunos consejos esenciales para mejorar tu rendimiento en los 400 metros, desde la técnica adecuada hasta la forma de manejar la fatiga y la velocidad.

También analizamos las claves de la preparación mental para enfrentar una carrera tan exigente y cómo ajustar tu entrenamiento para alcanzar tu máximo potencial en esta distancia.

Baloncesto: "Cómo la Evolución del Juego ha Influido en los Estilos de los Jugadores de la NBA"
El baloncesto ha evolucionado a lo largo de los años, y esto se refleja en los jugadores. Desde la era de los pívots dominantes como Shaquille O'Neal hasta la era moderna de los jugadores versátiles que pueden hacer de todo, el juego ha cambiado radicalmente.

Este artículo examina cómo las nuevas tendencias del baloncesto han influido en los estilos de juego de las estrellas actuales, desde la importancia de la defensa en el perímetro hasta la necesidad de una mayor habilidad en los tiros de tres puntos. También exploramos cómo las estadísticas avanzadas están redefiniendo lo que significa ser un jugador dominante en la NBA.
 */
