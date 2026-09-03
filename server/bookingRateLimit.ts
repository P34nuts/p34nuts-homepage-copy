type WindowState = { count: number; resetAt: number };

export function createBookingRateLimiter(limit = 3, windowMs = 10 * 60 * 1000) {
  const windows = new Map<string, WindowState>();
  return {
    canAccept(key: string, now = Date.now()) {
      Array.from(windows.entries()).forEach(([entryKey, entry]) => {
        if (entry.resetAt <= now) windows.delete(entryKey);
      });
      const current = windows.get(key);
      if (!current || current.resetAt <= now) {
        windows.set(key, { count: 1, resetAt: now + windowMs });
        return true;
      }
      if (current.count >= limit) return false;
      current.count += 1;
      return true;
    },
  };
}

export function getRequestFingerprint(request: { headers?: { [key: string]: string | string[] | undefined }; socket?: { remoteAddress?: string | undefined } }) {
  const forwarded = request.headers?.["x-forwarded-for"];
  const firstForwarded = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0];
  return firstForwarded?.trim() || request.socket?.remoteAddress || "unknown";
}
