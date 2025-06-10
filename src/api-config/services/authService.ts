import { useMutation } from "react-query";
import { authHelpers } from "../helpers/authHelper";
import { AuthRequest } from "../types";

export const useLogin = () => {
  return useMutation((data:AuthRequest) => authHelpers.authLogin(data));
};
