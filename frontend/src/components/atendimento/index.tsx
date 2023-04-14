import axios from "axios";
import { stringify } from "querystring";
import { useState } from "react";

interface Props {
  onCadastro: boolean;
}
interface FormValues {
  CodUsuario: number;
  CodEmpresa: number;
  NomeCliente: string;
  Problema: string;
  Solucao: string;
  CodSistema: number;
  CodMeioComunicacao: number;
  DataCriação: string;
  DataInicio: string;
  DataFim: string;
  Assunto: string;
  Plantao: number;
}

interface Usuario {
  codUsuario: string;
}

function Atendimento(props: Props) {

  const dataAtual = new Date();
  const opcoes = { timeZone: "America/Sao_Paulo", hour12:false };
  const dataFormatada = dataAtual.toLocaleDateString("pt-BR", opcoes);
  const horaFormatada = dataAtual.toLocaleTimeString('pt-BR', opcoes);
 
  var codUsuario: string | null;

  codUsuario = localStorage.getItem('codUserAuth');
  codUsuario = codUsuario ? codUsuario : '';
 
  const [formValues, setFormValues] = useState<FormValues>({
    CodUsuario: parseInt(codUsuario),
    CodEmpresa: 1,
    NomeCliente: "",
    Problema: "",
    Solucao: "",
    CodSistema: 1,
    CodMeioComunicacao: 1,
    DataCriação: `${dataFormatada}''${horaFormatada} `,
    DataInicio: `${dataFormatada}''${horaFormatada} `,
    DataFim: `${dataFormatada}''${horaFormatada} `,
    Assunto: "",
    Plantao: 0,
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://minhaapi.com/atendimentos",
        formValues
      );
      console.log(response.data);
      // aqui você pode implementar alguma lógica para lidar com a resposta da API
    } catch (error) {
      console.log(error);
      // aqui você pode implementar alguma lógica para lidar com o erro da API
    }
  };

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
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
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
          value={formValues.NomeCliente}
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
            value={horaFormatada}
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
            value={horaFormatada}
            onChange={handleInputChange}
            className="block w-56 px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="problema"
          className="block mb-1 font-medium text-gray-700"
        >
          Problema
        </label>
        <textarea
          id="problema"
          name="problema"
          value={formValues.Problema}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          rows={4}
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="solucao"
          className="block mb-1 font-medium text-gray-700"
        >
          Solução
        </label>
        <textarea
          id="solucao"
          name="solucao"
          value={formValues.Solucao}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          rows={4}
          required
        ></textarea>
      </div>
      <div>
        <input
          type="checkbox"
          name="plantao"
          id="plantao"
          className="mr-2"
        />
        <label htmlFor="agreed" className="font-medium text-gray-700">
          Plantão
        </label>
      </div>
      <div className="mt-6 text-right">
        {props.onCadastro === true ? (
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
          >
            Cadastrar atendimento
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

export default Atendimento;
