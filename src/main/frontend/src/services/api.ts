import { request } from "@/lib/request";
import type { EndPoint } from "@/lib/types";

const host = "";
const version = "v1";

const basePath = `${host}/api/${version}`;

const rawEndpoints = {
  check: { url: "/check", method: "GET" },
  calculate: { url: "/calculate", method: "POST" },
} as const satisfies Record<string, EndPoint>;

type EndpointWithFetch = EndPoint & {
  fetch: (options?: { body?: any; params?: Record<string, string> }) => Promise<any>;
};

type EndpointsWithFetch<T extends Record<string, EndPoint>> = {
  [K in keyof T]: EndpointWithFetch;
};

const endpoints = new Proxy(rawEndpoints, {
  get(target, prop: keyof typeof rawEndpoints) {
    const rawEndpoint = target[prop];

    const endpoint = {
      ...rawEndpoint,
      url: `${basePath}${rawEndpoint.url}`,
    };

    return {
      ...endpoint,
      fetch: (options?: { body?: any; params?: Record<string, string> }) => request(endpoint, options),
    };
  },
}) as EndpointsWithFetch<typeof rawEndpoints>;

export default { host, version, basePath, endpoints };
