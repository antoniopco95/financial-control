import axios from "axios";

const api =  axios.create({
  baseURL: "http://desafio-backend-03-dindin.pedagogico.cubos.academy",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default api;
