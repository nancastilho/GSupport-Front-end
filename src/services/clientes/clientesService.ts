import api from "../api";

const getAll = async (): Promise<any> => {
  const response = await api.get("/clientes", {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};

const getPart = async (params:any): Promise<any> => {
  const response = await api.get("/clientes", {
    params,
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};

export const clientesService = {
  getAll,
  getPart
};