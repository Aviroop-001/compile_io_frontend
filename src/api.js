import axios from "axios";

const api = axios.create({
  baseURL: "https://compile-io.onrender.com/api/",
});

export default api;
