import { useEffect, useState } from "react";
import ListEmpresa from "../../components/listEmpresa";
import { AlertaGet, FormValues } from "../../interface";
import { Icon } from "@iconify/react";
import ListUsuario from "../../components/listUser";
import { atendimentosService } from "../../services/atendimentos/atendimentosService";
import toast from "react-hot-toast";
import ListNomeClientes from "../../components/listNomeClientes";
import ModalAlert from "../../components/modalAlert";
import { converterDataParaBrasil } from "../../components/functions";
import { formatToTimeZone } from "date-fns-timezone";
import { alertService } from "../../services/alerta/alertaService";

interface Edit {
  receivedData: FormValues;
  alertMode?: boolean;
  receivedAlertData?: AlertaGet;
  onClose: () => void;
}

function EditAtendimento({
  receivedData,
  alertMode = false,
  onClose,
  receivedAlertData = {} as AlertaGet,
}: Edit) {
  const [formValues, setFormValues] = useState<FormValues>(receivedData);
  const [newCliente, setNewCliente] = useState<boolean>(false);
  const [isAlertCreated, setisAlertCreated] = useState<boolean>(false);
  const dataAtual = new Date();
  const dataHoraBrasil = formatToTimeZone(dataAtual, "YYYY-MM-DDTHH:mm", {
    timeZone: "America/Sao_Paulo",
  });

  // function handleModalOpen() {
  //   console.debug("DELETANDO IMAGENS");
  // }

  const handleChangeCliente = (novoValor: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      CodEmpresa: parseInt(novoValor),
    }));
  };

  const handleChangeUsuario = (novoValor: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      CodUsuario: parseInt(novoValor),
    }));
  };

  const handleChangeNomeCliente = (novoValor: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      NomeCliente: novoValor,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await atendimentosService.putEditForm(formValues);
      onClose();
      toast.success("Edição concluída com sucesso!", {
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao editar atendimento!");
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

  const handleCreateAlert = () => {
    receivedData.Alerta
      ? toast.error("Atendimento com alerta vinculado!")
      : setisAlertCreated(!isAlertCreated);
  };
  
  const handleResolveAlert = async () => {
    try {
      await alertService.putEditForm({Codigo:receivedAlertData.CodAlerta, DataResolucao:dataHoraBrasil});
      onClose();
      toast.success("Alerta resolvido!", {
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao resolver alerta!");
    }
    onClose()
  };

  const handleAlertInput = (prev: any) => {
    if (prev !== "") {
      setFormValues((prevValues) => ({
        ...prevValues,
        Alerta: 1,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        Alerta: 0,
      }));
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      ObservacaoTexto: prev,
    }));
  };

  useEffect(() => {
    if (receivedData.DataCriacao !== undefined) {
      const Data = receivedData.DataCriacao.split("T");
      const Hora = Data[1].split(".");
      const HoraMin = Hora[0].split(":");
      setFormValues((prevValues) => ({
        ...prevValues,
        DataCriacao: Data[0] + "T" + HoraMin[0] + ":" + HoraMin[1],
      }));
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      DataInicio: converterDataParaBrasil(receivedData.DataInicio),
      DataFim: converterDataParaBrasil(receivedData.DataFim),
      Plantao: receivedData.Plantao ? 1 : 0,
      Alerta: receivedData.Alerta ? 1 : 0,
    }));
  }, [receivedData]);

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="mb-4">
        <label
          htmlFor="ListEmpresa"
          className="block mb-1 font-medium text-gray-700"
        >
          Empresa
        </label>
        <ListEmpresa
          CodEmpresa={formValues.CodEmpresa}
          NomeFantasia={formValues.NomeFantasia}
          OnChangeCliente={handleChangeCliente}
        />
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
                NomeCliente={formValues.NomeCliente}
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
        <ListUsuario
          CodUsuario={formValues.CodUsuario}
          Usuario={formValues.Usuario}
          OnChangeUsuario={handleChangeUsuario}
        />
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
            onChange={handleInputChange}
            value={formValues.DataInicio}
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
            onChange={handleInputChange}
            type="datetime-local"
            value={formValues.DataFim}
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
      {alertMode?<div className="mb-4">
        <label
          htmlFor="observacaoTexto"
          className="block mb-1 font-medium text-gray-700"
        >
          Observação do Alerta
        </label>
        <textarea
          id="observacaoTexto"
          name="ObservacaoTexto"
          value={receivedAlertData.ObservacaoTexto}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          rows={4}
          required
        ></textarea>
      </div>:null}
      {/* <div className="flex w-60 hidden">
        {formValues.Imagens !== undefined
          ? formValues.Imagens.map((img: string, index) => (
              <div key={index}>
                <a href={img} target="_blank" rel="noopener noreferrer">
                  <img src={img} alt="" className="w-10 h-10 px-1" />
                </a>
                <Icon
                  icon={"mdi:delete-forever"}
                  onClick={() => handleModalOpen()}
                  className="relative bottom-2 right-3 text-red-700 cursor-pointer hover:underline"
                />
              </div>
            ))
          : ""}
        <a href={"a"} target="_blank" rel="noopener noreferrer">
          <img
            src={
              "data:image/png;base64,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"
            }
            alt=""
            className="w-10 h-10 px-1"
          />
        </a>
      </div> */}
      {!alertMode ? (
        <>
          <div className="mt-6">
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
          </div>
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              className="px-4 py-2 text-white bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              onClick={handleCreateAlert}
            >
              Criar Alerta!
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
            >
              Salvar alterações
            </button>
          </div>
        </>
      ) : !receivedAlertData.DataResolucao?(
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleResolveAlert}
            className="px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
          >
            Resolver Alerta
          </button>
        </div>
      ): null}
      {isAlertCreated ? (
        <ModalAlert
          OnAlertInput={handleAlertInput}
          isOpen={true}
          onClose={() => setisAlertCreated(false)}
          InputData={formValues.ObservacaoTexto}
        />
      ) : null}
    </form>
    // <ModalAlert isOpen={isAlertCreated} OnAlertInput={handleAlertInput} />
  );
}

export default EditAtendimento;
