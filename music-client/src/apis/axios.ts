import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
  return sessionStorage.getItem("accessToken");
};

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getToken();
  console.log(accessToken);
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
