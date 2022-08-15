import axios from "axios";
import { getToken, updateToken } from "../shared/keycloak";

function createApi(baseURL) {
  const api = axios.create({ baseURL });

  // Keycloak
  api.interceptors.request.use(async function (config) {
    await updateToken(5);
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  });

  // Response error
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      let errorData;

      if (error.response) {
        errorData = error.response.data;
      } else {
        errorData = {
          message:
            "Ocorreu um erro com sua requisição. Tente novamente em alguns minutos.",
          isRequestError: true
        };
      }

      throw errorData;
    }
  );

  return api;
}

export function createFetcher(api) {
  return (...args) => api(...args).then((res) => res.data);
}

export default createApi;
