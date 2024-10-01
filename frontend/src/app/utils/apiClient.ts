import axios from "axios";

const baseURL = "http://localhost:3001";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;