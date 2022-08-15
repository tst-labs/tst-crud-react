import { CRUD_SERVICE_URL } from "../shared/env";
import useSWRData from "../shared/useSWRData";
import createApi, { createFetcher } from "./api";

export const api = createApi(CRUD_SERVICE_URL);
const fetcher = createFetcher(api);

export function useApiDocs() {
  return useSWRData(`/api-docs`, fetcher, {
    alias: "apiDocs"
  });
}
