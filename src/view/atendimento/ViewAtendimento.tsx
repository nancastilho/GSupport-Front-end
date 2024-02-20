import { FormValues } from "../../interface";

function ViewAtendimento(props: FormValues) {

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-4">
        <label
          htmlFor="NomeCliente"
          className="block mb-1 font-medium text-gray-700"
        >
          Empresa
        </label>
        <input
          readOnly
          id="NomeCliente"
          name="NomeCliente"
          type="text"
          value={`${props.NomeFantasia} - ${props.CodEmpresa}`}
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="NomeCliente"
          className="block mb-1 font-medium text-gray-700"
        >
          Nome
        </label>
        <input
          readOnly
          id="NomeCliente"
          name="NomeCliente"
          type="text"
          value={props.NomeCliente}
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="NomeCliente"
          className="block mb-1 font-medium text-gray-700"
        >
          Usuário
        </label>
        <input
          readOnly
          id="Usuario"
          name="Usuario"
          type="text"
          value={props.Usuario}
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
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
            readOnly
            id="dateI"
            name="dateI"
            type="datetime-local"
            value={props.DataInicio}
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
            readOnly
            id="dateF"
            name="dateF"
            type="datetime-local"
            value={props.DataFim}
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
          readOnly
          id="Problema"
          name="Problema"
          value={props.Problema}
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          rows={4}
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
          readOnly
          id="Solucao"
          name="Solucao"
          value={props.Solucao}
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          rows={4}
        ></textarea>
      </div>

      <div className="flex w-60">
        {props.Imagens !== undefined
          ? props.Imagens.map((img: string) => (
            <a href={img} target="_blank" rel="noopener noreferrer">
              <img src={img} alt="" className="w-10 h-10 px-1" />
            </a>
          ))
          : ""}
      </div>
      <div className="grid justify-items-start" >
        <div>
          <input
            readOnly
            type="checkbox"
            name="plantao"
            id="plantao"
            className="mr-2"
          />
          <label htmlFor="agreed" className="font-medium text-gray-700">
            Plantão
          </label>
        </div>
        <div>
          {props.Alerta ? (
            <button
              type="button"
              className=" rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gay-500 sm:ml-3 sm:w-auto sm:text-sm">
              Resolver aviso
            </button>)
           : null}
        </div>

      </div>
    </div>
  );
}

export default ViewAtendimento;
