import { Credentials } from "../../interface";
import api from "../api";

const login = async (credentials: Credentials): Promise<any> => {
  const result = await api.post<{ jwtToken: string; userData: any }>(
    "/login",
    credentials
  );
  return result;
};

export const loginService = {
  login,
};
