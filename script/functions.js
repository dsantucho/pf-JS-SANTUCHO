import {itemSuper, user} from "./objetos.js";


let idItem = 0;
let auxArr = [];
let buttonsDelete = [];
const resultSpan = document.getElementById("result");
//General functions

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//como lo usp: setLocalStorage("itemsSuper", JSON.stringify(arr));
export function getLocalStorage(key) {
  const value = JSON.parse(localStorage.getItem(key));
  return value;
}

export function displayItems(key){
    console.log('entre displayItems(key)')
    const values = getLocalStorage(key);
    console.log(values)
    if(values == null){
        return console.log('grocery list is empty=>not shows items')
    }else{
        let itemList = document.getElementById("itemList"); // contenedor de elementos
        itemList.innerHTML = "";
        values.forEach((element) => {
            if(element.active){
                //mostrar elementos en HTML
                let item = document.createElement("article");
                item.classList.add("d-flex", "flex-row");
                let description = document.createElement("div");
                let itemName = document.createElement("label");
                let price = document.createElement("span");
                itemName.innerHTML = element.item;
                price.innerHTML = element.price;

                description.appendChild(itemName);
                description.appendChild(price);
                // Create the delete icon element
                let acctionsItems = document.createElement("div");
                
                let buttonDelete = document.createElement("button");
                //buttonDelete.classList.add('delete-button');

                buttonDelete.id= `delete-button-${element.idItem}`; //add class for each delete item
                buttonDelete.addEventListener("click", () => {
                    console.log(`click ${element.idItem}`);
                    element.active = false;
                    setLocalStorage(key,values)
                    displayItems(key)

                    let result = sumItemsPrice("itemsGrocery");
                    resultSpan.innerHTML = result;
                  });

                let deleteIcon = document.createElement("i");
                deleteIcon.classList.add("bi", "bi-trash");
                acctionsItems.appendChild(buttonDelete);
                buttonDelete.appendChild(deleteIcon);

                // Append the delete and descrition to the "div" element
                item.appendChild(description);
                item.appendChild(acctionsItems);

                // Append the "p" element to the item list
                itemList.appendChild(item);
            }           
        });
        buttonsDelete = document.querySelectorAll(".delete-button");
        console.log(buttonsDelete);
        let result = sumItemsPrice("itemsGrocery");
        resultSpan.innerHTML = result;
    }


}

//Crear un nuevo itemSuper
export function saveItemSupermarket(item, price, idUser,key) {
    //1 - Verify that exist local storage : sum new item => else: create arr new
    auxArr = getLocalStorage(key);
    console.log('AUX = ' + auxArr);
    if(auxArr !== null){
        //take the JSON using getLocal and add a new item into the same JSON.
        const newItem = new itemSuper(idItem++, idUser, item, parseFloat(price));
        auxArr.push(newItem);
        setLocalStorage(key,auxArr);
        console.log(`*** New item has been saved in localStorage ${key} ***`)
        console.log(
            `ADD NewItem ==> producto:${newItem.item}; precio: ${newItem.price}`
          ); //muestra todo la info
        
    }else{
        //new
        auxArr = [];
        const newItem = new itemSuper(idItem++, idUser, item, parseFloat(price));
        auxArr.push(newItem);
        setLocalStorage(key,auxArr);
        console.log(`*** New localStorage ${key} has been created with new item ***`)
        console.log(
            `ADD NewItem ==> producto:${newItem.item}; precio: ${newItem.price}`
          ); //muestra todo la info
    }
  }

//Sum items active=true


export function sumItemsPrice(key){
  let result = 0.0;
  const values = getLocalStorage(key);
  console.log(values)
    if(values == null){
        return result = 'grocery list is empty';
    }else if (values != null) {
      values.forEach(element => {
        if(element.active){
          result = result + parseFloat(element.price);
        }
      });
      console.log(result)
      return parseFloat(result);
      //    result = values.reduce((accumulator, object) => {
      //     return accumulator = accumulator + parseInt(object.price);
      //   }, 0);

      // console.log(result);
      // return result;
      
    } else {
      return result = 'grocery list is empty';
    }
}