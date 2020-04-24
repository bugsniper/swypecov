
export const createTypes = (typePrefix) => ({
  DO: `${typePrefix}_DO`,
  SUCCESS: `${typePrefix}_SUCCESS`,
  FAILED: `${typePrefix}_FAILED`,
});
export const createSetTypes = (typePrefix) => ({
  SET: `${typePrefix}_SET`,
  CLEAR: `${typePrefix}_CLEAR`,
});

export const createAction = (type, args) => ({
  ...args,
  type,
});

export const transformNetworkError = (error) => {
  return error;
  // if (!error.response) {
  //   return {
  //     status: 404,
  //     statusText: error.message
  //   }
  // }
  // // Toast.show(error.response.statusTex);
  // return {
  //   status: error.response.status,
  //   statusText: error.response.statusText || "Something went wrong, Please try again."
  // }
};
