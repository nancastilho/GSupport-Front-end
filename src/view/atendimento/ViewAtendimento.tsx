import axios from "axios";
import { useState } from "react";
import { FormValues } from "../../interface";




function ViewAtendimento(props: FormValues) {
  console.log("a imagem é esse log", props.Imagens);
  console.log("essa é a hora via props" + props.DataCriacao);
  
  var arrImg:[]

  // arrImg = props.Imagens
  

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
          required
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
            readOnly
            id="dateI"
            name="dateI"
            type="date"
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
            readOnly
            id="dateF"
            name="dateF"
            type="date"
            value={props.DataFim}
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
            readOnly
            id="timeI"
            name="timeI"
            type="time"
            value={props.HoraInicio}
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
            readOnly
            id="timeF"
            name="timeF"
            type="time"
            value={props.HoraFim}
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
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          rows={4}
          required
        ></textarea>
      </div>

      <div className="flex w-60">
          {/* {props.Imagens !== null ? 
          arrImg.map((img:string) => (
            <a href={img} target="_blank" rel="noopener noreferrer"><img src={img} alt="" className="w-10 h-10 px-1"/></a>
          ))
           : ""} */}
          
      </div>
      <div className="pt-3">
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
    </div>
  );
}

export default ViewAtendimento;
