import Keys from '../appKeys';

export type APIMethods = 'create' | 'edit' | 'delete' | 'read' | 'connect' | 'password-reset' | 'update' | 'add'

export const apiEndpoints = (method: APIMethods) => {
  const baseUrl = Keys.REACT_APP_BASE_URL || 'http://qmate20-env.eba-szndgiw3.eu-central-1.elasticbeanstalk.com';

  const apiEndpoints = (method: APIMethods) =>  ({
    auth: {
      login: `${baseUrl}/auth/login`,
      changePassword: `${baseUrl}/queue-config/profile/change/password`,
      readProfile: `${baseUrl}/queue-config/profile/read`,
      readFieldList: `${baseUrl}/queue-config/profile/${method}/field/list`
    },
  })
  const apiEndpointsV2 = (method: APIMethods) =>  ({
    auth: {
      login: `${baseUrl}/auth/login`,
      changePassword: `${baseUrl}/queue-config/profile/change/password`,
      readProfile: `${baseUrl}/queue-config/profile/read`,
      readFieldList: `${baseUrl}/queue-config/profile/${method}/field/list`
    },
  })
  if(method === 'create') {
    return apiEndpointsV2(method);
  } else {
    return apiEndpoints(method);
  }
}
