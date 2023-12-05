import React from "react";
import { useEffect, useState } from "react";
import { clientesService } from "../../services/clientes/clientesService";

interface ListUserProps {
  OnChangeUsuario?: (novoValor: string) => void;
  codEmpresa?: number;
  NomeCliente?: string;
}

const ListNomeClientes = ({
  codEmpresa = 0,
  NomeCliente,
  OnChangeUsuario = () => "",
}: ListUserProps) => {
  const [nomeClientes, setNomeClientes] = useState([]);

  const [valorSelecionado, setValorSelecionado] = useState<string>(NomeCliente || '');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const novoValor = event.target.value.split("-");
    setValorSelecionado(event.target.value);
    // Chama a função do Pai para atualizar o valor selecionado
    OnChangeUsuario(novoValor[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      clientesService
        .getPart({ codEmpresa })
        .then((response) => {
          setNomeClientes(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, [codEmpresa]);

  return (
    <select
      id="NomeCliente"
      name="NomeCliente"
      className="w-full h-10 px-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500"
      onChange={handleChange}
      value={valorSelecionado}
    >
      {codEmpresa === undefined ? (
        <option value="0" selected disabled>
          Selecionar...
        </option>
      ) : (
        <option value={NomeCliente} selected>
          {NomeCliente}
        </option>
      )}
      {nomeClientes.map((item: any, index) => (
        <option value={item.NomeCliente} key={index}>
          {item.NomeCliente}
        </option>
      ))}
    </select>
  );
};

export default ListNomeClientes;
