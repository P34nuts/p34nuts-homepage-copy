const GITHUB_API = "https://api.github.com";
const GITHUB_OAUTH = "https://github.com/login/oauth";
const ALLOWED_REPOSITORIES = new Set([
  "P34nuts/p34nuts-official-website",
  "P34nuts/p34nuts-merch-store",
]);
const ALLOWED_PATHS = new Set([
  "client/src/data/artistData.ts",
  "content/homepage.json",
  "content/homepage-links.json",
  "client/src/index.css",
]);
const SESSION_COOKIE = "p34nuts_control_session";

type Env = {
  ALLOWED_ORIGINS: string;
  GITHUB_APP_ID: string;
  GITHUB_APP_PRIVATE_KEY: string;
  GITHUB_APP_INSTALLATION_ID: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  CONTROL_SESSION_SECRET: string;
};

type Session = { login: string; exp: number };

function json(data: unknown, status = 200, origin?: string) {
  const headers = new Headers({ "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  if (origin) {
    headers.set("access-control-allow-origin", origin);
    headers.set("access-control-allow-credentials", "true");
    headers.set("vary", "Origin");
  }
  return new Response(JSON.stringify(data), { status, headers });
}

function originFor(request: Request, env: Env) {
  const origin = request.headers.get("Origin");
  return origin && origin === env.ALLOWED_ORIGINS ? origin : undefined;
}

function base64url(bytes: ArrayBuffer | Uint8Array) {
  const input = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of input) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (value.length % 4)) % 4);
  const binary = atob(normalized);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

async function hmac(secret: string, value: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)));
}

async function makeState(env: Env) {
  const nonce = crypto.randomUUID();
  const body = `${nonce}.${Math.floor(Date.now() / 1000)}`;
  return `${body}.${base64url(await hmac(env.CONTROL_SESSION_SECRET, body))}`;
}

async function verifyState(state: string, env: Env) {
  const [nonce, issued, signature] = state.split(".");
  if (!nonce || !issued || !signature || Date.now() / 1000 - Number(issued) > 600) return false;
  return crypto.subtle.verify("HMAC", await crypto.subtle.importKey("raw", new TextEncoder().encode(env.CONTROL_SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]), decodeBase64url(signature), new TextEncoder().encode(`${nonce}.${issued}`));
}

async function makeSession(session: Session, env: Env) {
  const body = base64url(new TextEncoder().encode(JSON.stringify(session)));
  return `${body}.${base64url(await hmac(env.CONTROL_SESSION_SECRET, body))}`;
}

async function readSession(request: Request, env: Env): Promise<Session | null> {
  const cookie = request.headers.get("Cookie")?.split(";").map(value => value.trim()).find(value => value.startsWith(`${SESSION_COOKIE}=`))?.slice(SESSION_COOKIE.length + 1);
  if (!cookie) return null;
  const [body, signature] = cookie.split(".");
  if (!body || !signature) return null;
  const valid = await crypto.subtle.verify("HMAC", await crypto.subtle.importKey("raw", new TextEncoder().encode(env.CONTROL_SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]), decodeBase64url(signature), new TextEncoder().encode(body));
  if (!valid) return null;
  const session = JSON.parse(new TextDecoder().decode(decodeBase64url(body))) as Session;
  return session.login === "P34nuts" && session.exp > Math.floor(Date.now() / 1000) ? session : null;
}

function pemToBytes(pem: string) {
  const normalized = pem.replace(/\\n/g, "\n").replace(/\r/g, "").replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|-----BEGIN RSA PRIVATE KEY-----|-----END RSA PRIVATE KEY-----/g, "").replace(/\s/g, "");
  return decodeBase64url(btoa(String.fromCharCode(...Uint8Array.from(atob(normalized), char => char.charCodeAt(0)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, ""));
}

function pemDer(pem: string) {
  const body = pem.replace(/\\n/g, "\n").replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|-----BEGIN RSA PRIVATE KEY-----|-----END RSA PRIVATE KEY-----|\s/g, "");
  const binary = atob(body);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

async function appJwt(env: Env) {
  const header = base64url(new TextEncoder().encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const now = Math.floor(Date.now() / 1000);
  const payload = base64url(new TextEncoder().encode(JSON.stringify({ iat: now - 30, exp: now + 540, iss: env.GITHUB_APP_ID })));
  const key = await crypto.subtle.importKey("pkcs8", pemDer(env.GITHUB_APP_PRIVATE_KEY), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(`${header}.${payload}`));
  return `${header}.${payload}.${base64url(signature)}`;
}

async function installationToken(env: Env) {
  const response = await fetch(`${GITHUB_API}/app/installations/${env.GITHUB_APP_INSTALLATION_ID}/access_tokens`, { method: "POST", headers: { accept: "application/vnd.github+json", authorization: `Bearer ${await appJwt(env)}`, "x-github-api-version": "2022-11-28", "user-agent": "p34nuts-control-center" } });
  if (!response.ok) throw new Error(`GitHub installation token failed: ${response.status}`);
  return (await response.json() as { token: string }).token;
}

async function githubFetch(path: string, init: RequestInit, env: Env) {
  const token = await installationToken(env);
  return fetch(`${GITHUB_API}${path}`, { ...init, headers: { accept: "application/vnd.github+json", "content-type": "application/json", "x-github-api-version": "2022-11-28", "user-agent": "p34nuts-control-center", authorization: `Bearer ${token}`, ...(init.headers ?? {}) } });
}

function redirect(request: Request, location: string) {
  return new Response(null, { status: 302, headers: { location, "cache-control": "no-store" } });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = originFor(request, env);
    if (request.method === "OPTIONS") {
      const response = new Response(null, { status: 204, headers: { "access-control-allow-origin": env.ALLOWED_ORIGINS, "access-control-allow-credentials": "true", "access-control-allow-headers": "content-type", "access-control-allow-methods": "GET,POST,OPTIONS", vary: "Origin" } });
      return response;
    }
    if (url.pathname === "/health" && request.method === "GET") return json({ ok: true, service: "p34nuts-control-center" }, 200, origin);
    if (url.pathname === "/auth/start" && request.method === "GET") {
      const state = await makeState(env);
      const callback = `${url.origin}/auth/callback`;
      const target = `${GITHUB_OAUTH}/authorize?client_id=${encodeURIComponent(env.GITHUB_CLIENT_ID)}&redirect_uri=${encodeURIComponent(callback)}&state=${encodeURIComponent(state)}`;
      return new Response(null, { status: 302, headers: { location: target, "set-cookie": `p34nuts_oauth_state=${state}; Path=/; Max-Age=600; HttpOnly; Secure; SameSite=Lax` } });
    }
    if (url.pathname === "/auth/callback" && request.method === "GET") {
      const state = url.searchParams.get("state") ?? "";
      const stored = request.headers.get("Cookie")?.split(";").map(value => value.trim()).find(value => value.startsWith("p34nuts_oauth_state="))?.slice("p34nuts_oauth_state=".length);
      if (!stored || stored !== state || !(await verifyState(state, env))) return json({ error: "invalid_oauth_state" }, 400);
      const code = url.searchParams.get("code");
      if (!code) return json({ error: "missing_oauth_code" }, 400);
      const tokenResponse = await fetch(`${GITHUB_OAUTH}/access_token`, { method: "POST", headers: { accept: "application/json", "content-type": "application/x-www-form-urlencoded", "user-agent": "p34nuts-control-center" }, body: new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code }).toString() });
      if (!tokenResponse.ok) return json({ error: "oauth_exchange_failed" }, 502);
      const tokenPayload = await tokenResponse.json() as { access_token?: string; error?: string };
      const accessToken = tokenPayload.access_token;
      if (!accessToken) return json({ error: "oauth_token_missing", providerError: tokenPayload.error ?? "unknown" }, 502);
      const userResponse = await fetch(`${GITHUB_API}/user`, { headers: { authorization: `Bearer ${accessToken}`, accept: "application/vnd.github+json", "user-agent": "p34nuts-control-center" } });
      if (!userResponse.ok) return json({ error: "github_user_lookup_failed" }, 502);
      const user = await userResponse.json() as { login?: string };
      if (user.login !== "P34nuts") return json({ error: "operator_not_allowed" }, 403);
      const session = await makeSession({ login: user.login, exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60 }, env);
      return new Response(null, { status: 302, headers: { location: `${env.ALLOWED_ORIGINS}/control?authenticated=1`, "set-cookie": `${SESSION_COOKIE}=${session}; Path=/; Max-Age=28800; HttpOnly; Secure; SameSite=Lax` } });
    }
    const session = await readSession(request, env);
    if (!session) return json({ error: "authentication_required" }, 401, origin);
    if (url.pathname === "/session" && request.method === "GET") return json({ authenticated: true, login: session.login, expiresAt: session.exp }, 200, origin);
    if (url.pathname === "/file" && request.method === "GET") {
      const repository = url.searchParams.get("repository") ?? "";
      const path = url.searchParams.get("path") ?? "";
      if (!ALLOWED_REPOSITORIES.has(repository)) return json({ error: "repository_not_allowed" }, 403, origin);
      if (!ALLOWED_PATHS.has(path)) return json({ error: "path_not_allowed" }, 403, origin);
      const [owner, repo] = repository.split("/");
      const response = await githubFetch(`/repos/${owner}/${repo}/contents/${path}?ref=main`, { method: "GET" }, env);
      if (!response.ok) return json({ error: "current_content_unavailable" }, 502, origin);
      const file = await response.json() as { content?: string; encoding?: string; sha?: string };
      if (file.encoding !== "base64" || typeof file.content !== "string") return json({ error: "file_content_unavailable" }, 502, origin);
      const bytes = Uint8Array.from(atob(file.content.replace(/\\s/g, "")), char => char.charCodeAt(0));
      const content = new TextDecoder().decode(bytes);
      if (content.length > 200_000) return json({ error: "content_invalid" }, 502, origin);
      return json({ ok: true, repository, path, content, sha: file.sha }, 200, origin);
    }
    if (url.pathname === "/commit" && request.method === "POST") {
      let body: { repository?: string; path?: string; content?: string; message?: string };
      try { body = await request.json(); } catch { return json({ error: "invalid_json" }, 400, origin); }
      if (!body.repository || !ALLOWED_REPOSITORIES.has(body.repository)) return json({ error: "repository_not_allowed" }, 403, origin);
      if (!body.path || !ALLOWED_PATHS.has(body.path)) return json({ error: "path_not_allowed" }, 403, origin);
      if (typeof body.content !== "string" || body.content.length > 200_000) return json({ error: "content_invalid" }, 400, origin);
      if (!body.message || !/^P34nuts: /.test(body.message) || body.message.length > 120) return json({ error: "commit_message_invalid" }, 400, origin);
      const [owner, repo] = body.repository.split("/");
      const current = await githubFetch(`/repos/${owner}/${repo}/contents/${body.path}?ref=main`, { method: "GET" }, env);
      if (!current.ok) return json({ error: "current_content_unavailable" }, 502, origin);
      const currentFile = await current.json() as { sha?: string };
      const response = await githubFetch(`/repos/${owner}/${repo}/contents/${body.path}`, { method: "PUT", body: JSON.stringify({ message: body.message, content: btoa(unescape(encodeURIComponent(body.content))), sha: currentFile.sha, branch: "main" }) }, env);
      if (!response.ok) return json({ error: "commit_failed", githubStatus: response.status }, 502, origin);
      return json({ ok: true, repository: body.repository, path: body.path }, 200, origin);
    }
    return json({ error: "not_found" }, 404, origin);
  },
};
