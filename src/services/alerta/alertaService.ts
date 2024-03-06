import { AlertaUpdate } from "../../interface";
import api from "../api";

const getAll = async (): Promise<any> => {
    const response = await api.get("/alertas", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  };

  const postEditForm = async (formValues: AlertaUpdate): Promise<any> => {
    const result = await api.post("/alertas/update", formValues, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return result;
  };
  

  
export const alertService = {
    getAll,
    postEditForm
  };