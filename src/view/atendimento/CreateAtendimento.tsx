import { SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import ListEmpresa from "../../components/listEmpresa";
import { FormValues } from "../../interface";
import { atendimentosService } from "../../services/atendimentos/atendimentosService";
import ListUsuario from "../../components/listUser";
import { formatToTimeZone } from "date-fns-timezone";
import ListNomeClientes from "../../components/listNomeClientes";
import { Icon } from "@iconify/react";

interface PropsCreate {
  onClose?: () => void;
}

function CreateAtendimento(props: PropsCreate) {
  const brasilTimeZone = "America/Sao_Paulo";

  // Obtém a data e hora atual no fuso horário do Brasil
  const dataAtual = new Date();
  const dataHoraBrasil = formatToTimeZone(dataAtual, "YYYY-MM-DDTHH:mm", {
    timeZone: brasilTimeZone,
  });

  const [newCliente, setNewCliente] = useState<boolean>(false);
  const [image, setImage] = useState<FileList | null>(null);

  const [formValues, setFormValues] = useState<FormValues>({
    CodEmpresa: 0,
    NomeCliente: "",
    Problema: "",
    Solucao: "",
    Assunto: "sem assunto",
    CodSistema: 1,
    CodMeioComunicacao: 1,
    DataCriacao: dataHoraBrasil,
    DataInicio: dataHoraBrasil,
    DataFim: dataHoraBrasil,
    Plantao: 0,
  });

  const resetForm = () => {
    setFormValues({
      CodEmpresa: 0,
      NomeCliente: "",
      Problema: "",
      Solucao: "",
      Assunto: "sem assunto",
      CodSistema: 1,
      CodMeioComunicacao: 1,
      DataCriacao: dataHoraBrasil,
      DataInicio: dataHoraBrasil,
      DataFim: dataHoraBrasil,
      Plantao: 0,
    });
  };

  const handleImageSubmit = (event: {
    target: { files: SetStateAction<FileList | null> };
  }) => {
    if (!image) {
      setImage(event.target.files);
    }
    setImage(event.target.files);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (image !== null) {
      for (let index = 0; index < image.length; index++) {
        formData.append(`image`, image[index]);
      }
    }
    formData.append("data", JSON.stringify(formValues));
    try {
      await atendimentosService.postForm(formData);
      if (props.onClose) {
        props.onClose();
      }
      toast.success("Atendimento cadastrado com sucesso!");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao inserir atendimento!");
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

  const handleChangeCliente = (novoValor: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ["CodEmpresa"]: parseInt(novoValor),
    }));
  };

  const handleChangeUsuario = (novoValor: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ["CodUsuario"]: parseInt(novoValor),
    }));
  };

  const handleChangeNomeCliente = (novoValor: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ["NomeCliente"]: novoValor,
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
          <ListEmpresa OnChangeCliente={handleChangeCliente} />
        </div>

        <div className="mb-4">
          <label
            htmlFor="NomeCliente"
            className="block mb-1 font-medium text-gray-700"
          >
            Nome
          </label>
          <div className="flex justify-center items-center ">
            {newCliente ? (
              <>
                <input
                  id="NomeCliente"
                  name="NomeCliente"
                  type="text"
                  value={formValues.NomeCliente}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
                  required
                />
                <button
                  type="button"
                  onClick={() => setNewCliente(!newCliente)}
                  className="px-4 py-2 ml-1 text-white bg-red-900 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-600"
                >
                  <Icon icon={"mdi:close"} />
                </button>
              </>
            ) : (
              <>
                <ListNomeClientes
                  OnChangeUsuario={handleChangeNomeCliente}
                  codEmpresa={formValues.CodEmpresa}
                />
                <button
                  type="button"
                  onClick={() => setNewCliente(!newCliente)}
                  className="px-4 py-2 ml-1 text-white bg-blue-900 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
                >
                  <Icon icon={"mdi:plus"} />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="ListEmpresa"
            className="block mb-1 font-medium text-gray-700"
          >
            Usuario
          </label>
          <ListUsuario OnChangeUsuario={handleChangeUsuario} />
        </div>

        <div className="flex justify-between max-md:flex-col max-md:grow">
          <div className="mb-4">
            <label
              htmlFor="dateI"
              className="block mb-1 font-medium text-gray-700"
            >
              Inicio
            </label>
            <input
              id="dateI"
              name="DataInicio"
              type="datetime-local"
              value={formValues.DataInicio}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dateF"
              className="block mb-1 font-medium text-gray-700"
            >
              Fim
            </label>
            <input
              id="dateF"
              name="DataFim"
              type="datetime-local"
              value={formValues.DataFim}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
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
        <div className="mb-6 w-full hidden">
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
                    onChange={handleImageSubmit}
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
            type="submit"
            className="px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
          >
            Cadastrar atendimento
          </button>
        </div>
      </form>
      <div>
        {/* <FlashMessage  message={flashMessage} onClose={handleClose} /> */}
      </div>
    </div>
  );
}

export default CreateAtendimento;
