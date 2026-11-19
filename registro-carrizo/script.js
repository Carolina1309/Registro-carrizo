// =========================================================
// SISTEMA DE REGISTRO Y BIENVENIDA — script.js
// Un solo archivo para las dos pantallas:
//   - index.html      → registro(event) y validacionRegistro()
//   - bienvenida.html → mostrarBienvenida() y cerrarSesion()
// =========================================================

console.log("script.js cargado correctamente");

// ----- CONSTANTES -----
const URL_USUARIOS = "https://jsonplaceholder.typicode.com/users";
const CLAVE_STORAGE = "usuarioRegistrado";
const EDAD_MINIMA = 18;
const LARGO_MINIMO = 6;
const LARGO_RECOMENDADO = 8;


// =========================================================
// FUNCIONES AUXILIARES
// =========================================================

// Muestra un mensaje en pantalla (en el <p id="mensaje">)
// tipo puede ser: "error", "exito" o "info"
const mostrarMensaje = (texto, tipo) => {
  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = texto;
  mensaje.className = "mensaje mensaje--" + tipo;
};

// FETCH: pide la lista de usuarios a la API y devuelve solo sus emails
const obtenerEmailsRegistrados = async () => {
  try {
    // 1. Hacemos la petición y guardamos la respuesta en una constante
    const respuesta = await fetch(URL_USUARIOS);

    // 2. Convertimos la respuesta a JSON (un array de objetos)
    const dataUsuarios = await respuesta.json();
    console.log("Usuarios recibidos de la API:", dataUsuarios.length);

    // 3. Con .map() nos quedamos solo con el email de cada usuario
    const emailsUsuarios = dataUsuarios.map((usuario) => usuario.email.toLowerCase());
    return emailsUsuarios;
  } catch (error) {
    // Si falla internet o la API, lo registramos como error crítico
    console.error("Error al consultar la API de usuarios:", error);
    return null;
  }
};


// =========================================================
// PANTALLA 1: REGISTRO (index.html)
// =========================================================

// Se ejecuta con onsubmit="registro(event)"
const registro = async (event) => {
  // Evita que el formulario recargue la página
  event.preventDefault();
  console.log("Se envió el formulario de registro");

  // 1. Capturamos los valores que escribió el usuario
  const nombre = document.getElementById("nombre").value.trim();
  const edad = document.getElementById("edad").value;
  const email = document.getElementById("email").value.trim().toLowerCase();
  const contrasenia = document.getElementById("contrasenia").value;
  const confirmarContrasenia = document.getElementById("confirmar-contrasenia").value;

  // 2. VALIDACIONES — cada if corta la función con return si algo está mal

  if (nombre === "" || email === "" || contrasenia === "" || confirmarContrasenia === "") {
    mostrarMensaje("Completá todos los campos obligatorios.", "error");
    console.warn("Validación: hay campos obligatorios vacíos");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    mostrarMensaje("Ingresá un correo electrónico válido.", "error");
    console.warn("Validación: el email no tiene un formato válido");
    return;
  }

  if (edad !== "" && Number(edad) < EDAD_MINIMA) {
    mostrarMensaje("Tenés que ser mayor de " + EDAD_MINIMA + " años para registrarte.", "error");
    console.warn("Validación: el usuario es menor de edad");
    return;
  }

  if (contrasenia.length < LARGO_MINIMO) {
    mostrarMensaje("La contraseña debe tener al menos " + LARGO_MINIMO + " caracteres.", "error");
    console.warn("Validación: la contraseña es demasiado corta");
    return;
  }

  if (contrasenia !== confirmarContrasenia) {
    mostrarMensaje("Las contraseñas no coinciden.", "error");
    console.error("Error: las contraseñas no coinciden");
    return;
  }

  // Advertencias NO bloqueantes: avisan pero dejan seguir
  if (edad === "") {
    console.warn("Advertencia: el usuario no informó su edad");
  }

  if (contrasenia.length < LARGO_RECOMENDADO) {
    console.warn("Advertencia: se recomienda una contraseña de " + LARGO_RECOMENDADO + " caracteres o más");
  }

  // 3. FETCH: revisamos que el email no esté registrado en la API
  mostrarMensaje("Verificando tus datos...", "info");
  const emailsRegistrados = await obtenerEmailsRegistrados();

  if (emailsRegistrados === null) {
    mostrarMensaje("No pudimos verificar tus datos. Revisá tu conexión e intentá de nuevo.", "error");
    return;
  }

  // Con .filter() buscamos si el email ingresado ya existe
  const emailRepetido = emailsRegistrados.filter((registrado) => registrado === email);

  if (emailRepetido.length > 0) {
    mostrarMensaje("Ese correo ya está registrado. Probá con otro.", "error");
    console.warn("Validación: el email ya existe en la API");
    return;
  }

  // 4. PERSISTENCIA: guardamos el usuario en localStorage
  // (la contraseña NO se guarda por seguridad)
  const usuario = {
    nombre: nombre,
    edad: edad,
    email: email,
    fechaRegistro: new Date().toLocaleDateString("es-AR")
  };

  // localStorage solo guarda texto → convertimos el objeto con JSON.stringify
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(usuario));
  console.log("Usuario guardado en localStorage:", usuario);

  // 5. REDIRECCIÓN a la pantalla de bienvenida
  mostrarMensaje("¡Registro exitoso! Redirigiendo...", "exito");
  window.location.href = "bienvenida.html";
};

// Se ejecuta con onload en index.html
// Si ya hay un usuario logueado, no tiene sentido registrarse otra vez
const validacionRegistro = () => {
  const usuarioGuardado = localStorage.getItem(CLAVE_STORAGE);

  if (!usuarioGuardado) {
    console.log("No hay sesión iniciada: se muestra el formulario");
    return;
  }

  console.log("Ya hay una sesión iniciada: redirigiendo a bienvenida");
  window.location.href = "bienvenida.html";
};


// =========================================================
// PANTALLA 2: BIENVENIDA (bienvenida.html)
// =========================================================

// Se ejecuta con onload en bienvenida.html
const mostrarBienvenida = () => {
  const usuarioGuardado = localStorage.getItem(CLAVE_STORAGE);

  // Si no hay usuario guardado, no puede estar acá → vuelve al registro
  if (!usuarioGuardado) {
    console.warn("No hay usuario en localStorage: redirigiendo al registro");
    window.location.href = "index.html";
    return;
  }

  // Convertimos el texto guardado de nuevo en objeto con JSON.parse
  const usuario = JSON.parse(usuarioGuardado);
  console.log("Usuario logueado:", usuario);

  // Mostramos los datos en pantalla
  document.getElementById("saludo-nombre").textContent = usuario.nombre;
  document.getElementById("dato-email").textContent = usuario.email;
  document.getElementById("dato-edad").textContent = usuario.edad || "No informada";
  document.getElementById("dato-fecha").textContent = usuario.fechaRegistro;
};

// Se ejecuta con onclick="cerrarSesion()"
const cerrarSesion = () => {
  localStorage.removeItem(CLAVE_STORAGE);
  console.log("Sesión cerrada: usuario eliminado de localStorage");
  window.location.href = "index.html";
};
