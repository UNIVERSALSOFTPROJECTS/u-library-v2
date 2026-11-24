// Share the same consumer configuration as ServerConnection; never infer a BFF from a game-service host.
let configuration;

const routes = Object.freeze({
  launch: "/integrations/games/launch",
  sportbookLaunch: "/integrations/games/sportbook/launch",
  altenarGuestLaunch: "/integrations/games/altenar/guest-launch",
  gameTypes: "/integrations/games/types",
  payMethods: "/integrations/wallet/paymethods/",
  nexoSignature: "/integrations/wallet/nxpay/signature",
});

export function configureBffRoutes(config) {
  configuration = config;
}

export function getBffEndpoint(operation) {
  if (!Object.prototype.hasOwnProperty.call(routes, operation)) throw new Error("UNKNOWN_BFF_OPERATION");
  const base = configuration?.API_KS;
  if (typeof base !== "string" || !base.trim()) throw new Error("BFF_API_KS_REQUIRED");
  const normalized = base.trim().replace(/\/+$/, "");
  // Relative BFF roots remain valid for deployments behind a same-origin ingress.
  if (base.trim().startsWith("/") && !base.trim().startsWith("//")) {
    if (/[?#\r\n]/.test(normalized)) throw new Error("INVALID_BFF_API_KS");
  } else {
    let parsed;
    try { parsed = new URL(normalized); } catch { throw new Error("INVALID_BFF_API_KS"); }
    if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password || parsed.search || parsed.hash) {
      throw new Error("INVALID_BFF_API_KS");
    }
  }
  return normalized + routes[operation];
}

export function getGameLaunchEndpoint(legacyBase, provider) {
  // Digitain's specific legacy launch is intentionally outside this migration.
  return provider === "edg" ? `${legacyBase}/launch` : getBffEndpoint("launch");
}
