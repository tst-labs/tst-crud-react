export const CRUD_SERVICE_URL = getEnv(
  "CRUD_SERVICE_URL",
  "http://localhost.rede.tst:8080"
);

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
