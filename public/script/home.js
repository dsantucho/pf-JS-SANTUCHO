import * as functions from "./functions.js";
import { itemSuper, user } from "./objetos.js";

//variables


//formularios
document.addEventListener("DOMContentLoaded", function () {
    if(!(functions.getLocalStorage("loginUser"))){
        window.location = "../index.html";
    }
    let user = functions.getLocalStorage("loginUser");

    // ***** DISPLEY USER INFO
    let infoDiv = document.getElementById("welcome");
    console.log(infoDiv)
    functions.displeyUserWelcome(infoDiv);

    let btnDeletGrocery = document.getElementById("cleanGrocery");
    btnDeletGrocery.addEventListener("click", function(){
        localStorage.removeItem('itemsGrocery');
        location.reload();
    });

    let btnDeletChores = document.getElementById("cleanChores");
    btnDeletChores.addEventListener("click", function(){
        localStorage.removeItem('listChores');
        location.reload();
    });
    let btnDeletAll = document.getElementById("cleanAll");
    btnDeletAll.addEventListener("click", function(){
        localStorage.removeItem('listChores');
        localStorage.removeItem('itemsGrocery');
        location.reload();
    });

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
        //displeyChores
    functions.displeyChores();
    const choresForm = document.getElementById("choresForm");
    choresForm.addEventListener("submit",addChore);
    function addChore(event){
        event.preventDefault();
        let itemChore = document.getElementById("choreInput").value;
        functions.addItemChore(itemChore,user.idUser)
        document.getElementById("choreInput").value = "";

    }
  
    //***** STAR WARS SECTION *****
    const lista = document.querySelector("#lista");
    const res = functions.getFilmsSW(lista);


});
