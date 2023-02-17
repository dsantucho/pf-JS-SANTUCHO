import * as functions from "./functions.js";
import {itemSuper, user} from "./objetos.js";

//variables

let menu;
const arr = [];
let resMap;
let resFilter;
//formularios
document.addEventListener("DOMContentLoaded", function () {
  functions.displayItems("itemsGrocery");
  var form2 = document.getElementById("form2");
  let myFormLogin = document.getElementById("loginForm");
  //add item in grocery
  const groceryForm = document.getElementById("groceryForm");

  if (myFormLogin) {
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
        alert("Login successful");
        //redirect to Home Page
        window.location = "./pages/home.html";
      } else {
        alert("Wrong username or password, refresh [F5] the webpage please");
      }
    }
  }

  if (groceryForm) {
    groceryForm.addEventListener("submit", addItem);

    function addItem(event) {
      event.preventDefault();

      let itemInput = document.getElementById("itemInput").value;
      let itemPrice = document.getElementById("itemPrice").value;
      const resultSpan = document.getElementById("result");

      const user = functions.getLocalStorage("loginUser");
      //save item
      functions.saveItemSupermarket(itemInput, itemPrice, user.idUser,"itemsGrocery");

      //display items
      let buttonAdd = document.getElementById("button-add");
      buttonAdd.addEventListener("click", functions.displayItems("itemsGrocery"))

      //display sum
      let result = functions.sumItemsPrice("itemsGrocery");
      resultSpan.innerHTML = result;
    }
  }
});






