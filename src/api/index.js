import axios from "axios";

const BASE_URL = "http://localhost";
const PORT = ":3001";
const PREFIX = "";


const api = axios.create({
  baseURL: `${BASE_URL}${PORT}${PREFIX}`,
});



export default api;
