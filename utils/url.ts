export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
console.log("API URL:", BASE_URL);
export const endpoints = {
  login : "/auth/login",

  soups: "/soups",
  juices: "/juices",
  shakes: "/shakes",
  health: "/health",
  categories: "/api/categories",
  items: "/api/items",
  users: "/api/users",
  orders: "/api/orders",
  authMe: "/api/auth/me", 
  reservations: "/api/reservations",
}

export function withBase(path: string) {
  return `${BASE_URL}${path}`
}
