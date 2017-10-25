export const testResponse = (response, reject) => {
  if (!response || response.error) {
    if (reject) {
      reject(response);
    } else {
      throw response;
    }
    reject(response);
  }
};

export const FBGetLoginStatus = () => new Promise(async (resolve, reject) => {
  FB.getLoginStatus((response) => {
    testResponse(response, reject);
    resolve(response);
  });
});

export const FBGet = url => new Promise((resolve, reject) => {
  FB.api(url, 'get', (response) => {
    testResponse(response, reject);
    resolve(response);
  });
});
