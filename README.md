# Florería Template (White-Label)

Plataforma en React + Vite + Tailwind para florerías premium. Está pensada para que el comprador tenga **certeza** y elija con un **mensaje emocional**: un asistente lo guía en 3 pasos, ve una ficha "Cero Dudas" y cierra el pedido por WhatsApp.

## Instalación

Requiere Node 18+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera /dist para publicar
```

---

## Mapa del proyecto

```
floreria-template/
├── index.html
├── package.json
├── vite.config.js
├── postcss.config.js
├── tailwind.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── config/
    │   ├── store.config.js
    │   └── emotions.config.js
    ├── data/
    │   └── products.js
    └── components/
        ├── layout/        Header.jsx, Footer.jsx, Modal.jsx
        ├── orientador/    MoodBackground.jsx, EmotionalWizard.jsx
        ├── catalog/       ProductCard.jsx, ProductGrid.jsx
        ├── checkout/      ZeroDoubtModal.jsx, WhatsappCheckout.jsx
        ├── ui/            Icons.jsx, WhatsappFab.jsx, RotatingSeal.jsx, Reveal.jsx
        └── sections/      TrustStrip.jsx, HowItWorks.jsx
```

### Archivos de la raíz (casi nunca se tocan)

| Archivo | Qué hace |
|---|---|
| `index.html` | Página base. Solo contiene `<div id="root">` y carga `src/main.jsx`. |
| `package.json` | Dependencias (React, Vite, Tailwind 3) y comandos `dev`, `build`, `preview`. |
| `vite.config.js` | Activa el plugin de React en Vite. |
| `postcss.config.js` | Conecta Tailwind y Autoprefixer al CSS. |
| `tailwind.config.js` | Dice dónde buscar clases y registra los colores y fuentes propios (`fg`, `muted`, `card`, `line`, `accent`, `panel`, `font-display`, `font-body`). Todos leen variables CSS que cambian con la intención activa. |

### `src/` (núcleo)

| Archivo | Qué hace |
|---|---|
| `main.jsx` | Punto de entrada: monta `<App />` e importa `index.css`. |
| `App.jsx` | Orquesta todo. Guarda el estado (intención activa, wizard abierto, producto seleccionado), carga la tipografía elegida, arma el hero y coloca cada sección según los `features` de la config. |
| `index.css` | Las 3 líneas `@tailwind` (**deben ir arriba de todo**) más las animaciones propias y la regla de `prefers-reduced-motion`. |

---

## `src/config/` (lo que cambias por cliente)

### `store.config.js` (panel de cambios rápidos)

| Campo | Para qué sirve |
|---|---|
| `name`, `tagline` | Nombre de la tienda y frase. Salen en el logo, la pestaña del navegador y el mensaje de WhatsApp. |
| `banner` | Franja superior del sitio. |
| `whatsapp` | Número con código de país, sin `+` ni espacios (ej. `524421234567`). |
| `currency`, `locale` | Formato de precios y fechas. |
| `accent` | Color de botones, badges y foco. Usa uno oscuro: los textos sobre él son blancos. |
| `fontStyle` | `'serif'` o `'sans'`. Elige el par de fuentes de `fonts`. |
| `fonts` | Definición de cada par (display + body) y su URL de Google Fonts. |
| `features` | Interruptores `true/false`: `wizard`, `cardCreator`, `deliveryDate`, `fab`, `seal`, `trustStrip`, `howItWorks`. |
| `coverage`, `guarantees`, `contact` | Textos del footer. |
| `trust` | Elementos de la cinta que se desplaza (icono + texto). |
| `seal` | Texto que gira alrededor del sello del hero. |
| `formatPrice()` | Función que da formato de moneda a los precios. |

### `emotions.config.js` (intenciones y atmósferas)

- `intents`: lista de sentimientos (pasión, ternura, gratitud...) con su etiqueta.
- `emotions`: las 5 intenciones (`amor`, `mama`, `amigos`, `primeraCita`, `casual`). Cada una define:
  - `bg`: color de fondo que se anima al seleccionarla.
  - `dark`: si el fondo es oscuro, para que el texto pase a claro.
  - `headline` y `sub`: textos del hero.
  - `forWhom`: cómo se llama la opción en el paso 1 del orientador.
  - `transmit`: opciones del paso 2 del orientador.
  - `frases`: dedicatorias sugeridas.
  - `showAll`: si está en `true`, muestra todo el catálogo (solo `casual`).
- `emotionOrder`: orden de los botones del header.
- `themeFor()`: calcula los colores de texto, tarjeta y línea según `dark`.

---

## `src/data/products.js` (catálogo)

Lista `products` con estos campos por producto:

| Campo | Uso |
|---|---|
| `id`, `name`, `price` | Identificador, nombre y precio. |
| `image` | URL o ruta en `/public`. Si va vacío se dibuja un ramo abstracto con `palette`. |
| `palette` | 3 colores del ramo abstracto. |
| `emotions` | En qué intenciones aparece. |
| `tags` | Qué transmite. El orientador ordena con esto. |
| `badges` | Etiquetas sobre la foto ("Más pedido", etc.). |
| `contiene` | Qué flores incluye. |
| `durabilidad`, `porQueLeEncantara`, `nivelDeImpacto`, `porQueRegalarlo` | La ficha "Cero Dudas" que se ve en el modal. |

`recommend(emotion, emotionId, tag, limit)` devuelve hasta 3 productos: filtra por intención y pone primero los que coinciden con el sentimiento elegido.

---

## `src/components/`

### `layout/`
| Archivo | Qué hace |
|---|---|
| `Header.jsx` | Banner superior, logo, botones de intención (cambian el fondo) y botón "Ayúdame a elegir". |
| `Footer.jsx` | Cobertura, garantías y contacto, tomados de la config. |
| `Modal.jsx` | Ventana emergente reutilizable: cierra con Esc o clic afuera, bloquea el scroll del fondo. La usan el orientador y la ficha del producto. |

### `orientador/`
| Archivo | Qué hace |
|---|---|
| `MoodBackground.jsx` | Envuelve toda la app. Aplica el color de fondo de la intención activa con transición de 1 s y publica las variables CSS de color. |
| `EmotionalWizard.jsx` | Asistente de 3 pasos: ¿Para quién? → ¿Qué quieres transmitir? → 3 recomendaciones. Al elegir destinatario cambia el fondo en vivo. |

### `catalog/`
| Archivo | Qué hace |
|---|---|
| `ProductCard.jsx` | Tarjeta estilo editorial (foto grande, nombre, precio, badges). También exporta `ProductVisual`, la imagen o el ramo abstracto que reutilizan otros componentes. |
| `ProductGrid.jsx` | Rejilla que filtra los productos por la intención activa. |

### `checkout/`
| Archivo | Qué hace |
|---|---|
| `ZeroDoubtModal.jsx` | Ficha completa del producto, formulario (fecha, destinatario, dirección), creador de dedicatoria con vista previa de la tarjeta impresa y frases sugeridas. |
| `WhatsappCheckout.jsx` | Valida los datos obligatorios y arma el enlace `wa.me` con producto, fecha, destinatario y dedicatoria. `buildMessage()` define el texto del mensaje. |

### `ui/` (detalles que dan vida)
| Archivo | Qué hace |
|---|---|
| `Icons.jsx` | Iconos SVG de línea: `flower`, `pen`, `truck`, `shield`, `card`, `clock`, `whatsapp`. Para agregar uno, añade otra entrada al objeto `Icon`. |
| `WhatsappFab.jsx` | Círculo verde flotante con pulso y etiqueta al pasar el mouse. Se oculta cuando hay un modal abierto. |
| `RotatingSeal.jsx` | Sello circular con texto que gira (solo en pantallas medianas y grandes). |
| `Reveal.jsx` | Envoltorio que hace aparecer su contenido suavemente al entrar en pantalla. |

### `sections/`
| Archivo | Qué hace |
|---|---|
| `TrustStrip.jsx` | Cinta de garantías con iconos que se desplaza sola y se pausa con el mouse. Lee `store.trust`. |
| `HowItWorks.jsx` | Diagrama de 4 pasos (Elige, Dedica, Confirma, Recibe) con línea punteada animada. Los textos están en el arreglo `steps` al inicio del archivo. |

---

## Clases y variables de CSS propias

**Variables** (las define `MoodBackground` y cambian con la intención): `--bg`, `--fg`, `--muted`, `--card`, `--line`, `--accent`.
Tailwind las expone como `bg-panel`, `text-fg`, `text-muted`, `bg-card`, `border-line`, `bg-accent`.

**Clases de `index.css`:**

| Clase | Efecto |
|---|---|
| `mood-t` | Anima el cambio de color de fondo, borde y texto. |
| `pop` | Entrada suave de los modales. |
| `fab-ring` | Anillo pulsante del botón de WhatsApp. |
| `seal-spin` | Giro lento del sello. |
| `flow-line` | Puntos que avanzan en la línea del diagrama. |
| `marquee-track` | Desplazamiento infinito de la cinta de garantías. |
| `reveal` / `reveal-on` | Aparición al hacer scroll. |
| `press` | Pequeño "hundimiento" al hacer clic. |

Con `prefers-reduced-motion` activado en el sistema, las animaciones continuas se apagan.

---

## ¿Qué archivo toco para...?

| Quiero... | Archivo |
|---|---|
| Cambiar nombre, WhatsApp, color o tipografía | `config/store.config.js` |
| Apagar el orientador, la dedicatoria, el sello, etc. | `config/store.config.js` → `features` |
| Cambiar colores de fondo o textos del hero por intención | `config/emotions.config.js` |
| Cambiar productos, precios o fichas | `data/products.js` |
| Cambiar cobertura, garantías o contacto | `config/store.config.js` |
| Cambiar los 4 pasos del diagrama | `components/sections/HowItWorks.jsx` |
| Cambiar el formato del mensaje de WhatsApp | `components/checkout/WhatsappCheckout.jsx` → `buildMessage()` |
| Agregar un icono | `components/ui/Icons.jsx` |
| Ajustar velocidad de animaciones | `index.css` |

## Cliente nuevo en menos de 10 minutos

1. `store.config.js`: nombre, WhatsApp, acento, fuente, cobertura y contacto (2 min).
2. `products.js`: reemplaza los productos. Deja al menos 3 por intención para que el orientador ofrezca 3 opciones (5 min).
3. Opcional: ajusta `emotions.config.js` y `trust` (2 min).
4. `npm run dev`, elige un producto, llena los datos y confirma que WhatsApp abre con el mensaje correcto.

## Despliegue

`npm run build` genera la carpeta `dist/`.
- **Vercel / Netlify / Cloudflare Pages:** importa el repositorio, comando de build `npm run build`, directorio de salida `dist`.
- **Hosting tradicional:** sube el contenido de `dist/` a la carpeta pública.

## Problemas comunes

| Síntoma | Causa y solución |
|---|---|
| Se ve como HTML plano | A `src/index.css` le faltan `@tailwind base; @tailwind components; @tailwind utilities;` al inicio. También revisa que tengas Tailwind 3 (`npm ls tailwindcss`) y reinicia `npm run dev`. |
| VS Code marca "Unknown at rule @tailwind" | Es solo el editor. Instala Tailwind CSS IntelliSense o crea `.vscode/settings.json` con `{ "css.lint.unknownAtRules": "ignore" }`. |
| Consola: "Download the React DevTools" | Es un aviso normal en modo desarrollo, no un error. |
| Cambié `tailwind.config.js` y no se nota | Detén el servidor (Ctrl+C) y vuelve a correr `npm run dev`. |