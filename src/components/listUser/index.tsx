import React from "react";
import { useEffect, useState } from "react";
import { FormValues, Usuario } from "../../interface";
import { usuariosService } from "../../services/usuarios";
// import { Container } from './styles';

function ListUsuario(props: FormValues) {
  const [Usuario, setUsuario] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      usuariosService
        .getAll()
        .then((response) => {
          setUsuario(response.data);
          console.log(response.data);
          console.log(Usuario);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);
  return (
    <select
      id="CodUsuario"
      name="CodUsuario"
      className="w-full h-10 px-3 rounded-lg border-2 border-gray-200 mb-2 focus:outline-none focus:border-blue-500"
      // value={formValues.CodUsuario}
      // onChange={handleInputChange}
    >
      {props.CodUsuario !== undefined ? (
        <option value={props.CodUsuario} selected>
          {props.CodUsuario} - {props.Usuario}
        </option>
      ) : (
        <option value="0" selected disabled>
          Selecionar...
        </option>
      )}
      {Usuario.map((item: Usuario) =>
        item.Ativo === true ? (
          <option value={item.Codigo}>
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
