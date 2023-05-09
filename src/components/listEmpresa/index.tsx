import React from "react";
import { useEffect, useState } from "react";
import { empresasService } from "../../services/empresas/empresasService";
import { Empresa } from "../../interface";
// import { Container } from './styles';


function ListEmpresa() {
  const [empresa, setEmpresa] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      empresasService
        .getPart({ OrderBy: "NomeFantasia" })
        .then((response) => {
          setEmpresa(response.data);
          console.log(response.data);
          console.log(empresa);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);
  return (
    <select
      id="CodEmpresa"
      name="CodEmpresa"
      className="w-full h-10 px-3 rounded-lg border-2 border-gray-200 mb-2 focus:outline-none focus:border-blue-500"
      // value={formValues.CodEmpresa}
      // onChange={handleInputChange}
    >
      {empresa.map((item: Empresa) => (
        <option value={item.Codigo}>
          {item.NomeFantasia} - {item.Codigo}
        </option>
      ))}
    </select>
  );
}

export default ListEmpresa;
