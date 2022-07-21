import { api } from '../constants/constant';

interface FetchData {
  url: string;
  id?: number;
  method?: string;
  filter?: string;
}

/**
 * Function uses url, id and method to return the result requested by the user
 * @param {string} url
 * @param {number} id
 * @param {method} method
 * @returns {} result
 */
async function request<T>({ url, filter, id, method = 'GET' }: FetchData, data?: T): Promise<T> {
  var options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (method !== 'GET') {
    var body = { body: JSON.stringify(data) };
    options = { ...options, ...body };
  }

  let path: string;
  if (filter) {
    path = `?${filter}`;
  } else {
    path = `/${id ? id : ''}`;
  }
  const response = await fetch(`${api.API_HOST}/${url}${path}`, options);

  const resultData = await response.json();

  return resultData;
}

/**
 *
 * @param {string} obj
 * @returns object
 */
function objectToQueryString(obj: string): string {
  return Object.entries(obj)
    .map((i) => [i[0], encodeURIComponent(i[1])].join('&'))
    .join('=');
}

/**
 * Use url and id to return result request to read data
 * @param {string} url
 * @param {number} id
 * @returns result request to read data
 */
export function get<T>({ url, filter, id }: FetchData): Promise<T> {
  return request<T>({ url, filter, id });
}
/**
 * Use url and id to return result request to create data
 * @param {string} url
 * @returns result request to create data
 */

export function create<T>({ url }: FetchData, data: T): Promise<T> {
  return request<T>({ url, method: 'POST' }, data);
}
/**
 * Use url and id to return result request to update data
 * @param {string} url
 * @param {number} id
 * @returns result request to update data
 */

export function update<T>({ url, id }: FetchData, data: T): Promise<T> {
  return request({ url, id, method: 'PUT' }, data);
}

/**
 * Use url and id to return result request to delete data
 * @param {string} url
 * @param {number} id
 * @returns result request to delete data
 */

export function remove<T>({ url, id }: FetchData): Promise<T> {
  return request({ url, id, method: 'DELETE' });
}
