import { itemSuper, user, itemChores } from "./objetos.js";

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

//***** Displey User info */
export function displeyUserWelcome(infoDiv){
  let usuario = getLocalStorage("loginUser");
  const { name, password, idUser } = usuario;
  infoDiv.innerHTML += `    
      <h2 class="m-3"> Welcome ${usuario.name} </h2>
  `;
  
}

// ***** Grocery list functions *****

export function displayItems(key) {
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
          "pe-5"
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

// displey
export function displeyChores(){
  let values = getLocalStorage('listChores') || [];
  console.log(values);
  if (values.length === 0) {
    return console.log("chores list is empty=>not shows items");
  } else {
    //tomar elemento lista 
    let itemList = document.getElementById("itemListChores"); //contenedor
    itemList.innerHTML="";
    values.forEach((element) => {
      if (element.active) {
        //mostrar elementos en HTML
        let item = document.createElement("article");
        item.id = `chore-${element.idItem}`;
        item.classList.add(
          "col-12",
          "d-flex",
          "flex-row",
          "justify-content-between",
          "align-items-center",
          "mb-2"
        );
        let checkContainer = document.createElement("div");
        checkContainer.classList.add(
        "col-1",          
        "d-flex",
        "ps-2",
        "ps-lg-5",
        "flex-row",
        "justify-content-between",
        "align-items-center");
        let buttonCheck = document.createElement("input");
        buttonCheck.classList.add(
          "d-flex", "offset-1", "justify-content-center", "align-items-center"
        );
        buttonCheck.id = `btn-check-${element.idItem}`; //add class for each delete item
        buttonCheck.type = "checkbox";
        buttonCheck.checked = element.isDone;
        if(element.isDone){item.classList.add("el-checked");}
        
        buttonCheck.addEventListener('click',(event)=>{
          let storageChores = getLocalStorage('listChores') || [];
          const ix = parseInt(event.target.id.substring(10));
          storageChores[ix].isDone = event.target.checked;
          setLocalStorage('listChores', storageChores);
          if(storageChores[ix].isDone){
            document.getElementById(`chore-${ix}`).classList.add("el-checked");
          }else{
            document.getElementById(`chore-${ix}`).classList.remove("el-checked");
          }
        });

        checkContainer.appendChild(buttonCheck);
        item.appendChild(checkContainer);

        // **** DESCRIPTION CHORE ****/
        //item chore description
        let description = document.createElement("div");
        description.classList.add(
          "col-9", "d-flex", "align-items-center"
        );
        let itemName = document.createElement("label");
        itemName.classList.add("ps-4");
        itemName.innerHTML = element.chore;
        description.appendChild(itemName);
        
        // **** DELETE ****/
        // Create the delete icon element
        let acctionsItems = document.createElement("div");
        let buttonDelete = document.createElement("button");
        buttonDelete.classList.add(
          "btn-delete-grocery",
          "pt-3",
          "pb-3",
          "pe-5"
        );
        buttonDelete.id = `delete-chore-btn-${element.idItem}`; //add class for each delete item
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
              setLocalStorage('listChores', values);
              displeyChores();
              swal("Poof! Your item has been deleted!", {
                icon: "success",
                text: `Item deleted was = ${element.chore}`
              });

            } else {
              swal("Your item is safe!");
            }
          });
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
  }
}

  //add - mark as done - delete
  export function addItemChore( itemChore, user){
    if(user){
      saveItemChore(itemChore,user);
      displeyChores();
    }else{
      window.location = "../index.html";
  }
  }

  export function saveItemChore(itemChore, user){
    let auxLocal = getLocalStorage('listChores') || [];
    if(auxLocal.length !==0){
      //* ya existe LS listChores voy a sumar un item
      let lengthLS = auxLocal.length;
      // crear un nuevo itemChore
      const newChore = new itemChores (lengthLS++,user,itemChore);
      auxLocal = [...auxLocal, newChore];
      console.log(`New chore: ${newChore.chore}`);
      console.log(`Ahora auxLocal CONTIENE: ${auxLocal}`);
      setLocalStorage('listChores', auxLocal);
    }else{
      //* no existe el LS =>crear nuevo
      const newChore = new itemChores (0,user,itemChore);
      auxLocal = [...auxLocal, newChore];
      setLocalStorage('listChores', auxLocal);
      console.log(`New localStorage + itemChore: ${newChore.chore}`)
    }
  }



//***** Star Wars Cards *****

export function displeySWchecked(){
  let tableRows = lista.querySelectorAll("tbody > tr");
  let SWListJSON = getLocalStorage('starWarsListChecked') || []
  tableRows.forEach((row) => {
    const cellId = row.querySelectorAll("th")
    const cells = row.querySelectorAll("td");
    const episodeId = `checkMovie-${cellId[0].textContent}`;
    let checkbox = row.querySelector(`#${episodeId}`);
    let isChecked = checkbox.checked;
            
    // do something with the data...
    console.log('*** REVISAR CHECK***')

    if(SWListJSON.length !== 0){
        SWListJSON.forEach((e)=>{
          //console.log(`** SWListedChecked entre al for each compara: JSON => ${e} ; y tabla => ${episodeId}`) 
          if(e == episodeId){
            checkbox.checked = true;
          }
        });
    }
  }); 
}

export function createSWcards(lista, el){
  lista.innerHTML += `
  <tr>
    <th scope="row">${el.episode_id}</th>
    <td>${el.title}</td>
    <td>${el.director}</td>
    <td>${el.release_date}</td>
    <td>    
      <div class="input-group-text w-25 p-2">
      <input id="checkMovie-${el.episode_id}" type="checkbox" aria-label="Checkbox for following text input">
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
    console.log("ingreso al fetch => puede demorar en cargar")
    const data = await fetch("https://swapi.dev/api/films");
    const res = await data.json();
    console.log(res)
    console.log("fin fetch -> enter sort & foreach para displey")
    // Sort the array by the ID of each element
    res.results.sort((a, b) => a.episode_id - b.episode_id).forEach((element) => {
      createSWcards(lista, element);
    });//end foreach
    displeySWchecked();
    //**** WATCH EVENT ****/
    // get all the checkboxes based on their IDs
    const checkboxes = document.querySelectorAll('[id^="checkMovie-"]');
    // iterate over the checkboxes and add an event listener
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', (event) => {
        if (event.target.checked) {
          let auxArr = getLocalStorage('starWarsListChecked') || [];
          if(auxArr.length !== 0){
            auxArr = [...auxArr, checkbox.id];
            //console.log(`Ahora AUX ARR CONTIENE: ${auxArr}`);
            setLocalStorage('starWarsListChecked', auxArr);
          }else{
            console.log('*** New check => create LocalStorage');
            auxArr = [checkbox.id];
            setLocalStorage('starWarsListChecked', auxArr);
          }
        } else {
          console.log("*** entrar al else eliminar ***");
          let auxArr = getLocalStorage('starWarsListChecked') || [];
          // the checkbox was unchecked => delete item from LocalStorage
          if(auxArr.length !== 0){
            let dato = auxArr.find((item) => item === checkbox.id);
            //delete dato of auxArr
            auxArr = auxArr.filter((item) => item !== dato);
            setLocalStorage('starWarsListChecked', auxArr);
            //console.log(`Ahora AUX ARR CONTIENE: ${auxArr}`);
          }
        }
      });
    });

    loading.style.display = 'none';
  } catch (err) {
    console.error(err);
    error.style.display = 'block';
    loading.style.display = 'none';
  }
}

