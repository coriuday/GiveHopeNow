import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios"

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include the auth token in all requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default api 