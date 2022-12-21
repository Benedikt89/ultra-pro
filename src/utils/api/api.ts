
export const apiEndpoints = (method: string = "") => {

  const getApiEndpoints = () =>  ({
    auth: {
      me: `/users/me/`,
      login: `/auth/login/`,
      changePassword: `/queue-config/profile/change/password`,
      readProfile: `/auth/login/`,
      readFieldList: `/queue-config/profile/read`,
    },
  })
  return getApiEndpoints();
}

export const baseUrl = "http://localhost:8000/api" || process.env.REACT_APP_BASE_URL;

export const localStorageTokenKey = process.env.REACT_APP_LS_TOKEN || '_ultra-pro-token';

export const localStorageRoleKey = process.env.REACT_APP_USER_ROLE || '_ultra-pro-user-role';
