# AGENT.md — Reglas para el agente de IA

Proyecto: **Sistema de Registro y Bienvenida (Entrega Final 2)** de Silvina Carolina Carrizo.
Toda sugerencia de código debe respetar estas reglas. Si la IA genera algo que las rompe, se corrige antes de entregar.

## Archivos (en la raíz)
- `index.html` → pantalla de registro (formulario).
- `bienvenida.html` → pantalla del usuario logueado.
- `style.css` → hoja de estilos única para ambas pantallas.
- `script.js` → toda la lógica (validación, DOM, fetch, localStorage).
- `assets/` → solo multimedia (favicon).

## HTML
- Ambas páginas con `<header>`, `<main>` y `<footer>`.
- Formulario con mínimo: email, contraseña y confirmación de contraseña (además: nombre y edad opcional).
- Cada `<label for="x">` vinculado a su `<input id="x">`.
- El envío del formulario se captura en la etiqueta: `<form onsubmit="registro(event)">`.
- Botones individuales con `onclick="funcion()"` (ej. `onclick="cerrarSesion()"`).
- Carga inicial de cada página con `<body onload="funcion()">`.
- Nada de `style=""` ni `<script>` con código dentro del HTML: todo va en `script.js`.

## JavaScript — reglas estrictas
1. **Solo arrow functions:** `const nombre = (parametros) => { ... }`. Prohibido `function nombre() {}`.
2. **DOM solo con `document.getElementById('id')`.** Prohibido `querySelector` / `querySelectorAll`.
3. **Condicionales con `if` + `return` anticipado.** No usar `else`.
4. **Arrays con métodos declarativos** (`.map()`, `.filter()`) y arrow functions. No usar `for` / `forEach` para transformar o filtrar.
5. **Persistencia solo con `localStorage`.**
   - Guardar con `localStorage.setItem(clave, JSON.stringify(objeto))`.
   - Leer con `JSON.parse(localStorage.getItem(clave))`.
   - **Nunca guardar la contraseña.**
6. **Redirección** con `window.location.href = 'bienvenida.html'` (y `'index.html'` al cerrar sesión o si no hay sesión).
7. **Fetch:** `const respuesta = await fetch(url)` → `const data = await respuesta.json()`, dentro de `try/catch` en una función `async`. API: `https://jsonplaceholder.typicode.com/users`.
8. **Consola diferenciada:**
   - `console.log()` → flujo normal.
   - `console.warn()` → advertencias (validaciones de datos, datos opcionales faltantes).
   - `console.error()` → errores críticos (contraseñas que no coinciden, fallo del fetch).
9. Mensajes para el usuario en pantalla (`<p id="mensaje">`), no con `alert()`.

## CSS
- Sin Tailwind. Orden: reset + `:root` → estilos por sección → `@media` al final.
- Usar variables de `:root` para colores y fuentes.

## Convenciones
- Nombres en español, sin tildes ni ñ en variables/funciones (`contrasenia`, `cerrarSesion`).
- camelCase en JS, kebab-case en ids (`confirmar-contrasenia`).
- Comentar cada bloque. Indentación de 2 espacios.
