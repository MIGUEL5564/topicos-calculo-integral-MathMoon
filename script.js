const CORREOS_PERMITIDOS = [
  "alumno1@gmail.com",
  "alumno2@gmail.com",
  "skornillmoon@gmail.com"
];
function loginAlumno() {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();

  if (!nombre || !email) {
    alert("Completa todos los campos");
    return;
  }

  if (!CORREOS_PERMITIDOS.includes(email)) {
    alert("⛔ Acceso no autorizado. Contacta al administrador.");
    return;
  }

  let alumnos = JSON.parse(localStorage.getItem("alumnos")) || {};

  if (!alumnos[email]) {
    alumnos[email] = {
      nombre,
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
  actualizarBloqueos();
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
  actualizarBloqueos(); 
}

function actualizarBloqueos() {
  const email = localStorage.getItem("usuarioActivo");
  const alumnos = JSON.parse(localStorage.getItem("alumnos"));
  if (!email || !alumnos[email]) return;

  const sesionesCompletadas = alumnos[email].sesiones;

  for (let i = 2; i <= 6; i++) {
    const sesion = document.getElementById("sesion" + i);
    if (sesionesCompletadas.includes(i - 1)) {
      sesion.classList.remove("bloqueada");
    } else {
      sesion.classList.add("bloqueada");
    }
  }
}
