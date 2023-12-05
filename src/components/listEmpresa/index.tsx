import { useEffect, useState } from "react";
import { empresasService } from "../../services/empresas/empresasService";
import { Empresa } from "../../interface";
// import { Container } from './styles';
interface ListEmpresaProps {
  OnChangeCliente?: (novoValor: string) => void;
  CodEmpresa?: number;
  NomeFantasia?: string;
}
const ListEmpresa = ({
  CodEmpresa,
  NomeFantasia,
  OnChangeCliente = () => "",
}: ListEmpresaProps) => {
  const [empresa, setEmpresa] = useState([]);
  const [valorSelecionado, setValorSelecionado] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const novoValor = event.target.value;
    setValorSelecionado(event.target.value);
    OnChangeCliente(novoValor);
  };

  useEffect(() => {
    const fetchData = async () => {
      empresasService
        .getPart({ OrderBy: "NomeFantasia" })
        .then((response) => {
          setEmpresa(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);

  return (
    <select
      id="CodEmpresa"
      name="CodEmpresa"
      className="w-full h-10 px-3 rounded-lg border-2 border-gray-200 mb-2 focus:outline-none focus:border-blue-500"
      onChange={handleChange}
      value={valorSelecionado}
    >
      {CodEmpresa !== undefined ? (
        <option value={CodEmpresa} selected>
          {NomeFantasia} - {CodEmpresa}
        </option>
      ) : (
        <option value="0" selected>
          Selecionar...
        </option>
      )}
      {empresa.map((item: Empresa, index) => (
        <option value={item.Codigo + item.NomeFantasia} key={index}>
          {item.NomeFantasia} - {item.Codigo}
        </option>
      ))}
    </select>
  );
};

export default ListEmpresa;
