const DateTime = luxon.DateTime;
//classes
export class itemSuper {
  constructor(idItem, user, item, price) {
    this.idItem = idItem;
    this.user = user;
    this.item = item;
    this.price = parseFloat(price);
    var now = DateTime.now()
    console.log(now.setLocale('es').toLocaleString())
    this.date = now.setLocale('es').toLocaleString(DateTime.DATETIME_SHORT);
    //this.date = new Date().toDateString(); // agrego fecha => 'Sun Feb 05 2023'
    this.active = true; // es para luego poder eliminar items de la lista
  }
  setActiveTrue() {
    this.active = true;
  }
  setActiveFalse() {
    this.active = false;
  }
}
export class user {
  constructor(name, password) {
    this.name = name;
    this.idUser = Math.floor(Math.random() * 100) + 1;
    this.password = password;
  }
}

export class filmsSW{
  constructor(id_episode, active){
    this.id_episode = id_episode;
    this.active = false;
  }
}
