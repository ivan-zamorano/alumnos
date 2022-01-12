let total = document.getElementById("alumnosTotal");
let pageIndex = document.getElementById("page-index");

let entryCount = JSON.parse(localStorage.alumnos).length;
let entries = JSON.parse(localStorage.alumnos);

let statsDisplay = function () {
  total.innerHTML = total.innerHTML + entryCount;
};

statsDisplay();

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

// Botones para navegación de la tabla

let back = document.getElementById("back-btn");
let fwd = document.getElementById("fwd-btn");

let cbox = document.querySelectorAll(".cbox");

let index = parseInt(pageIndex.innerHTML);

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
    pageIndex.innerHTML = index;
    display();
    clearCboxes();
  }
  cboxDisable();
});

fwd.addEventListener("click", function () {
  if (index < pages.length) {
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
    index = index + 1;
    pageIndex.innerHTML = index;
    clearCboxes();
    display();
  }
  cboxDisable();
});

// Imprimir datos en tabla

let display = function () {
  if (pages.length > 0) {
    for (let i = 1; i < rows.length; i++) {
      if (pages[index - 1][i - 1] === undefined) {
        break;
      }
      let content = JSON.parse(pages[index - 1][i - 1]);
      rows[i].getElementsByTagName("td")[1].innerHTML = content.nombre;
      rows[i].getElementsByTagName("td")[2].innerHTML = content.apellido;
      rows[i].getElementsByTagName("td")[3].innerHTML = content.dni;
    }
  }
};

let clearTable = function () {
  for (let i = 1; i < rows.length; i++) {
    rows[i].getElementsByTagName("td")[1].innerHTML = "";
    rows[i].getElementsByTagName("td")[2].innerHTML = "";
    rows[i].getElementsByTagName("td")[3].innerHTML = "";
    // rows[i].getElementsByTagName("td")[4].innerHTML = "";
    // rows[i].getElementsByTagName("td")[5].innerHTML = "";
    // rows[i].getElementsByTagName("td")[6].innerHTML = "";
    // rows[i].getElementsByTagName("td")[7].innerHTML = "";
    // rows[i].getElementsByTagName("td")[8].innerHTML = "";
    // rows[i].getElementsByTagName("td")[9].innerHTML = "";
  }
};

display();

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

// cbox.forEach((item) => {
//   item.addEventListener("click", function () {
//     if (item.checked === true) {
//       checkCount += 1;
//     }
//     if (item.checked === false) {
//       checkCount -= 1;
//       if (checkAll.checked === true) {
//         checkAll.checked = false;
//       }
//     }
//     // Habilitar o deshabilitar botones de edición de tabla
//     btnEnableDisable();
//   });
// });

checkAll.addEventListener("click", function () {
  if (checkAll.checked === true) {
    checkCount = 0;
    for (let e = 0; e < 10; e++) {
      if (pages[index - 1][e] !== undefined) {
        cbox[e].checked = true;
        checkCount += 1;
      }
    }
  } else {
    clearCboxes();
    checkCount = 0;
  }
  btnEnableDisable();
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

// EDITAR TABLA

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
  display();
  cboxDisable();
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

class AlumnoUpdt {
  constructor(nombre, apellido, dni) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
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
});

updtAccept.addEventListener("click", function (e) {
  e.preventDefault();

  let updtInput = new AlumnoUpdt(
    nombreUpdt.value,
    apellidoUpdt.value,
    dniUpdt.value
  );

  let cboxIndex = 0;
  for (let i = 0; i < cbox.length; i++) {
    if (cbox[i].checked === true) {
      cboxIndex = i;
    }
  }
  let selected = pages[index - 1][cboxIndex];

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
});

updtCancel.addEventListener("click", function () {
  updtBox.style.display = "none";
});
