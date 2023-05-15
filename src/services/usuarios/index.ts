import api from "../api";

const getAll = async (): Promise<any> => {
  const response = await api.get("/usuarios", {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};



export const usuariosService = {
  getAll
};