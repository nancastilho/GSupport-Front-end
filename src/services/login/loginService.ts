import { Credentials } from "../../interface";
import api from "../api";

const login = async (credentials: Credentials, navigate:any): Promise<any> => {
  const result = await api.post<{ jwtToken: string; userData: any }>(
    "/login",
    credentials
  );
  localStorage.setItem("token", result.data.jwtToken);
  localStorage.setItem("userAuth", result.data.userData.Usuario);
  localStorage.setItem("userName", result.data.userData.Usuario);
  localStorage.setItem("codUserAuth", result.data.userData.Codigo);

  navigate('/home')
};

export const loginService = {
  login,
};
