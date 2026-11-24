# Conectores de integración por BFF

Fecha: 2026-11-23. Base de esta migración: main 2cf3d6c. No se modifican los fronts consumidores ni sus lockfiles.

## Inicialización y selección

El consumidor debe seguir inicializando **ServerConnection.setConfig(conf)** antes de usar conectores o constructores de launch. La nueva tabla de rutas recibe la misma configuración; selecciona exclusivamente **conf.API_KS**, raíz del BFF del consumidor. No utiliza API_KS_AUTH ni deduce un BFF a partir de GAMEAPI_URL.

Ejemplos: API_KS=https://host/lobby-bff o https://host/bff-service-wr; también se admite /lobby-bff para ingress del mismo origen. No incluir /online, /player o /integrations al configurar la raíz si esas rutas no pertenecen al prefijo real del despliegue. Se eliminan barras finales. Una base ausente/inválida falla localmente, sin fallback a un servicio directo ni a producción.

| Operación | Ruta relativa al BFF |
|---|---|
| Launch de juegos, CMSW, eSports y constructores conocidos | GET /integrations/games/launch |
| Launch deportivo autenticado | GET /integrations/games/sportbook/launch |
| Altenar invitado | GET /integrations/games/altenar/guest-launch |
| Catálogo legacy | GET /integrations/games/types |
| Paymethods | GET /integrations/wallet/paymethods/{token} |
| Firma Nexo tradicional | POST /integrations/wallet/nxpay/signature |

Las rutas existen en ambos BFF según el trabajo previo. Hay que desplegar sus revisiones correspondientes antes de actualizar el consumidor. Altenar requiere FRONTEND_PROXY_ALTENAR_BASE_URL en el BFF, raíz del servicio Java correcto sin /api; sin ella responde 503. lobby-bff requiere permitir x-token/X-Client-Code en preflight para Nexo; el cambio mínimo y su prueba se dejaron en ese proyecto.

## Contratos conservados

- Se mantienen firmas públicas de métodos para no romper callers existentes; los argumentos legacy GAMEAPI_URL siguen aceptándose, aunque las operaciones migradas eligen el BFF configurado.
- Se mantienen parámetros y modos: gameid frente a id según método, proveedor/marca, sesiones, r, lang, sport_view, section, skin/view y game_multiple cuando el caller los envía. La ruta invitada de Altenar conserva t=123456789 y r repetido.
- Los métodos que devolvían response.data mantienen ese retorno; los que devolvían respuesta Axios completa, como u_game.gameURLTest, catálogo, paymethods y firma, la conservan.
- No se agrega Bearer al contrato Nexo tradicional: conserva x-token, X-Client-Code y cuerpo JSON. Sin retries agregados.
- GoldenRacePage y HorsesPageV3 usan la ruta BFF para sus launches inline y conservan el manejo de onlineHash/cashierUrl/iframe URL. No se cambian los SDK que cargan después.
- El catálogo mantiene CLIENT_ID tal como lo recibía; comprobar que el consumidor configure su identificador correcto, sin sustituirlo automáticamente por un código/ID distinto.

## Fuera de alcance

Digitain permanece excluido: sus constructores específicos provider=edg conservan la base legacy; no se migra /e-digtain/init ni su SDK. No se cambia GAMEAPI_URL global, WebSockets, iframes externos, S3, uploads firmados o métodos de cuenta ya configurados hacia BFF.

getURL/getURLDemo siguen siendo clientes de la URL que aporta el caller. Los constructores conocidos dentro de la librería ahora les entregan URLs BFF; no se crea un proxy servidor de URL arbitraria. Un frontend que construya por su cuenta una URL legacy y la pase a estos métodos aún requiere migrar ese constructor propio.

## Validación y uso

Pruebas solo mockeadas:

    node --test tests/guestSportbookUrl.test.js tests/bff-connectors.test.js

Para activar el caso Postman, iniciar en otra consola:

    postman simulation run postman/simulations/bff-connectors.sim.yaml --port 43131 --no-history --output ndjson

Y ejecutar los tests con ULIB_BFF_SIM_URL=http://127.0.0.1:43131. Los clientes del harness bloquean cualquier origen no registrado de loopback. Se prueban las seis operaciones con dos BFF simulados, tipos de retorno/queries/headers, componentes inline, errores sin retry, selección de configuración y la exclusión de Digitain.

Los mocks representan el contrato BFF, no despliegues reales. La sesión/autorización de los receptores y las peticiones internas de SDK/iframes no quedan certificadas. Se omitió búsqueda de mocks publicados porque no había sesión de cuenta Postman.

La distribución Git declara files=[src] y svelte=src/index.js. Cada front debe fijar/incorporar esta revisión y reconstruirse. Actualizar el repositorio de la librería no actualiza automáticamente los despliegues.

Build standalone actual: npm run build falla al procesar CSS emitido por Rollup en BannersBO, componente/configuración ajenos a esta migración y sin cambios. No se modificó ese pipeline. Se valida además un build Vite de La Joya con alias temporal al src/index.js editado, sin cambiar archivos/dependencias del frontend.
