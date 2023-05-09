import api from "../api";

const getAll = async (): Promise<any> => {
  const response = await api.get("/empresas", {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};

const getPart = async (params:any): Promise<any> => {
  const response = await api.get("/empresas", {
    params,
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};

export const empresasService = {
  getAll,
  getPart
};
