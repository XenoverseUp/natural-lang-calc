import type { EndPoint } from "./types";

export async function request<T = unknown>(
  endpoint: EndPoint & { url: string },
  options?: { body?: any; params?: Record<string, string> },
): Promise<T> {
  let url = endpoint.url;

  if (options?.params && endpoint.method === "GET") {
    const query = new URLSearchParams(options.params).toString();
    url += `?${query}`;
  }

  const res = await fetch(url, {
    method: endpoint.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: endpoint.method !== "GET" ? JSON.stringify(options?.body) : undefined,
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);

  return res.json();
}
