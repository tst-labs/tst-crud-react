import Keycloak from "keycloak-js";
import log from "loglevel";
import { KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID } from "./env";

const keycloak = new Keycloak({
  url: KEYCLOAK_URL,
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT_ID
});

export function updateToken(minValidity = 5) {
  return new Promise((resolve, reject) => {
    if (keycloak.isTokenExpired(minValidity)) {
      keycloak.updateToken(minValidity).success(resolve).error(reject);
    } else {
      resolve();
    }
  });
}

export function isUserInRole(role) {
  return (
    keycloak.tokenParsed &&
    keycloak.tokenParsed["realm_access"]["roles"].indexOf(role) > -1
  );
}

export function initKeycloak() {
  log.info("keycloak url=" + KEYCLOAK_URL);
  return keycloak
    .init({
      onLoad: "login-required"
    })
    .then((authenticated) => {
      if (!authenticated) {
        console.warn(`Não autenticado!`);
        login();
      }
    })
    .catch((err) => {
      log.error("Falha ao iniciar o keycloak: ", err);
      throw err;
    });
}

export const login = keycloak.login;
export const logout = keycloak.logout;
export const getToken = () => keycloak.token;
export const getUsername = () =>
  keycloak.tokenParsed && keycloak.tokenParsed.preferred_username;
export const getUserEmail = () =>
  keycloak.tokenParsed && keycloak.tokenParsed.email;
export const getName = () =>
  keycloak.idTokenParsed && keycloak.idTokenParsed.name;
export const getCodigoUsuario = () =>
  parseInt(getUsername().replace(/\D/g, ""));

export default keycloak;
