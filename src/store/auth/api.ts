import {AxiosResponse} from "axios";

import {AuthLoginResponse, AuthUserData, LoginData, RecoverPasswordData} from "@Types/auth-types";
import {getInstance, setAuthToken} from "@Utils/axios-options";
import {apiEndpoints} from "@Utils/api/api";

const fakeRequest = (v = { data: {}}): Promise<{data: {}}> => {
  return new Promise(resolve => setTimeout(resolve, Math.random() * 100, v))
}

export const authAPI = {
  async loginUser(data: LoginData): Promise<AuthLoginResponse | never | any> {
    const res: AxiosResponse = await getInstance().post(apiEndpoints().auth.login, data)
    setAuthToken(res.data.tokens.access)
    return res.data;
  },
  async getUser(token?: string) {
    if (token) {
      setAuthToken(token);
    }
    const res = await getInstance().get(apiEndpoints().auth.readProfile);

    return {
      ...res.data,
      role: res.data.auth === "None" ? "None" : "ROLE_OPERATOR",
      login: res.data.user ?? "",
    } as AuthUserData;
  },
  async recoverPassword(data: RecoverPasswordData) {
    const res: AxiosResponse = await getInstance().get(apiEndpoints().auth.readFieldList);
    return res.data.res
  },
};
