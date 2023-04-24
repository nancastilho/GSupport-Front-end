import axios from "axios";
import { useEffect, useState } from "react";
import FlashMessage, { FlashMessageType } from "../flashMessage";

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
  DataCriacao: string;
  DataInicio: string;
  DataFim: string;
  Assunto: string;
  Plantao: number;
}

interface Empresa {
  Codigo: string;
  RazaoSocial: string;
}

function CreateAtendimento(props: Props) {
  const dataAtual = new Date();
  const opcoes = { timeZone: "America/Sao_Paulo", hour12: false };
  const dataFormatada = dataAtual.toLocaleDateString("fr-CA");
  const dataFormatadaBR = dataAtual.toLocaleDateString("pt-BR", opcoes);
  const horaFormatada = dataAtual.toLocaleTimeString("pt-BR", opcoes);
  var codUsuario: string | null;

  // https://stackoverflow.com/questions/2388115/get-locale-short-date-format-using-javascript

  codUsuario = localStorage.getItem("codUserAuth");
  codUsuario = codUsuario ? codUsuario : "";

  const [image, setImage] = useState<FileList | null>(null);
  const [empresa, setEmpresa] = useState([]);

  const [formValues, setFormValues] = useState<FormValues>({
    CodUsuario: parseInt(codUsuario),
    CodEmpresa: 0,
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

  const resetForm = () => {
    codUsuario = codUsuario ? codUsuario : "";
    setFormValues({
      CodUsuario: parseInt(codUsuario),
      CodEmpresa: 0,
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
  };

  const [flashMessage, setFlashMessage] = useState<FlashMessageType | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (image !== null) {
      formData.append("image", image[0]);
    }

    formData.append("data", JSON.stringify(formValues));

    try {
      const response = await axios.post(
        "http://localhost:8080/atendimentos",
        formData
      );
      console.log(response.data);
      setFlashMessage({ message: 'Formulário enviado com sucesso!', type: 'success' });
      resetForm();
      // aqui você pode implementar alguma lógica para lidar com a resposta da API
    } catch (error) {
      console.log(error);
      // aqui você pode implementar alguma lógica para lidar com o erro da API
    }
  };
  const handleClose = () => {
    setFlashMessage(null);
  };

  const handleButtonClick = () => {
    setFlashMessage({ message: "Mensagem de sucesso!", type: "success" });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/empresas")
      .then((response) => {
        setEmpresa(response.data);
        console.log(response.data);
        console.log(empresa);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.target;

  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }));
  // };
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
    <div>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-4">
          <label
            htmlFor="CodEmpresa"
            className="block mb-1 font-medium text-gray-700"
          >
            Empresa
          </label>
          <select
            id="CodEmpresa"
            name="CodEmpresa"
            className="w-full h-10 px-3 rounded-lg border-2 border-gray-200 mb-2 focus:outline-none focus:border-blue-500"
            value={formValues.CodEmpresa}
            onChange={handleInputChange}
          >
            {empresa.map((item: Empresa) => (
              <option value={item.Codigo}>
                {item.RazaoSocial} - {item.Codigo}
              </option>
            ))}
          </select>
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
              value={dataFormatada}
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
              value={dataFormatada}
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
            htmlFor="Problema"
            className="block mb-1 font-medium text-gray-700"
          >
            Problema
          </label>
          <textarea
            id="Problema"
            name="Problema"
            value={formValues.Problema}
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
            value={formValues.Solucao}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-6 w-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Imagem
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={(e) => setImage(e.target.files)}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
          <p>Imagens selecionas</p>
          {image ? image.length : ""}
        </div>
        <div>
          <input type="checkbox" name="plantao" id="plantao" className="mr-2" />
          <label htmlFor="agreed" className="font-medium text-gray-700">
            Plantão
          </label>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={handleButtonClick}
            type="submit"
            className="px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
          >
            Cadastrar atendimento
          </button>
        </div>
      </form>
      <div className="fixed top-0 right-0 p-4 text-white z-50">
      <FlashMessage message={flashMessage} onClose={handleClose} />
      </div>
    </div>
  );
}

export default CreateAtendimento;
