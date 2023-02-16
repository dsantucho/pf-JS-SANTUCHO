// // CLASES

// class itemSuper {
//   constructor(idItem, user, item, price) {
//     this.idItem = idItem;
//     this.user = user;
//     this.item = item;
//     this.price = price;
//     this.date = new Date().toDateString(); // agrego fecha => 'Sun Feb 05 2023'
//     this.active = true; // es para luego poder eliminar items de la lista
//   }
//   setActiveTrue() {
//     this.active = true;
//   }
//   setActiveFalse() {
//     this.active = false;
//   }
// }
// //clase usuario
// class user {
//   constructor(name, password) {
//     this.name = name;
//     this.idUser = Math.floor(Math.random() * 100) + 1;
//     this.password = password;
//   }
// }
// //General functions
// //TODO toJSON
// //TODO toObjetc
// //TODO setLocalStorage
// function setLocalStorage(key, value) {
//   localStorage.setItem(key, JSON.stringify(value));
// }
// //como lo usp: setLocalStorage("itemsSuper", JSON.stringify(arr));
// function getLocalStorage(key) {
//   value = JSON.parse(localStorage.getItem(key));
//   return value;
// }

// //index.html => LOGIN
// //Functions
// let myFormLogin = document.getElementById("loginForm");
// myFormLogin.addEventListener("submit", validateForm);

// function validateForm(event) {
//   event.preventDefault(); //prevent the default behavior of the submit event, which would typically refresh the page.
//   let username = document.getElementById("username").value;
//   let password = document.getElementById("password").value;

//   if (username !== "" && password !== "") {
//     const newUser = new user(username, password);
//     console.log(
//       `Nombre de usuario ${newUser.name} y su id: ${newUser.idUser}; password: ${newUser.password}`
//     );
//     setLocalStorage("loginUser", JSON.stringify(newUser));
//     alert("Login successful");
//     //redirect to Home Page
//     window.location = "home.html";
//   } else {
//     alert("Wrong username or password, refresh [F5] the webpage please");
//   }
// }

//MIS FUNCIONES

//generar un nuevo usuario
// function newUser() {
//     //? catch validaciones
//     let nameEnter;
//     do{
//         nameEnter = prompt("Asegurece de ingresar nombre user");
//         if(nameEnter == ""){console.log("empty<-USER");}
//     }while(nameEnter == "")
//     const newUser = new user(nameEnter);
//     console.log(`Nombre de usuario ${newUser.name} y su id: ${newUser.idUser}`);
//     alert(`Hola ${newUser.name} bienvenido al sistema de listas. \nTu id sera: ${newUser.idUser}. \nDa Enter para comenzar`);
//     return newUser;
// };
// //Agregar item a la lista
// function addItemSupermarket() {
//   let item = prompt("ingrese item");
//   let price = parseFloat(prompt("ingrese precio"));
//   const newItem = new itemSuper(idItem++, userLogin.idUser, item, price);
//   console.log(
//     `ADD NewItem ==>\n producto:${newItem.item}; precio: ${newItem.price}`
//   ); //muestra todo la info
//   return newItem;
// }
// calculo total de gasto
function calculateTotalPrice(array) {
  const total = array.reduce((accumulator, object) => {
    return accumulator + object.price;
  }, 0);
  return total;
}
//listar mi lista en consola
// function listarItems(arr) {
//   // console.log(arr.join('/n')); -> Para arrays
//   const keys = Object.keys(arr);
//   for (let index = 0; index < keys.length; index++) {
//     if (arr[index].active) {
//       console.log(
//         `Item nro ${index}: es ${arr[index].item}; Precio: ${arr[index].price} `
//       );
//     }
//   }
// }
//FILTRO EXACTO USANDO MAP
function filtroExacto(arr, dato) {
  resMap = arr.map((el) => {
    if (el.item == dato) {
      return { producto: el.item, precio: el.price, active: el.active };
    }
  });
  console.log("Elementos encontrados: ");
  console.log(resMap.filter(Boolean));
  //TODO agregar filtro para no mostrar items eliminados
  /* En el map me arma un array con los elementos, aquellos que NO son mi
    dato de busqueda les coloca un "undefined" y yo no lo quiero mostrar
    en la consola, si filtro me los quita. 
    No importa si tenemos 2 items iguales, va devolver ambos objetos exactos.
    The filter(Boolean) step does the following:
    Passes each item in the array to the Boolean() object.
    The Boolean() object coerces each item to true or false depending on whether it's truthy or falsy.
    If the item is truthy, we keep it.
    array.filter(Boolean) === array.filter(item => Boolean(item))*/
}
//FILTRO NO EXACTO
function filterNoExacto(arr, dato) {
  resFilter = arr.filter((el) => el.item.includes(dato));
  console.log("Elementos encontrados: ");
  console.log(resFilter);
  //TODO agregar filtro para no mostrar items eliminados
}
function deleteItem(arr, datoDelet) {
  resMap = arr.map((el) => {
    if (el.item == datoDelet) {
      el.setActiveFalse();
      return console.log(
        `Se elimino el item: \n producto: ${el.item} con precio: ${el.price} y su statuso quedo: ${el.active}`
      );
    }
  });
}

// // MAIN
// let idItem = 0;
// let menu;
// const arr = [];
// let resMap;
// let resFilter;


//----------X--------------
// do {
//     menu = parseInt(prompt("En el siguiente ejercucio podra = \n1 - Agregar un item a comprar. \n2 - Sumar precio. \n3 - Listar Items. \n4 - buscar items. \n5 - Ordenar lista. \n6 - Eliminar un item.  \n0 - Salir "))

//     switch (menu) {
//         case 1:
//             arr.unshift(addItemSupermarket());
//             console.log(arr);
//             break;
//         case 2:
//             //TODO agregar validacion si no agregamos items
//             sumTotal = calculateTotalPrice(arr);
//             console.log(`El Total de la compra aproximado: ${sumTotal}`);
//             alert(`El Total de la compra aproximado: ${sumTotal}`);
//             break;
//         case 3:
//             //? si son muchos items no me entran en el prompt => sale por consola
//             alert("Advertencia!: La lista de items se observara desde la consola");
//             listarItems(arr);
//             break;
//         case 4:
//             alert("Advertencia!: La lista de items se observara desde la consola");
//             let op = prompt("1 - busqueda exacta, \n 2 - busqueda no exacta; \n 3 - salir")
//             switch(op){
//                 case "1":
//                     let datoExact = prompt("Ingrese dato exacto a buscar:")
//                     filtroExacto(arr,datoExact);
//                     break;
//                 case "2":
//                     let datoNoExact = prompt("Ingrese dato NO exacto a buscar:")
//                     filterNoExacto(arr,datoNoExact);
//                     break;
//                 default:
//                     break;
//             }
//             break;
//         case 5:
//             alert("Advertencia!: La lista de items se observara desde la consola");
//             let orden = prompt("Como desea ordenar la lista: \n1- Por nombre de producto a-z;\n2- Por precio. \n3 - Volver al menu principal. \n \n ⚠️ Lista por consola ⚠️")
//             switch(orden){
//                 case "1":
//                     console.log('Lista original: ')
//                     listarItems(arr);
//                         arr.sort(function (a, b) {
//                             if (a.item > b.item) {
//                             return 1;
//                             }
//                             if (a.item < b.item) {
//                             return -1;
//                             }
//                             // a must be equal to b
//                             return 0;
//                         });
//                     console.log('--------- x ---------')
//                     console.log('Lista Ordenada de A-Z: ')
//                     listarItems(arr);
//                     console.log('--------- x ---------')
//                 break;
//                 case "2":
//                     console.log('Lista original: ')
//                     listarItems(arr);
//                         arr.sort(function (a, b) {
//                             if (a.price > b.price) {
//                             return 1;
//                             }
//                             if (a.price < b.price) {
//                             return -1;
//                             }
//                             // a must be equal to b
//                             return 0;
//                         });
//                     console.log('--------- x ---------')
//                     console.log('Lista Ordenada por precio: ')
//                     listarItems(arr);
//                     console.log('--------- x ---------')
//                     break;
//                 default:
//                     break;
//             }
//             break;
//         case 6:
//             let datoDelete = prompt("Para eliminar un item primero vamos a buscarlo. \n Devemos ingresar el filtro exacto: \n\n ⚠️ Advertencia: si dos items son iguales eliminamos los dos ⚠️");
//             console.log('--------- x ---------');
//             deleteItem(arr,datoDelete);
//             console.log('--------- x ---------');
//             console.log('Lista de items: ')
//             listarItems(arr);
//             break;
//         case 0:
//             alert("Muchas gracias por usar nuestra lista de super");
//             break;
//     }
// } while (menu !== 0);
