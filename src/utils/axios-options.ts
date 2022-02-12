interface OptionsObj {
  url: string
  auth: string
  method?: 'POST' | 'DELETE' | 'PUT' | 'PATCH'
  data?: object
}

interface AxiosOptions {
  url: string
  headers: { Authorization: string, ['Content-Type']?: string }
  method: 'POST' | 'DELETE' | 'PUT' | 'PATCH'
  data?: string
}

export const createAxiosOptions = ({url, method, auth, data}: OptionsObj): AxiosOptions => {
  let options: AxiosOptions = {
    url: url,
    method: method ? method : 'POST',
    headers: {
      Authorization: auth
    }
  };
  if (data) {
    options.data = JSON.stringify(data);
    options.headers['Content-Type'] = 'application/json';
  }
  return options;
};
