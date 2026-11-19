# DESIGN.md — Guía de diseño

Misma identidad visual que el portfolio (Entrega 1), para que ambas entregas se vean como un mismo proyecto personal.

## Estilo
Minimalista: fondo rosa muy claro, una tarjeta blanca central con borde superior rosa, header bordó oscuro y footer bordó.

## Paleta (variables en `:root`)
| Variable | Color | Uso |
|---|---|---|
| `--oscuro` | `#590D22` | Header, texto general |
| `--principal` | `#800F2F` | Títulos, botón, labels, footer |
| `--secundario` | `#A4133C` | Etiquetas y textos secundarios |
| `--intenso` | `#C9184A` | Hover del botón, nombre del usuario |
| `--acento` | `#FF758F` | Borde de tarjetas y foco de inputs |
| `--rosa-medio` | `#FF8FA3` | Borde del mensaje informativo |
| `--rosa-suave` | `#FFB3C1` | Bordes de inputs, botón claro |
| `--rosa-palido` | `#FFCCD5` | Fondo de mensajes de error |
| `--rosa-claro` | `#FFF0F3` | Fondo general y de inputs |

Mensaje de éxito: verde (`#E6F4EA` / `#1E5631`), para que se distinga claramente del error.

## Tipografías
- Títulos: **Playfair Display**
- Textos: **Poppins**

## Pantallas
- **index.html:** dos columnas (texto de bienvenida + tarjeta con formulario). En celular, una columna.
- **bienvenida.html:** tarjeta central con saludo personalizado y lista de datos. Botón "Cerrar sesión" en el header.

## Mensajes del formulario
- `.mensaje--error` → fondo rosa pálido, borde rojo.
- `.mensaje--info` → "Verificando tus datos...".
- `.mensaje--exito` → verde.
