import * as functions from "./functions.js";
import { itemSuper, user } from "./objetos.js";

//variables


//formularios
document.addEventListener("DOMContentLoaded", function () {
    if(!(functions.getLocalStorage("loginUser"))){
        window.location = "../index.html";
    }
    let userAux = functions.getLocalStorage("loginUser");
    // ***** DISPLEY GROCERY 
    functions.displayItems("itemsGrocery"); //if empty -> console.log
    // **** add item in grocery List *****
    const groceryForm = document.getElementById("groceryForm");
    groceryForm.addEventListener("submit", addItem);
    function addItem(event) {
        event.preventDefault();

        let itemInput = document.getElementById("itemInput").value;
        let itemPrice = document.getElementById("itemPrice").value;
        const resultSpan = document.getElementById("result");

        const user = functions.getLocalStorage("loginUser");
        if (user) {
            //save item
            functions.saveItemSupermarket(
                itemInput,
                itemPrice,
                user.idUser,
                "itemsGrocery"
            );

            //display items
            let buttonAdd = document.getElementById("button-add");
            buttonAdd.addEventListener(
                "click",
                functions.displayItems("itemsGrocery")
            );

            //display sum
            let result = functions.sumItemsPrice("itemsGrocery");
            resultSpan.innerHTML = result;

            //clean
            document.getElementById("itemInput").value = "";
            document.getElementById("itemPrice").value = "";
        }else{
            window.location = "../index.html";
        }

    }
    //***** TODO CHORES *****

    //***** STAR WARS SECTION *****
    const lista = document.querySelector("#lista");
    //let SWListJSON = functions.getLocalStorage('starWarsListChecked') || []
    const res = functions.getFilmsSW(lista);


});
