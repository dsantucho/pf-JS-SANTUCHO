import * as functions from "./functions.js";
import { itemSuper, user } from "./objetos.js";

//variables


//formularios
document.addEventListener("DOMContentLoaded", function () {
  // let buttonGoHome = document.getElementById("button-go-home");
  // buttonGoHome.addEventListener('click', function(){
  //   (!(functions.getLocalStorage("loginUser"))) ? swal("User not found", "Please enter User and Passwors", "error") : window.location = "./pages/home.html";
  // })
  let section = document.getElementById('render');
  if(functions.getLocalStorage("loginUser")){
    //reder INGRESAR button
    functions.renderEnterApp(section);
    let buttonEnter = document.getElementById("enter-button");
    buttonEnter.addEventListener("click", enterApp);
    function enterApp(event){
      event.preventDefault(); //prevent the default behavior of the submit event, which would typically refresh the page.
      window.location = "./pages/home.html";
    }
  }else{
    //RENDER REGISTER LOGIN form
    functions.renderRegister(section);
    //login form
    let myFormLogin = document.getElementById("loginForm");
    myFormLogin.addEventListener("submit", validateFormLogin);
    function validateFormLogin(event) {
      event.preventDefault(); //prevent the default behavior of the submit event, which would typically refresh the page.
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;

      if (username !== "" && password !== "") {
        const newUser = new user(username, password);
        console.log(`Nombre de usuario ${newUser.name} y su id: ${newUser.idUser}; password: ${newUser.password}`);
        functions.setLocalStorage("loginUser", newUser);
        //redirect to Home Page
        window.location = "./pages/home.html";
      } else {
        swal("Something went wrong", "Wrong username or password, refresh [F5] the webpage please", "warning"); 
      }
    }
  }
});

// let localStorageButton = document.getElementById("limpiar-local");
// localStorageButton.addEventListener("click", function () {
//   localStorage.clear();
//   // localStorageButton.innerHTML = 'Listo LocalStorage!'
//   document.getElementById('text-advertencia').innerHTML = 'Estas Listo para empezar! '
// });






