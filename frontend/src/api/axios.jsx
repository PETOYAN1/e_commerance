import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  // eslint-disable-next-line no-unused-vars
  const csrf = await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  return config;
});

export default instance;
