const baseUrl = 'http://localhost:8000';
// const baseUrl = 'https://api.egobie.com';

export default (method, url, body, headers) => {
  let _headers = headers ? headers : {};
  let _body = body ? body : {};

  return fetch(`${baseUrl}/${url}`, {
    method: method,
    headers: Object.assign(_headers, {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(Object.assign(_body, {
      userId: global.eGobieUserId ? global.eGobieUserId : 1,
      userToken: global.eGobieUserToken ? global.eGobieUserToken : 'bc2543',
    })),
  })
  .then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      throw response._bodyText;
    }
  })
  .then((data) => {
    return {
      status: 200,
      body: data,
    };
  })
  .catch((error) => {
    return {
      status: 400,
      body: error.substring(1, error.length - 2),
    }
  });
};