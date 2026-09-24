# Auditoría de phishing — u-library-v2

**Fecha:** 24 de septiembre de 2026  
**Alcance:** código fuente de la librería UI (`src/`, `stories/`), enfocados en indicios de phishing, exfiltración de credenciales y patrones que faciliten engaño al usuario.  
**Método:** revisión estática (búsqueda de ofuscación, endpoints externos, almacenamiento de secretos, formularios de login/registro, iframes, `postMessage`, scripts dinámicos).

---

## Veredicto

**No se encontró código de phishing clásico** (stealers, keyloggers, formularios que envían credenciales a dominios de atacantes, webhooks Discord/Telegram, acortadores maliciosos, payloads ofuscados tipo `eval`/`atob` de malware, etc.).

Los flujos de login/registro envían credenciales a APIs configuradas por el host (`conf.API_KS_AUTH`, `conf.API_KS`) o al fallback `https://srv-prod.newapiusoft.com/...`, coherente con una librería de lobby de iGaming de UniversalSoft.

**Sí hay hallazgos graves de seguridad de credenciales** que no son “phishing embebido”, pero **sí aumentan el impacto si alguien phishea al usuario o compromete el navegador/XSS**, y secretos versionados que un atacante podría reutilizar.

---

## Qué se buscó (y no apareció)

| Indicador típico de phishing en código | Resultado |
|---|---|
| Envío de usuario/clave a Formspree, webhook.site, Discord, Telegram, pastebin, ngrok | No encontrado |
| Keylogger / captura de teclado hacia un servidor externo | No encontrado |
| Código ofuscado (`eval`, `Function(`, `fromCharCode` malicioso) | No encontrado (uso legítimo de `atob` para JWT) |
| Scripts remotos desde dominios desconocidos | Solo Google GSI, assets UniversalSoft, proveedores de juego/sportbook |
| Páginas falsas de banco/PayPal hardcodeadas | No encontrado |
| Dependencias sospechosas de tipografía (typosquatting npm) en `package.json` | Dependencias estándar (`axios`, `firebase`, `svelte`, etc.) |

---

## Hallazgos (ordenados por severidad)

### 1. Crítico — Secretos OAuth de Google en el repositorio

**Archivo (retirado del working tree):** `src/js/googleAuthCredentials.json`

Contenía `client_id` y **`client_secret`** de Google OAuth en texto plano. El mismo `client_id` sigue hardcodeado (público, OK en GIS) en `Login.svelte`, `LoginMultiCurrencyByUsername.svelte` y `Register.svelte`. El JSON **no era importado** por ningún módulo.

**Estado remediación (24 sep 2026):**
- [x] Archivo eliminado del árbol de trabajo.
- [x] Patrón añadido a `.gitignore` (`*Credentials*.json`, etc.).
- [ ] **Pendiente manual:** rotar el `client_secret` en [Google Cloud Console](https://console.cloud.google.com/apis/credentials) (el valor ya estuvo en `origin/main`, commit `73e4ed3`).
- [ ] **Pendiente (opcional, destructivo):** purgar el archivo del historial git + force push; solo si el equipo lo aprueba.

**Nota:** en frontend GIS solo hace falta el `client_id`. Nunca volver a versionar un `client_secret`.

---

### 2. Alto — Contraseñas en claro en `localStorage` (“recordarme” / autoservicio)

**Archivos:**
- `src/lib/topbar/LoginAutosaved.svelte`
- `src/lib/topbar/LoginXlive.svelte`
- `src/lib/modals/ConfigAutoservice.svelte`

Patrón:

```js
localStorage.setItem('autoSaved', `[{"user":"${username}", "pass":"${password}"}]`);
```

En autoservicio, la contraseña se muestra además en un input `type="text"` (`ConfigAutoservice.svelte`).

**Relación con phishing:**
- No es un phish embebido, pero **cualquier XSS, extensión maliciosa o acceso físico** puede leer usuario+clave en claro.
- Facilita ataques de *credential harvesting* posteriores (el ladrón ya tiene las credenciales reales, no solo un token).

**Acción recomendada:** no persistir contraseñas. Usar refresh tokens / sesión del backend, o al menos cifrado con clave no derivada solo del cliente (idealmente no guardar `pass` nunca).

---

### 3. Alto — Contraseña reinyectada en el objeto de registro y reutilizada para auto-login

**Archivos:**
- `src/lib/modals/Signup.svelte`
- `src/lib/modals/SingupW.svelte` / `SingupM.svelte`
- `src/lib/modals/SignupGanabet365.svelte`
- Consumo en `src/lib/Header.svelte` (`onSignupOk` hace login con `user.password`)

Tras el registro se hace `data.password = password` y se pasa por `onOk`. Eso propaga la clave en memoria/objetos de app y aumenta la superficie de fuga (logs, `console.log`, serialización accidental).

**Acción recomendada:** devolver solo token/sesión desde el backend tras el register; no devolver ni reasignar `password` en el cliente.

---

### 4. Medio-Alto — Tokens / auth hardcodeados en URLs de sportbook invitado

**Ejemplos:**
- `src/lib/pages/SportbookBetsW3Page.svelte` — `auth_token=78140-504cb28edad6ad2f4fcff5d0b4b9` en URLs guest.
- Múltiples páginas con `token=123456789` en iframes guest (token placeholder de demo, pero mezclado con tokens reales en el mismo estilo).

**Relación con phishing:**
- Tokens embebidos en el cliente pueden ser reutilizados o clonados en páginas falsas que imiten el sportbook.
- Confunde la línea entre “modo demo legítimo” y “sesión privilegiada hardcodeada”.

**Acción recomendada:** obtener URLs guest solo desde API (`openGuestSportbook` ya existe en `server.js`); no versionar `auth_token` reales.

---

### 5. Medio — Secretos de cliente (`CLIENT_AUTH`) en stories

**Archivo:** `stories/init.js`

Hay múltiples `CLIENT_AUTH` en claro (activos y comentados) para distintas marcas/plataformas.

**Relación con phishing:** no es phishing directo, pero filtra material de autenticación de API que un impostor podría usar para hablar con backends como si fuera un cliente legítimo.

---

### 6. Medio — `postMessage` con origen comodín `*`

**Archivo:** `src/lib/pages/SportbookPage.svelte`

```js
win.postMessage({ action: "change_view", view }, "*");
```

Otros listeners de `message` validan a veces `event.source`, pero no siempre `event.origin` de forma estricta.

**Relación con phishing / clickjacking de iframe:** un iframe o ventana maliciosa podría interactuar si el origen no se restringe. Riesgo de abuso de UI del sportbook más que de robo de password, pero relevante en escenarios de páginas engañosas.

**Acción recomendada:** usar un allowlist de orígenes conocidos del proveedor.

---

### 7. Medio — Apertura de pasarelas / links externos sin allowlist en el cliente

**Archivos:** `Deposit.svelte` (`window.open(iframeGateway)`), `Footer.svelte` / `WithdrawalW.svelte` (links de chat/social/verificación desde config).

Si el backend o la config CMS se comprometen, el UI abrirá **cualquier URL** devolviendo el aspecto de la marca (vector clásico de phishing *en la cadena de suministro de la app*, no un phish hardcodeado en esta librería).

**Acción recomendada:** validar host contra lista blanca de pasarelas/proveedores conocidos antes de `window.open` / `href`.

---

### 8. Bajo / contextual — Branding tipo “365” / white-label

Hay componentes y skins (`SignupGanabet365`, nombres `ganabet365`, `win365`, etc.). En un producto white-label de apuestas esto es **esperado**. No se encontró intento de suplantar dominios oficiales de terceros con páginas de login fantasma hacia un servidor atacante; el login sigue yendo a las APIs propias.

---

## Flujos de autenticación observados (legítimos)

| Flujo | Destino | Observación |
|---|---|---|
| Login / register | `conf.API_KS` / `conf.API_KS_AUTH` o `srv-prod.newapiusoft.com` | Controlado por config del consumidor |
| Google Sign-In script | `https://accounts.google.com/gsi/client` | Legítimo |
| Assets / logos | `assets-usoft.universalsoft.net` | Legítimo |
| Sportbooks / juegos | Dominios de proveedores (`sw3data`, `jbets`, `freethrow777`, Altenar, etc.) | Integraciones; revisar allowlist operativa |

---

## Resumen ejecutivo

| Categoría | Estado |
|---|---|
| Phishing embebido (código malicioso de captura) | **No detectado** |
| Exfiltración silenciosa a terceros desconocidos | **No detectado** |
| Almacenamiento inseguro de credenciales (facilita abuso post-phish/XSS) | **Sí — crítico/alto** |
| Secretos versionados (OAuth / CLIENT_AUTH / auth_token) | **Sí — crítico/alto** |
| Riesgos de iframe / postMessage / open URL | **Sí — medio** |

**Conclusión:** el proyecto **no parece contener un kit de phishing**, pero **sí tiene prácticas peligrosas con secretos y contraseñas en claro** que un atacante podría aprovechar después de un phish, XSS o fuga del repositorio. Priorizar rotación del `client_secret` de Google y eliminar persistencia de passwords en `localStorage`.

---

## Checklist de remediación sugerida

1. [x] Retirar `googleAuthCredentials.json` del working tree + `.gitignore` *(falta rotar secret en Google Cloud y, si aplica, purgar historial)*.
2. [ ] Eliminar `pass` de `localStorage` (`autoSaved`); migrar a sesión/token.
3. [ ] Dejar de asignar `data.password` en signup; auto-login solo con respuesta server-side.
4. [ ] Mover `CLIENT_AUTH` y `auth_token` fuera del código fuente / stories versionadas.
5. [ ] Restringir `postMessage` y `window.open` a orígenes allowlisted.
6. [x] Ampliar `.gitignore` para `*Credentials*.json`, `.env*`, secretos locales.
7. [ ] Revisar en el host (apps consumidoras) que no serialicen `password` en `sessionStorage`.

---

*Informe generado por revisión estática del repositorio local. No incluye escaneo dinámico en runtime ni análisis de supply-chain de `node_modules` más allá de `package.json`.*
