export function getTrpcEndpoint(apiOrigin: string | undefined, fallbackOrigin: string) {
  return new URL("/api/trpc", apiOrigin || fallbackOrigin).toString();
}
