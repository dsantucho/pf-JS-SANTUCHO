import { itemSuper, user } from "./objetos.js";

//variables
let idItem = 0;
let auxArr = [];
let buttonsDelete = [];
const resultSpan = document.getElementById("result");

// ******* LOCAL STORAGE FUNTION ******* //
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//como lo usp: setLocalStorage("itemsSuper", JSON.stringify(arr));
export function getLocalStorage(key) {
  const value = JSON.parse(localStorage.getItem(key));
  return value;
}

// ***** Grocery list functions *****
// tomar el user
export function getUserDestructuring(usuario) {
  if (getLocalStorage("loginUser")) {
    usuario = getLocalStorage("loginUser");
    const { name, password, idUser } = usuario;
  } else {
    usuario = [];
  }
}

export function displayItems(key) {
  console.log("entre displayItems(key)");
  let values = getLocalStorage(key) || [];
  console.log(values);
  if (values.length === 0) {
    return console.log("grocery list is empty=>not shows items");
  } else {
    let itemList = document.getElementById("itemList"); // contenedor de elementos
    itemList.innerHTML = "";
    values.forEach((element) => {
      if (element.active) {
        //mostrar elementos en HTML
        let item = document.createElement("article");
        item.classList.add(
          "col-12",
          "d-flex",
          "flex-row",
          "justify-content-between",
          "align-items-center",
          "mb-2"
        );
        let description = document.createElement("div");
        description.classList.add(
          "col-10",
          "d-flex",
          "flex-row",
          "justify-content-between",
          "align-items-center"
        );
        let itemName = document.createElement("label");
        itemName.classList.add("ps-4");
        let price = document.createElement("span");
        itemName.innerHTML = element.item;
        price.innerHTML = `$ ${element.price}`;
        description.appendChild(itemName);
        description.appendChild(price);
        // Create the delete icon element
        let acctionsItems = document.createElement("div");
        let buttonDelete = document.createElement("button");
        buttonDelete.classList.add(
          "btn-delete-grocery",
          "pt-3",
          "pb-3",
          "pe-4"
        );
        //buttonDelete.classList.add('delete-button');
        buttonDelete.id = `delete-button-${element.idItem}`; //add class for each delete item
        //**** DELETE EVENT ****/
        buttonDelete.addEventListener("click", () => {
          console.log(`click DELETE: ${element.idItem}`);
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              element.active = false;
              setLocalStorage(key, values);
              displayItems(key);
              let result = sumItemsPrice("itemsGrocery");
              resultSpan.innerHTML = result;
              swal("Poof! Your item has been deleted!", {
                icon: "success",
                text: `Item deleted was = ${element.item}, and price $ ${element.price}`
              });

            } else {
              swal("Your item is safe!");
            }
          });
          
          // setLocalStorage(key, values);
          // displayItems(key);
          // let result = sumItemsPrice("itemsGrocery");
          // resultSpan.innerHTML = result;
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
export function saveItemSupermarket(item, price, idUser, key) {
  //1 - Verify that exist local storage : sum new item => else: create arr new
  auxArr = getLocalStorage(key) || [];
  if (auxArr.length !== 0) {
    let lengthAux = auxArr.length;
    console.log("length: " + lengthAux);
    //take the JSON using getLocal and add a new item into the same JSON.
    const newItem = new itemSuper(lengthAux++, idUser, item, parseFloat(price));
    //o auxArr.push({...auxArr, newItem})
    auxArr = [...auxArr, newItem];
    console.log(`Ahora AUX ARR CONTIENE: ${auxArr}`);
    setLocalStorage(key, auxArr);
    console.log(`*** New item has been saved in localStorage ${key} ***`);
    console.log(
      `ADD NewItem ==> producto:${newItem.item}; precio: ${newItem.price}`
    ); //muestra todo la info
  } else {
    //new
    console.log(
      `*** New localStorage ${key} has been created with new item ***`
    );
    const newItem = new itemSuper(0, idUser, item, parseFloat(price));
    auxArr = [...auxArr, newItem];
    setLocalStorage(key, auxArr);
    console.log(
      `ADD NewItem ==> producto:${newItem.item}; precio: ${newItem.price}`
    ); //muestra todo la info
  }
}

//Sum items active=true
export function sumItemsPrice(key) {
  let result = 0.0;
  const values = getLocalStorage(key) || [];
  if(values.length !== 0){
    values.forEach((element) => {
          if (element.active) {
            result = result + parseFloat(element.price);
          }
    });
    return parseFloat(result).toFixed(2);
  }else{
    return (result = "grocery list is empty");
  }
}

// ***** Chores list functions *****

//***** Star Wars Cards *****
export function createSWcards(lista, el){
  lista.innerHTML += `
  <tr>
    <th scope="row">${el.episode_id}</th>
    <td>${el.title}</td>
    <td>${el.director}</td>
    <td>${el.release_date}</td>
    <td>    
      <div class="input-group-text w-25 p-2">
      <input type="checkbox" aria-label="Checkbox for following text input">
      </div>
    </td>
  </tr>
  `;
}

export async function getFilmsSW(lista){
  const loading = document.querySelector('#loading');
  const error = document.querySelector('#error');
  try {
    loading.style.display = 'block';
    error.style.display = 'none';
    
    const data = await fetch("https://swapi.dev/api/films");
    const res = await data.json();
    // Sort the array by the ID of each element
    res.results.sort((a, b) => a.episode_id - b.episode_id).forEach((element) => {
      createSWcards(lista, element);
    });
    
    loading.style.display = 'none';
  } catch (err) {
    console.error(err);
    error.style.display = 'block';
    loading.style.display = 'none';
  }
}



export function markAsViewSW(){
  //traer mi JSON donde guardo por id_episode cual ya vimos 
  //buscar JS
  //si no exite: crear uno nuevo al momento de marcar como vista
  //si exite el JSON traerlo y marcar en la card como vista
}
