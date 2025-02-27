document.getElementById("frmPost").addEventListener("submit", function (event) {
  event.preventDefault();
  const titulo = document.querySelector("#postTitle").value;
  const contentenido = document.querySelector("#postContent").value;
  const imgage = document.querySelector("#postImage").value;
  const postContainer = document.querySelector("#postContainer").value;

  const f = new Date();
  const formatDate = (d) => {
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  };
  console.log(formatDate(f));

  /* fetch(api + "nuevaPublicacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      autor_id: autor_id.value,
      titulo: titulo.value.trim(),
      rutImagen: req.body.imagen,
      contenido_publicacion: contentenido.value,
      fecha_publicacion: fecha_publicacion.value
    })
  })
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        Swal.fire({
          position: "top",
          title: "Se publico correctamente!",
          icon: "success",
          text: res.mensaje,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: res.mensaje
        });
      }
    }); */
  document.getElementById("frmPost").reset();
  bootstrap.Modal.getInstance(document.getElementById("addPostModal")).hide();
});
