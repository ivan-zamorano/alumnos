let total = document.getElementById("alumnosTotal");

total.innerHTML = total.innerHTML + localStorage.length;

let tabla = document.getElementById("tabla");
let rows = tabla.getElementsByTagName("tr");

for (let i = 1; i < rows.length; i++) {
  let content = JSON.parse(localStorage.getItem(i - 1));
  rows[i].getElementsByTagName("td")[1].innerHTML = content.nombre;
  rows[i].getElementsByTagName("td")[2].innerHTML = content.apellido;
  rows[i].getElementsByTagName("td")[3].innerHTML = content.dni;
}
