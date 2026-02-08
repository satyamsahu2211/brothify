export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/v1/api/";
console.log("BASE_URL", BASE_URL);

export const endpoints = {
  login: BASE_URL + "login/",
  dish: BASE_URL + "dishes/",
  categories: BASE_URL + "categories/",
  users: BASE_URL + "users/",
  orders: BASE_URL + "orders/",
  reservations: BASE_URL + "reservations/",
};

export default endpoints;


