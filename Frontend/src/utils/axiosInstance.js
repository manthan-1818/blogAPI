import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://blogapi-4-sxvz.onrender.com/",
  baseURL: "http://localhost:5000",

  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
      config.headers["refresh-token"] = refreshToken;
    }

    console.log("Request Interceptor:", config);
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    console.log("Response Interceptor:", response);
    console.log("Response Headers:", response.headers);

    if (response.data.accessToken) {
      const newAccessToken = response.data.accessToken;

      localStorage.setItem("accessToken", newAccessToken);
    }

    return response;
  },
  async (error) => {
    console.error("Response Interceptor Error:", error);

    if (error.response && error.response.status === 419) {
      console.log("responseee");
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        console.log("Inside token expiration handler, refreshing token...");
        const refreshResponse = await axios.get(
          `/refresh/refreshtoken`,
          {
            headers: {
              "refresh-token": refreshToken,
            },
          }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        console.log("new token", newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);

        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
