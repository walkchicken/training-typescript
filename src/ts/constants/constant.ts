interface Api {
  API_HOST?: string;
  PATH_USER?: string;
  PATH_PRODUCT?: string;
  PATH_ORDER?: string;
}

const api: Api = {
  API_HOST: 'http://localhost:3000',
  PATH_USER: 'users',
  PATH_PRODUCT: 'products',
  PATH_ORDER: 'orders',
};

export { api };
