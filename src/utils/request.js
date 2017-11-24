import fetch from 'dva/fetch';
import { notification } from 'antd';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    const json = response.json();
    json.then((jsonResponse) => {
      if (jsonResponse.code !== 200) {
        notification.error({
          message: `请求错误1 ${jsonResponse.msg}`,
          description: jsonResponse.msg,
        });
      }
    }).catch(() => {

    });
    return json;
  } else {
    notification.error({
      message: `请求错误2 ${response.status}: ${response.url}`,
      description: response.statusText,
    });
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(`http://localhost:8080${url}`, newOptions)
    .then(checkStatus)
    .catch((error) => {
      if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
        });
      }
      if ('stack' in error && 'message' in error) {
        notification.error({
          message: `请求错误3: ${url}`,
          description: error.message,
        });
      }
      return error;
    });
}
