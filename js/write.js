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

// Función constructora de nuevo alumno
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

// Colocar array en localstorage si este se encuentra vacío
if (localStorage.length === 0) {
  localStorage.setItem("alumnos", JSON.stringify(new Array()));
  location.reload();
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

  ////// Validación //////

  let condicion = false;

  for (i in newInput) {
    if (newInput[i].length === 0) {
      switch (i) {
        case "nombre":
          alert("Complete el campo nombre");
          break;
        case "apellido":
          alert("Complete el campo apellido");
          break;
        case "dni":
          alert("Complete el campo documento");
          break;
        case "edad":
          alert("Complete el campo edad");
          break;
        case "mail":
          alert("Complete el campo mail");
          break;
        case "tel":
          alert("Complete el campo teléfono");
          break;
        case "trimUno":
          alert("Ingrese una nota para el 1° trimestre");
          break;
        case "trimDos":
          alert("Ingrese una nota para el 2° trimestre");
          break;
        case "trimTres":
          alert("Ingrese una nota para el 3° trimestre");
          break;
      }
      condicion = false;
      return;
    } else {
      condicion = true;
    }
  }

  // Validación de campos de texto
  let stringCtrl = function (data) {
    let letras = /^[A-Za-z]+$/;
    let spcBar = " ";
    for (e in data) {
      if (data[e].match(letras) || data[e].match(spcBar)) {
        condicion = true;
      } else {
        condicion = false;
        switch (data) {
          case newInput.nombre:
            alert(
              "El nombre ingresado no es correcto. Asegurese de estar ingresando únicamente letras."
            );
            break;
          case newInput.apellido:
            alert(
              "El apellido ingresado no es correcto. Asegurese de estar ingresando únicamente letras."
            );
            break;
        }
        return;
      }
    }
  };

  // Validación de mail
  let mailCtrl = function (data) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data)) {
      condicion = true;
    } else {
      alert("La direccion de e-mail ingresada no es valida.");
      condicion = false;
    }
  };

  stringCtrl(newInput.nombre);
  if (condicion === false) {
    return;
  }
  stringCtrl(newInput.apellido);
  if (condicion === false) {
    return;
  }
  mailCtrl(newInput.mail);
  if (condicion === false) {
    return;
  }

  // Validación de notas
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
          }° trimestre no es correcta. Ingrese un número del 1 al 10`
        );
        condicion = false;
        break;
      }
    }
  };

  validarNota();

  // Cálculo de promedio
  newInput.promedio = (notas[0] + notas[1] + notas[2]) / 3;

  // Commit
  if (condicion === true) {
    let alumnosArray = JSON.parse(localStorage.alumnos);
    alumnosArray.push(JSON.stringify(newInput));
    localStorage.alumnos = JSON.stringify(alumnosArray);
    location.reload();
  }
});
