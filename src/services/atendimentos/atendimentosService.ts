import axios from "axios";
import api from "../api";

const getAll = async (): Promise<any> => {
  const response = await api.get("/atendimentos", {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};

const getPart = async (params:any): Promise<any> => {
  const response = await api.get("/atendimentos", {
    params,
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};

export const atendimentosService = {
  getAll,
  getPart
};
