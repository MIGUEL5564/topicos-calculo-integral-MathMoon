function loginAlumno() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  if (!nombre || !email) {
    alert("Completa todos los campos");
    return;
  }

  let alumnos = JSON.parse(localStorage.getItem("alumnos")) || {};

  if (!alumnos[email]) {
    alumnos[email] = {
      nombre: nombre,
      sesiones: [],
      progreso: 0,
      cursoCompletado: false
    };
  }

  localStorage.setItem("alumnos", JSON.stringify(alumnos));
  localStorage.setItem("usuarioActivo", email);

  mostrarCurso();
}

function mostrarCurso() {
  const usuario = localStorage.getItem("usuarioActivo");
  if (!usuario) return;

  document.getElementById("login").style.display = "none";
  document.getElementById("curso").style.display = "block";

  cargarProgreso();
}

window.onload = mostrarCurso;

function cargarProgreso() {
  const email = localStorage.getItem("usuarioActivo");
  const alumnos = JSON.parse(localStorage.getItem("alumnos"));
  if (!email || !alumnos[email]) return;

  actualizarBarra(alumnos[email].progreso);
}

function actualizarBarra(valor) {
  document.getElementById("progreso").style.width = valor + "%";
  document.getElementById("texto-progreso").textContent =
    `Progreso del curso: ${valor}%`;
}

function completarSesion(num) {
  const email = localStorage.getItem("usuarioActivo");
  let alumnos = JSON.parse(localStorage.getItem("alumnos"));

  if (!alumnos[email].sesiones.includes(num)) {
    alumnos[email].sesiones.push(num);
  }

  alumnos[email].progreso =
    Math.round((alumnos[email].sesiones.length / 6) * 100);

  if (alumnos[email].progreso === 100) {
    alumnos[email].cursoCompletado = true;
    alert("🎉 Curso completado. Ya puedes descargar tu constancia.");
  }

  localStorage.setItem("alumnos", JSON.stringify(alumnos));
  actualizarBarra(alumnos[email].progreso);
}
