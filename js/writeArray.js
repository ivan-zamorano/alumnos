let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let dni = document.getElementById("dni");
// let edad = document.getElementById("edad");
// let mail = document.getElementById("mail");
// let tel = document.getElementById("tel");
// let trimUno = document.getElementById("trim-uno");
// let trimDos = document.getElementById("trim-dos");
// let trimTres = document.getElementById("trim-tres");

let boton = document.getElementById("btn");

class Alumno {
  constructor(nombre, apellido, dni) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    // this.edad = edad;
    // this.mail = mail;
    // this.tel = tel;
    // this.trimUno = trimUno;
    // this.trimDos = trimDos;
    // this.trimTres = trimTres;
  }
}

// let clear = document.getElementById("clear-btn");
// let setBtn = document.getElementById("set-btn");
// clear.addEventListener("click", function () {
//   localStorage.alumnos = JSON.stringify(new Array());
//   location.reload();
// });

// Colocar array en localstorage si este se encuentra vacío
if (localStorage.length === 0) {
  localStorage.setItem("alumnos", JSON.stringify(new Array()));
}

// Botón de carga de nuevo alumno
boton.addEventListener("click", function (e) {
  e.preventDefault();

  let newInput = new Alumno(
    nombre.value,
    apellido.value,
    dni.value
    // edad.value,
    // mail.value,
    // tel.value,
    // trimUno.value,
    // trimDos.value,
    // trimTres.value
  );

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
    let alumnosArray = JSON.parse(localStorage.alumnos);
    alumnosArray.push(JSON.stringify(newInput));
    localStorage.alumnos = JSON.stringify(alumnosArray);
    location.reload();
  }
});
