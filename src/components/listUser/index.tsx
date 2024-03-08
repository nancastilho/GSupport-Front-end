import React from "react";
import { useEffect, useState } from "react";
import { Usuario } from "../../interface";
import { usuariosService } from "../../services/usuarios";
// import { Container } from './styles';

interface ListUserProps {
  OnChangeUsuario?: (novoValor: string) => void;
  CodUsuario?: number;
  Usuario?: string;
}

function ListUsuario({
  CodUsuario,
  Usuario,
  OnChangeUsuario = () => "",
}: ListUserProps) {
  const [user, setUser] = useState<Usuario[]>([]);

  const [valorSelecionado, setValorSelecionado] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const novoValor = event.target.value;
    setValorSelecionado(event.target.value);
    // Chama a função do Pai para atualizar o valor selecionado
    OnChangeUsuario(novoValor);
  };

  useEffect(() => {
    const fetchData = async () => {
      usuariosService
        .getAll()
        .then((response) => {
          setUser(response.data.result);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);
  return (
    <select
      id="CodUsuario"
      name="CodUsuario"
      className="w-full h-10 px-3 rounded-lg border-2 border-gray-200 mb-2 focus:outline-none focus:border-blue-500"
      onChange={handleChange}
      value={valorSelecionado}
    >
      {CodUsuario === undefined ? (
        <option value="0" selected>
          Selecionar...
        </option>
      ) : (
        <option value={CodUsuario} selected>
          {CodUsuario} - {Usuario}
        </option>
      )}
      {user.map((item: Usuario, index) =>
        item.Ativo === true ? (
          <option value={item.Codigo + "-" + item.Usuario} key={index}>
            {item.Codigo} - {item.Usuario}
          </option>
        ) : (
          ""
        )
      )}
    </select>
  );
}

export default ListUsuario;
