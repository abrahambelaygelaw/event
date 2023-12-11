import axios from "axios";

const axiosWithAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

axiosWithAuth.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosWithAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await axiosWithAuth.get("refresh");
      originalRequest.headers.Authorization = `Bearer ${res.data}`;

      localStorage.setItem("accessToken", res.data);
      return axiosWithAuth(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosWithAuth;
