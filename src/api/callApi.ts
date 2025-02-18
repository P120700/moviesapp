import { mmkvStorage } from '@src/store/storage';
import qs from 'query-string';

type Options = {
  headers?: {
    [key: string]: string;
  };
  method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  query?: string | object;
};

const callApi = async (endpoint: string, options: Options = {}) => {
  const { headers, method = 'GET', body, query } = options;
  const accessToken = await mmkvStorage.getItem('@accessToken');
  let url = process.env.EXPO_PUBLIC_API_URL;

  let requestHeaders: { [x: string]: string } = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `${accessToken}` } : {}),
  };

  let requestBody;

  let endpointWithQuery = endpoint;

  if (headers) {
    requestHeaders = { ...requestHeaders, ...headers };
  }

  if (body) {
    if (
      requestHeaders['Content-Type'].includes(
        'application/x-www-form-urlencoded'
      )
    ) {
      const formBody = [];
      for (const property in body) {
        const encodedKey = encodeURIComponent(property);
        // @ts-ignore
        const encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      requestBody = formBody.join('&');
    } else {
      requestBody = JSON.stringify(body);
    }
  }

  if (query) {
    if (typeof query === 'object') {
      endpointWithQuery += `?${qs.stringify(query, { encode: false })}`;
    } else if (typeof query === 'string') {
      endpointWithQuery += `?${query}`;
    }
  }

  const response = await fetch(url + endpointWithQuery, {
    method,
    headers: requestHeaders,
    body: requestBody,
  });

  let payload;
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  return payload;
};

export default callApi;
