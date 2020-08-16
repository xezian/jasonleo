import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
api.interceptors.response.use(
  (response) => {
    return [null, response];
  },
  (error) => {
    alertUserErrorInfo(error);
    return [error, undefined];
  }
);

const alertUserErrorInfo = (err) => {
  const message = err.response?.data?.Message || err.message;
  alert({
    title: "Error",
    text: `${message}`,
  });
};

export default api;
