export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE"

async function request<T = any>(url: string, method: HttpMethod = "GET", body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`${method} ${url} failed with ${res.status}`)
  }
  return (await res.json()) as T
}

export const api = {
  // SWR fetcher compatibility: api.get(url)
  get: <T = any>(url: string) => request<T>(url, "GET"),
  post: <T = any>(url: string, body?: unknown) => request<T>(url, "POST", body),
  patch: <T = any>(url: string, body?: unknown) => request<T>(url, "PATCH", body),
  delete: <T = any>(url: string) => request<T>(url, "DELETE"),
}

export const baseService = api
