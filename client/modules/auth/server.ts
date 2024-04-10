import { Axios } from "@/shared/api";

export type AuthFormValues = {
  username: string;
  email: string;
  password: string;
};


export const loginService = (data: Omit<AuthFormValues, 'username'>) => {
  return Axios.post('/auth/login', data);
};

export const registerService = (data: AuthFormValues) => {
  return Axios.post('/auth/register', data);
};
