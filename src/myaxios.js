import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const myaxios = axios.create({ baseURL });

myaxios.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");

  if (storedToken) {
    config.headers = { Authorization: `Bearer ${storedToken}` };
  }

  return config;
});

export default myaxios;
