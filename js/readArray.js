let total = document.getElementById("alumnosTotal");
let pageIndex = document.getElementById("page-index");
let back = document.getElementById("back-btn");
let fwd = document.getElementById("fwd-btn");
let cbox = document.querySelectorAll(".cbox");
let delBtn = document.getElementById("del-btn");
let updtBtn = document.getElementById("updt-btn");
let saveBtn = document.getElementById("save-btn");
let delBox = document.getElementById("del-box");
let delAccept = document.getElementById("del-accept");
let delCancel = document.getElementById("del-cancel");

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
});

fwd.addEventListener("click", function () {
  if (index < pages.length) {
    for (let i = 1; i < rows.length; i++) {
      rows[i].getElementsByTagName("td")[1].innerHTML = "";
      rows[i].getElementsByTagName("td")[2].innerHTML = "";
      rows[i].getElementsByTagName("td")[3].innerHTML = "";
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
  for (let i = 1; i < rows.length; i++) {
    let content = pages[index - 1][i - 1];
    // let content = JSON.parse(pages[index - 1][i - 1]);
    // if (content === undefined) {
    //   break;
    // }
    rows[i].getElementsByTagName("td")[1].innerHTML = content.nombre;
    rows[i].getElementsByTagName("td")[2].innerHTML = content.apellido;
    rows[i].getElementsByTagName("td")[3].innerHTML = content.dni;
  }
};

let clearTable = function () {
  for (let i = 1; i < rows.length; i++) {
    rows[i].getElementsByTagName("td")[1].innerHTML = "";
    rows[i].getElementsByTagName("td")[2].innerHTML = "";
    rows[i].getElementsByTagName("td")[3].innerHTML = "";
  }
};

display();

// Seleccionar elementos de la tabla

let checkedObj = {};

cbox.forEach((item) => {
  item.addEventListener("click", function () {
    if (item.checked === true) {
      for (e in cbox) {
        if (cbox[e] === item) {
          checkedObj[e] = pages[index - 1][e];
        }
      }
    } else {
      for (e in cbox) {
        if (cbox[e] === item) {
          delete checkedObj[e];
        }
      }
    }
    if (Object.keys(checkedObj).length !== 0) {
      delBtn.disabled = false;
    } else {
      delBtn.disabled = true;
    }
  });
});

let checkAll = document.getElementById("check-all");
checkAll.addEventListener("click", function () {
  if (checkAll.checked === true) {
    for (e in cbox) {
      if (pages[index - 1][e] !== undefined) {
        cbox[e].checked = true;
      }
    }
  } else {
    clearCboxes();
  }
});

let cboxDisable = function () {
  let vacios = [];
  for (e = 0; e < cbox.length; e++) {
    if (pages[index - 1][e] === undefined) {
      vacios.push(e);
      cbox[e].disabled = true;
    }
  }
  console.log(vacios);
};

cboxDisable();

// Editar tabla-CRUD

delBtn.addEventListener("click", function () {
  delBox.style.display = "block";
});

delAccept.addEventListener("click", function () {
  for (e in entries) {
    for (i in checkedObj) {
      if (entries[e] === checkedObj[i]) {
        entries.splice(e, 1);
        localStorage.alumnos = JSON.stringify(entries);
        entries = JSON.parse(localStorage.alumnos);
        entryCount = JSON.parse(localStorage.alumnos).length;
        pages = new Array();
      }
    }
  }
  delBtn.disabled = true;
  delBox.style.display = "none";
  clearCboxes();
  clearTable();
  pagination();
  display();
});

delCancel.addEventListener("click", function () {
  delBox.style.display = "none";
});
