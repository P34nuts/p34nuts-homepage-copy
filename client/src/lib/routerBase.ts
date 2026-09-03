/**
 * Wouter prefixes a route with `base`. At the site root it must stay empty;
 * passing `/` would create protocol-relative `//music/...` links.
 */
export function getRouterBase(baseUrl: string) {
  const normalized = baseUrl.replace(/\/$/, "");
  return normalized === "/" ? "" : normalized;
}
