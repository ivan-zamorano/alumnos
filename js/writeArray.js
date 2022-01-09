let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let dni = document.getElementById("dni");
let boton = document.getElementById("btn");
let clear = document.getElementById("clear-btn");
let setBtn = document.getElementById("set-btn");

class Alumno {
  constructor(nombre, apellido, dni) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
  }
}

clear.addEventListener("click", function () {
  localStorage.alumnos = JSON.stringify(new Array());
  location.reload();
});

// setBtn.addEventListener("click", function () {
//   localStorage.setItem("alumnos", JSON.stringify(new Array()));
//   location.reload();
// });

// localStorage.setItem("alumnos", JSON.stringify(new Array()));

boton.addEventListener("click", function (e) {
  e.preventDefault();

  let newInput = new Alumno(nombre.value, apellido.value, dni.value);

  console.log(newInput);

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
