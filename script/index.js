import * as functions from "./functions.js";
import { itemSuper, user } from "./objetos.js";

//variables


//formularios
document.addEventListener("DOMContentLoaded", function () {
  let buttonGoHome = document.getElementById("button-go-home");
  buttonGoHome.addEventListener('click', function(){
    if(!(functions.getLocalStorage("loginUser"))){
      window.location = "./index.html";
    }
  })

  let myFormLogin = document.getElementById("loginForm");
  myFormLogin.addEventListener("submit", validateForm);
  function validateForm(event) {
    event.preventDefault(); //prevent the default behavior of the submit event, which would typically refresh the page.
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username !== "" && password !== "") {
      const newUser = new user(username, password);
      console.log(
        `Nombre de usuario ${newUser.name} y su id: ${newUser.idUser}; password: ${newUser.password}`
      );
      functions.setLocalStorage("loginUser", newUser);
      //alert("Login successful");
      //redirect to Home Page
      window.location = "./pages/home.html";
    } else {
      alert("Wrong username or password, refresh [F5] the webpage please");
    }
  }
});

let localStorageButton = document.getElementById("limpiar-local");
localStorageButton.addEventListener("click", function () {
  localStorage.clear();
  // localStorageButton.innerHTML = 'Listo LocalStorage!'
  document.getElementById('text-advertencia').innerHTML = 'Estas Listo para empezar! '
});






