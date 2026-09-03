const defaultShopHref = "https://p34nuts-merch-store.onrender.com/shop";
const configuredShopUrl = import.meta.env.VITE_SHOP_URL?.trim();

function getConfiguredShopHref(): string {
  if (!configuredShopUrl) return defaultShopHref;

  try {
    const url = new URL(configuredShopUrl);
    return url.protocol === "https:" ? url.toString() : defaultShopHref;
  } catch {
    return defaultShopHref;
  }
}

/**
 * The artist site always exposes a trusted external Shop entry. The configured
 * URL may override it, but the deployed Render storefront stays the safe default
 * so a missing build variable never traps visitors on the internal gateway.
 */
export const shopHref = getConfiguredShopHref();
export const isExternalShopHref = shopHref.startsWith("https://");
