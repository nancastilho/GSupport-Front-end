import { FormValues } from "../../interface";
import api from "../api";

const getAll = async (): Promise<any> => {
  const response = await api.get("/atendimentos", {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};

const getPart = async (params: any): Promise<any> => {
  const response = await api.get("/atendimentos", {
    params,
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};

const postForm = async (formData: FormData): Promise<any> => {
  const result = await api.post("/atendimentos", formData, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result;
};
const putEditForm = async (formValues: FormValues): Promise<any> => {
  const result = await api.put("/atendimentos/update", formValues, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result;
};

export const atendimentosService = {
  getAll,
  getPart,
  postForm,
  putEditForm,
};
