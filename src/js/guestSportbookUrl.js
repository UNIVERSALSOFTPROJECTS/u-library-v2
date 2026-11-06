export function normalizeGuestSportbookResponse(response) {
  const url = response?.payload?.url;
  if (typeof url !== "string") return response;
  const normalized = url.replace(/\/sportankAPI\/bets286(?=\/|[?#&]|$)/g, "/sportankAPI/bets286.com");
  if (normalized === url) return response;
  return { ...response, payload: { ...response.payload, url: normalized } };
}
