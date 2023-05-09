import axios from "axios";
import { useState } from "react";
import ListEmpresa from "../../components/listEmpresa";

interface FormValues {
  Codigo: number;
  CodUsuario: number;
  CodEmpresa: number;
  NomeCliente: string;
  Problema: string;
  Usuario: string;
  Solucao: string;
  CodSistema: number;
  CodMeioComunicacao: number;
  DataCriacao: string;
  DataInicio: string;
  DataFim: string;
  Assunto: string;
  Plantao: number;
}


function EditAtendimento(props: FormValues) {
  const [formValues, setFormValues] = useState<FormValues>({
    Codigo: 1,
    CodUsuario: 1,
    CodEmpresa: 1,
    Usuario: "",
    NomeCliente: "",
    Problema: "",
    Solucao: "",
    Assunto: "sem assunto",
    CodSistema: 1,
    CodMeioComunicacao: 1,
    DataCriacao: "",
    DataInicio: "",
    DataFim: "",
    Plantao: 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("data", JSON.stringify(formValues));

    try {
      const response = await axios.post(
        "http://localhost:8080/atendimentos",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
      // aqui você pode implementar alguma lógica para lidar com a resposta da API
    } catch (error) {
      console.log(error);
      // aqui você pode implementar alguma lógica para lidar com o erro da API
    }
  };



  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <label
        htmlFor="CodEmpresa"
        className="block mb-1 font-medium text-gray-700"
      >
        Usuario {props.Usuario}
      </label>
      <div className="mb-4">
        <label
          htmlFor="ListEmpresa"
          className="block mb-1 font-medium text-gray-700"
        >
          Empresa
        </label>
        <ListEmpresa/>
      </div>
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
          value={""}
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
            value={""}
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
            value={""}
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
            value={""}
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
            value={""}
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
          value={""}
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
          value={""}
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
      <div className="mt-6 text-right">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
        >
          Cadastrar atendimento
        </button>
      </div>
    </form>
  );
}

export default EditAtendimento;
