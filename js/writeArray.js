let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let dni = document.getElementById("dni");
let edad = document.getElementById("edad");
let mail = document.getElementById("mail");
let tel = document.getElementById("tel");
let trimUno = document.getElementById("trim-uno");
let trimDos = document.getElementById("trim-dos");
let trimTres = document.getElementById("trim-tres");

let boton = document.getElementById("btn");

class Alumno {
  constructor(
    nombre,
    apellido,
    dni,
    edad,
    mail,
    tel,
    trimUno,
    trimDos,
    trimTres
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.edad = edad;
    this.mail = mail;
    this.tel = tel;
    this.trimUno = trimUno;
    this.trimDos = trimDos;
    this.trimTres = trimTres;
    this.promedio = 0;
  }
}

let clear = document.getElementById("clear-btn");
let setBtn = document.getElementById("set-btn");
clear.addEventListener("click", function () {
  localStorage.alumnos = JSON.stringify(new Array());
  location.reload();
});

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
    dni.value,
    edad.value,
    mail.value,
    tel.value,
    trimUno.value,
    trimDos.value,
    trimTres.value
  );

  // Validación

  let condicion = false;

  for (e in newInput) {
    if (newInput[e].length === 0) {
      alert(`Complete el campo ${e}`);
      condicion = false;
      break;
    } else {
      condicion = true;
    }
  }

  let inputCtrl = function (data) {
    for (e in data) {
      let ctrl = parseInt(data[e]);
      if (isNaN(ctrl) === true) {
        condicion = false;
        switch (data) {
          case newInput.dni:
            alert(
              "El DNI ingresado no es correcto. Asegurese de estar ingresando únicamente números."
            );
            break;
          case newInput.edad:
            alert(
              "La edad ingresada no es correcta. Asegurese de estar ingresando únicamente números."
            );
            break;
          case newInput.tel:
            alert(
              "El teléfono ingresado no es correcto. Asegurese de estar ingresando únicamente números."
            );
            break;
          case newInput.trimUno:
            alert(
              "La nota ingresada para el 1° trimestre no es correcta. Asegurese de estar ingresando únicamente números."
            );
            break;
          case newInput.trimDos:
            alert(
              "La nota ingresada para el 2° trimestre no es correcta. Asegurese de estar ingresando únicamente números."
            );
            break;
          case newInput.trimTres:
            alert(
              "La nota ingresada para el 3° trimestre no es correcta. Asegurese de estar ingresando únicamente números."
            );
            break;
        }
      }
    }
  };

  inputCtrl(newInput.dni);
  inputCtrl(newInput.edad);
  inputCtrl(newInput.tel);
  inputCtrl(newInput.trimUno);
  inputCtrl(newInput.trimDos);
  inputCtrl(newInput.trimTres);

  let notas = [
    parseInt(newInput.trimUno),
    parseInt(newInput.trimDos),
    parseInt(newInput.trimTres),
  ];

  let validarNota = function () {
    for (e in notas) {
      if (notas[e] < 1 || notas[e] > 10) {
        alert(
          `La nota ingresada para el ${
            parseInt(e) + 1
          }° trimestre no es correcta.`
        );
        condicion = false;
        break;
      }
    }
  };

  validarNota();

  newInput.promedio = (notas[0] + notas[1] + notas[2]) / 3;

  if (condicion === true) {
    let alumnosArray = JSON.parse(localStorage.alumnos);
    alumnosArray.push(JSON.stringify(newInput));
    localStorage.alumnos = JSON.stringify(alumnosArray);
    location.reload();
  }
});
