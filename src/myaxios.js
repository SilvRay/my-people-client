import axios from "axios";

const myaxios = axios.create({
  baseURL: "http://localhost:5005",
});

myaxios.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");

  if (storedToken) {
    config.headers = { Authorization: `Bearer ${storedToken}` };
  }

  return config;
});

export default myaxios;
