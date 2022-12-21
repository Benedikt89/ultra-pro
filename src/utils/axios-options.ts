import axios from "axios";
import {localStorageTokenKey, baseUrl} from "@Utils/api/api";

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    common: {
      ["Content-Type"]: "application/json"
    }
  }
});

export const setAuthToken = token => {
  if (token) {
    localStorage.setItem(localStorageTokenKey, token);
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export const getInstance = () => {
  return instance ?? axios.create({
    baseURL: baseUrl
  })
}
