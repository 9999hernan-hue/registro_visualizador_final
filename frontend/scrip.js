const campos = {
  nombre: { es: "Nombre", en: "Name" },
  descripcion: { es: "Descripción", en: "Description" },
  fecha: { es: "Fecha", en: "Date" },
};

let idiomaActual = navigator.language.startsWith("en") ? "en" : "es";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("idioma").value = idiomaActual;
  actualizarInterfaz();
  cargarRegistro();
});

function cambiarIdioma() {
  idiomaActual = document.getElementById("idioma").value;
  actualizarInterfaz();
}

function actualizarInterfaz() {
  document.getElementById("tituloNombre").innerText = campos.nombre[idiomaActual] + ":";
  document.getElementById("tituloDescripcion").innerText = campos.descripcion[idiomaActual] + ":";
  document.getElementById("tituloFecha").innerText = campos.fecha[idiomaActual] + ":";
}

function cargarRegistro() {
  fetch("/api/registro")
    .then(res => res.json())
    .then(data => {
      document.getElementById("nombre").innerText = data.nombre;
      document.getElementById("descripcion").innerText = data.descripcion;
      document.getElementById("fecha").innerText = data.fecha;
    })
    .catch(() => {
      alert(idiomaActual === "es" ? "Error al cargar el registro" : "Error loading record");
    });
}

function copiarRegistro() {
  const texto = `${campos.nombre[idiomaActual]}: ${document.getElementById("nombre").innerText}\n` +
                `${campos.descripcion[idiomaActual]}: ${document.getElementById("descripcion").innerText}\n` +
                `${campos.fecha[idiomaActual]}: ${document.getElementById("fecha").innerText}`;
  navigator.clipboard.writeText(texto);
  alert(idiomaActual === "es" ? "Registro copiado" : "Record copied");
}

function simularPago() {
  alert(idiomaActual === "es" ? "Simulación de pago exitosa" : "Payment simulation successful");
}