import axios, {AxiosResponse} from "axios";

import {AuthToFrontUserData, LoginData, ProfileFieldType} from "types/auth-types";
import {apiEndpoints} from "constants/api/api";
import {createAxiosOptions} from "utils/axios-options";

export interface RecoverPasswordData {
  old_pass: string,
  password: string,
  repeat_password: string
}

export const authAPI = {
  async loginUser(data: LoginData): Promise<AuthToFrontUserData | never | any> {
    const res: AxiosResponse = await axios({
      url: apiEndpoints('create').auth.login,
      method: 'POST',
      headers: {
        ['Content-Type']: 'application/json'
      },
      data: JSON.stringify(data)
    });
    return res.data;
  },
  async getUser(auth: string) {
    const res: AxiosResponse = await axios(createAxiosOptions({
      url: apiEndpoints('create').auth.readProfile,
      auth,
    }));
    return res.data.res;
  },
  async getUserFields(auth: string): Promise<never | ProfileFieldType[]> {
    const res: AxiosResponse = await axios(createAxiosOptions({
      url: apiEndpoints('read').auth.readFieldList,
      auth,
      data: {}
    }));
    return res.data.res || [];
  },
  async updateUserFields(auth: string, data: ProfileFieldType[]): Promise<never | boolean> {
    const res: AxiosResponse = await axios(createAxiosOptions({
      url: apiEndpoints('edit').auth.readFieldList,
      auth,
      data: {fieldList: data}
    }));
    return res.data.res || false;
  },
  async recoverPassword(auth: string, data: RecoverPasswordData) {
    const res: AxiosResponse = await axios(createAxiosOptions({
      url: apiEndpoints('create').auth.changePassword,
      auth,
      data: {
        oldPassword: data.old_pass,
        newPassword: data.password
      }
    }));
    return res.data.res
  },
};
