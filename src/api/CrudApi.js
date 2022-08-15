import { CRUD_SERVICE_URL } from "../shared/env";
import createApi, { createFetcher } from "./api";
import useSWRData from "../shared/useSWRData";
import { mutate } from "swr";

export const api = createApi(CRUD_SERVICE_URL);
const fetcher = createFetcher(api);

export function usePaginaEntidadeTabela(nomeEntidade, pagina, query) {
  return useSWRData(
    nomeEntidade &&
      `/crud/${encodeURIComponent(nomeEntidade)}?pagina=${encodeURIComponent(
        pagina
      )}&query=${encodeURIComponent(query)}`,
    fetcher,
    {
      alias: "paginaEntidadeTabela"
    }
  );
}

export function recarregaPaginaEntidadeTabela(tabela, pagina) {
  mutate(
    `/crud/${encodeURIComponent(tabela)}?pagina=${encodeURIComponent(pagina)}`
  );
}

export function useEntidadeTabela(tabela, id) {
  return useSWRData(tabela && id && `/crud/${tabela}/${id}`, fetcher, {
    alias: "entidadeTabela"
  });
}

export async function incluirEntidadeTabela(tabela, dados) {
  return api.post(`/crud/${tabela}`, dados).then((res) => res.data);
}

export async function alterarEntidadeTabela(tabela, dados) {
  return api.put(`/crud/${tabela}`, dados).then((res) => res.data);
}

export async function excluirEntidadeTabela(tabela, dados) {
  return api
    .delete(`/crud/${tabela}`, {
      headers: {
        "Contenty-Type": "application/json"
      },
      data: dados
    })
    .then((res) => res.data);
}
