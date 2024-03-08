import { FormValuesUser } from "../../interface";
import api from "../api";

const getAll = async (): Promise<any> => {
  const response = await api.get("/usuario", {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};

const postForm = async (formData: FormValuesUser): Promise<any> => {
  const result = await api.post("/usuario", formData, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result;
};
const deleteUser = async (cod: number): Promise<any> => {
  const result = await api.delete(`/usuario/delete/${cod}`, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result;
};

export const usuariosService = {
  getAll,
  postForm,
  deleteUser
};
