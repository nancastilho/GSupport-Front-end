import { useState } from "react";
import { FormValuesUser } from "../../interface";
import { usuariosService } from "../../services/usuarios";
import toast from "react-hot-toast";

interface PropsCreate {
  onClose: () => void;
}

const CreateUser = ({ onClose }: PropsCreate) => {
  const [formValues, setFormValues] = useState<FormValuesUser>({
    Usuario: "",
    Senha: "",
    Ativo: 1,
  });

  const resetForm = () => {
    setFormValues({
      Usuario: "",
      Senha: "",
      Ativo: 1,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await usuariosService.postForm(formValues);
      onClose();
      toast.success("Usuário cadastrado com sucesso!");
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

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="mb-4">
        <label
          htmlFor="usuario"
          className="block mb-1 font-medium text-gray-700"
        >
          Usuário
        </label>
        <input
          id="usuario"
          name="Usuario"
          type="text"
          value={formValues.Usuario}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="Senha" className="block mb-1 font-medium text-gray-700">
          Senha
        </label>
        <input
          id="senha"
          name="Senha"
          type="password"
          value={formValues.Senha}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline-gray"
          required
        />
      </div>
      <div className="mt-6 text-right">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
        >
          Cadastrar Usuário
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
