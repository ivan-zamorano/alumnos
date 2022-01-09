let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let dni = document.getElementById("dni");
let boton = document.getElementById("btn");
let clear = document.getElementById("clear-btn");

class Alumno {
  constructor(nombre, apellido, dni) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
  }
}

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

let key = localStorage.length;

boton.addEventListener("click", function (e) {
  e.preventDefault();

  let newInput = new Alumno(nombre.value, apellido.value, dni.value);

  let condicion = false;

  for (e in newInput) {
    if (newInput[e].length == 0) {
      alert(`Complete el campo ${e}`);
      condicion = false;
      break;
    } else {
      condicion = true;
    }
  }

  if (condicion === true) {
    localStorage.setItem(key, JSON.stringify(newInput));
    location.reload();
  }

  // let obj = JSON.parse(localStorage.getItem(key))

  // for (element in obj) {
  //     console.log(`${element}: ${obj[element]}`)
  // }
});
