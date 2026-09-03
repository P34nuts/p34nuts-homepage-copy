export const GITHUB_PAGES_ORIGIN = "https://p34nuts.github.io";

export function getAllowedPublicOrigin(origin: string | undefined) {
  return origin === GITHUB_PAGES_ORIGIN ? origin : undefined;
}
