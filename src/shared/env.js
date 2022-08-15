export const CRUD_SERVICE_URL = getEnv(
  "CRUD_SERVICE_URL",
  "http://localhost.rede.tst:8080"
);
export const KEYCLOAK_URL = getEnv("KEYCLOAK", "http://localhost:9090/auth");
export const KEYCLOAK_REALM = getEnv("KEYCLOAK_REALM", "tst-users");
export const KEYCLOAK_CLIENT_ID = getEnv("KEYCLOAK_CLIENT_ID", "my-app");

function getEnv(envName, defaultValue) {
  if (!window.env) {
    window.env = {};
  }

  if (window.env[envName] == null) {
    window.env[envName] = defaultValue;
  }

  console.log(`${envName}=${window.env[envName]}`);
  return window.env[envName];
}
