import axios from "axios";
import { useState } from "react";

export interface FormValues {
  CodUsuario: number;
  CodEmpresa: number;
  NomeCliente: string;
  Problema: string;
  Solucao: string;
  CodSistema: number;
  CodMeioComunicacao: number;
  DataCriacao: string;
  DataInicio: string;
  DataFim: string;
  Assunto: string;
  Plantao: number;
}

function ViewAtendimento(props: FormValues) {
  const dataAtual = new Date();
  const opcoes = { timeZone: "America/Sao_Paulo", hour12: false };
  const dataFormatada = dataAtual.toLocaleDateString("fr-CA");
  const dataFormatadaBR = dataAtual.toLocaleDateString("pt-BR", opcoes);
  const horaFormatada = dataAtual.toLocaleTimeString("pt-BR", opcoes);

  // console.log(dataFormatadaBR);

  // https://stackoverflow.com/questions/2388115/get-locale-short-date-format-using-javascript

  var codUsuario: string | null;
  codUsuario = localStorage.getItem("codUserAuth");
  codUsuario = codUsuario ? codUsuario : "";

  const [image, setImage] = useState<FileList | null>(null);

  const [formValues, setFormValues] = useState<FormValues>({
    CodUsuario: parseInt(codUsuario),
    CodEmpresa: 1,
    NomeCliente: "",
    Problema: "",
    Solucao: "",
    Assunto: "sem assunto",
    CodSistema: 1,
    CodMeioComunicacao: 1,
    DataCriacao: `${dataFormatada} ${horaFormatada} `,
    DataInicio: `${dataFormatada} ${horaFormatada}  `,
    DataFim: `${dataFormatada} ${horaFormatada} `,
    Plantao: 0,
  });

  // console.log(formValues);


  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-4">
        <label
          htmlFor="NomeCliente"
          className="block mb-1 font-medium text-gray-700"
        >
          Nome
        </label>
        <input
          id="NomeCliente"
          name="NomeCliente"
          type="text"
          value={props.NomeCliente}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          required
        />
      </div>
      <div className="flex justify-between">
        <div className="mb-4">
          <label
            htmlFor="dateI"
            className="block mb-1 font-medium text-gray-700"
          >
            Data inicio
          </label>
          <input
            id="dateI"
            name="dateI"
            type="date"
            onChange={handleInputChange}
            value={props.DataInicio}
            className="block w-56 px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dateF"
            className="block mb-1 font-medium text-gray-700"
          >
            Data fim
          </label>
          <input
            id="dateF"
            name="dateF"
            type="date"
            value={props.DataFim}
            onChange={handleInputChange}
            className="block w-56 px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
            required
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="mb-4 ">
          <label
            htmlFor="time"
            className="block mb-1 font-medium text-gray-700"
          >
            Hora inicio
          </label>
          <input
            id="timeI"
            name="timeI"
            type="time"
            value={'000000'}
            onChange={handleInputChange}
            className="block w-56 px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="time"
            className="block mb-1 font-medium text-gray-700"
          >
            Hora fim
          </label>
          <input
            id="timeF"
            name="timeF"
            type="time"
            value={'000000'}
            onChange={handleInputChange}
            className="block w-56 px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="Problema"
          className="block mb-1 font-medium text-gray-700"
        >
          Problema
        </label>
        <textarea
          id="Problema"
          name="Problema"
          value={props.Problema}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          rows={4}
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="Solucao"
          className="block mb-1 font-medium text-gray-700"
        >
          Solução
        </label>
        <textarea
          id="Solucao"
          name="Solucao"
          value={props.Solucao}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          rows={4}
          required
        ></textarea>
      </div>
      <div>
        <input type="checkbox" name="plantao" id="plantao" className="mr-2" />
        <label htmlFor="agreed" className="font-medium text-gray-700">
          Plantão
        </label>
      </div>
    </div>
  );
}

export default ViewAtendimento;