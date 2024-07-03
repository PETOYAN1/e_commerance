import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

myAxios.interceptors.request.use(async (config) => {
  const csrf = await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  return config;
});

export default myAxios;
