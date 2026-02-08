export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/v1/api/";
console.log("BASE_URL",BASE_URL);

export const endpoints = {
  login : BASE_URL + "login/",
  dish : BASE_URL + "/dishes",
  categories: "/api/categories",
  users: "/api/users",
  orders: "/api/orders",
  reservations: "/api/reservations",
}

export default endpoints;


