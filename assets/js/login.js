let userName = document.querySelector("#userName");
let password = document.querySelector("#userPass");
let regUserName = document.querySelector("#regUserName"); // reg: register, se le asigna para diferenciar de los input de login
let regPassword = document.querySelector("#regUserPass");
let email = document.querySelector("#regUserEmail");
let pais = document.querySelector("#regPaisUser");
let frmLogin = document.querySelector("#frmLogin");
let frmRegister = document.querySelector("#frmRegister");
const api = "http://127.0.0.1:4000/api/user/";
frmLogin.addEventListener("submit", (e) => {
  e.preventDefault(); // previene el evento por defecto de los formularios
  let accion = e.target.closest("form").getAttribute("data-tipo");
  if (accion === "login") {
    fetch(api + "loginUser", {
      method: "POST",
      // configuramos la cabecera, Header de peticion lleva una configuracin : contiene un archivo JS a JSON
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.infoUser);
        if (res.estado === true) {
          sessionStorage.setItem("userName", JSON.stringify(res.infoUser));
           window.location.href = "index.html";
        } else {
          Swal.fire({
            title: "Opss..",
            icon: "error",
            text: res.mensaje,
          });
        }
      });
  }
});
frmRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  let accion = e.target.closest("form").getAttribute("data-tipo");

  if (accion === "register") {
    if (
      validarInputs(
        regUserName.value,
        email.value,
        regPassword.value,
        pais.value
      ) === true
    ) {
      fetch(api + "newUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: regUserName.value.trim(),
          email: email.value.trim(),
          password: regPassword.value,
          pais: pais.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            regUserName.value = "";
            email.value = "";
            regPassword.value = "";
            pais.value = "";
            Swal.fire({
              position: "top",
              title: "Felicitaciones!",
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
    } else {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "No pueden haber campos vacios",
      });
    }
  }
});

function validarInputs(user, email, password, pais) {
  if (
    user.length > 0 &&
    email.length > 0 &&
    password.length > 0 &&
    pais.length > 0
  ) {
    if (user.length >= 4) {
      return true;
    }
  } else {
    return false;
  }
}
