let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let dni = document.getElementById("dni");
let edad = document.getElementById("edad");
let mail = document.getElementById("mail");
let tel = document.getElementById("tel");
let trim1 = document.getElementById("trim1");
let trim2 = document.getElementById("trim2");
let trim3 = document.getElementById("trim3");
let boton = document.getElementById("btn");
let clear = document.getElementById("clear-btn");

let data = {
  nombre: null,
  apellido: null,
  dni: null,
  // edad: null,
  // mail: null,
  // tel: null,
  // trim1: null,
  // trim2: null,
  // trim3: null
};

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

let key = localStorage.length;

boton.addEventListener("click", function (e) {
  e.preventDefault();
  data.nombre = nombre.value;
  data.apellido = apellido.value;
  data.dni = dni.value;
  //data.edad = edad.value;
  // data.mail = mail.value
  // data.tel = tel.value
  // data.trim1 = trim1.value
  // data.trim2 = trim2.value
  // data.trim3 = trim3.value

  let condicion = false;

  for (e in data) {
    if (data[e].length == 0) {
      alert(`Complete el campo ${e}`);
      condicion = false;
      break;
    } else {
      condicion = true;
    }
  }

  // let index = key + data.nombre.substr(0, 3) + data.apellido.substr(0, 3);

  if (condicion === true) {
    localStorage.setItem(key, JSON.stringify(data));
    location.reload();
  }

  // let obj = JSON.parse(localStorage.getItem(key))

  // for (element in obj) {
  //     console.log(`${element}: ${obj[element]}`)
  // }
});
