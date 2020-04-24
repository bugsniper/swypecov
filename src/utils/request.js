import {apiRoot} from '../config/config';
import {fetch} from 'react-native-ssl-pinning';

async function parseJSON(response) {
  if (response.status === 204) {
    return undefined;
  }
  try {
    return await response.json();
  } catch (e) {
    console.log('error', e);
    return response;
  }
}

async function checkStaus(response) {
  console.log('checkStaus', response);
  let error;
  if (response.status < 200 || response.status >= 300) {
    error = new Error(response.statusText);
  } else if (response.status !== 200) {
    error = new Error('Response is not JSON');
  } else if (response.status === 403) {
    response.statusText = 'Something went wrong, Please try again.';
    error = new Error(response.statusText);
  }
  if (error) {
    error.response = response;
    throw error;
  }
  return response;
}
function responseErrorCallback(error) {
  console.log('responseErrorCallback:', error);
}
export default function request(url, option) {
  const controller = new AbortController();
  const signal = controller.signal;
  const _option = {...option, signal};
  console.log('_option', option);
  return fetch(url, option)
    .then(
      res => checkStaus(res),
      err => {
        console.log('rejected', err);
        responseErrorCallback(err);
      })
    .then(parseJSON)
    .then((response) => {
      console.log('response=============', response);
      return response;
    });
}

const serialize = function(obj, prefix) {
  let str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
};

const queryParams = function(params) {
  return Object.keys(params)
    .map(k => {
      if(params[k]) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
      }
    }).join('&');
};


export function get(url, data) {
  if (data) url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(data);
  return request(`${apiRoot}${url}`, {
    method: 'GET',
    timeoutInterval: 10000,
    sslPinning: {
      certs: ["boom.insure"]
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


export function post(url, postData) {
  return request(`${apiRoot}${url}`, {
    method: 'POST',
    timeoutInterval: 10000,
    body: JSON.stringify(postData),
    sslPinning: {
      certs: ["boom.insure"]
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

