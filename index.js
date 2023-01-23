
const user = { userName: "", idUser: "", }

//MIS FUNCIONES
function newUser() {
    //? catch validaciones 
    do{
        user.userName = prompt("Asegurece de ingresar nombre user");
        console.log(user.userName + "empty<-USER");
    }while(user.userName == "")
    // user.userName = prompt("ingresar nombre user");
    user.idUser = Math.floor(Math.random() * 100) + 1;

    console.log(user.userName + " " + user.idUser);
    alert("Hola "+ user.userName + "\n Tu id es: "+ user.idUser + "\n Comenzamos?")

};

function addItemSupermarket() {
    const itemSuper = {
        user: user.idUser,
        item: "",
        price: ""
    };

    itemSuper.item = prompt("ingrese item");
    itemSuper.price = parseFloat(prompt("ingrese precio"));
    console.log("User:" + itemSuper.user + " item: " + itemSuper.item + " price: " + itemSuper.price)
    return itemSuper;
}

function calculateTotalPrice(array) {
    const total = array.reduce((accumulator, object) => {
        return accumulator + object.price;
    }, 0);
    return total;
}
function listarItems(arr){
    const keys = Object.keys(arr);
    for(let index = 0; index < keys.length; index++){
        console.log("Item nro "+ index + " : "+ arr[index].item + " "+ arr[index].price);
    }
}

// MAIN 
let menu;
let arr = [];
alert("Bienvenido, esta por comenzar el proceso de crear tu lista de compras. \n Para comenzar vamos a crear tu usuario");
newUser();
do {
    menu = parseInt(prompt("En el siguiente ejercucio podra = \n 1 - Agregar un item a comprar; \n 2 - Sumar precio; \n 3 - Listar Items \n 5 - Salir "))

    switch (menu) {
        case 1:
            arr.unshift(addItemSupermarket());
            console.log(arr);
            break;
        case 2:
            //sumar precio
            //TODO agregar validacion si no agregamos items
            sumTotal = calculateTotalPrice(arr);
            console.log("El Total de la compra aproximado: " + sumTotal);
            alert("El Total de la compra aproximado: " + sumTotal);
            break;
        case 3: 
            //? si son muchos items no me entran en el prompt => sale por consola
            alert("Advertencia!: La lista de items se observara desde la consola"); 
            listarItems(arr);
            break;
        case 5:
            alert("Muchas gracias por usar nuestra lista de super");
            break;
    }
} while (menu !== 5);

