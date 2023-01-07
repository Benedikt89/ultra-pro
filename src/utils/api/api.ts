
export const apiEndpoints = (id: string = "") => {

  return {
    auth: {
      login: `/auth/login/`,
      readProfile: `/auth/login/`,
      verifyToken: `/auth/jwt/verify/`,
      refreshToken: `/auth/jwt/refresh/`,
      changePassword: `/queue-config/profile/change/password`,
      readFieldList: `/queue-config/profile/read`,
    },
    orders: {
      getOrders: `/constructor/order/list/`,
      orderId: `/constructor/order/${id}/`,
      order: `/constructor/order/`,
      fields: `/constructor/batch/fields/`,
    }
  };
}

export const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8000/api";

export const localStorageTokenKey = process.env.REACT_APP_LS_TOKEN || '_ultra-pro-token';

export const localStorageRoleKey = process.env.REACT_APP_USER_ROLE || '_ultra-pro-user-role';
