import React from "react";
import { useApiUrl } from "./CrudProvider/CrudProvider";

const Exemplo = () => {
  const apiUrl = useApiUrl();
  return (
    <div>
      O uso de tst-crud-react funcionou!
      {apiUrl}
    </div>
  );
};

export default Exemplo;
