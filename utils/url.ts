export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
console.log("BASE_URL",BASE_URL);

export const endpoints = {
  login : BASE_URL + "/auth/login",
  dish : BASE_URL + "/dishes",
  categories: "/api/categories",
  users: "/api/users",
  orders: "/api/orders",
  reservations: "/api/reservations",
}

export default endpoints;


