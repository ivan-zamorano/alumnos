let total = document.getElementById("alumnosTotal");
let promedioTotal = document.getElementById("promedioTotal");
let mejorPromedio = document.getElementById("mejorPromedio");
let porcentaje = document.getElementById("porcentaje");

let pageIndex = document.getElementById("page-index");

let entryCount = JSON.parse(localStorage.alumnos).length;
let entries = JSON.parse(localStorage.alumnos);

let tabla = document.getElementById("tabla");
let rows = tabla.getElementsByTagName("tr");

let pages = new Array();

let pagination = function () {
  let loopCount = 0;
  while (loopCount < entryCount) {
    let newPage = entries.slice(loopCount, loopCount + 10);
    pages.push(newPage);
    loopCount = loopCount + 10;
  }
};

pagination();

////// TABLA //////

// Navegación de páginas

let back = document.getElementById("back-btn");
let fwd = document.getElementById("fwd-btn");

let cbox = document.querySelectorAll(".cbox");

let index = parseInt(pageIndex.innerHTML);
if (pages.length > 0) {
  pageIndex.innerHTML = `${index}/${pages.length}`;
} else {
  pageIndex.innerHTML = `${index}/1`;
}

let clearCboxes = function () {
  for (e in cbox) {
    if (cbox[e].checked === true) {
      cbox[e].checked = false;
    }
  }
  if (checkAll.checked === true) {
    checkAll.checked = false;
  }
};

back.addEventListener("click", function () {
  if (index > 1) {
    index = index - 1;
    pageIndex.innerHTML = `${index}/${pages.length}`;
    display();
    clearCboxes();
  }
  cboxDisable();
  checkAll.disabled = false;
});

fwd.addEventListener("click", function () {
  if (index < pages.length) {
    clearTable();
    index = index + 1;
    pageIndex.innerHTML = `${index}/${pages.length}`;
    clearCboxes();
    display();
  }
  cboxDisable();
});

// Capitalizar nombres
let capitalize = function (string) {
  var splitStr = string.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

// Imprimir datos en tabla

let display = function () {
  if (pages.length > 0) {
    for (let i = 1; i < rows.length; i++) {
      if (pages[index - 1][i - 1] === undefined) {
        break;
      }
      let content = JSON.parse(pages[index - 1][i - 1]);
      rows[i].getElementsByTagName("td")[1].innerHTML = capitalize(
        content.nombre
      );
      rows[i].getElementsByTagName("td")[2].innerHTML = capitalize(
        content.apellido
      );
      rows[i].getElementsByTagName("td")[3].innerHTML = content.dni;
      rows[i].getElementsByTagName("td")[4].innerHTML = content.edad;
      rows[i].getElementsByTagName("td")[5].innerHTML = content.tel;
      rows[i].getElementsByTagName("td")[6].innerHTML = content.mail;
      rows[i].getElementsByTagName("td")[7].innerHTML = content.trimUno;
      rows[i].getElementsByTagName("td")[8].innerHTML = content.trimDos;
      rows[i].getElementsByTagName("td")[9].innerHTML = content.trimTres;
    }
  }
};
display();

// Limpiar tabla
let clearTable = function () {
  for (let i = 1; i < rows.length; i++) {
    rows[i].getElementsByTagName("td")[1].innerHTML = "";
    rows[i].getElementsByTagName("td")[2].innerHTML = "";
    rows[i].getElementsByTagName("td")[3].innerHTML = "";
    rows[i].getElementsByTagName("td")[4].innerHTML = "";
    rows[i].getElementsByTagName("td")[5].innerHTML = "";
    rows[i].getElementsByTagName("td")[6].innerHTML = "";
    rows[i].getElementsByTagName("td")[7].innerHTML = "";
    rows[i].getElementsByTagName("td")[8].innerHTML = "";
    rows[i].getElementsByTagName("td")[9].innerHTML = "";
  }
};

// Seleccionar elementos de la tabla

let checkCount = 0;
let checkedObj = {};
let checkAll = document.getElementById("check-all");

cbox.forEach((item) => {
  item.addEventListener("click", function () {
    if (item.checked === true) {
      for (e in cbox) {
        if (cbox[e] === item) {
          checkedObj[e] = pages[index - 1][e];
          checkCount += 1;
        }
      }
    } else {
      for (e in cbox) {
        if (cbox[e] === item) {
          delete checkedObj[e];
        }
      }
      checkCount -= 1;
      if (checkAll.checked === true) {
        checkAll.checked = false;
      }
    }
    btnEnableDisable();
  });
});

checkAll.addEventListener("click", function () {
  cbox.forEach((item) => {
    if (checkAll.checked === true && item.checked === false) {
      item.click();
    } else if (checkAll.checked === false && item.checked === true) {
      item.click();
    }
  });
});

let cboxDisable = function () {
  if (pages.length < 1) {
    for (e = 0; e < cbox.length; e++) {
      cbox[e].disabled = true;
    }
    checkAll.disabled = true;
  }
  let vacios = [];
  if (pages.length > 0) {
    for (e = 0; e < cbox.length; e++) {
      if (pages[index - 1][e] === undefined) {
        vacios.push(e);
        cbox[e].disabled = true;
      } else {
        cbox[e].disabled = false;
      }
    }
  }
};

cboxDisable();

////// EDITAR ENTRADAS //////

let delBtn = document.getElementById("del-btn");
let delBox = document.getElementById("del-box");
let delAccept = document.getElementById("del-accept");
let delCancel = document.getElementById("del-cancel");

// Habilitar/Deshabilitar botones de edición

let btnEnableDisable = function () {
  if (checkCount > 0) {
    delBtn.disabled = false;
  } else {
    delBtn.disabled = true;
  }
  if (checkCount === 1) {
    updtBtn.disabled = false;
  } else {
    updtBtn.disabled = true;
  }
};

// Eliminar entradas

delBtn.addEventListener("click", function () {
  delBox.style.display = "block";
});

delAccept.addEventListener("click", function () {
  for (e in entries) {
    for (i in checkedObj) {
      if (entries[e] === checkedObj[i]) {
        entries.splice(e, 1);
        delete checkedObj[i];
        localStorage.alumnos = JSON.stringify(entries);
        entries = JSON.parse(localStorage.alumnos);
        entryCount = JSON.parse(localStorage.alumnos).length;
        pages = new Array();
      }
    }
  }

  checkCount = 0;
  btnEnableDisable();
  delBox.style.display = "none";
  clearCboxes();
  clearTable();
  pagination();
  cboxDisable();
  display();
  statsDisplay();
});

delCancel.addEventListener("click", function () {
  delBox.style.display = "none";
});

// Actualizar entradas

let updtBox = document.getElementById("updt-box");
let updtBtn = document.getElementById("updt-btn");
let updtAccept = document.getElementById("updt-accept");
let updtCancel = document.getElementById("updt-cancel");
let nombreUpdt = document.getElementById("nombreu");
let apellidoUpdt = document.getElementById("apellidou");
let dniUpdt = document.getElementById("dniu");
let edadUpdt = document.getElementById("edadu");
let telUpdt = document.getElementById("telu");
let mailUpdt = document.getElementById("mailu");
let trimUnoUpdt = document.getElementById("trim-unou");
let trimDosUpdt = document.getElementById("trim-dosu");
let trimTresUpdt = document.getElementById("trim-tresu");

class AlumnoUpdt {
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

updtBtn.addEventListener("click", function () {
  updtBox.style.display = "block";
  let cboxIndex = 0;
  for (let i = 0; i < cbox.length; i++) {
    if (cbox[i].checked === true) {
      cboxIndex = i;
    }
  }
  let selected = JSON.parse(pages[index - 1][cboxIndex]);

  nombreUpdt.value = selected.nombre;
  apellidoUpdt.value = selected.apellido;
  dniUpdt.value = selected.dni;
  edadUpdt.value = selected.edad;
  mailUpdt.value = selected.mail;
  telUpdt.value = selected.tel;
  trimUnoUpdt.value = selected.trimUno;
  trimDosUpdt.value = selected.trimDos;
  trimTresUpdt.value = selected.trimTres;
});

updtAccept.addEventListener("click", function (e) {
  e.preventDefault();

  let updtInput = new AlumnoUpdt(
    nombreUpdt.value,
    apellidoUpdt.value,
    dniUpdt.value,
    edadUpdt.value,
    mailUpdt.value,
    telUpdt.value,
    trimUnoUpdt.value,
    trimDosUpdt.value,
    trimTresUpdt.value
  );

  let cboxIndex = 0;
  for (let i = 0; i < cbox.length; i++) {
    if (cbox[i].checked === true) {
      cboxIndex = i;
    }
  }
  let selected = pages[index - 1][cboxIndex];

  // Validación de campos vacios
  let condicion = false;
  for (i in updtInput) {
    if (updtInput[i].length == 0) {
      alert(`Complete el campo ${i}`);
      condicion = false;
      break;
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
          case updtInput.nombre:
            alert(
              "El nombre ingresado no es correcto. Asegurese de estar ingresando únicamente letras."
            );
            break;
          case updtInput.apellido:
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

  stringCtrl(updtInput.nombre);
  if (condicion === false) {
    return;
  }
  stringCtrl(updtInput.apellido);
  if (condicion === false) {
    return;
  }
  mailCtrl(updtInput.mail);
  if (condicion === false) {
    return;
  }

  // Validación de notas
  let notas = [
    parseInt(updtInput.trimUno),
    parseInt(updtInput.trimDos),
    parseInt(updtInput.trimTres),
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

  // Cálculo de promedio
  updtInput.promedio = (notas[0] + notas[1] + notas[2]) / 3;

  if (condicion === true) {
    for (i in entries) {
      if (entries[i] === selected) {
        entries[i] = JSON.stringify(updtInput);
        localStorage.alumnos = JSON.stringify(entries);
        entries = JSON.parse(localStorage.alumnos);
        pages = new Array();
      }
    }
  }
  checkCount = 0;
  btnEnableDisable();
  updtBox.style.display = "none";
  clearCboxes();
  pagination();
  display();
  statsDisplay();
});

updtCancel.addEventListener("click", function () {
  updtBox.style.display = "none";
});

////// STATS //////

let statsDisplay = function () {
  let totalAlumnos = function () {
    total.innerHTML = "Total de alumnos: ";
    total.innerHTML = total.innerHTML + entryCount;
  };

  let promedioGral = function () {
    let promedios = [];
    for (e in entries) {
      promedios.push(JSON.parse(entries[e]).promedio);
    }
    let promGral = 0;
    for (e in promedios) {
      promGral += promedios[e];
    }
    promGral = promGral / promedios.length;
    promedioTotal.innerHTML = "Promedio total: ";
    if (entryCount < 1) {
      promedioTotal.innerHTML = "Promedio total: --";
    } else {
      promedioTotal.innerHTML = promedioTotal.innerHTML + promGral.toFixed(2);
    }
  };

  let mayorPromedio = function () {
    let promedios = [];
    for (e in entries) {
      promedios.push(JSON.parse(entries[e]).promedio);
    }
    let mayor = 0;
    for (e in promedios) {
      if (promedios[e] > mayor) {
        mayor = promedios[e];
      }
    }
    mejorPromedio.innerHTML = "Mejor promedio: ";
    if (entryCount < 1) {
      mejorPromedio.innerHTML = "Mejor promedio: --";
    } else if (Number.isInteger(mayor)) {
      mejorPromedio.innerHTML = mejorPromedio.innerHTML + mayor;
    } else {
      mejorPromedio.innerHTML = mejorPromedio.innerHTML + mayor.toFixed(2);
    }
  };

  let aprobacion = function () {
    let aprobados = 0;
    for (e in entries) {
      if (JSON.parse(entries[e]).promedio >= 7) {
        aprobados++;
      }
    }
    let porcAprobados = (aprobados * 100) / entryCount;
    porcentaje.innerHTML = "Porcentaje de aprobación: ";
    if (entryCount < 1) {
      porcentaje.innerHTML = "Porcentaje de aprobación: --";
    } else if (Number.isInteger(porcAprobados)) {
      porcentaje.innerHTML = porcentaje.innerHTML + porcAprobados + "%";
    } else {
      porcentaje.innerHTML =
        porcentaje.innerHTML + porcAprobados.toFixed(2) + "%";
    }
  };

  totalAlumnos();
  promedioGral();
  mayorPromedio();
  aprobacion();
};

statsDisplay();
