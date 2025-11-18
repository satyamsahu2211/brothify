import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api.com", // change this
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    // Add token if exists
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Optional: add content-type
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
