
export const APIerrorLogger = (error: any) => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    if (error.response.data?.message || error.response.data?.errorMsg || error.response.data.error) {
      return error.response.data.error || error.response.data.message ||
        error.response.data.errorMsg || 'message_error'
    } else return 'message_error'
  } else if (error.request) {
    console.warn('request Error');
    console.warn(error.request);
  } else {
    console.warn('Unknown Error', error.message);
  }
};

export const componentErrorLogger = (error: any) => {
  if (error.message) console.log(error.message);
  if (error.stack) {
    console.warn(error.stack)
  } else {
    console.warn(error);
  }
};
