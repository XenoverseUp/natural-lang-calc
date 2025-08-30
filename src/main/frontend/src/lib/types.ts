import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

export type WithClassName = {
  className?: ClassValue;
};

export type WithChildren = {
  children: ReactNode;
};

export enum OperationEnum {
  ADD = "ADD",
  SUBTRACT = "SUBTRACT",
  MULTIPLY = "MULTIPLY",
  DIVIDE = "DIVIDE",
  MOD = "MOD",
}

export type EndPoint = {
  url: string;
  method: HTTPMethod;
};

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";

export type EndpointWithFetch = EndPoint & {
  fetch: (options?: { body?: any; params?: Record<string, string> }) => Promise<any>;
};

export type EndpointsWithFetch<T extends Record<string, EndPoint>> = {
  [K in keyof T]: EndpointWithFetch;
};
