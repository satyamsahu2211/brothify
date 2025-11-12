export const BASE_URL = "https://example-dummy.api"

export const endpoints = {
  auth: {
    emailLogin: "/auth/email/login", // dummy endpoint
    logout: "/auth/logout", // dummy endpoint
    google: "/auth/google", // future
    phoneOtp: "/auth/phone/otp", // future
  },
  soups: "/soups",
  juices: "/juices",
  shakes: "/shakes",
  health: "/health",
  categories: "/api/categories",
  items: "/api/items",
  users: "/api/users",
  orders: "/api/orders",
  authMe: "/api/auth/me", // added for role-aware UI
  reservations: "/api/reservations",
}

export function withBase(path: string) {
  return `${BASE_URL}${path}`
}
