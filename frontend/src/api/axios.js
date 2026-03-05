import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // 👈 FIX HERE
});

api.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");

  if (auth) {
    const token = JSON.parse(auth).token;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;