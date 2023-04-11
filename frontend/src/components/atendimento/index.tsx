import { useState } from "react";



function Atendimento() {
  
  const [cadastro, setCadastro] = useState(true);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aqui você pode fazer a lógica para enviar os dados do formulário para o servidor ou para outro componente
    console.log({ name, date, time, symptoms });

    // Resetar os campos do formulário após a submissão
    setName("");
    setDate("");
    setTime("");
    setSymptoms("");
  };

  const handleCadastro = () =>{
    setCadastro(false)
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block mb-1 font-medium text-gray-700">
          Data
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block mb-1 font-medium text-gray-700">
          Hora
        </label>
        <input
          id="time"
          name="time"
          type="time"
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          required
        />
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
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          rows={4}
          required
        ></textarea>
      </div>
      <div className="mt-6 text-right">
        
        {cadastro == true ? (
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
