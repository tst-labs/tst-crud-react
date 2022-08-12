import React, { useContext } from "react";

export const CrudContext = React.createContext();

export function CrudProvider(props) {
  const { children, apiUrl } = props;

  return <CrudContext.Provider value={apiUrl}>{children}</CrudContext.Provider>;
}

export const useApiUrl = () => useContext(CrudContext);
